import React from 'react';

export default function Clip(props) {
    return (
        <div className='clips__clip'>
            <div className="clips__clip__select">
                <input type="checkbox" checked={props.clip.include} onChange={(e) => props.onInclude(props.clip)}/>
            </div>
            <div className="clips__clip__timein">{parseInt(props.clip.time_in)} / {parseInt(props.clip.time_min)}</div>
            <div className="clips__clip__timeout">{parseInt(props.clip.time_out)} / {parseInt(props.clip.time_max)}</div>
            <div className="clips__clip__play">
                <button onClick={(e) => props.onPlay(props.clip)}>Play</button>
            </div>
        </div>
    );
};
