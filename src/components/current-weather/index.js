import React from 'react';

import { displayTemp } from '../utils';

export default function CurrentWeather({ conditions, units ='imperial' }) {
  if (!conditions) return null;
  return (
    <div id="CurrentWeather">
      <img src={conditions.icon} alt={conditions.description} className="weather-icon" />
      <div className="weather-description">{ conditions.description }</div>
      <h2> 
        {displayTemp(conditions.temperature, units)}   
      </h2>
      <div> Feels Like: {displayTemp(conditions.feelsLike, units)} </div>
      <div> Humidity: {conditions.humidity}% </div>
      <div> Wind Speed: {conditions.wind} { units === 'metric' ? 'm/s' : 'mph' } </div>
      <div> UV Index: {conditions.uvIndex} </div>
    </div>
  )
}

