import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Reset(props) {
    const email = (props.location.state || {}).email;
    const onSubmit = function(event) {
        event.preventDefault();
        const $form = event.target;
        const email = $form.querySelector('input[data-reset--email]').value;
        const resetCode = $form.querySelector('input[data-reset--reset-code]').value;
        const password = $form.querySelector('input[data-reset--password]').value;
        const passwordConfirm = $form.querySelector('input[data-reset--password-confirm]').value;
        props.onReset(email, resetCode, password, passwordConfirm);
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={onSubmit}>
                <FormGroup controlId='reset__email' bsSize='large'>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        data-reset--email
                        type='text'
                        autoComplete='email'
                        placeholder='Email'
                        defaultValue={email}
                    />
                </FormGroup>
                <FormGroup controlId='reset__reset-code' bsSize='large'>
                    <ControlLabel>Password Reset Code</ControlLabel>
                    <FormControl
                        data-reset--reset-code
                        type='text'
                        placeholder='Password Reset Code'
                    />
                </FormGroup>
                <FormGroup controlId='reset__password' bsSize='large'>
                    <ControlLabel>New Password</ControlLabel>
                    <FormControl
                        data-reset--password
                        type='password'
                        autoComplete='new-password'
                        placeholder='New Password'
                    />
                </FormGroup>
                <FormGroup controlId='reset__password-confirm' bsSize='large'>
                    <ControlLabel>Confirm New Password</ControlLabel>
                    <FormControl
                        data-reset--password-confirm
                        type='password'
                        autoComplete='new-password'
                        placeholder='Confirm New Password'
                    />
                    </FormGroup>
                <Button
                    type='submit'
                    bsStyle='primary'
                    bsSize='large'
                    block
                    data-ga={window.gaData({
                        category: 'Account',
                        action: 'click',
                        label: 'Reset Password',
                    })}
                >
                    Reset Password
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
