const KEY = '';
const API = 'https://api.openweathermap.org/data/2.5';

const form = document.querySelector('#searchForm');
const queryInput = document.querySelector('#query');
const locateBtn = document.querySelector('#locate');
const unitButtons = document.querySelectorAll('[data-units]');
const errorElem = document.querySelector('#error');
const loadingElem = document.querySelector('#loading');
const currentSection = document.querySelector('#current');
const forecastSection = document.querySelector('#forecastSection');
const forecastElem = document.querySelector('#forecast');

let units = localStorage.getItem('vw-units') || 'imperial';
let lastParams = localStorage.getItem('vw-last');

const symbol = () => (units === 'imperial' ? '°F' : '°C');
const speedUnit = () => (units === 'imperial' ? 'mph' : 'm/s');
const timeOf = (unix, tzOffset) =>
  new Date((unix + tzOffset) * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });

function paramsForQuery(q) {
  q = q.trim();
  return /^\d{5}(-\d{4})?$/.test(q) ? `zip=${encodeURIComponent(q.slice(0, 5))},us` : `q=${encodeURIComponent(q)}`;
}

async function getJson(endpoint, params) {
  const r = await fetch(`${API}/${endpoint}?${params}&appid=${KEY}&units=${units}`);
  const data = await r.json();
  if (!r.ok) {
    throw new Error(data.message ? data.message[0].toUpperCase() + data.message.slice(1) : `${r.status} ${r.statusText}`);
  }
  return data;
}

async function load(params) {
  errorElem.hidden = true;
  loadingElem.hidden = false;
  try {
    const [current, forecast] = await Promise.all([getJson('weather', params), getJson('forecast', params)]);
    lastParams = params;
    localStorage.setItem('vw-last', params);
    renderCurrent(current);
    renderForecast(forecast);
  } catch (e) {
    console.error(e);
    errorElem.textContent = e.message;
    errorElem.hidden = false;
    currentSection.hidden = true;
    forecastSection.hidden = true;
  } finally {
    loadingElem.hidden = true;
  }
}

function renderCurrent(d) {
  const w = d.weather[0];
  const isNight = w.icon.endsWith('n');

  document.querySelector('#location').textContent = `${d.name}, ${d.sys.country}`;
  document.querySelector('#icon').src = `https://openweathermap.org/img/wn/${w.icon}@2x.png`;
  document.querySelector('#icon').alt = w.description;
  document.querySelector('#temperature').textContent = `${Math.round(d.main.temp)}${symbol()}`;
  document.querySelector('#description').textContent = w.description;
  document.querySelector('#feelsLike').textContent = `${Math.round(d.main.feels_like)}${symbol()}`;
  document.querySelector('#humidity').textContent = `${d.main.humidity}%`;
  document.querySelector('#wind').textContent = `${Math.round(d.wind.speed)} ${speedUnit()}`;
  document.querySelector('#sunrise').textContent = timeOf(d.sys.sunrise, d.timezone);
  document.querySelector('#sunset').textContent = timeOf(d.sys.sunset, d.timezone);

  document.body.className = isNight ? 'night' : w.main.toLowerCase();
  currentSection.hidden = false;
}

function renderForecast(d) {
  const days = new Map();
  for (const item of d.list) {
    const date = new Date((item.dt + d.city.timezone) * 1000).toISOString().slice(0, 10);
    if (!days.has(date)) days.set(date, []);
    days.get(date).push(item);
  }

  forecastElem.innerHTML = '';
  for (const [date, items] of [...days].slice(0, 5)) {
    const hi = Math.round(Math.max(...items.map(i => i.main.temp_max)));
    const lo = Math.round(Math.min(...items.map(i => i.main.temp_min)));
    // Midday reading best represents the day's icon.
    const mid = items.reduce((a, b) => (Math.abs(new Date((b.dt + d.city.timezone) * 1000).getUTCHours() - 13) <
      Math.abs(new Date((a.dt + d.city.timezone) * 1000).getUTCHours() - 13) ? b : a));
    const name = new Date(`${date}T12:00:00Z`).toLocaleDateString([], { weekday: 'short', timeZone: 'UTC' });

    const day = document.createElement('div');
    day.className = 'day';
    day.innerHTML = `
      <div class="name">${name}</div>
      <img src="https://openweathermap.org/img/wn/${mid.weather[0].icon.replace('n', 'd')}.png" alt="${mid.weather[0].description}">
      <div class="range">${hi}° / ${lo}°</div>`;
    forecastElem.append(day);
  }
  forecastSection.hidden = false;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  load(paramsForQuery(queryInput.value));
});

locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    errorElem.textContent = 'Geolocation is not supported by this browser.';
    errorElem.hidden = false;
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => load(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`),
    err => {
      errorElem.textContent = `Could not get your location: ${err.message}`;
      errorElem.hidden = false;
    }
  );
});

unitButtons.forEach(btn => btn.addEventListener('click', () => {
  units = btn.dataset.units;
  localStorage.setItem('vw-units', units);
  unitButtons.forEach(b => b.classList.toggle('active', b === btn));
  if (lastParams) load(lastParams);
}));

unitButtons.forEach(b => b.classList.toggle('active', b.dataset.units === units));
load(lastParams || 'q=New York');
