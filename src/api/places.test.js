import * as places from './places';

describe('Places API', () => {
  describe('search', () => {
    it('should return multiple matching locations with few details provided', async () => {
      const locations = await places.search('Tacoma');
      expect(locations.length).toBeGreaterThanOrEqual(2);
      expect(locations[0]).toEqual({
        name: 'Tacoma, WA, USA',
        lat: 47.2495798,
        lon: -122.4398746
      })
      locations.forEach(location => {
        expect(location).toEqual({
          name: expect.any(String),
          lat: expect.any(Number),
          lon: expect.any(Number),
        })
      })
    });
  })
})