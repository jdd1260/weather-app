import React from 'react';

import { renderWithRouter } from '../component-test-utils';

import App from '.';

describe('App', () => {
  it('should default the user to the search page', () => {
    const { getByText } = renderWithRouter(<App />);
    const searchButton = getByText(/search/i, { selector: 'button' });
    expect(searchButton).toBeInTheDocument();
  });
  it('should take the user to the current weather page for input coordinates', async () => {
    const { findByText, history } = renderWithRouter(<App />);
    history.push('/locations/lat/47.2495798/lon/-122.4398746');
    const titleText = await findByText(/Weather for Tacoma/i);
    expect(titleText).toBeInTheDocument();
  });
})

