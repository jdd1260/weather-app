import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '../component-test-utils';

import App from '../app';
import * as weatherApi from '../../api/weather';

describe('CurrentWeather page', () => {
  describe('With weather results found', () => {
    let getWeatherSpy;
    const conditions = {
      current: {
        date: new Date(2020, 6, 4, 10,27,44,800)
      }
    };
  
    beforeEach(() => {
      getWeatherSpy = jest.spyOn(weatherApi, 'getWeather').mockReturnValue(Promise.resolve(conditions));
    });
  
    afterEach(() => getWeatherSpy.mockRestore());
  
    it('should get and display formatted current weather for location from the URL', async () => {
      const { findByText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100?name=Place'});
      await findByText('Weather for Place at 10:27 AM Local Time on July 4, 2020');
      expect(getWeatherSpy).toHaveBeenCalledWith({ lat: '47', lon: '-100' }, 'imperial');
    }); 
  
    it('should display coordinates if name not provided in query string', async () => {
      const { findByText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100'});
      await findByText('Weather for Latitude 47, Longitude -100 at 10:27 AM Local Time on July 4, 2020');
      expect(getWeatherSpy).toHaveBeenCalledWith({ lat: '47', lon: '-100' }, 'imperial');
    }); 
  
    it('should display weather in Fahrenheit by default', async () => {
      const { findByText, queryAllByText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100?name=Place'});
      const imperialButton = await findByText('F', { selector: 'button' });
      expect(imperialButton.className).toEqual('selected');
      expect(queryAllByText(/° F/).length).toBeGreaterThan(0);
      expect(queryAllByText(/° C/).length).toEqual(0);
    }); 
  
    it('should support using Celsius', async () => {
      const { findByText, queryAllByText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100?name=Place'});
      let metricButton = await findByText('C', { selector: 'button' });
      fireEvent.click(metricButton);
      metricButton = await findByText('C', { selector: 'button' });
      expect(metricButton.className).toEqual('selected');
      expect(queryAllByText(/° C/).length).toBeGreaterThan(0);
      expect(queryAllByText(/° F/).length).toEqual(0);
    }); 
  });
});

