import React from 'react';

import { Switch, Route } from "react-router-dom";

import Search from '../search';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={'/'} component={Search} />
      </Switch>
    </div>
  );
}

export default App;
