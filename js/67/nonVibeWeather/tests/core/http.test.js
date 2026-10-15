import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHttp } from '../../js/core/http.js';

const KEY = 'a'.repeat(32);
const URL_WITH_KEY = `https://example.test/data?appid=${KEY}`;

const reply = (status, body, headers = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: { get: (n) => headers[n.toLowerCase()] ?? null },
  json: async () => {
    if (body instanceof Error) throw body;
    return body;
  },
});

function make(fetchFn, overrides = {}) {
  return createHttp({
    timeoutMs: 50,
    maxRetries: 2,
    minGapMs: 0,
    fetchFn,
    sleep: async () => {},
    jitter: () => 0.5,
    ...overrides,
  });
}

const hangingFetch = (_url, { signal }) =>
  new Promise((_, reject) => {
    const fail = () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' }));
    if (signal.aborted) fail();
    else signal.addEventListener('abort', fail);
  });

test('returns parsed JSON on success', async () => {
  const http = make(async () => reply(200, { ok: 1 }));
  assert.deepEqual(await http.getJson(URL_WITH_KEY), { ok: 1 });
});

test('maps status codes to error codes', async () => {
  const cases = [[401, 'API_KEY_INVALID'], [404, 'NOT_FOUND'], [400, 'INVALID_INPUT'], [500, 'UPSTREAM_ERROR']];
  for (const [status, code] of cases) {
    const http = make(async () => reply(status, {}));
    await assert.rejects(http.getJson(URL_WITH_KEY), { code });
  }
});

test('429 carries Retry-After and is not auto-retried', async () => {
  let calls = 0;
  const http = make(async () => { calls++; return reply(429, {}, { 'retry-after': '30' }); });
  await assert.rejects(http.getJson(URL_WITH_KEY), { code: 'RATE_LIMITED', retryAfterSec: 30 });
  assert.equal(calls, 1);
});

test('retries 503 and then succeeds', async () => {
  let calls = 0;
  const http = make(async () => (++calls < 3 ? reply(503, {}) : reply(200, { ok: 1 })));
  assert.deepEqual(await http.getJson(URL_WITH_KEY), { ok: 1 });
  assert.equal(calls, 3);
});

test('gives up after maxRetries', async () => {
  let calls = 0;
  const http = make(async () => { calls++; return reply(503, {}); });
  await assert.rejects(http.getJson(URL_WITH_KEY), { code: 'UPSTREAM_UNAVAILABLE' });
  assert.equal(calls, 3);
});

test('does not retry 4xx', async () => {
  let calls = 0;
  const http = make(async () => { calls++; return reply(401, {}); });
  await assert.rejects(http.getJson(URL_WITH_KEY), { code: 'API_KEY_INVALID' });
  assert.equal(calls, 1);
});

test('times out a hanging request', async () => {
  const http = make(hangingFetch, { maxRetries: 0 });
  await assert.rejects(http.getJson(URL_WITH_KEY), { code: 'TIMEOUT' });
});

test('caller abort surfaces as AbortError, not a retry', async () => {
  const ctrl = new AbortController();
  const http = make(hangingFetch, { timeoutMs: 5000 });
  const pending = http.getJson(URL_WITH_KEY, { signal: ctrl.signal });
  ctrl.abort();
  await assert.rejects(pending, { name: 'AbortError' });
});

test('malformed JSON becomes MALFORMED_RESPONSE', async () => {
  const http = make(async () => reply(200, new SyntaxError('bad json')));
  await assert.rejects(http.getJson(URL_WITH_KEY), { code: 'MALFORMED_RESPONSE' });
});

test('network failure maps to OFFLINE or CORS_OR_NETWORK', async () => {
  const failing = async () => { throw new TypeError('Failed to fetch'); };
  await assert.rejects(make(failing, { isOnline: () => false, maxRetries: 0 }).getJson(URL_WITH_KEY), { code: 'OFFLINE' });
  await assert.rejects(make(failing, { isOnline: () => true, maxRetries: 0 }).getJson(URL_WITH_KEY), { code: 'CORS_OR_NETWORK' });
});

test('error messages never contain the URL or key', async () => {
  const failures = [reply(401, {}), reply(429, {}), reply(503, {}), reply(500, {})];
  for (const res of failures) {
    const http = make(async () => res, { maxRetries: 0 });
    try {
      await http.getJson(URL_WITH_KEY);
      assert.fail('expected rejection');
    } catch (e) {
      assert.ok(!e.message.includes(KEY) && !e.message.includes('example.test'));
    }
  }
});

test('enforces a minimum gap between request starts', async () => {
  let clock = 1000;
  const sleeps = [];
  const http = make(async () => reply(200, {}), {
    minGapMs: 250,
    now: () => clock,
    sleep: async (ms) => { sleeps.push(ms); clock += ms; },
  });
  await http.getJson(URL_WITH_KEY);
  await http.getJson(URL_WITH_KEY);
  assert.deepEqual(sleeps, [250]);
});
