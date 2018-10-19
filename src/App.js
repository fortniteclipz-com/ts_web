import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Create from './components/Create/Create'
import View from './components/View/View'

import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <Switch>
                  <Route path="/create" component={Create} />
                  <Route path="/view" component={View} />
                  <Redirect to="/create" />
              </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
