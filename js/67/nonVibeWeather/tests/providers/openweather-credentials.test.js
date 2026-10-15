import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createOpenWeatherAdapter } from '../../js/providers/openweather/adapter.js';
import { AppError } from '../../js/core/errors.js';

const KEY = '0123456789abcdef0123456789abcdef';

test('validateCredentials calls the geocoding endpoint with the key', async () => {
  let url;
  const adapter = createOpenWeatherAdapter({ http: { getJson: async (u) => { url = u; return []; } } });
  assert.equal(await adapter.validateCredentials({ apiKey: KEY }), 'valid');
  assert.match(url, /^https:\/\/api\.openweathermap\.org\/geo\/1\.0\/direct\?/);
  assert.ok(url.includes(`appid=${KEY}`));
});

test('401 means invalid', async () => {
  const http = { getJson: async () => { throw new AppError('API_KEY_INVALID', 'x'); } };
  assert.equal(await createOpenWeatherAdapter({ http }).validateCredentials({ apiKey: KEY }), 'invalid');
});

test('other failures propagate', async () => {
  const http = { getJson: async () => { throw new AppError('OFFLINE', 'x'); } };
  await assert.rejects(createOpenWeatherAdapter({ http }).validateCredentials({ apiKey: KEY }), { code: 'OFFLINE' });
});

test('key pattern accepts 32 hex characters only', () => {
  const { pattern } = createOpenWeatherAdapter({ http: {} }).credentials[0];
  assert.ok(pattern.test(KEY));
  assert.ok(!pattern.test(KEY.slice(1)));
  assert.ok(!pattern.test(`${KEY}0`));
  assert.ok(!pattern.test('g'.repeat(32)));
});
