# Weather Application: Architecture and Design

Status: Draft v0.2 (no server-side code) | Date: 2026-10-14 | Implements: [requirements.md](requirements.md)

## 1. Overview

A vanilla-JS single-page app (ES modules, no build step) served as static files. There is no backend. The browser calls OpenWeather directly over HTTPS using an API key the user enters and which is stored in `localStorage`. The UI never sees a provider's data shapes: a provider adapter converts provider responses into a canonical weather model, and everything above the adapter works only with that model.

```
 Browser (static files only)                                      Provider
┌───────────────────────────────────────────────┐              ┌──────────────────┐
│ UI (components)  <--render--  Store (state)   │              │ api.openweather  │
│        |  events                  ^           │              │ map.org          │
│        v                          |           │              │ (CORS, HTTPS)    │
│ Services (weather, location, geo, key, storage)│   HTTPS      │                  │
│        |                                      │ -----------> │ Geocoding        │
│        v                                      │ <----------- │ Current 2.5      │
│ Provider adapter (OpenWeather) -> canonical   │              │ Forecast 2.5     │
│ Domain (units, format, conditions, daily)     │              └──────────────────┘
└───────────────────────────────────────────────┘
```

Dependency rule: `ui -> services -> providers -> core/http`; `domain` is pure and importable by anyone; nothing imports upward. No UI module imports anything under `providers/openweather/`.

## 2. Key Decisions

| # | Decision | Why | Alternative rejected |
|---|----------|-----|----------------------|
| D-1 | No backend. Adapters call the provider directly from the browser. | Simplest deploy (any static host), one language, one test runner. | A proxy that hides a shared key: needs server code, which was ruled out. |
| D-2 | Bring-your-own-key (BYOK): each user pastes their own free key; stored in `localStorage` only. | A key shipped to every browser is public by definition; per-user keys limit blast radius and rate-limit sharing to one user. | Embedding one key in the source (would be scraped and burned). |
| D-3 | Canonical model is metric and UTC; conversion to display units only at render time. | One conversion module; unit toggle needs no refetch (FR-19). | Fetching per unit system. |
| D-4 | Time is epoch seconds plus the location's UTC offset in seconds, formatted via `Intl` with `timeZone: "UTC"` after shifting. | OpenWeather 2.5 returns an offset, not an IANA zone name. | Browser-local times (wrong, R-4). |
| D-5 | App ships its own icon set keyed by canonical condition code. | No third-party image requests (tight CSP, privacy), icons decoupled from provider. | OpenWeather icon URLs. |
| D-6 | Single immutable store with subscribe/notify; components are plain functions `render(state)` building DOM with `textContent` and `createElement`. | Simple, testable, no framework, no `innerHTML` with API data (NFR-17). | Ad hoc DOM mutation from services. |
| D-7 | Daily summaries derived in the domain layer from forecast steps unless the adapter reports native daily data. | Free tier has no daily endpoint (C-9); a richer provider later supplies `daily` directly. | Daily logic inside the OpenWeather adapter. |
| D-8 | Adapters declare required credentials; the key UI is generated from that declaration. | Keeps the "swap provider" promise honest: a new provider may need a different credential shape. | Hard-coding an "OpenWeather API key" screen. |

## 3. Project Layout

