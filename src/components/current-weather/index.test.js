import React from 'react';
import { render } from '@testing-library/react';

import CurrentWeather from '.';

describe('CurrentWeather', () => {
  const conditions = {
    temperature: 50.65,
    description: 'nice',
    feelsLike: 50.3,
    humidity: 26,
    wind: 5.7,
    uvIndex: 8.8,
    icon: 'http://website.com/icon.png/',
  };

  it('should display formatted current weather for coordinates from the URL', async () => {
    const { getByText, getByAltText } = render(<CurrentWeather conditions={conditions} />);
    getByText('51° F');
    getByText('Feels Like: 50° F');
    getByText('Humidity: 26%');
    getByText('Wind Speed: 5.7 mph');
    getByText('UV Index: 8.8');
    getByText('nice');
    const icon = getByAltText('nice', { selector: 'img' });
    expect(icon.src).toEqual(conditions.icon)
  });
});

