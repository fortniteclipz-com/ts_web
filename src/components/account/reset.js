import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

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
        <div className='reset'>
            <h2>Reset</h2>
            <form onSubmit={onSubmit}>
                <FormGroup controlId='reset__email' bsSize='large'>
                    <ControlLabel>Username</ControlLabel>
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
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        data-reset--password
                        type='password'
                        autoComplete='new-password'
                        placeholder='New Password'
                    />
                </FormGroup>
                <FormGroup controlId='reset__password-confirm' bsSize='large'>
                    <ControlLabel>Confirm Password</ControlLabel>
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
                >
                    Reset Password
                </Button>
            </form>
        </div>
    );
};