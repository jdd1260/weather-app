import React from 'react';
import formatDate from 'date-fns/format';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { displayTemp } from '../utils';

export default function DailyWeather({ forecast, units ='imperial' }) {
  if (!forecast) return null;
  return (
    <TableContainer id="DailyWeather" className="weather-table-container">
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell> Date </TableCell>
            <TableCell/>
            <TableCell>Description</TableCell>
            <TableCell>High/Low</TableCell>
            <TableCell>Humidity</TableCell>
            <TableCell>UV Index</TableCell>
            <TableCell>Sunrise/Sunset</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { forecast.map((conditions, index) => (
            <TableRow key={conditions.date} data-testid={'day-'+index}>
              <TableCell> {formatDate(conditions.date, 'eee P')}</TableCell>
              <TableCell>
                <img src={conditions.icon} alt={conditions.description} className="weather-icon" />
              </TableCell>
              <TableCell className="weather-description">{ conditions.description }</TableCell>
              <TableCell> 
                {displayTemp(conditions.max, units)} / {displayTemp(conditions.min, units)}
              </TableCell>
              <TableCell> {conditions.humidity}% </TableCell>
              <TableCell> {conditions.uvIndex} </TableCell>
              <TableCell> {formatDate(conditions.sunrise, 'p')} / {formatDate(conditions.sunset, 'p')} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

