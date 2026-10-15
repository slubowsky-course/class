import { createOpenWeatherAdapter } from './openweather/adapter.js';

const factories = {
  openweather: createOpenWeatherAdapter,
};

export function createProvider(id, deps) {
  const factory = factories[id];
  if (!factory) throw new Error(`Unknown weather provider: ${id}`);
  return factory(deps);
}
