export const initialState = Object.freeze({
  provider: null,
  credentials: { status: 'missing', maskedHint: null },
  prefs: {
    units: { temp: 'c', wind: 'kmh', precip: 'mm', pressure: 'hpa', visibility: 'km' },
    theme: 'system',
  },
  search: { query: '', status: 'idle', results: [], activeIndex: -1, error: null },
  location: null,
  weather: { status: 'idle', data: null, stale: false, error: null },
  selectedDayIndex: 0,
  net: { online: true },
});

export function reducer(state, action) {
  switch (action.type) {
    case 'net/set':
      return state.net.online === action.online
        ? state
        : { ...state, net: { online: action.online } };
    case 'credentials/set':
      return { ...state, credentials: { status: action.status, maskedHint: action.maskedHint ?? null } };
    case 'prefs/theme':
      return state.prefs.theme === action.theme
        ? state
        : { ...state, prefs: { ...state.prefs, theme: action.theme } };
    default:
      return state;
  }
}
