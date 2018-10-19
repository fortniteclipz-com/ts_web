import React from 'react';

export default function ViewFindStream(props) {
    return (
        <form onSubmit={props.onStreamNew}>
            <input placeholder="Twitch VideoID" defaultValue="123456789" data-stream-id />
            <button type="submit">Go</button>
        </form>
    );
};
