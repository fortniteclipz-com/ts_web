import React, { Component } from 'react';
import autoBind from 'react-autobind';
import TwitchPlayer from 'react-player/lib/players/Twitch'

class Player extends Component {
    constructor(props, state) {
        super(props)
        autoBind(this)
        this.state = {}
    }

    render() {
        const twitchUrl = 'https://www.twitch.tv/videos/311038404';
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
    }
};

export default Player;
