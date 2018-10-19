import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Create from './pages/create'

const App = function () {
    return (
        <BrowserRouter>
          <Switch>
              <Route path="/create" component={Create} />
              <Redirect to="/create" />
          </Switch>
        </BrowserRouter>
    );
};

export default App;
