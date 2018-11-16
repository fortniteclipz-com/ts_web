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
        <div className='forgot'>
            <h2>Recover Password</h2>
            <form onSubmit={onSubmit}>
                <FormGroup controlId='forgot__email' bsSize='large'>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        data-forgot--email
                        type='text'
                        autoComplete='email'
                        placeholder='Email'
                        defaultValue='sachinahj@gmail.com'
                    />
                </FormGroup>
                <Button
                    type='submit'
                    bsStyle='primary'
                    bsSize='large'
                    block
                >
                    Recover
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
