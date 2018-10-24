import Slider from 'rc-slider';
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { SortableHandle } from 'react-sortable-hoc';

import helper from '../../services/helper';

import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const DragHandle = SortableHandle(() => {
    return (
        <div style={{cursor: 'grab', display: 'inline-block'}}>
            <FaBars />
        </div>
    );
});

export default function Clip(props) {
    let sliderHTML = null;

    if (props.clip.edit) {
        sliderHTML = (
            <div className='clip__cell clip__cell--range'>
                <Range
                   min={props.clip.time_min}
                   max={props.clip.time_max}
                   defaultValue={[props.clip.time_in, props.clip.time_out]}
                   pushable={1}
                   tipFormatter={helper.toHHMMSS}
                   onChange={(value) => props.onChange(value, props.clip)}
                   onAfterChange={(value) => props.onAfterChange(value, props.clip)}
               />
            </div>
        );
    }

    return (
        <div className='clip'>
            <div className='clip__cell clip__cell--select'>
                <input type='checkbox' checked={props.clip.include} onChange={(e) => props.onInclude(props.clip)} />
            </div>
            <div className='clip__cell clip__cell--order'>{props.clip.order || 'N/A'}</div>
            <div className='clip__cell clip__cell--time'>
                <div>{helper.toHHMMSS(props.clip.time_in)}</div>
                <hr />
                <div>{helper.toHHMMSS(props.clip.time_out)}</div>
            </div>
            <div className='clip__cell clip__cell--duration'>{helper.toHHMMSS(props.clip.time_out - props.clip.time_in)}</div>
            <div className='clip__cell clip__cell--buttons'>
                <Button bsStyle='default' onClick={(e) => props.onEdit(props.clip)}>Edit</Button>
            </div>
            <div className='clip__cell clip__cell--buttons'>
                <Button bsStyle='primary' onClick={(e) => props.onPlay(props.clip)}>Play</Button>
            </div>
            <div className='clip__cell clip__cell--sort'>
                <DragHandle />
            </div>
            {sliderHTML}
        </div>
    );
};