```
nonVibeWeather/
  index.html
  css/
    base.css  layout.css  components.css  themes.css
  assets/icons/                 SVGs named by canonical condition code
  js/
    main.js                     bootstrap: wire store, services, UI
    config.js                   TTLs, debounce, throttle, active provider id
    core/
      store.js                  state container (get/dispatch/subscribe)
      dom.js                    h() element helper, safe text rendering
      http.js                   fetch wrapper: timeout, abort, retry, error mapping, min request gap
    domain/
      model.js                  canonical types (JSDoc typedefs) + validators
      units.js                  conversions and unit definitions
      format.js                 number and offset-aware date/time formatting
      conditions.js             canonical condition codes, labels, severity order
      daily.js                  aggregate forecast steps into local-day summaries
    providers/
      contract.js               adapter interface (JSDoc) + capability flags + credential spec
      registry.js               id -> adapter factory
      openweather/
        adapter.js              implements the contract using http.js
        mapper.js               pure functions: raw OWM JSON -> canonical model
        conditions.js           OWM condition id -> canonical code
    services/
      weatherService.js         load/refresh, cache policy, race protection
      locationService.js        search (debounced), reverse geocode
      geolocationService.js     browser geolocation wrapper
      credentialService.js      get/set/validate/clear key
      storage.js                versioned localStorage with validation
    ui/
      app.js                    layout and subscriptions
      keyPrompt.js              first-run and replace-key dialog
      searchBox.js              combobox (ARIA), suggestions
      currentPanel.js
      forecastPanel.js          3-hourly strip + selected day detail
      dailyPanel.js
      unitsToggle.js
      settingsMenu.js           units, theme, key management
      statusBanner.js           loading, stale, offline, error, rate-limited
      attribution.js
  tests/
    fixtures/openweather/       recorded raw responses
    domain/ providers/ services/
  requirements.md  architecture.md
```

## 4. Canonical Weather Model

All numbers metric; all timestamps epoch seconds (UTC). Missing values are `null`, never `0` or `NaN`.

```
Location {
  id: string              // "lat,lon" rounded to 2 decimals
  name: string
  region: string|null     // state/province
  country: string         // ISO 3166 alpha-2
  lat: number
  lon: number
  utcOffsetSeconds: number|null   // from weather response; null until first load
}

CurrentConditions {
  observedAt: number
  temperatureC, feelsLikeC: number|null
  condition: ConditionCode
  isDay: boolean
  humidityPct: number|null
  pressureHpa: number|null
  windSpeedMs, windGustMs: number|null
  windDirectionDeg: number|null
  cloudCoverPct: number|null
  visibilityM: number|null
  precipLastHourMm: number|null
  sunrise, sunset: number|null
  utcOffsetSeconds: number
}

ForecastStep {                    // one 3-hour slot
  at: number
  temperatureC, feelsLikeC: number|null
  condition: ConditionCode
  isDay: boolean
  precipChance: number|null       // 0..1
  precipMm: number|null           // rain + snow water equivalent for the step
  windSpeedMs, windDirectionDeg: number|null
  humidityPct: number|null
}

DailySummary {
  date: string                    // "YYYY-MM-DD" in the location's local time
  highC, lowC: number|null
  condition: ConditionCode        // representative, see section 6.2
  precipChanceMax: number|null
  precipTotalMm: number|null
  partial: boolean                // fewer than 8 steps present
  steps: ForecastStep[]
}

WeatherBundle {
  location: Location
  fetchedAt: number
  current: CurrentConditions
  forecastSteps: ForecastStep[]
  daily: DailySummary[]
  source: { providerId: string, attribution: string }
}
```

`ConditionCode`: `clear`, `mostly-clear`, `partly-cloudy`, `cloudy`, `fog`, `drizzle`, `rain`, `heavy-rain`, `thunderstorm`, `snow`, `sleet`, `freezing-rain`, `dust-or-smoke`, `windy-extreme`, `unknown`. Day/night is `isDay`; the icon layer picks a variant. Condition text comes from the app's own label table, not provider text.

`mapper.js` validates required fields and yields `null` for anything missing or non-numeric (NFR-7). An unmapped provider condition becomes `unknown` (A-8). The provider's own errors never reach the model.

## 5. Provider Adapter Contract

```
WeatherProvider {
  id: string                                   // "openweather"
  credentials: [{ id: "apiKey", label: string, help: string, signupUrl: string, pattern: RegExp }]
  capabilities: {
    forecastStepHours: number,                 // 3
    forecastDays: number,                      // 5
    nativeDaily: boolean,                      // false
    hasUv: boolean,                            // false
    hasAlerts: boolean,                        // false
    hasPrecipChance: boolean,                  // true
    supportsPostalSearch: boolean
  }
  validateCredentials(credentials, { signal }) -> Promise<"valid"|"invalid">
  searchLocations(query, credentials, { signal }) -> Promise<Location[]>
  reverseGeocode(lat, lon, credentials, { signal }) -> Promise<Location>
  getCurrent(location, credentials, { signal }) -> Promise<CurrentConditions>
  getForecast(location, credentials, { signal }) -> Promise<{ steps: ForecastStep[], daily?: DailySummary[] }>
}
```

