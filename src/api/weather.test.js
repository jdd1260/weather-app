import axios from 'axios';
import * as dateFns from 'date-fns';
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
    })
  });
});