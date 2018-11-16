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
        <div className='create__clips'>
            <div className='create__clip create__clip--header'>
                <div className='create__clip-cell create__clip-cell--select' onClick={props.clipsOnIncludeAll}>&#10004;</div>
                <div className='create__clip-cell create__clip-cell--order'>#</div>
                <div className='create__clip-cell create__clip-cell--time'>Time In/Out</div>
                <div className='create__clip-cell create__clip-cell--duration'>Duration</div>
                <div className='create__clip-cell create__clip-cell--buttons'>Edit</div>
                <div className='create__clip-cell create__clip-cell--buttons'>Play</div>
                <div className='create__clip-cell create__clip-cell--sort'>Sort</div>
            </div>
            <Scrollbar>
                <div className='create__clips-overflow'>
                    <div className='create__clips-list'>
                        {clips}
                    </div>
                </div>
            </Scrollbar>
        </div>

    );
});

export default Clips;
