import React from 'react';

export default function Clips(props) {
    const clips = props.clips.map(function (clip) {
        return (
            <div className='clips__clip'>
                {JSON.stringify(clip)}
            </div>
        );
    });

    return (
        <div className='clips'>
            {clips}
        </div>
    );
};
