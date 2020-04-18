import axios from 'axios';
import * as dateFns from 'date-fns';
import * as weatherApi from './weather';

describe('Weather API', () => {
  describe('getCurrentWeather', () => {
    let conditions;
    beforeAll(async () => {
      conditions = await weatherApi.getCurrentWeather({ lat: 47.2495798, lon: -122.4398746 });
    });

    it('should return data for provided location in expected format', () => {
      expect(conditions).toEqual({
        name: 'Tacoma',
        temperature: expect.any(Number),
        description: expect.any(String),
        feelsLike: expect.any(Number),
        humidity: expect.any(Number),
        wind: expect.any(Number),
        date: expect.any(Date),
        icon: expect.any(String),
      });
    });

    it('should provide a working icon URL', async () => {
      const iconData = await axios.get(conditions.icon);
      expect(iconData).toBeTruthy();
    });

    it('should provide a date that makes sense', () => {
      const isBetweenYesterdayAndTomorrow = dateFns.isWithinInterval(
        conditions.date,
        {
          start: dateFns.startOfYesterday(),
          end: dateFns.endOfTomorrow()
        }
      );
      expect(isBetweenYesterdayAndTomorrow).toBe(true);
    })
  })
})