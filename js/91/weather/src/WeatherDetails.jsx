import React from 'react'

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
