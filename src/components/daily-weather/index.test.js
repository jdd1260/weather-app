import React from 'react';
import { render, getByText, getByAltText } from '@testing-library/react';

import DailyWeather from '.';

describe('DailyWeather', () => {
  const forecast = [
    {
      min: 47.3,
      max: 50.9,
      description: 'sunny',
      humidity: 50,
      uvIndex: 3.44,
      icon: 'http://website.com/icon.png/',
      date: new Date(2020, 6, 4),
      sunrise: new Date(2020, 6, 4, 8),
      sunset: new Date(2020, 6, 4, 20, 47),
    },
    {
      min: 47.8,
      max: 50.4,
      description: 'mostly sunny',
      humidity: 51.3,
      uvIndex: 3,
      icon: 'http://website.com/icon2.png/',
      date: new Date(2020, 6, 5),
      sunrise: new Date(2020, 6, 5, 8,1),
      sunset: new Date(2020, 6, 5, 20, 49),
    },
  ];

  it('should display formatted daily weather', () => {
    const { getAllByTestId } = render(<DailyWeather forecast={forecast} />);
    const dayRows = getAllByTestId(/day-\d/);
    expect(dayRows.length).toEqual(2);

    const day1 = dayRows[0];
    getByText(day1, '07/04/2020')
    getByText(day1, '51° F / 47° F')
    getByText(day1, '3.44');
    getByText(day1, '50%');
    getByText(day1, 'sunny');
    const icon = getByAltText(day1, 'sunny', { selector: 'img' });
    expect(icon.src).toEqual(forecast[0].icon);

    const day2 = dayRows[1];
    getByText(day2, '07/05/2020')
    getByText(day2, '50° F / 48° F')
    getByText(day2, '3');
    getByText(day2, '51.3%');
    getByText(day2, 'mostly sunny');
    const icon2 = getByAltText(day2, 'mostly sunny', { selector: 'img' });
    expect(icon2.src).toEqual(forecast[1].icon);
  });
});