Rules:
- Adapters throw `AppError` (section 8.3) with a shared `code`; they never leak raw HTTP or provider-specific errors upward, and never include the URL (which contains the key) or the key in an error message or log.
- Adapters do no unit conversion and no formatting. They request metric and map as-is.
- The UI reads `capabilities` to hide or degrade features (NFR-20b) and `credentials` to build the key prompt (D-8).
- `registry.js` maps the configured provider id to a factory; adding a provider is one folder under `providers/`, one registry line, one config change.

Contract tests (`tests/providers/contract.test.js`) take any adapter and a fixture set and assert: object shapes, metric units, `null` for missing fields, UTC timestamps, no provider-specific fields leaking through.

### OpenWeather mapping notes
- Base `https://api.openweathermap.org`; every request adds `appid`, `units=metric`, `lang=en`.
- Search: Geocoding `/geo/1.0/direct` (`limit=5`); reverse: `/geo/1.0/reverse`; postal: `/geo/1.0/zip`.
- Current: `/data/2.5/weather`. `dt`, `sys.sunrise`, `sys.sunset` are UTC epochs; `timezone` is the offset in seconds. `rain["1h"]` and `snow["1h"]` summed for `precipLastHourMm`; absence means 0 only for precipitation fields. `visibility` is metres (capped at 10000).
- Forecast: `/data/2.5/forecast` returns up to 40 steps (`dt`, `main`, `weather`, `pop`, `rain["3h"]`, `snow["3h"]`, `wind`) and `city.timezone`.
- Key validation: a cheap call (for example geocoding a fixed query with `limit=1`); 200 is valid, 401 is invalid, and an immediately-fresh key that returns 401 is surfaced as "invalid or not yet active" because new keys can take time to activate.
- Condition ids by range: 2xx thunderstorm, 3xx drizzle, 500 to 504 rain (502 and above heavy-rain), 511 freezing-rain, 520 to 531 rain, 600 to 602 and 620 to 622 snow, 611 to 616 sleet, 701 to 741 fog, 751 to 771 dust-or-smoke, 781 windy-extreme, 800 clear, 801 mostly-clear, 802 partly-cloudy, 803 to 804 cloudy, else unknown.
- `isDay` from the icon suffix (`d`/`n`); for current, cross-checked against sunrise and sunset.
- Verify field names against current OpenWeather docs when writing the mapper, and record fixtures from real responses at that time.

## 6. Domain Logic

### 6.1 Time handling (D-4)
`localParts(epochSec, offsetSec)` shifts the epoch by the offset and formats with `Intl.DateTimeFormat(locale, { timeZone: "UTC", ... })`. All local-day grouping, "today/tomorrow" labels, sunrise/sunset and hour labels use it. The offset applies to the whole 5-day window, so a forecast crossing a DST change may be one hour off after the change (accepted for v1, residual R-4). The adapter model allows an optional `timeZone` field so a future provider with IANA names removes the issue.

### 6.2 Daily aggregation (`daily.js`)
Group steps by local date. For each day:
- `highC`/`lowC` = max/min step temperature.
- `precipChanceMax` = max `precipChance`; `precipTotalMm` = sum of `precipMm`.
- `condition` = the most severe among steps (thunderstorm > freezing-rain > snow > sleet > heavy-rain > rain > drizzle > fog > cloudy > partly-cloudy > mostly-clear > clear), using only daytime steps when any exist so a night shower does not dominate the icon.
- `partial` = fewer than 8 steps (first and last days usually).
Pure function, unit-tested including offsets UTC+13, UTC-11 and +05:30.

### 6.3 Units (`units.js`)
Definitions `{ id, convert(fromMetric), symbol, decimals }` for temperature (C, F), wind (km/h, mph, m/s), precipitation (mm, in), pressure (hPa, inHg), visibility (km, mi). Defaults inferred from `navigator.language` and overridden by the saved preference (FR-20).

