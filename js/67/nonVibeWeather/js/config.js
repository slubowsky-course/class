export const config = Object.freeze({
  providerId: 'openweather',
  cacheFreshMs: 10 * 60 * 1000,
  cacheMaxAgeMs: 24 * 60 * 60 * 1000,
  visibilityRefreshMs: 15 * 60 * 1000,
  cacheMaxEntries: 5,
  searchDebounceMs: 300,
  searchMinChars: 2,
  requestMinGapMs: 250,
  requestTimeoutMs: 10000,
  requestMaxRetries: 2,
  coordDecimals: 2,
});
