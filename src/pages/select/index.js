import React from 'react';

export default function Select(props) {
    const onSubmit = function (event) {
        event.preventDefault();
        const stream_id = event.target.querySelector('input[data-stream-id]').value;
        props.history.push(`/create/${stream_id}`)
    };
    return (
        <form onSubmit={onSubmit}>
            <input placeholder='Twitch VideoID' defaultValue='310285421' data-stream-id />
            <button type='submit'>Go</button>
        </form>
    );
};
