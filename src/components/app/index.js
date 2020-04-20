import React from 'react';

import { Switch, Route } from "react-router-dom";

import Search from '../search';
import CurrentWeather from '../current-weather';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={'/locations/lat/:lat/lon/:lon'} component={CurrentWeather} />
        <Route path={'/'} component={Search} />
      </Switch>
    </div>
  );
}

export default App;
