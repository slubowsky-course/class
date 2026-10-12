const zipInput = document.querySelector('#zip');
const locationElem = document.querySelector('#location');
const iconElem = document.querySelector('#icon');
const temperatureElem = document.querySelector('#temperature');
const descriptionElem = document.querySelector('#description');
const errorElem = document.querySelector('#error');
const weatherElems = document.querySelectorAll('.weather');
const noWeatherElems = document.querySelectorAll('.noWeather');
const key = 'KEY GOES HERE';

zipInput.addEventListener('change', async () => {
  try {
    const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipInput.value}&appid=${key}&units=imperial&lang=he`);

    const weatherData = await r.json();

    if (!r.ok) {
      throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
    }

    console.log(weatherData);

    locationElem.innerText = weatherData.name;
    iconElem.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    temperatureElem.innerText = weatherData.main.temp;
    descriptionElem.innerText = weatherData.weather[0].description;

    weatherElems.forEach(elem => elem.style.display = 'block');
    noWeatherElems.forEach(elem => elem.style.display = 'none');
  } catch (e) {
    console.error('oops', e);
    errorElem.innerText = e.message;

    weatherElems.forEach(elem => elem.style.display = 'none');
    noWeatherElems.forEach(elem => elem.style.display = 'block');
  }
});
