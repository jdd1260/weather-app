import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '../component-test-utils';

import App from '../app';
import * as places from '../../api/places';

describe('Search page', () => {
  describe('With search results found', () => {
    let placeSearchSpy;
    const locations = [
      {
        name: 'Place 1',
        lat: 1,
        lon: 2
      },
      {
        name: 'Place 2',
        lat: -100,
        lon: -200
      }
    ];
  
    beforeEach(() => {
      placeSearchSpy = jest.spyOn(places, 'search').mockReturnValue(Promise.resolve(locations));
    });
  
    afterEach(() => placeSearchSpy.mockRestore());
  
    it('should allow user to enter a location search via a button, view results, and select correct city', async () => {
      const { getByPlaceholderText, getByText, findByText, history } = renderWithRouter(<App />);
      const input = getByPlaceholderText(/location/i);
      const button = getByText(/search/i);
  
      fireEvent.change(input, { target: { value: 'Place' }});
      fireEvent.click(button);
  
      const link1 = await findByText('Place 1');
  
      expect(placeSearchSpy).toHaveBeenCalledWith('Place');
  
      fireEvent.click(link1);
  
      expect(history.location.pathname).toEqual('/locations/lat/1/lon/2');
      expect(history.location.search).toEqual('?name=Place%201');
    });
  
    it('should allow user to enter a location search by hitting enter, view results, and select correct city', async () => {
      const { getByPlaceholderText, findByText, history } = renderWithRouter(<App />);
      const input = getByPlaceholderText(/location/i);
  
      fireEvent.change(input, { target: { value: 'Place' }});
      fireEvent.keyDown(input, {
        key: "Enter",
        keyCode: 13 
      });
  
      const link2 = await findByText('Place 2');
  
      expect(placeSearchSpy).toHaveBeenCalledWith('Place');
  
      fireEvent.click(link2);
      expect(history.location.pathname).toEqual('/locations/lat/-100/lon/-200');
      expect(history.location.search).toEqual('?name=Place%202');
    });
  });

  describe('With no matching search results', () => {
    let placeSearchSpy;
  
    beforeEach(() => {
      placeSearchSpy = jest.spyOn(places, 'search').mockReturnValue(Promise.resolve([]));
    });
  
    afterEach(() => placeSearchSpy.mockRestore());
  
    it('should show a message stating no results', async () => {
      const { getByPlaceholderText, findByText } = renderWithRouter(<App />);
      const input = getByPlaceholderText(/location/i);
  
      fireEvent.change(input, { target: { value: 'Place' }});
      fireEvent.keyDown(input, {
        key: "Enter",
        keyCode: 13 
      });
  
      await findByText(/there were no results matching your search text/i);
    });
  });

  describe('With an error finding search results', () => {
    let placeSearchSpy;
  
    beforeEach(() => {
      placeSearchSpy = jest.spyOn(places, 'search').mockReturnValue(Promise.reject('Error message'));
    });
  
    afterEach(() => placeSearchSpy.mockRestore());
  
    it('should show a generic error message without details', async () => {
      const { getByPlaceholderText, getByText, findByText, queryByText } = renderWithRouter(<App />);
      const input = getByPlaceholderText(/location/i);
      const button = getByText(/search/i);
  
      fireEvent.change(input, { target: { value: 'Place' }});
      fireEvent.click(button);
  
      await findByText(/there was an error/i);
      expect(queryByText(/error message/i)).not.toBeInTheDocument();
    });
  });



});

