import React from 'react';
import { Button } from 'react-bootstrap';

export default function Logout(props) {
    const onSubmit = function(event) {
        event.preventDefault();
        props.onLogout();
    };

    return (
        <div className='logout'>
            <h2>Logout</h2>
            <form onSubmit={onSubmit}>
                <Button
                    data-login--button
                    type='submit'
                    bsStyle='primary'
                >
                    Logout
                </Button>
            </form>
        </div>
    );
};
