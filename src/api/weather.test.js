import axios from 'axios';
import * as dateFns from 'date-fns';
import * as _ from 'lodash';

import * as weatherApi from './weather';

describe('Weather API', () => {
  describe('getWeather', () => {
    let result;
    beforeAll(async () => {
      result = await weatherApi.getWeather({ lat: 47.2495798, lon: -122.4398746 });
    });

    describe('current weather', () => {
      let current;
      beforeAll(() => current = result.current);

      it('should return data for provided location in expected format', () => {
        expect(current).toEqual({
          temperature: expect.any(Number),
          description: expect.any(String),
          feelsLike: expect.any(Number),
          humidity: expect.any(Number),
          wind: expect.any(Number),
          uvIndex: expect.any(Number),
          date: expect.any(Date),
          icon: expect.any(String),
        });
      });
  
      it('should provide a working icon URL', async () => {
        const iconData = await axios.get(current.icon);
        expect(iconData).toBeTruthy();
      });
  
      it('should provide a date that is recent', () => {
        const isFromPastHour = dateFns.isWithinInterval(
          current.date,
          {
            start: dateFns.sub(new Date(), { hours: 1 }),
            end: new Date()
          }
        );
        expect(isFromPastHour).toBe(true);
      })
    });
    
    describe('daily weather', () => {
      let daily;
      beforeAll(() => daily = result.daily);

      it('should return 7 days of forecasts + today', () => {
        expect(daily.length).toEqual(8);
      });

      it.each(_.times(8))('should format data correctly for day %#', (dayIndex) => {
        expect(daily[dayIndex]).toEqual({
          min: expect.any(Number),
          max: expect.any(Number),
          description: expect.any(String),
          humidity: expect.any(Number),
          uvIndex: expect.any(Number),
          icon: expect.any(String),
          date: expect.any(Date),
          sunrise: expect.any(Date),
          sunset: expect.any(Date),
        });
      });

      it('should have a final date that is for more than 6 days from now', () => {
        const lastDate = daily[7].date;
        const isMoreThan7DaysAway = dateFns.isAfter(lastDate, dateFns.addDays(new Date(), 6));
        expect(isMoreThan7DaysAway).toBe(true);
      });
    });
    describe('hourly weather', () => {
      let hourly;
      beforeAll(() => hourly = result.hourly);

      it('should return 48 hours of forecasts', () => {
        expect(hourly.length).toEqual(48);
      });

      it.each(_.times(48))('should format data correctly for hour %#', (hourIndex) => {
        expect(hourly[hourIndex]).toEqual({
          temperature: expect.any(Number),
          description: expect.any(String),
          icon: expect.any(String),
          date: expect.any(Date),
        });
      });

      it('should have a final date that is for more than 24 hours from now', () => {
        const lastDate = hourly[47].date;
        const isMoreThan24HoursAway = dateFns.isAfter(lastDate, dateFns.add(new Date(), { hours: 24 }));
        expect(isMoreThan24HoursAway).toBe(true);
      });
    });
  });
});