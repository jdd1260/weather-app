import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import formatDate from 'date-fns/format';

import * as weatherApi from "../../api/weather";

const displayTemp = (temp, units='imperial') => 
  `${Math.round(temp)}° ${units === 'metric' ? 'C' : 'F' }`

export default function CurrentWeather() {
  const { lat, lon } = useParams();
  const [conditions, setConditions] = useState();
  const [units, setUnits] = React.useState(
    () => window.localStorage.getItem('unitSystem') || 'imperial'
  );
  React.useEffect(() => {
    window.localStorage.setItem('unitSystem', units)
  }, [units])

  useEffect(() => {
    async function fetchWeather() {
      if (lat != null && lon != null) {
        setConditions(undefined);
        const info = await weatherApi.getCurrentWeather({ lat, lon }, units);
        setConditions(info);
      }
    }
    fetchWeather();
  }, [lat, lon, units]);

  if (!conditions) return 'Loading Weather...';

  return (
    <div id="CurrentWeather">
      <h1> Weather for {conditions.name} at { formatDate(conditions.date, "h:mm a 'Local Time on' MMMM d, y", { locale: false })}</h1>
      <img src={conditions.icon} alt={conditions.description} />
      { conditions.description }
      <h2> 
        {displayTemp(conditions.temperature, units)}   
        <button onClick={() => setUnits('imperial')} className={units=== 'imperial' ? 'selected' : ''}>F</button>
        <button onClick={() => setUnits('metric')}  className={units=== 'metric' ? 'selected' : ''}>C</button>
      </h2>
      <div> Feels Like: {displayTemp(conditions.feelsLike, units)}  </div>
      <div> Humidity: {conditions.humidity}% </div>
      <div> Wind Speed: {conditions.wind} { units === 'metric' ? 'm/s' : 'mph' }</div>
    </div>
  )
}

