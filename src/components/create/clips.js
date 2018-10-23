import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Clip from './clip';

const SortableClip = SortableElement(Clip);
const Clips = SortableContainer(function(props) {
    const clips = props.clips.map((clip, i) => {
        return (
            <SortableClip
                key={clip.uuid}
                index={i}
                clip={clip}
                onPlay={props.clipOnPlay}
                onInclude={props.clipOnInclude}
                onChange={props.clipOnChange}
                onAfterChange={props.clipOnAfterChange}
            />
        );
    });

    return (
        <div className='clips'>
            <div className='clip clip--header'>
                <div className='clip__cell clip__cell--select'>Select</div>
                <div className='clip__cell clip__cell--order'>Order</div>
                <div className='clip__cell clip__cell--duration'>Duration</div>
                <div className='clip__cell clip__cell--timein'>Time In</div>
                <div className='clip__cell clip__cell--range'>Edit</div>
                <div className='clip__cell clip__cell--timeout'>Time Out</div>
                <div className='clip__cell clip__cell--play'>Play</div>
                <div className='clip__cell clip__cell--sort'>Sort</div>
            </div>
            <div className='clips__overflow'>
                <div className='clips__list'>
                    {clips}
                </div>
            </div>
        </div>

    );
});

export default Clips;
