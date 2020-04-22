import React from 'react';

import { Switch, Route, Link } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Search from '../search';
import WeatherLanding from '../weather-landing';

import './index.scss';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'monospace'
    ].join(','),
  },
});

function App() {
  return (
    <div id="App">
      <ThemeProvider theme={theme}>
        <h1 className="header">
          <Link to="/">Weather by Joel</Link>
        </h1>
        <Switch>
          <Route path={'/locations/lat/:lat/lon/:lon'} component={WeatherLanding} />
          <Route path={'/'} component={Search} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
