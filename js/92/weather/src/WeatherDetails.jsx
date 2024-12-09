import React from 'react';
import {PropTypes} from 'prop-types';

export default function WeatherDetails(props) {
  const { name, temperature, description, icon } = props.weather || {};

  return (
    <div className="row has-weather">
      <div>The weather in {name} </div>
      <img id="icon" src={icon} className="m-auto" />
      <div>{temperature} and {description}</div>
    </div>
  )
}

WeatherDetails.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  })
};
