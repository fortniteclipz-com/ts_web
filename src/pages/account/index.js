import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import Confirm from '../../components/account/confirm'
import Forgot from '../../components/account/forgot'
import Login from '../../components/account/login'
import Logout from '../../components/account/logout'
import Register from '../../components/account/register'

import './styles.css'

export default class Account extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {};
    }

    componentDidMount() {
        console.log("Account | componentDidMount");
    }

    onLogin(username, password) {
        console.log("Account | onLogin");
        console.log("username", username);
        console.log("password", password);
    }

    onRegister(username, password, passwordConfirm) {
        console.log("Account | onRegister");
        console.log("username", username);
        console.log("password", password);
        console.log("passwordConfirm", passwordConfirm);
    }

    render() {
        return (
            <div className='account'>
                <h1>Account</h1>
                <ButtonGroup>
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
                        <Route path='/account/logout' component={Logout} />
                        <Redirect to='/account/login' />
                    </Switch>
                </div>
            </div>
        );
    }
};