### 6.4 Formatting (`format.js`)
Numbers via `Intl.NumberFormat`; `null` renders as an em dash. Wind degrees become a compass label with `aria-label`. Relative "updated N min ago".

## 7. State and Rendering

### 7.1 Store
`store.js` exposes `getState()`, `dispatch(action)`, `subscribe(fn)`. Reducers are pure; state is replaced, never mutated.

```
State {
  provider: { id, capabilities, credentialSpec }
  credentials: { status: "missing"|"valid", maskedHint: string|null }
  prefs: { units: { temp, wind, precip, pressure, visibility }, theme: "system"|"light"|"dark" }
  search: { query, status: "idle"|"loading"|"ready"|"error", results: Location[], activeIndex: number, error }
  location: Location|null
  weather: {
    status: "idle"|"loading"|"refreshing"|"ready"|"error",
    data: WeatherBundle|null,
    stale: boolean,
    error: AppError|null
  }
  selectedDayIndex: number
  net: { online: boolean }
}
```
The raw key is never placed in the store; services read it from storage at call time, and the store holds only status and a masked hint (last four characters).

### 7.2 Rendering
`ui/app.js` subscribes once and calls each panel's `render(state)`. Panels keep references to their root elements and update text and attributes in place so keyboard focus survives updates. Dynamic text is set only through `textContent` and `setAttribute`; the `h()` helper has no raw-HTML path.

### 7.3 Accessibility structure
Landmarks: `header` (search, settings), `main` (current, forecast, daily), `footer` (attribution). Search is an ARIA 1.2 combobox with a listbox. A visually hidden `aria-live="polite"` region announces loading, result counts, errors and updates. The key prompt is a native `<dialog>` with focus management and labelled fields. Icons are decorative SVG next to text. 44 px targets and focus rings in `base.css`; `prefers-reduced-motion` disables transitions.

## 8. Services and Data Flow

### 8.1 `weatherService.load(location, { force })`
1. If no key is stored, dispatch an auth-needed state and open the key prompt (FR-30); stop.
2. Read the cached bundle for `location.id`. If age < 10 min and not `force`, dispatch `weather/ready` with it; done.
3. Else dispatch `weather/loading` (first load) or `weather/refreshing` (keep existing data visible, FR-25).
4. New `AbortController`, increment `requestSeq`, abort the previous in-flight load.
5. `Promise.all([getCurrent, getForecast])`. Run `daily.js` if the provider has no native daily.
6. If `seq` is stale, discard (guards the quick-switch race). Else store the bundle, update `location.utcOffsetSeconds`, persist `lastLocation`, dispatch `weather/ready`.
7. On failure with a cached bundle (up to 24 h old): `weather/ready` with `stale: true` and the error. Without one: `weather/error`. An authentication error (401) additionally sets credentials status and prompts re-entry (FR-33), keeping cached data on screen.

Partial failure (NFR-5): if current succeeds and forecast fails, the bundle has an empty forecast and a panel-level error flag.

Client-side protection of the free-tier limit (R-14): `weatherService` aborts the superseded load rather than de-duplicating requests; a minimum spacing between requests of 250 ms; 429 responses honour `Retry-After` and are shown as "try again shortly" without auto-retry loops.

### 8.2 Flows
**Startup:** read prefs, `lastLocation`, and the key from storage (validate, drop corrupt entries); apply theme and units; if no key, show the first-run prompt; else if `lastLocation` exists, `load()` it, rendering cached data immediately and refreshing in the background (NFR-2); otherwise show the empty "search for a city or use your location" state.

