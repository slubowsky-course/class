(function () {
  'use strict';

  const key = '4d940566413cbb48ddbe156f2b502364';
  const zipInput = document.querySelector('#zip');
  const locationElem = document.querySelector('#location');
  const iconElem = document.querySelector('#icon');
  const temperatureElem = document.querySelector('#temperature');
  const descriptionElem = document.querySelector('#description');

  const noWeather = document.querySelector('.no-weather');
  const haveWeather = document.querySelector('.have-weather');

  zipInput.addEventListener('change', async () => {
    try {
      const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipInput.value}&appid=${key}&units=imperial&lang=he`);
      const weatherData = await r.json();
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
      }
      console.log(weatherData);

      locationElem.innerText =  weatherData.name;
      iconElem.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
      //document.body.style.backgroundImage = `url("https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png")`;
      temperatureElem.innerText = weatherData.main.temp;
      descriptionElem.innerText = weatherData.weather[0].description;

      noWeather.style.display = 'none';
      haveWeather.style.display = 'block';
    } catch(e) {
      console.error(e);
      document.querySelector('#error').innerText = e.message;
      noWeather.style.display = 'block';
      haveWeather.style.display = 'none';
    }
  });


  
}());
