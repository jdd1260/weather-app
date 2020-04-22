import React from 'react';
import { render, getByAltText, getByText, fireEvent } from '@testing-library/react';

import HourlyWeather from '.';

describe('HourlyWeather', () => {
  const forecast = [
    {
      temperature: 47.3,
      description: 'cloudy',
      icon: 'http://website.com/icon.png/',
      date: new Date(2020, 6, 4, 10),
    },
    {
      temperature: 47.8,
      description: 'sunny',
      icon: 'http://website.com/icon2.png/',
      date: new Date(2020, 6, 4, 11),
    },
    {
      temperature: 50.3,
      description: 'sunny',
      icon: 'http://website.com/icon3.png/',
      date: new Date(2020, 6, 4, 12),
    },
  ];

  it('should display formatted hourly forecast', () => {
    const { queryAllByTestId } = render(<HourlyWeather forecast={forecast} />);
   
    const hourRows = queryAllByTestId(/hour-\d/);
    expect(hourRows.length).toEqual(3);

    const hour1 = hourRows[0];
    getByText(hour1, 'Sat 10:00 AM')
    getByText(hour1, '47° F')
    getByText(hour1, 'cloudy');
    const icon = getByAltText(hour1, 'cloudy', { selector: 'img' });
    expect(icon.src).toEqual(forecast[0].icon);
    
    const hour2 = hourRows[1];
    getByText(hour2, 'Sat 11:00 AM')
    getByText(hour2, '48° F')
    getByText(hour2, 'sunny');
    const icon2 = getByAltText(hour2, 'sunny', { selector: 'img' });
    expect(icon2.src).toEqual(forecast[1].icon);

    const hour3 = hourRows[2];
    getByText(hour3, 'Sat 12:00 PM')
    getByText(hour3, '50° F')
    getByText(hour3, 'sunny');
    const icon3 = getByAltText(hour3, 'sunny', { selector: 'img' });
    expect(icon3.src).toEqual(forecast[2].icon);
  });
});

