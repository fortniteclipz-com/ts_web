import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { NotificationManager } from 'react-notifications';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';

import Forgot from '../../components/account/forgot';
import Login from '../../components/account/login';
import Profile from '../../components/account/profile';
import Register from '../../components/account/register';
import Reset from '../../components/account/reset';

import auth from '../../services/auth';

import './styles.css'

class Account extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {
            referrer: (props.lastLocation || {}).pathname || '/watch',
        };
    }

    async onLogin(email, password) {
        // console.log("Account | onLogin");
        try {
            await auth.clear();
            await auth.set(email, password);
            window.location.replace(this.state.referrer);
        } catch (e) {
            console.log("Account | onLogin | e", e);
            const eStr = typeof(e) === 'object' ? e.message : e;
            NotificationManager.error(eStr, "Login Error");
        }
    }

    async onLogout() {
        // console.log("Account | onLogout");
        try {
            await auth.clear();
            window.location.replace('/');
        } catch (e) {
            console.log("Account | onLogout | e", e);
            const eStr = typeof(e) === 'object' ? e.message : e;
            NotificationManager.error(eStr, "Logout Error");
        }
    }

    async onRegister(email, password, passwordConfirm) {
        // console.log("Account | onRegister");
        if (password !== passwordConfirm) {
            NotificationManager.error("Passwords do not match", "Create Account Error");
            return;
        }
        try {
            await auth.clear();
            await Auth.signUp({
                username: email,
                password: password,
            });
            await auth.set(email, password);
            window.location.replace(this.state.referrer);
        } catch (e) {
            console.log("Account | onRegister | e", e);
            const eStr = typeof(e) === 'object' ? e.message : e;
            NotificationManager.error(eStr, "Create Account Error");
        }
    }

    async onForgot(email) {
        // console.log("Account | onForgot");
        try {
            await Auth.forgotPassword(email);
            this.props.history.push({
                pathname: '/account/reset',
                state: {email: email}
            });
        } catch (e) {
            console.log("Account | onForgot | e", e);
            const eStr = typeof(e) === 'object' ? e.message : e;
            NotificationManager.error(eStr, "Recover Password Error");
        }
    }

    async onReset(email, resetCode, password, passwordConfirm) {
        // console.log("Account | onReset");
        try {
            await Auth.forgotPasswordSubmit(email, resetCode, password);
            await auth.clear();
            await auth.set(email, password);
            window.location.replace(this.state.referrer);
        } catch (e) {
            console.log("Account | onReset | e", e);
            const eStr = typeof(e) === 'object' ? e.message : e;
            NotificationManager.error(eStr, "Reset Password Error");
        }
    }

    render() {
        return (
            <div className='account'>
                <Switch>
                    <Route
                        path='/account/login'
                        render={(props) =>
                            <Login {...props} onLogin={this.onLogin} />
                        }
                    />
                    <Route
                        path='/account/register'
                        render={(props) =>
                            <Register {...props} onRegister={this.onRegister} />
                        }
                    />
                    <Route
                        path='/account/forgot'
                        render={(props) =>
                            <Forgot {...props} onForgot={this.onForgot} />
                        }
                    />
                    <Route
                        path='/account/reset'
                        render={(props) =>
                            <Reset {...props} onReset={this.onReset} />
                        }
                    />
                    <Route
                        path='/account/profile'
                        render={(props) =>
                            <Profile {...props} onLogout={this.onLogout} />
                        }
                    />
                    <Redirect to='/account/register' />
                </Switch>
            </div>
        );
    }
};

export default withLastLocation(Account);
