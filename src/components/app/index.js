import React from 'react';

import { Switch, Route } from "react-router-dom";

import Search from '../search';
import WeatherLanding from '../weather-landing';

import './index.scss';

function App() {
  return (
    <div id="App">
      <h1 className="header">
        Weather by Joel
      </h1>
      <Switch>
        <Route path={'/locations/lat/:lat/lon/:lon'} component={WeatherLanding} />
        <Route path={'/'} component={Search} />
      </Switch>
    </div>
  );
}

export default App;
