import { createStore } from './core/store.js';
import { createHttp } from './core/http.js';
import { h, setText } from './core/dom.js';
import { config } from './config.js';
import { initialState, reducer } from './state.js';
import { createProvider } from './providers/registry.js';
import { createStorage } from './services/storage.js';
import { createCredentialService } from './services/credentialService.js';
import { createKeyPrompt } from './ui/keyPrompt.js';

const store = createStore(reducer, { ...initialState, net: { online: navigator.onLine } });

const http = createHttp({
  timeoutMs: config.requestTimeoutMs,
  maxRetries: config.requestMaxRetries,
  minGapMs: config.requestMinGapMs,
});
const provider = createProvider(config.providerId, { http });

let backend = null;
try { backend = window.localStorage; } catch { /* blocked storage: createStorage falls back to memory */ }
const storage = createStorage(backend);
const credentials = createCredentialService({ storage, provider });

function syncCredentials() {
  store.dispatch({
    type: 'credentials/set',
    status: credentials.hasKey() ? 'valid' : 'missing',
    maskedHint: credentials.hint(),
  });
}

const keyPrompt = createKeyPrompt({ credentials, onChange: syncCredentials });

const statusRoot = document.getElementById('status-root');
document.getElementById('settings-root').append(
  h('button', { type: 'button', class: 'settings-button', onclick: () => keyPrompt.open() }, 'API key'),
);

function render(state) {
  document.documentElement.dataset.theme = state.prefs.theme === 'system' ? '' : state.prefs.theme;

  let status = '';
  if (!state.net.online) status = 'You are offline.';
  else if (state.credentials.status === 'missing') status = 'Add your API key to get started.';
  setText(statusRoot, status);
}

store.subscribe(render);
syncCredentials();
render(store.getState());

window.addEventListener('online', () => store.dispatch({ type: 'net/set', online: true }));
window.addEventListener('offline', () => store.dispatch({ type: 'net/set', online: false }));

if (!credentials.hasKey()) keyPrompt.open();
