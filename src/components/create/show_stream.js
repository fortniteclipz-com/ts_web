import React from 'react';

import Player from './player';

export default function ShowStream(props) {
    return (
        <div>
            <Player stream_id={props.stream_id}></Player>
        </div>
    );
};
