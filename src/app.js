import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Nav from './components/shared/nav'

import Account from './pages/account'
import Create from './pages/create'
import Select from './pages/select'
import Watch from './pages/watch'

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Nav />
                <div className="app-container">
                    <Switch>
                        <Route path='/account' component={Account} />
                        <Route path='/create/:streamId' component={Create} />
                        <Route path='/create' component={Select} />
                        <Route path='/watch' component={Watch} />
                        <Redirect to='/watch' />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    ) ;
};
