import { findLocations } from './weather';

describe('Weather API', () => {
  describe('findLocations', () => {
    it('should return matching location with good details provided', async () => {
      const locations = await findLocations('Tacoma, WA');
      expect(locations.length).toBeGreaterThanOrEqual(1);
      expect(locations[0]).toEqual({
        id: '331423',
        name: 'Tacoma',
        country: 'United States',
        province: 'Washington'
      })
    });

    it('should return multiple matching locations with few details provided', async () => {
      const locations = await findLocations('Dublin');
      expect(locations.length).toBeGreaterThanOrEqual(10);
      locations.forEach(location => {
        expect(location).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          country: expect.any(String),
          province: expect.any(String),
        })
      })
    });
  })
})