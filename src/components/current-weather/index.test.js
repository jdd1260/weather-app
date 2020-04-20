import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '../component-test-utils';

import App from '../app';
import * as weatherApi from '../../api/weather';

describe('CurrentWeather page', () => {
  describe('With weather results found', () => {
    let getCurrentWeatherSpy;
    const conditions = {
      name: 'Place',
      temperature: 50.65,
      description: 'nice',
      feelsLike: 50.3,
      humidity: 26,
      wind: 5.7,
      icon: 'http://website.com/icon.png/',
      date: new Date(2020, 6, 4, 10,27,44,800)
    };
  
    beforeEach(() => {
      getCurrentWeatherSpy = jest.spyOn(weatherApi, 'getCurrentWeather').mockReturnValue(Promise.resolve(conditions));
    });
  
    afterEach(() => getCurrentWeatherSpy.mockRestore());
  
    it('should get and display formatted current weather for coordinates from the URL', async () => {
      const { findByText, getByAltText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100'});
      const imperialButton = await findByText('F', { selector: 'button' });
      expect(imperialButton.className).toEqual('selected');
      await findByText('Weather for Place at 10:27 AM Local Time on July 4, 2020');
      await findByText('51° F');
      await findByText('Feels Like: 50° F');
      await findByText('Humidity: 26%');
      await findByText('Wind Speed: 5.7 mph');
      const icon = getByAltText('nice', { selector: 'img' });
      expect(icon.src).toEqual(conditions.icon)
      expect(getCurrentWeatherSpy).toHaveBeenCalledWith({ lat: '47', lon: '-100' }, 'imperial');
    });
  
    it('should support selecting metric units', async () => {
      const { findByText, getByAltText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100'});
      let metricButton = await findByText('C', { selector: 'button' });
      fireEvent.click(metricButton);
      metricButton = await findByText('C', { selector: 'button' });
      expect(metricButton.className).toEqual('selected');

      await findByText('Weather for Place at 10:27 AM Local Time on July 4, 2020');
      await findByText('51° C');
      await findByText('Feels Like: 50° C');
      await findByText('Humidity: 26%');
      await findByText('Wind Speed: 5.7 m/s');
      const icon = getByAltText('nice', { selector: 'img' });
      expect(icon.src).toEqual(conditions.icon)
      expect(getCurrentWeatherSpy).toHaveBeenCalledWith({ lat: '47', lon: '-100' }, 'metric');
    });
  
   
  });
});

