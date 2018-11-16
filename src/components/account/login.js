import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        data-login--email
                        type='text'
                        autoComplete='email'
                        placeholder='Email'
                        defaultValue='sachinahj@gmail.com'
                    />
                </FormGroup>
                <FormGroup controlId='login__password' bsSize='large' className='login__password'>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        data-login--password
                        type='password'
                        autoComplete='current-password'
                        placeholder='Password'
                        defaultValue='password'
                    />
                </FormGroup>
                <Link to='/account/forgot' className='login__forgot'>Forgot Password</Link>
                <Button
                    type='submit'
                    bsStyle='primary'
                    bsSize='large'
                    block
                >
                    Login
                </Button>
                <Button
                    type='submit'
                    bsStyle='default'
                    bsSize='large'
                    block
                    componentClass={Link}
                    to='/account/register'
                >
                    Create Account
                </Button>
            </form>
        </div>
    );
};
