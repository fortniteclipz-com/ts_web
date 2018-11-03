import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export default function Forgot(props) {

    const onSubmitForgotPassword = function(event) {
        event.preventDefault();
        const $form = event.target;
        const email = $form.querySelector('input[data-forgot--email]').value;
        props.onForgotPassword(email);
    };

    const forgotPasswordView = (
        <form onSubmit={onSubmitForgotPassword}>
            <FormGroup controlId='forgot__email' bsSize='large'>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                    data-forgot--email
                    type='text'
                    placeholder='Email'
                    defaultValue='sachinahj@gmail.com'
                />
            </FormGroup>
            <Button
                type='submit'
                bsStyle='primary'
            >
                Forgot
            </Button>
        </form>
    );

    const onSubmitResetPassword = function(event) {
        event.preventDefault();
        const $form = event.target;
        const email = $form.querySelector('input[data-forgot--email]').value;
        const confirmationCode = $form.querySelector('input[data-forgot--confirmation-code]').value;
        const password = $form.querySelector('input[data-forgot--password]').value;
        props.onResetPassword(email, confirmationCode, password);
    };

    const resetPasswordView = (
        <form onSubmit={onSubmitResetPassword}>
            <FormGroup controlId='forgot__email' bsSize='large'>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                    data-forgot--email
                    type='text'
                    placeholder='Email'
                    defaultValue='sachinahj@gmail.com'
                />
            </FormGroup>
            <FormGroup controlId='forgot__confirmation-code' bsSize='large'>
                <ControlLabel>Cofirmation Code</ControlLabel>
                <FormControl
                    data-forgot--confirmation-code
                    type='text'
                    placeholder='Confirmation Code'
                    defaultValue=''
                />
            </FormGroup>
            <FormGroup controlId='forgot__password' bsSize='large'>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                    data-forgot--password
                    type='password'
                    placeholder='Password'
                    defaultValue='password'
                />
            </FormGroup>
            <Button
                type='submit'
                bsStyle='primary'
            >
                Reset Password
            </Button>
        </form>
    );

    let view = forgotPasswordView;
    if (props.view === 'reset') {
        view = resetPasswordView;
    }

    return (
        <div className='forgot'>
            <h2>Forgot</h2>
            {view}
        </div>
    );
};
