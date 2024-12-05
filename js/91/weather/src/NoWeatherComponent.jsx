import React from 'react'

export default function NoWeatherComponent(props) {
  const { error } = props;

  return (
    <div className="no-weather">
      <h5 id="error" className="text-danger">{error}</h5>
      <h2>enter a zip to see weather</h2>
    </div>
  );
}
