import React from 'react';
import TwitchPlayer from 'react-player/lib/players/Twitch'

export default function Player(props) {
    const twitchUrl = `https://www.twitch.tv/videos/${props.stream_id}`;
    return (
        <div className='player'>
            <div className='player__wrapper'>
                <TwitchPlayer
                    className='player__twitch-player'
                    url={twitchUrl}
                    width='100%'
                    height='100%'
                />
            </div>
        </div>
    );
};
