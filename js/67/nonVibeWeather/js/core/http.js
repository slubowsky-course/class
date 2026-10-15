import { AppError } from './errors.js';

const AUTO_RETRY = new Set(['UPSTREAM_UNAVAILABLE', 'TIMEOUT']);
const defaultSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Messages here must never include the request URL: it carries the API key.
function errorForStatus(res) {
  const status = res.status;
  if (status === 401) return new AppError('API_KEY_INVALID', 'The API key was rejected.');
  if (status === 404) return new AppError('NOT_FOUND', 'Nothing was found for that request.');
  if (status === 429) {
    const retryAfter = Number(res.headers?.get?.('retry-after'));
    return new AppError('RATE_LIMITED', 'Too many requests. Please try again shortly.', {
      retryable: true,
      retryAfterSec: Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : null,
    });
  }
  if (status === 400) return new AppError('INVALID_INPUT', 'The request was not valid.');
  if (status === 502 || status === 503 || status === 504) {
    return new AppError('UPSTREAM_UNAVAILABLE', 'The weather service is temporarily unavailable.', { retryable: true });
  }
  return new AppError('UPSTREAM_ERROR', 'The weather service returned an unexpected error.');
}

export function createHttp({
  timeoutMs,
  maxRetries,
  minGapMs,
  fetchFn = (...args) => globalThis.fetch(...args),
  sleep = defaultSleep,
  now = Date.now,
  isOnline = () => globalThis.navigator?.onLine !== false,
  jitter = Math.random,
}) {
  let nextSlot = 0;

  async function waitForSlot() {
    const t = now();
    const start = Math.max(t, nextSlot);
    nextSlot = start + minGapMs;
    if (start > t) await sleep(start - t);
  }

  async function attempt(url, signal) {
    await waitForSlot();
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

    const ctrl = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; ctrl.abort(); }, timeoutMs);
    const onAbort = () => ctrl.abort();
    if (signal?.aborted) ctrl.abort();
    else signal?.addEventListener('abort', onAbort, { once: true });

    try {
      const res = await fetchFn(url, {
        signal: ctrl.signal,
        headers: { Accept: 'application/json' },
        referrerPolicy: 'no-referrer',
        credentials: 'omit',
      });
      if (!res.ok) throw errorForStatus(res);
      return await res.json();
    } catch (e) {
      if (e instanceof AppError) throw e;
      if (timedOut) throw new AppError('TIMEOUT', 'The weather service took too long to respond.', { retryable: true });
      if (signal?.aborted) throw e;
      if (e instanceof SyntaxError) throw new AppError('MALFORMED_RESPONSE', 'The weather service sent an unreadable response.');
      throw isOnline()
        ? new AppError('CORS_OR_NETWORK', 'Could not reach the weather service.', { retryable: true })
        : new AppError('OFFLINE', 'You appear to be offline.', { retryable: true });
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }
  }

  async function getJson(url, { signal } = {}) {
    for (let i = 0; ; i++) {
      try {
        return await attempt(url, signal);
      } catch (e) {
        if (!(e instanceof AppError) || !AUTO_RETRY.has(e.code) || i >= maxRetries) throw e;
        await sleep(200 * 2 ** i * (0.5 + jitter()));
      }
    }
  }

  return { getJson };
}
