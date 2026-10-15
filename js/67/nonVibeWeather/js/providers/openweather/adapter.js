const BASE_URL = 'https://api.openweathermap.org';

export function createOpenWeatherAdapter({ http }) {
  return {
    id: 'openweather',

    credentials: [{
      id: 'apiKey',
      label: 'OpenWeather API key',
      help: 'Create a free account, then copy a key from the "API keys" tab.',
      formatHint: '32 letters and numbers',
      signupUrl: 'https://home.openweathermap.org/users/sign_up',
      pattern: /^[a-f0-9]{32}$/i,
    }],

    capabilities: {
      forecastStepHours: 3,
      forecastDays: 5,
      nativeDaily: false,
      hasUv: false,
      hasAlerts: false,
      hasPrecipChance: true,
      supportsPostalSearch: true,
    },

    // OpenWeather answers 401 for both a wrong key and a new key that is not active yet.
    async validateCredentials({ apiKey }, { signal } = {}) {
      const query = new URLSearchParams({ q: 'London', limit: '1', appid: apiKey });
      try {
        await http.getJson(`${BASE_URL}/geo/1.0/direct?${query}`, { signal });
        return 'valid';
      } catch (e) {
        if (e.code === 'API_KEY_INVALID') return 'invalid';
        throw e;
      }
    },
  };
}
