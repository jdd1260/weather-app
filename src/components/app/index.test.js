import React from 'react';

import { renderWithRouter } from '../component-test-utils';

import App from '.';

describe('App', () => {
  it('should default the user to the search page', () => {
    const { getByText } = renderWithRouter(<App />);
    const searchButton = getByText(/search/i, { selector: 'button' });
    expect(searchButton).toBeInTheDocument();
  });
})

