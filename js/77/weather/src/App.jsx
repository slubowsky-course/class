import { useEffect, useState } from 'react';
import './App.css'
import Weather from './Weather';
import NoWeather from './NoWeather';
import config from './config.json';

export default function App() {
  const [zipCode, setZipCode] = useState('');
  const [weather, setWeather] = useState();

  useEffect(() => {
    (async () => {
      if (zipCode.length !== 5) {
        return;
      }

      try {
        const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${config.key}&units=imperial&lang=he`);

        const weatherData = await r.json();

        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
        }

        console.log(weatherData);

        setWeather({
          location: weatherData.name,
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
        });
      } catch (e) {
        console.error('oops', e);
      }
    })();
  }, [zipCode]);

  const weatherJsx = weather
    ? /*<>
        <div className="weather">The weather in <span>{weather?.location}</span></div>
        <img className="weather" src={weather?.icon} />
        <div className="weather"><span>{weather?.temperature}</span> and <span>{weather?.description}</span></div>
      </>*/
      <Weather weather={weather} />

    : /*<div className="noWeather">
        <div>please enter a zip code to see the weather in that location</div>
        <div></div>
      </div>*/
      <NoWeather />

  return (
    <>
      <input placeholder="enter zip" value={zipCode} onChange={e => setZipCode(e.target.value)} />
      {/*weatherJsx*/}

      {/*!weather && <div className="noWeather">
        <div>please enter a zip code to see the weather in that location</div>
        <div></div>
      </div>*/}

      {/*weather && <>
        <div className="weather">The weather in <span>{weather?.location}</span></div>
        <img className="weather" src={weather?.icon} />
        <div className="weather"><span>{weather?.temperature}</span> and <span>{weather?.description}</span></div>
      </>*/}

      {! weather && <NoWeather />}
      {weather && <Weather weather={weather} /> }
    </>
  );
}
