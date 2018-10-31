import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export default function Login(props) {
    const onSubmit = function(event) {
        event.preventDefault();
        const $form = event.target;
        const username = $form.querySelector('input[data-login--username]').value;
        const password = $form.querySelector('input[data-login--password]').value;
        props.onLogin(username, password);
    };

    return (
        <div className='login'>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <FormGroup controlId='login__username'>
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        data-login--username
                        type='text'
                        placeholder='Username'
                    />
                </FormGroup>
                <FormGroup controlId='login__password'>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        data-login--password
                        type='password'
                        placeholder='Password'
                    />
                </FormGroup>
                <Button
                    data-login--button
                    type='submit'
                    bsStyle='primary'
                >
                    Login
                </Button>
            </form>
        </div>
    );
};
