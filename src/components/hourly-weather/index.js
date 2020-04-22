import React from 'react';
import formatDate from 'date-fns/format';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { displayTemp } from '../utils';

export default function HourlyWeather({ forecast, units ='imperial' }) {  
  if (!forecast) return null;
  return (
    <TableContainer id="HourlyWeather" className="weather-table-container">
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell> Time </TableCell>
            <TableCell/>
            <TableCell>Description</TableCell>
            <TableCell>Temperature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { forecast.map((conditions, index) => (
            <TableRow key={conditions.date} data-testid={'hour-'+index}>
              <TableCell> { formatDate(conditions.date, 'eee p')} </TableCell>
              <TableCell>
                <img src={conditions.icon} alt={conditions.description} className="weather-icon" />
              </TableCell>
              <TableCell className="weather-description"> {conditions.description} </TableCell>
              <TableCell> {displayTemp(conditions.temperature, units)} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

