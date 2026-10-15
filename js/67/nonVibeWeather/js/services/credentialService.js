import { KEYS } from './storage.js';

const VERSION = 1;
const isSecret = (d) => typeof d?.providerId === 'string' && typeof d?.credentials?.apiKey === 'string';

export function createCredentialService({ storage, provider }) {
  const spec = provider.credentials[0];

  function stored() {
    const data = storage.get(KEYS.secrets, VERSION, isSecret);
    return data && data.providerId === provider.id ? data.credentials : null;
  }

  return {
    spec,

    getCredentials: () => stored(),
    hasKey: () => stored() !== null,

    hint() {
      const key = stored()?.apiKey;
      return key ? `…${key.slice(-4)}` : null;
    },

    // "rejected" can mean mistyped or not yet active, so the caller may retry with force.
    async save(raw, { signal, force = false } = {}) {
      const apiKey = String(raw ?? '').trim();
      if (!spec.pattern.test(apiKey)) return { ok: false, reason: 'format' };

      if (!force) {
        try {
          const verdict = await provider.validateCredentials({ apiKey }, { signal });
          if (verdict !== 'valid') return { ok: false, reason: 'rejected' };
        } catch (error) {
          return { ok: false, reason: 'error', error };
        }
      }

      storage.set(KEYS.secrets, VERSION, { providerId: provider.id, credentials: { apiKey } });
      return { ok: true };
    },

    clear() {
      storage.remove(KEYS.secrets);
    },
  };
}
