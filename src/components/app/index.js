import React from 'react';

import { Switch, Route } from "react-router-dom";

import Search from '../search';
import WeatherLanding from '../weather-landing';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={'/locations/lat/:lat/lon/:lon'} component={WeatherLanding} />
        <Route path={'/'} component={Search} />
      </Switch>
    </div>
  );
}

export default App;
