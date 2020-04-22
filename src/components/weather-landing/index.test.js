import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '../component-test-utils';

import App from '../app';
import * as weatherApi from '../../api/weather';

describe('Weather Landing page', () => {
  describe('With weather results found', () => {
    let getWeatherSpy;
    const date = new Date(2020, 6, 4, 10,27,44,800);
    const conditions = {
      current: {
        date,
        temperature: 47
      },
      hourly: [{ temperature: 50, date }],
      daily: [{ max: 53, date, sunrise: date, sunset: date }]
    };
  
    beforeEach(() => {
      getWeatherSpy = jest.spyOn(weatherApi, 'getWeather').mockReturnValue(Promise.resolve(conditions));
    });
  
    afterEach(() => getWeatherSpy.mockRestore());
  
    it('should get and display weather, defaulting to current', async () => {
      const { findByText, queryByText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100?name=Place'});
      await findByText('Place at 10:27 AM Local Time on July 4, 2020');
      expect(queryByText(/47°/)).toBeInTheDocument();

      expect(getWeatherSpy).toHaveBeenCalledWith({ lat: '47', lon: '-100' }, 'imperial');
    }); 
  
    it('should get and display hourly forecast after clicking on that tab', async () => {
      const { findByText, queryByText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100?name=Place'});
      await findByText('Place at 10:27 AM Local Time on July 4, 2020');

      expect(queryByText(/50°/)).not.toBeInTheDocument();
      fireEvent.click(queryByText(/48 Hour/i));
      expect(queryByText(/50°/)).toBeInTheDocument();

      expect(getWeatherSpy).toHaveBeenCalledTimes(1);
    }); 

    it('should get and display daily forecast after clicking on that tab', async () => {
      const { findByText, queryByText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100?name=Place'});
      await findByText('Place at 10:27 AM Local Time on July 4, 2020');

      expect(queryByText(/53°/)).not.toBeInTheDocument();
      fireEvent.click(queryByText(/7 Day/i));
      expect(queryByText(/53°/)).toBeInTheDocument();

      expect(getWeatherSpy).toHaveBeenCalledTimes(1);
    }); 
  
    it('should display coordinates if name not provided in query string', async () => {
      const { findByText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100'});
      await findByText('Latitude 47, Longitude -100 at 10:27 AM Local Time on July 4, 2020');
      expect(getWeatherSpy).toHaveBeenCalledWith({ lat: '47', lon: '-100' }, 'imperial');
    }); 
  
    it('should display weather in Fahrenheit by default', async () => {
      const { findByText, queryAllByText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100?name=Place'});
      const imperialButton = await findByText((_, element) => element.textContent === 'F' && element.className.includes('MuiButtonGroup-groupedOutlinedSecondary'));
      const metricButton = await findByText((_, element) => element.textContent === 'C' && element.className.includes('MuiButtonGroup-groupedOutlinedSecondary'));
      expect(imperialButton.className).toContain('MuiButton-containedSecondary');
      expect(metricButton.className).not.toContain('MuiButton-containedSecondary');
      expect(queryAllByText(/° F/).length).toBeGreaterThan(0);
      expect(queryAllByText(/° C/).length).toEqual(0);
    }); 
  
    it('should support using Celsius', async () => {
      const { findByText, queryAllByText } = renderWithRouter(<App />, { route: '/locations/lat/47/lon/-100?name=Place'});
      let imperialButton = await findByText((_, element) => element.textContent === 'F' && element.className.includes('MuiButtonGroup-groupedOutlinedSecondary'));
      let metricButton = await findByText((_, element) => element.textContent === 'C' && element.className.includes('MuiButtonGroup-groupedOutlinedSecondary'));
      expect(imperialButton.className).toContain('MuiButton-containedSecondary');
      expect(metricButton.className).not.toContain('MuiButton-containedSecondary');
      
      fireEvent.click(metricButton);
      imperialButton = await findByText((_, element) => element.textContent === 'F' && element.className.includes('MuiButtonGroup-groupedOutlinedSecondary'));
       metricButton = await findByText((_, element) => element.textContent === 'C' && element.className.includes('MuiButtonGroup-groupedOutlinedSecondary'));
      expect(imperialButton.className).not.toContain('MuiButton-containedSecondary');
      expect(metricButton.className).toContain('MuiButton-containedSecondary');
      expect(queryAllByText(/° F/).length).toEqual(0);
      expect(queryAllByText(/° C/).length).toBeGreaterThan(0);
    }); 
  });
});

