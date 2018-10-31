import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export default function Register(props) {
    const onSubmit = function(event) {
        event.preventDefault();
        const $form = event.target;
        const username = $form.querySelector('input[data-register--username]').value;
        const password = $form.querySelector('input[data-register--password]').value;
        const confirmPassword = $form.querySelector('input[data-register--password-confirm]').value;
        props.onRegister(username, password, confirmPassword);
    };

    return (
        <div className='register'>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <FormGroup controlId='register__username'>
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        data-register--username
                        type='text'
                        placeholder='Username'
                    />
                </FormGroup>
                <FormGroup controlId='register__password'>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        data-register--password
                        type='password'
                        placeholder='Password'
                    />
                </FormGroup>
                <FormGroup controlId='register__password-confirm'>
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        data-register--password-confirm
                        type='password'
                        placeholder='Confirm Password'
                    />
                </FormGroup>
                <Button
                    data-register--button
                    type='submit'
                    bsStyle='primary'
                >
                    Register
                </Button>
            </form>
        </div>
    );
};
