import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export default function Login(props) {
    const onSubmit = function(event) {
        event.preventDefault();
        const $form = event.target;
        const email = $form.querySelector('input[data-login--email]').value;
        const password = $form.querySelector('input[data-login--password]').value;
        props.onLogin(email, password);
    };

    return (
        <div className='login'>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <FormGroup controlId='login__email' bsSize='large'>
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        data-login--email
                        type='text'
                        placeholder='Email'
                        defaultValue='sachinahj@gmail.com'
                    />
                </FormGroup>
                <FormGroup controlId='login__password' bsSize='large'>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        data-login--password
                        type='password'
                        placeholder='Password'
                        defaultValue='password'
                    />
                </FormGroup>
                <Button
                    type='submit'
                    bsStyle='primary'
                >
                    Login
                </Button>
            </form>
        </div>
    );
};
