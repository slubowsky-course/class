export const KEYS = Object.freeze({
  secrets: 'weatherapp:secrets:v1',
  prefs: 'weatherapp:prefs:v1',
  state: 'weatherapp:state:v1',
  cache: 'weatherapp:cache:v1',
});

// Storage can throw or be absent (private windows, blocked cookies); fall back to memory for the session.
export function createStorage(backend) {
  const memory = new Map();
  let persistent = true;

  function readRaw(name) {
    try {
      const value = backend.getItem(name);
      if (value != null) return value;
    } catch {
      persistent = false;
    }
    return memory.get(name) ?? null;
  }

  return {
    get isPersistent() { return persistent; },

    get(name, version, validate) {
      const raw = readRaw(name);
      if (raw == null) return null;
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.v === version && validate(parsed.data)) return parsed.data;
      } catch {
        // fall through to discard
      }
      this.remove(name);
      return null;
    },

    set(name, version, data) {
      const raw = JSON.stringify({ v: version, data });
      try {
        backend.setItem(name, raw);
        memory.delete(name);
      } catch {
        persistent = false;
        memory.set(name, raw);
      }
    },

    remove(name) {
      memory.delete(name);
      try {
        backend.removeItem(name);
      } catch {
        persistent = false;
      }
    },
  };
}
