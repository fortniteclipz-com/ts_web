import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/shared/app_nav'
import Create from './pages/create'
import Export from './pages/export'
import Select from './pages/select'

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <div className="app-container">
                    <Switch>
                        <Route path='/create/:stream_id' component={Create} />
                        <Route path='/create' component={Select} />
                        <Route path='/export' component={Export} />
                        <Redirect to='/create' />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};
