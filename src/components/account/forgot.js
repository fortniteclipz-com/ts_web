import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Forgot(props) {
    const onSubmit = function(event) {
        event.preventDefault();
        const $form = event.target;
        const email = $form.querySelector('input[data-forgot--email]').value;
        props.onForgot(email);
    };

    return (
        <div>
            <h2>Recover Password</h2>
            <form onSubmit={onSubmit}>
                <FormGroup controlId='forgot__email' bsSize='large'>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        data-forgot--email
                        type='text'
                        autoComplete='email'
                        placeholder='Email'
                    />
                </FormGroup>
                <Button
                    type='submit'
                    bsStyle='primary'
                    bsSize='large'
                    block
                    data-ga={window.gaData({
                        category: 'Account',
                        action: 'Recover Password',
                    })}
                >
                    Recover Password
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
