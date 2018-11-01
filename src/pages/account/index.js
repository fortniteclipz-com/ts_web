import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import Confirm from '../../components/account/confirm';
import Forgot from '../../components/account/forgot';
import Login from '../../components/account/login';
import Logout from '../../components/account/logout';
import Register from '../../components/account/register';

import './styles.css'

export default class Account extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {
            user: null,
        };

        Auth
        .currentAuthenticatedUser()
        .then(async (user) => {
            console.log("user", user);
            this.setState({
                user: user,
            });
        })
        .catch(function (e) {
            console.log("e", e);
        });
    }

    componentDidMount() {
        console.log("Account | componentDidMount");
    }

    async onLogin(email, password) {
        console.log("Account | onLogin");
        console.log("email", email);
        console.log("password", password);

        try {
            var user = await Auth.signIn(email, password);
            console.log("user", user);
            this.setState({
                user: user,
            });
        } catch (e) {
            alert(e.message);
        }
    }

    async onLogout() {
        console.log("Account | onLogout");
        try {
            var user = await Auth.signOut();
            console.log("user", user);
            this.setState({
                user: null,
            });
        } catch (e) {
            alert(e.message);
        }
    }

    async onRegister(email, password, passwordConfirm) {
        console.log("Account | onRegister");
        console.log("email", email);
        console.log("password", password);
        console.log("passwordConfirm", passwordConfirm);
        try {
            await Auth.signUp({
                username: email,
                password: password,
            });
            const user = await Auth.signIn(email, password);
            console.log("user", user);
            this.setState({
                user: user,
            });
        } catch (e) {
            alert(e.message);
        }
    }

    render() {
        return (
            <div className='account'>
                <ButtonGroup justified>
                    <Button componentClass={Link} to='/account/login'>Login</Button>
                    <Button componentClass={Link} to='/account/register'>Register</Button>
                    <Button componentClass={Link} to='/account/confirm'>Confirm</Button>
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
                        <Route path='/account/confirm' component={Confirm} />
                        <Route path='/account/forgot' component={Forgot} />
                        <Route
                            path='/account/logout'
                            render={(props) =>
                                <Logout {...props} onLogout={this.onLogout} />
                            }
                        />
                        <Redirect to='/account/login' />
                    </Switch>
                </div>
                <div>{this.state.user && this.state.user.username}</div>
            </div>
        );
    }
};
