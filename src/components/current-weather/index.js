import React from 'react';

const displayTemp = (temp, units='imperial') => 
  `${Math.round(temp)}° ${units === 'metric' ? 'C' : 'F' }`

export default function CurrentWeather({ conditions, units ='imperial' }) {
  return (
    <div id="CurrentWeather">
      <img src={conditions.icon} alt={conditions.description} />
      { conditions.description }
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

