import React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
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
                onInclude={props.clipOnInclude}
                onEdit={props.clipOnEdit}
                onPlay={props.clipOnPlay}
                onChange={props.clipOnChange}
                onAfterChange={props.clipOnAfterChange}
            />
        );
    });

    return (
        <div className='clips'>
            <div className='clip clip--header'>
                <div className='clip__cell clip__cell--select'> &#10004;</div>
                <div className='clip__cell clip__cell--order'>#</div>
                <div className='clip__cell clip__cell--time'>Time In/Out</div>
                <div className='clip__cell clip__cell--duration'>Duration</div>
                <div className='clip__cell clip__cell--buttons'>Edit</div>
                <div className='clip__cell clip__cell--buttons'>Play</div>
                <div className='clip__cell clip__cell--sort'>Sort</div>
            </div>
            <Scrollbar>
                <div className='clips__overflow'>
                    <div className='clips__list'>
                        {clips}
                    </div>
                </div>
            </Scrollbar>
        </div>

    );
});

export default Clips;
