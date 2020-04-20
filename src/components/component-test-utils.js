import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

export const renderWithRouter = (component, {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => ({
  ...render(<Router history={history}> { component } </Router>),
  history
});