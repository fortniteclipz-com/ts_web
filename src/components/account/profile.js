import React from 'react';
import { Button } from 'react-bootstrap';

import auth from '../../services/auth'

export default function Profile(props) {
    const onSubmit = function(event) {
        event.preventDefault();
        props.onLogout();
    };

    window.user = auth.user;

    return (
        <div>
            <h2>Profile</h2>
            <h4 className='account__profile-email'>{auth.user.attributes.email}</h4>
            <form className='account__logout' onSubmit={onSubmit}>
                <Button
                    type='submit'
                    bsStyle='primary'
                    bsSize='large'
                    data-ga={window.gaData({
                        category: 'Account',
                        action: 'Logout',
                    })}
                >
                    Logout
                </Button>
            </form>
        </div>
    );
};
