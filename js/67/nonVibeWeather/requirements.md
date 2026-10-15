# Weather Application: Requirements Specification

Status: Draft v0.1 | Date: 2026-10-14 | Owner: Stephen

## 1. Purpose and Scope

### 1.1 Purpose
A browser-based weather application that lets a user find a location and see current conditions and a short-term forecast, with clear, glanceable presentation.

### 1.2 In scope (v1)
- Location search and "use my location".
- Current conditions, 3-hourly forecast and daily summary for 5 days (OpenWeather free tier).
- Unit preferences and last viewed location, stored locally.
- Favourites (saved locations) are deferred to v2.
- Responsive, accessible UI.

### 1.3 Out of scope (v1)
- User accounts, server-side persistence, or sync across devices.
- Push notifications and severe-weather alerting.
- Radar / map layers, historical data, air quality, pollen.
- Native mobile apps.

### 1.4 Users
- **Casual user**: checks "what is it like now / do I need a jacket".
- **Planner**: checks the next few days for a trip or event.
- **Multi-location user**: tracks home, work, and family locations.

## 2. Functional Requirements

Priority uses MoSCoW: **M** must, **S** should, **C** could.

### 2.1 Location management
| ID | Requirement | Pri |
|----|-------------|-----|
| FR-1 | The user can search for a location by city name, optionally qualified by region/country (e.g. "Springfield, IL"). | M |
| FR-2 | Search returns a list of matching places showing name, region, and country so ambiguous names can be disambiguated; the user picks one. | M |
| FR-3 | Search suggestions appear as the user types, debounced so a request is not sent on every keystroke. | S |
| FR-4 | The user can choose "Use my location"; the app requests browser geolocation permission and loads weather for the returned coordinates. | M |
| FR-5 | If geolocation is denied, unavailable, or times out, the app shows a clear message and falls back to manual search without losing state. | M |
| FR-6 | The user can save the current location as a favourite and remove it later. | C (v2) |
| FR-7 | The user can switch between favourites in one action. | C (v2) |
| FR-7a | The last viewed location is restored on next visit. | M |
| FR-8 | The user can search by postal code. | C |

### 2.2 Current conditions
| ID | Requirement | Pri |
|----|-------------|-----|
| FR-9 | Display for the selected location: name, local date/time at that location, temperature, "feels like", condition text, and condition icon. | M |
| FR-10 | Display humidity, wind speed and direction, and atmospheric pressure. | M |
| FR-11 | Display precipitation (last hour, when reported), cloud cover, and visibility. UV index is not available from the free endpoints and is excluded. | S |
| FR-12 | Display sunrise and sunset times for the location's local day. | S |
| FR-13 | Show when the data was last updated. | M |

### 2.3 Forecast
| ID | Requirement | Pri |
|----|-------------|-----|
| FR-14 | Show a 5-day forecast: day name, condition icon, high/low temperature, and chance of precipitation. The provider supplies 3-hour slots, so daily values are aggregated per location-local day; the first and last days may be partial and are labelled as such. | M |
| FR-15 | Show a 3-hourly forecast for the next 5 days (up to 40 slots): time, temperature, condition icon, and chance of precipitation. | M |
| FR-16 | Selecting a day reveals its 3-hour slots plus wind, humidity, and precipitation total. | S |
| FR-17 | Show a temperature trend chart for the 3-hourly forecast. | C |

### 2.4 Preferences
| ID | Requirement | Pri |
|----|-------------|-----|
| FR-18 | The user can toggle temperature units (°C / °F), wind speed units (km/h, mph, m/s), and precipitation units (mm / in). | M |
| FR-19 | Unit choice applies immediately to all displayed values without a new network request where possible. | S |
| FR-20 | On first visit, default units are inferred from browser locale; the user's explicit choice always overrides. | S |
| FR-21 | Light / dark theme follows the OS setting, with a manual override. | C |
| FR-22 | Preferences and last location persist across sessions on the same browser. | M |

### 2.5 Data refresh and state handling
| ID | Requirement | Pri |
|----|-------------|-----|
| FR-23 | The user can manually refresh the data for the current location. | M |
| FR-24 | Data auto-refreshes when the tab regains focus and the data is older than 15 minutes. | S |
| FR-25 | A loading indicator is shown during fetches, and previous data stays visible (marked as refreshing) rather than blanking the screen. | M |
| FR-26 | On network or API failure, the app shows a human-readable error with a retry action; if cached data exists it is shown with a "stale" label and its age. | M |
| FR-27 | "No results" for a search is shown as an explicit empty state, not an error. | M |
| FR-28 | The app shows an offline indicator when the browser is offline and serves last cached data. | C |

