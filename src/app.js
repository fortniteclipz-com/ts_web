import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Nav from './components/shared/nav'

import Account from './pages/account'
import Create from './pages/create'
import Select from './pages/select'
import Watch from './pages/watch'

import auth from './services/auth';

export default class App extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        auth.callback = this.authCallback
    }

    componentDidMount() {
        auth.check();
    }

    authCallback() {
        this.forceUpdate();
    }

    render() {
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
                            <Redirect to='/create' />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};
