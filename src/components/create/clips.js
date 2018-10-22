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
            {clips}
        </div>

    );
});

export default Clips;