### 2.6 API key management
| ID | Requirement | Pri |
|----|-------------|-----|
| FR-30 | When no key is stored, the app shows a first-run prompt explaining that a free provider key is needed, with a link to obtain one and a field to paste it. | M |
| FR-31 | On save, the app validates the key with a lightweight test request and reports valid, invalid, or "not yet active" without storing a key that is definitely invalid. | M |
| FR-32 | The user can view (masked), replace, and remove the stored key from a settings control at any time. | M |
| FR-33 | If a later request fails with an authentication error, the app keeps the cached data, explains the key problem, and offers to re-enter the key. | M |

### 2.7 Weather alerts (deferred)
| ID | Requirement | Pri |
|----|-------------|-----|
| FR-29 | Display official severe-weather alerts for the location where the provider supplies them. | C (v2) |

## 3. Non-Functional Requirements

### 3.1 Performance
- NFR-1: Initial page load (cold, 4G-class connection) shows the usable shell in under 2 s and weather data in under 3 s at the 90th percentile.
- NFR-2: Repeat visits render last cached data in under 1 s, then refresh in the background.
- NFR-3: Total transferred JS/CSS for the initial load under 200 KB gzipped (excluding icons/fonts).
- NFR-4: UI interactions (unit toggle, selecting a day) respond within 100 ms.

### 3.2 Reliability and resilience
- NFR-5: A failure of any single API call degrades only the affected panel, not the whole page.
- NFR-6: Network requests have timeouts (10 s) and bounded retry with backoff (max 2 retries) for transient errors only.
- NFR-7: Malformed or partial API responses never throw unhandled exceptions; missing fields render as "—".

### 3.3 Usability
- NFR-8: A first-time user can get weather for a named city in three interactions or fewer.
- NFR-9: Responsive layout from 320 px to 1920 px wide; no horizontal scroll at any width.
- NFR-10: Touch targets at least 44 × 44 px.

### 3.4 Accessibility
- NFR-11: Meets WCAG 2.2 AA: contrast, keyboard operability, visible focus, semantic landmarks.
- NFR-12: Weather icons are never the sole carrier of meaning; each has text or an accessible name.
- NFR-13: Search suggestions follow the ARIA combobox pattern; loading and error states are announced via live regions.
- NFR-14: Respects `prefers-reduced-motion`.

### 3.5 Security and privacy
- NFR-15: All external calls use HTTPS.
- NFR-16: Precise geolocation is used only in-browser to fetch weather, is stored only as the last-viewed location's rounded coordinates (2 decimals), and is requested only on explicit user action.
- NFR-17: All API-sourced strings are rendered as text (no `innerHTML` with untrusted data) to prevent XSS.
- NFR-18: The API key is supplied by the user at runtime and kept only in `localStorage`; it is never committed, bundled, logged, or sent anywhere except the provider's HTTPS endpoint (C-4). It is masked in the UI and can be cleared at any time.
- NFR-19: No third-party analytics or tracking in v1; a Content-Security-Policy restricts script and connect sources.

### 3.6 Maintainability and quality
- NFR-20: Providers are pluggable via the adapter pattern. The app depends only on a provider-neutral interface (`searchLocations`, `reverseGeocode`, `getCurrent`, `getForecast`) and a canonical weather model (metric units, ISO timestamps, app-defined condition codes, explicit time zone). Each provider (OpenWeather first) is an adapter that translates its requests and responses to and from that model.
- NFR-20a: The active adapter is selected by configuration, not code changes in UI or state layers; adding a provider means adding one adapter file plus its config and tests.
- NFR-20b: Adapters declare capabilities (e.g. hourly hours available, daily days available, UV, alerts); the UI hides or degrades features a provider cannot supply rather than failing.
- NFR-20c: Adapters are contract-tested against shared fixtures (a fake provider response in, canonical model out) so a new adapter can be verified against the same suite.
- NFR-20d: Credentials are provider-specific, so each adapter declares what it needs (OpenWeather: one API key); the key-management UI is driven by that declaration rather than hard-coded to OpenWeather.
- NFR-21: Pure logic (unit conversion, formatting, mapping provider codes to conditions) is unit-tested; target 80% coverage on that layer.
- NFR-22: Linting and formatting enforced; no console errors in normal operation.

