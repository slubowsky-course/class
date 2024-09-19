
/* globals $*/
(function () {
  'use strict';
  const zipInput = $('#zip');
  const apiKey = '4d940566413cbb48ddbe156f2b502364';
  const locationElem = $('#location');
  const tempElem = $('#temp');
  const descriptionElem = $('#desc');
  const icon = $('#icon');
  const noWeather = $('.no-weather');
  const hasWeather = $('.has-weather');

  zipInput.change(async () => {
    noWeather.hide();
    hasWeather.show();
    /*let response;
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipInput.val()},US&appid=${apiKey}&units=imperial&lang=he`)
      .then(r => {
        response = r;
        return r.json();
      })
      .then(weatherData => {
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText} - ${weatherData.message}`);
        }
        console.log(weatherData);
      })
      .catch(e => console.error(e));*/
    try {
      const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipInput.val()},US&appid=${apiKey}&units=imperial&lang=he`);

      const weatherData = await r.json();

      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
      }

      console.log(weatherData);
      locationElem.text(weatherData.name);
      tempElem.text(weatherData.main.temp);
      descriptionElem.text(weatherData.weather[0].description);
      icon.attr('src', `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`);
    } catch(e) {
      // console.error('oops', e);
      $('#error').text(e.message);
      noWeather.show();
      hasWeather.hide();
    }
  });
}());
