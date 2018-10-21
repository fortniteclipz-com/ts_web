import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Select from './pages/select'
import Create from './pages/create'

export default function App() {
    return (
        <BrowserRouter>
          <Switch>
              <Route path='/select' component={Select} />
              <Route path='/create/:stream_id' component={Create} />
              <Redirect to='/select' />
          </Switch>
        </BrowserRouter>
    );
};
