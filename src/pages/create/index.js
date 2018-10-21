import React, { Component } from 'react';
import autoBind from 'react-autobind';
import TwitchPlayer from 'react-player/lib/players/Twitch'

import Clip from '../../components/create/clip';
import api from '../../services/api';
import helper from '../../services/helper';

import './styles.css'

class Create extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {};
    }

    componentDidMount() {
        const stream_id = this.props.match.params.stream_id;
        api.getStream(stream_id, (stream) => {
            const clips = helper.getClipsFromMoments(stream);
            this.setState({
                stream: stream,
                clips: clips,
            });
        });
    }

    onAnalyze() {
        const stream_id = this.props.match.params.stream_id;
        api.analyzeStream(stream_id, (stream) => {
            this.setState({
                stream: stream,
            });
        });
    }

    clipOnInclude(clip) {
        clip.include = !clip.include;
        this.setState({
            clips: this.state.clips,
        });
    }

    clipOnPlay(clip) {
        clearInterval(this.clipOnPlayInterval)
        const player = this.player.getInternalPlayer();
        player.pause();
        player.seek(clip.time_in);
        setTimeout(() => {
            player.play();
            this.clipOnPlayInterval = setInterval(() => {
                console.log("getCurrentTime", this.player.getCurrentTime());
                const timeInDiff = clip.time_in - this.player.getCurrentTime();
                const timeOutDiff = this.player.getCurrentTime() - clip.time_out;
                if (timeInDiff > 0 || timeOutDiff > 0) {
                    if (timeOutDiff > 0 && timeOutDiff < 1) {
                        this.player.getInternalPlayer().pause();
                    }
                    clearInterval(this.clipOnPlayInterval)
                }
            }, 500);
        }, 1000)
    }

    render() {
        const twitchUrl = `https://www.twitch.tv/videos/${this.props.match.params.stream_id}`;

        let analyze = null;
        let clips = null;
        let montage = null;

        if (this.state.stream) {
            if (this.state.stream._status_analyze === 2) {
                let montageClipCount = 0;
                let montageDuration = 0;
                clips = this.state.clips.map((clip, i) => {
                    if (clip.include) {
                        montageClipCount += 1;
                        montageDuration += clip.time_out - clip.time_in
                    }
                    return (
                        <Clip key={i} clip={clip} onPlay={this.clipOnPlay} onInclude={this.clipOnInclude} />
                    );
                });
                montage = (
                    <button>Create Montage ({montageClipCount} clips) ({montageDuration} seconds)</button>
                )
            }
            else if (this.state.stream._status_analyze === 1) {
                analyze = <button disabled>Analyzing</button>
            }
            else {
                analyze = <button onClick={this.onAnalyze}>Analyze</button>
            }
        }

        return (
            <div className='create'>
                <div className='player'>
                    <div className='player__wrapper'>
                        <TwitchPlayer
                            className='player__twitch-player'
                            url={twitchUrl}
                            width={'100%'}
                            height={'100%'}
                            controls={true}
                            ref={player => this.player = player}
                        />
                    </div>
                </div>
                {analyze}
                <div className='clips'>
                    {clips}
                </div>
                {montage}
            </div>
        );
    }
};

export default Create;
