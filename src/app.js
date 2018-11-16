import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import Nav from './components/shared/nav'
import GAListener from './components/shared/ga-listener'

import Account from './pages/account'
import Create from './pages/create'
import Select from './pages/select'
import Watch from './pages/watch'

import 'react-notifications/lib/notifications.css';

export default function App() {
    return (
        <BrowserRouter>
            <LastLocationProvider>
                <GAListener>
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
                        <NotificationContainer/>
                    </div>
                </GAListener>
            </LastLocationProvider>
        </BrowserRouter>
    ) ;
};
