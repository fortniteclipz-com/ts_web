import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Register(props) {
    const onSubmit = function(event) {
        event.preventDefault();
        const $form = event.target;
        const email = $form.querySelector('input[data-register--email]').value;
        const password = $form.querySelector('input[data-register--password]').value;
        const confirmPassword = $form.querySelector('input[data-register--password-confirm]').value;
        props.onRegister(email, password, confirmPassword);
    };

    return (
        <div className='register'>
            <h2>Create Account</h2>
            <form onSubmit={onSubmit}>
                <FormGroup controlId='register__email' bsSize='large'>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        data-register--email
                        type='text'
                        autoComplete='email'
                        placeholder='Email'
                        defaultValue='sachinahj@gmail.com'
                    />
                </FormGroup>
                <FormGroup controlId='register__password' bsSize='large'>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        data-register--password
                        type='password'
                        autoComplete='new-password'
                        placeholder='Password'
                        defaultValue='password'
                    />
                </FormGroup>
                <FormGroup controlId='register__password-confirm' bsSize='large'>
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        data-register--password-confirm
                        type='password'
                        autoComplete='new-password'
                        placeholder='Confirm Password'
                        defaultValue='password'
                    />
                </FormGroup>
                <Button
                    type='submit'
                    bsStyle='primary'
                    bsSize='large'
                    block
                >
                    Create Account
                </Button>
                <Button
                    type='submit'
                    bsStyle='default'
                    bsSize='large'
                    block
                    componentClass={Link}
                    to='/account/login'
                >
                    Login
                </Button>
            </form>
        </div>
    );
};
