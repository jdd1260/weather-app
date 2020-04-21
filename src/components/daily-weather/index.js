import React from 'react';
import formatDate from 'date-fns/format';

import { displayTemp } from '../utils';

export default function DailyWeather({ forecast, units ='imperial' }) {
  if (!forecast) return null;
  return (
    <div id="DailyWeather">
      <h1> 7 Day Forecast </h1>
      <table>
        <thead>
          <tr>
            <td> Date </td>
            <td/>
            <td>Description</td>
            <td>High/Low</td>
            <td>Humidity</td>
            <td>UV Index</td>
            <td>Sunrise/Sunset</td>
          </tr>
        </thead>
        <tbody>
          { forecast.map((conditions, index) => (
            <tr key={conditions.date} data-testid={'day-'+index}>
              <td> {formatDate(conditions.date, 'P')}</td>
              <td><img src={conditions.icon} alt={conditions.description} /></td>
              <td>{ conditions.description }</td>
              <td> 
                {displayTemp(conditions.max, units)} / {displayTemp(conditions.min, units)}
              </td>
              <td> {conditions.humidity}% </td>
              <td> {conditions.uvIndex} </td>
              <td> {formatDate(conditions.sunrise, 'p')} </td>
              <td> {formatDate(conditions.sunset, 'p')} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

