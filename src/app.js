import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/shared/app_nav'
import Select from './pages/select'
import Create from './pages/create'

export default function App() {
    return (
        <BrowserRouter>
            <div class="app">
                <Navbar />
                <div class="app-container">
                    <Switch>
                        <Route path='/create/:stream_id' component={Create} />
                        <Route path='/create' component={Select} />
                        <Redirect to='/create' />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};
