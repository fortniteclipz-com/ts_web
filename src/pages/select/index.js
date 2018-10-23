import React from 'react';
import { Button, FormControl} from 'react-bootstrap';

import './styles.css'

export default function Select(props) {
    const onSubmit = function (event) {
        event.preventDefault();
        const stream_id = event.target.querySelector('input[data-stream-id]').value;
        props.history.push(`/create/${stream_id}`)
    };
    return (
        <div className='select'>
            <div className='select__text'>Enter Twitch VideoID</div>
            <form className='select__form' onSubmit={onSubmit}>
              <FormControl
                type='text'
                className='select__input'
                defaultValue='310285421'
                placeholder='Twitch VideoID'
                data-stream-id
              />
                <Button type='submit' bsStyle='primary' className='select__button'>View Stream</Button>
            </form>
        </div>
    );
};