### 3.7 Compatibility
- NFR-23: Latest two versions of Chrome, Edge, Firefox, Safari (desktop and mobile).
- NFR-24: Works without a build step being required to run locally under XAMPP (static files served from htdocs).

### 3.8 Internationalisation
- NFR-25: Dates, times, and numbers formatted via `Intl` using the user's locale; location-local times use the location's time zone or UTC offset, not the browser's.
- NFR-26: UI strings kept in one place to allow later translation (v1 ships English only).

## 4. Constraints

| ID | Constraint |
|----|------------|
| C-1 | The UI is static HTML/CSS/JavaScript served from the local XAMPP `htdocs` directory. No server-side code (no PHP, no proxy). |
| C-2 | No paid services; the weather and geocoding providers must have a free tier adequate for a personal/class project. |
| C-3 | Third-party data must be attributed per the provider's licence terms. |
| C-4 | OpenWeather requires an API key. With no server, the browser calls OpenWeather directly using a key the user enters and which is stored in `localStorage`. Any key reachable by browser code is visible to whoever uses that browser, so a key shared across visitors cannot be protected: each user must supply their own free key. |
| C-12 | The provider must allow direct browser calls (CORS) over HTTPS. Caching, throttling and retry all happen client-side, so they are per-browser, not shared. |
| C-9 | v1 uses only OpenWeather's free tier: Current Weather 2.5, 5-day/3-hour Forecast 2.5, and the Geocoding API. This limits the forecast to 5 days at 3-hour resolution, with no true daily summaries, UV index, or alerts. Confirm current free-tier limits (call rate and daily cap) before building. |
| C-10 | OpenWeather's free-tier terms must permit the intended public hosting, and attribution to OpenWeather is required. Review before going public. |
| C-5 | Persistence limited to browser storage (`localStorage`), roughly 5 MB, per-browser and per-origin. |
| C-6 | Forecast accuracy and horizon are bounded by the provider; the app does not generate its own forecasts. |
| C-7 | Geolocation requires a secure context (HTTPS or `localhost`). |
| C-8 | Single developer, class-project timeline. |
| C-13 | Public hosting target is GitHub Pages (static, HTTPS, no custom headers, served under a repo sub-path), so all URLs are relative. |
| C-14 | Weather icons come from an openly licensed SVG set; its licence and attribution terms must be honoured. |
| C-11 | Vanilla JavaScript (ES modules), no UI framework; tooling such as a linter and test runner is allowed but a build step must not be required to run the app. |

## 5. Assumptions

| ID | Assumption | If wrong |
|----|------------|----------|
| A-1 | OpenWeather is the initial provider (weather and geocoding) and its free allowance covers a single-user project. | Swap adapter (NFR-20); the canonical model is unchanged. |
| A-2 | Free-tier rate limits are sufficient for expected usage (one user per key, a few requests per session). | Add more aggressive client-side caching and throttling. |
| A-9 | Users are willing to create a free OpenWeather account and paste in their own API key (bring-your-own-key), including on the public site. | Without a server-side proxy there is no way to offer keyless use; would reopen the proxy decision. |
| A-10 | OpenWeather accepts direct browser requests (CORS enabled) and the key as a query parameter over HTTPS. | A CORS-blocked provider would require a proxy or another provider. |
| A-3 | Users have a modern evergreen browser with JavaScript enabled. | No graceful no-JS experience in v1. |
| A-4 | Weather data of ~15 minute freshness is acceptable; real-time is not required. | Shorten refresh interval, subject to rate limits. |
| A-5 | English-only UI is sufficient for v1. | Needs the string extraction in NFR-26 plus translation work. |
| A-6 | Local-only persistence is acceptable; users do not expect cross-device sync. | Requires accounts and a backend, which is a scope change. |
| A-7 | The provider returns the location's UTC offset (OpenWeather 2.5 gives an offset, not an IANA zone name), so local times can be shown correctly. | Derive the zone from coordinates via a separate lookup. Hours across a DST change inside the 5-day window may be off by one. |
| A-8 | Provider condition codes (e.g. WMO codes) can be mapped to a fixed, finite set of icons and labels. | Add a fallback "unknown" condition. |

