import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const toHHMMSS = function (value) {
    const sec_num = parseInt(value, 10);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = `0${hours}`}
    if (minutes < 10) {minutes = `0${minutes}`}
    if (seconds < 10) {seconds = `0${seconds}`}
    return `${hours}:${minutes}:${seconds}`;
}

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default function Clip(props) {

    return (
        <div className='clip'>
            <div className='cell cell-select'>
                <input type='checkbox' checked={props.clip.include} onChange={(e) => props.onInclude(props.clip)}/>
            </div>
            <div className='cell cell-timein'>{parseInt(props.clip.time_in)} / {parseInt(props.clip.time_min)}</div>
            <div className='cell cell-timeout'>{parseInt(props.clip.time_out)} / {parseInt(props.clip.time_max)}</div>
            <div className='cell cell-range'>
                <Range
                    min={props.clip.time_min}
                    max={props.clip.time_max}
                    defaultValue={[props.clip.time_in, props.clip.time_out]}
                    tipFormatter={toHHMMSS}
                />
            </div>
            <div className='cell cell-play'>
                <button onClick={(e) => props.onPlay(props.clip)}>Play</button>
            </div>
        </div>
    );
};

