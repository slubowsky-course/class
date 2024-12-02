import { Component } from 'react'
import './App.css'
import WeatherDetails from './WeatherDetails';
import NoWeatherComponent from './NoWeatherComponent';

class App extends Component {
  state = {
    zip: '08701',
    weather: {}
  };

  async fetchWeather() {
    try {
      const apiKey = '4d940566413cbb48ddbe156f2b502364';

      const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},US&appid=${apiKey}&units=imperial&lang=he`);

      const weatherData = await r.json();

      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
      }

      console.log(weatherData);

      this.setState({
        weather: {
          name: weatherData.name,
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
        }
      });
    } catch (e) {
      this.setState({
        error: e.message
      });
    }
  }

  componentDidMount() {
    this.fetchWeather();
  }

  render() {
    const { zip, weather, error } = this.state;

    const theWeather = !weather.name
      ? <NoWeatherComponent error={error} />
      : <WeatherDetails weather={weather} />;

    return (
      <div className="container text-center">
        <div className="row justify-content-end">
          <div className="col-3 col-md-2">
            <input className="form-control" id="zip" value={zip} readOnly />
          </div>
        </div>

        {/*!weather.name
          ? <NoWeatherComponent />
          : <WeatherDetails weather={weather}/>*/}

        {theWeather}
      </div>
    );
  }
}

export default App
