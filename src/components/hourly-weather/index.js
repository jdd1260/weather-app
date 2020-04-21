import React from 'react';
import formatDate from 'date-fns/format';

import { displayTemp } from '../utils';

export default function HourlyWeather({ forecast, units ='imperial' }) {  
  if (!forecast) return null;
  return (
    <div id="HourlyWeather">
      <h1> 48 Hour Forecast </h1>
      <table>
        <thead>
          <tr>
            <td> Time </td>
            <td/>
            <td> Description </td>
            <td> Temperature </td>
          </tr>
        </thead>
        <tbody>
          {forecast.map((conditions, index) => (
            <tr key={conditions.date} data-testid={'hour-'+index}>
              <td> { formatDate(conditions.date, 'p')} </td>
              <td><img src={conditions.icon} alt={conditions.description} /></td>
              <td> {conditions.description} </td>
              <td> {displayTemp(conditions.temperature, units)} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

