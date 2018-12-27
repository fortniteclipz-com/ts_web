import React from 'react';
import autoBind from 'react-autobind';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import GAListener from './components/shared/ga-listener'
import Modal from './components/shared/modal'
import Nav from './components/shared/nav'

import Account from './pages/account'
import Create from './pages/create'
import Select from './pages/select'
import Watch from './pages/watch'

import modal from './services/modal'

import 'react-notifications/lib/notifications.css';

export default class App extends React.Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {
            modal: null,
        };
    }

    componentDidMount() {
        // console.log("App | componentDidMount");
        setTimeout(() => {
            modal.init(this.modal);
        }, 1000);
    }

    render() {
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
                            <Modal ref={m => this.modal = m} />
                            <NotificationContainer />
                        </div>
                    </GAListener>
                </LastLocationProvider>
            </BrowserRouter>
        );
    }
};