**Key entry:** the dialog takes the key, trims whitespace, checks the declared pattern, then calls `validateCredentials`. `valid` stores it; `invalid` (OpenWeather's 401, which also covers a new key not yet active) does not store it and says "mistyped or not yet active", offering "Save anyway" for well-formed keys; a network failure is reported and nothing is stored (FR-31). Settings can show a masked hint, replace, or remove the key (FR-32). Removing the key also clears cached weather, since it was fetched with that identity.

**Search:** debounced 300 ms, minimum 2 characters, aborts the previous request. Results show name, region, country (FR-2). Selecting sets `location` and calls `load`. Zero results is a distinct state (FR-27).

**Use my location:** button click only. `geolocationService.getPosition({ timeout: 10000 })`, then `reverseGeocode`; if that fails, label as "Current location" with coordinates. Denied, unavailable, or timeout leave search usable (FR-5). Coordinates are rounded to 2 decimals before storage and before being sent to the provider.

**Refresh:** manual button forces a load. `visibilitychange` to visible triggers `load` if data is older than 15 minutes (FR-24). `online`/`offline` events update `net.online` (FR-28).

**Unit toggle:** dispatch, persist, re-render; no network (FR-19).

### 8.3 Errors
`AppError { code, message, retryable, retryAfterSec? }`. Codes: `API_KEY_MISSING`, `API_KEY_INVALID`, `INVALID_INPUT`, `NOT_FOUND`, `RATE_LIMITED`, `UPSTREAM_UNAVAILABLE`, `UPSTREAM_ERROR`, `TIMEOUT`, `OFFLINE`, `CORS_OR_NETWORK`, `MALFORMED_RESPONSE`, `GEO_DENIED`, `GEO_UNAVAILABLE`, `GEO_TIMEOUT`, `INTERNAL`. `http.js` maps status codes and network failures to these; the UI maps codes to user text in one place. Retries (max 2, exponential backoff with jitter) apply only to `UPSTREAM_UNAVAILABLE` and `TIMEOUT`, never to 4xx (NFR-6).

## 9. Persistence

All keys are versioned and validated on read; a corrupt key is discarded and defaults used (R-9). All access is wrapped in try/catch because storage can be unavailable (private windows, blocked storage); without storage the app still works for the session but asks for the key each time.

```
weatherapp:secrets:v1   { v: 1, data: { providerId, credentials: { apiKey } } }
weatherapp:prefs:v1     { v: 1, data: { units: {...}, theme: "system" } }
weatherapp:state:v1     { v: 1, data: { lastLocation: { name, region, country, lat, lon } } }
weatherapp:cache:v1     { v: 1, data: { entries: { "<lat,lon>": { fetchedAt, bundle } } } }   // LRU, max 5
```

The secrets key is separate from everything else so "remove key" and any future export or debug dump can never include it by accident. Coordinates are rounded to 2 decimals (NFR-16). Cache entries older than 24 h are purged at startup. Favourites (v2) get `weatherapp:favorites:v1`, so no migration is needed.

## 10. Security Posture

Because the key lives in browser storage, the protection is about not letting hostile script run, and limiting what a stolen key can do.
- CSP: `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self' https://api.openweathermap.org; base-uri 'none'; form-action 'none'`. GitHub Pages cannot set response headers, so the policy is delivered as a `<meta http-equiv="Content-Security-Policy">` tag, which must exclude `frame-ancestors` (ignored in meta). Framing is accepted as a residual risk: it cannot read the origin's storage.
- `<meta name="referrer" content="no-referrer">` so the app's own URL is never sent with provider requests.
- No inline scripts or styles; no third-party scripts, fonts or analytics; no `innerHTML`, `outerHTML` or `insertAdjacentHTML` with data (lint rule).
- The key is sent as a query parameter (the only way OpenWeather accepts it), so it appears in the browser's network panel and possibly in extension logs; error handling must strip URLs from anything displayed or logged.
- The key input is `type="password"`, `autocomplete="off"`, with a show/hide toggle.
- Advise users in the key prompt to use a key dedicated to this app, so it can be revoked without affecting anything else.
- Geolocation is requested only on button click; coordinates rounded before leaving the browser.
- External links use `rel="noopener noreferrer"`.
- Key-scoped limits are the real backstop: a stolen free key can only burn that user's own quota.

## 11. Performance Plan
- No framework, no bundler; ES modules served as-is.
- Icons as local SVG files; system font stack.
- Cached data first, then background refresh; debounced search; aborted stale requests.
- Budget check (NFR-3) in a test script: sum of gzipped `js/` and `css/`.

## 12. Testing Strategy
- **Runner:** Node's built-in `node --test` with ESM; no dependencies. Domain and provider code avoids DOM and `window` so it runs under Node (`fetch` injected into `http.js`).
- **Unit:** `units`, `format` (offset edge cases), `daily`, `conditions`, `storage` (corrupt data, unavailable storage), `credentialService` (pattern check, masking).
- **Contract:** shared adapter suite against recorded OpenWeather fixtures, including a response with missing fields and one with unexpected types.
- **Service:** `weatherService` with a fake provider: cache hit, refresh, stale fallback, rapid location switching race, partial failure, 401 mid-session.
- **UI:** manual checklist per acceptance criterion (AC-1 to AC-7 plus new key criteria below), keyboard-only and screen-reader pass, Lighthouse accessibility run.
- **Live smoke test:** a documented manual run with a real key before each release, since fixtures can drift from the real API.

Added acceptance criteria: AC-8 first load with no key shows the prompt and nothing else breaks; AC-9 an invalid key is rejected with a clear message and is not stored; AC-10 removing the key clears the stored key and cached weather.

## 13. Build Order (vertical slices)
1. Skeleton: `index.html`, store, dom helper, config, lint and test scripts, CSP meta.
2. `http.js`, `storage.js`, `credentialService`, key prompt, with key validation against the real API.
3. OpenWeather adapter (mapper, conditions), fixtures, contract tests.
4. Search to current conditions, end to end, with loading and error states.
5. Forecast and daily aggregation; day selection.
6. Units, formatting, persistence, last-location restore.
7. Geolocation flow.
8. Stale/offline handling, refresh, visibility refresh, 401 and 429 handling.
9. Accessibility pass, theming, attribution.
10. Public hosting pass: confirm host headers, CSP, OpenWeather terms review (C-10).

## 14. Risks Specific to This Design
| Risk | Mitigation |
|------|------------|
| Key in `localStorage` is readable by any script on the origin. | Strict CSP, zero third-party scripts, lint ban on HTML injection, per-user keys, easy revocation (R-8). |
| BYOK onboarding friction, especially key activation delay. | Clear first-run guidance, "Save anyway" path for not-yet-active keys, link to the provider's signup (R-16). |
| OpenWeather offset-only time zones can misplace hours across DST. | Documented limitation; optional `timeZone` field in the model for future providers. |
| Direct browser calls break if the provider changes CORS or key-in-URL rules. | Adapter isolation; the live smoke test; a proxy remains possible later without changing UI code. |
| Fixtures drift from the real API. | Re-record periodically; live smoke test before release. |
| Private or blocked storage means the key and cache do not persist. | Session-only fallback with a visible notice. |

## 15. Decisions Taken

### 15.1 Icons
Use an openly licensed SVG set, one file per canonical condition code (plus day/night variants), kept in `assets/icons/`. Leading candidate: Meteocons (MIT licence); alternative: Weather Icons by Erik Flowers (SIL OFL 1.1). Confirm the licence text and attribution requirements at the time of adoption. The licence file is copied into `assets/icons/LICENSE` and credited in the footer next to the OpenWeather attribution. Icons are static (no animation) so `prefers-reduced-motion` needs no special handling for them.

### 15.2 Hosting: GitHub Pages
- Static files only fit this exactly. HTTPS is provided, which also satisfies the secure-context need for geolocation (C-7).
- No custom response headers, so CSP and referrer policy go in `<meta>` tags (section 10).
- Use only relative URLs in `index.html`, ES module imports and CSS, because a project site is served under `/<repo>/`, not at the domain root.
- No server-side routing: the app has a single page and no client-side URL routes, so no 404 fallback is needed.
- Pages publishes from a branch root or `/docs`; because this app lives in a subfolder of the `class` repo, decide at deploy time between publishing from `/docs`, a separate repo, or a deploy branch (deferred to build slice 10).
- Because it is a public site, everyone must supply their own key (A-9).

## 16. Open Design Questions
None outstanding.