## 6. Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-1 | Provider outage, rate limiting, or breaking API change. | Med | High | Service-module abstraction; cached last-good data (FR-26); defensive parsing (NFR-7). |
| R-2 | Provider terms change (free tier removed, key required, non-commercial clause). | Low-Med | High | Abstraction layer; review terms before any public deployment. |
| R-3 | Ambiguous place names lead to showing the wrong city. | High | Med | Always show region/country; require explicit selection (FR-2). |
| R-4 | Time zone bugs: showing browser-local rather than location-local times, or DST errors. | High | Med | Use provider-supplied zone with `Intl.DateTimeFormat`; test across zones and DST boundaries. |
| R-5 | Unit conversion errors or rounding inconsistencies. | Med | Med | Single tested conversion module; store canonical metric values and convert at display. |
| R-6 | Geolocation denied or inaccurate (IP-based, desktop). | High | Low | Graceful fallback (FR-5); show the resolved place name so users can verify. |
| R-7 | XSS through API-returned strings (place names). | Low | High | Text-only rendering (NFR-17); CSP (NFR-19). |
| R-8 | The key in `localStorage` is readable by any script on the origin (XSS, malicious extension) and appears in request URLs, browser dev tools, and any proxy or log that sees them. | Med | Med | Each user's own free key, so blast radius is one key; strict CSP, no third-party scripts, no `innerHTML` with data (NFR-17, NFR-19); `Referrer-Policy: no-referrer`; mask in UI; easy clear and rotate; key never logged or put in error messages. |
| R-13 | Leaky adapter abstraction: OpenWeather-specific concepts (condition IDs, field names, units) bleed into the UI, making a later swap expensive. | Med | Med | Canonical model with app-defined condition codes; capability flags; contract tests (NFR-20c); review that no UI code imports adapter internals. |
| R-14 | Free-tier rate limits are exceeded (especially once publicly hosted), so requests are throttled or the key is blocked. | Med | Med | Client-side cache (about 10 min per rounded coordinate), request throttling, and in-flight de-duplication; friendly "try again shortly" state on 429. Limits are per user key, so one user cannot exhaust another's. |
| R-15 | Daily high/low aggregated from 3-hour slots can differ from official daily values, and partial first/last days can mislead. | Med | Low | Aggregate by location-local day, label partial days, document the method; adapter capability flag lets a richer provider supply true daily data later. |
| R-16 | Bring-your-own-key onboarding friction: users abandon the app at the key prompt, invalid or not-yet-activated keys (new OpenWeather keys can take a while to activate) look like app failures. | High | Med | Clear first-run guidance and a link to get a key; validate the key with a test call; distinct message for 401 ("key invalid or not yet active"); the key is never required until the first data request. |
| R-17 | GitHub Pages (target host) cannot set custom response headers, so CSP and referrer policy rely on `<meta>` tags, which cannot enforce `frame-ancestors`. | High | Low | Meta CSP and referrer tags; accept framing risk (no storage access via frames); move to a header-capable host if requirements tighten. |
| R-9 | Corrupt or outdated `localStorage` data breaks startup. | Low | Med | Schema version field, validation on read, reset on failure. |
| R-10 | Users misread forecast certainty or rely on it for safety decisions. | Low | Med | Show data source, update time, and a short disclaimer; no safety-critical claims. |
| R-11 | Scope creep (maps, alerts, accounts) in a short timeline. | High | Med | Hold to MoSCoW priorities; defer "Could" items to v2. |
| R-12 | Accessibility gaps in custom components (combobox, chart). | Med | Med | Use native elements where possible; keyboard and screen reader checks before release. |

## 7. Acceptance Criteria (summary)

- AC-1: Searching "Paris" lists multiple Parises with region and country; selecting one shows current conditions, the 5-day forecast, and the 3-hourly forecast.
- AC-2: Denying geolocation shows a message and leaves search usable.
- AC-3: Toggling °C/°F updates every temperature on screen immediately and persists after reload.
- AC-4: With the network disabled after one successful load, reload shows cached data labelled stale with its age.
- AC-5: A location in a different time zone shows its own local time, sunrise, and sunset.
- AC-6: Keyboard-only use can complete search, selection, and unit change.
- AC-7: API returns a malformed payload; the affected panel shows "—" or an error, and nothing else breaks.

## 8. Open Questions

Resolved: OpenWeather free tier (2.5 endpoints, no One Call) behind pluggable adapters; local-only persistence; no PHP or proxy (user supplies their own API key, stored in `localStorage`); alerts, maps and charts deferred; favourites moved to v2; public hosting planned eventually (local XAMPP first); vanilla JavaScript with no framework; no mandated visual design; the earlier vibeWeather prototype is discarded and not a reference.

None outstanding.

## 9. Suggested Next Steps

1. Write the architecture and data-flow design (service module, state, storage schema).
2. Break the "Must" requirements into tickets and build in vertical slices: search, current conditions, forecast, units, persistence, error states.
