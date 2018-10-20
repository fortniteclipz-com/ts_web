import React, { Component } from 'react';
import autoBind from 'react-autobind';
import TwitchPlayer from 'react-player/lib/players/Twitch'

class Player extends Component {
    constructor(props, state) {
        super(props)
        autoBind(this)
        this.state = {}
    }

    handleKeyup(event) {
        const handleSpace = () => {
            console.log("handleSpace");
            // if (TS_PLAYER.isPaused()) {
            //     TS_PLAYER.play();
            // } else {
            //     TS_PLAYER.pause();
            // }
        };
        const handleLeft = () => {
            console.log("handleLeft");
            // const timeModifier = TS_PLAYER.isPaused() ? 1 : 5;
            // TS_PLAYER.seek(Math.round(TS_PLAYER.getCurrentTime() - timeModifier));
        };
        const handleRight = () => {
            console.log("handleRight");
            // const timeModifier = TS_PLAYER.isPaused() ? 1 : 5;
            // TS_PLAYER.seek(Math.round(TS_PLAYER.getCurrentTime() + timeModifier));
        };

        const key = event.keyCode ? event.keyCode : event.which
        if (key === 32) { handleSpace() } // space bar
        if (key === 37) { handleLeft() } // left arrow
        if (key === 39) { handleRight() } // right arrow
    }

    componentDidMount() {
        window.addEventListener("keyup", this.handleKeyup);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.handleKeyup);
    }

    render() {
        const twitchUrl = `https://www.twitch.tv/videos/${this.props.stream_id}`;
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
