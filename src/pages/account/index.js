import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';

import Forgot from '../../components/account/forgot';
import Login from '../../components/account/login';
import Logout from '../../components/account/logout';
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

    componentDidMount() {
        console.log("Account | componentDidMount");
    }

    async onLogin(email, password) {
        console.log("Account | onLogin");
        console.log("email", email);
        console.log("password", password);
        try {
            await auth.clear();
            await auth.set(email, password);
            window.location.replace(this.state.referrer);
        } catch (e) {
            console.log("Account | onLogin | e", e);
        }
    }

    async onLogout() {
        console.log("Account | onLogout");
        try {
            await auth.clear();
        } catch (e) {}
        window.location.replace('/');
    }

    async onRegister(email, password, passwordConfirm) {
        console.log("Account | onRegister");
        console.log("email", email);
        console.log("password", password);
        console.log("passwordConfirm", passwordConfirm);
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
        }
    }

    async onForgot(email) {
        console.log("Account | onForgot");
        console.log("email", email);
        try {
            // await Auth.forgotPassword(email);
            this.props.history.push({
                pathname: '/account/reset',
                state: {email: email}
            });
        } catch (e) {
            console.log("Account | onForgot | e", e);
        }
    }

    async onReset(email, resetCode, password, passwordConfirm) {
        console.log("Account | onReset");
        console.log("email", email);
        console.log("resetCode", resetCode);
        console.log("password", password);
        console.log("passwordConfirm", passwordConfirm);

        try {
            await Auth.forgotPasswordSubmit(email, resetCode, password);
            await auth.clear();
            await auth.set(email, password);
            window.location.replace(this.state.referrer);
        } catch (e) {
            console.log("Account | onReset | e", e);
        }
    }

    render() {
        console.log("Account | render | this.state", this.state);
        return (
            <div className='account'>
                <ButtonGroup justified>
                    <Button componentClass={Link} to='/account/login'>Login</Button>
                    <Button componentClass={Link} to='/account/register'>Register</Button>
                    <Button componentClass={Link} to='/account/forgot'>Forgot</Button>
                    <Button componentClass={Link} to='/account/logout'>Logout</Button>
                </ButtonGroup>
                <div className='account__view'>
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
                            path='/account/logout'
                            render={(props) =>
                                <Logout {...props} onLogout={this.onLogout} />
                            }
                        />
                        <Redirect to='/account/register' />
                    </Switch>
                </div>
                <div>{auth.user ? auth.user.username : "Unauthenticated"}</div>
            </div>
        );
    }
};

export default withLastLocation(Account);
