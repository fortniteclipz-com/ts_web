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
        this.state = {
            playingClip: null,
        };
    }

    componentDidMount() {
        const stream_id = this.props.match.params.stream_id;
        console.log("stream_id", stream_id);
        api.getStream(stream_id, (stream) => {
            const clips = helper.getClipsFromMoments(stream);
            this.setState({
                stream: stream,
                clips: clips,
            });
        });
    }

    clipInclude(clip) {
        clip.include = !clip.include;
        this.setState({
            clips: this.state.clips,
        });
    }

    clipPlay(clip) {
        clearInterval(this.clipPlayInterval)
        const player = this.player.getInternalPlayer();
        player.pause();
        player.seek(clip.time_in);

        setTimeout(() => {
            player.play();
            this.setState({
                playingClip: clip,
            }, () => {
                this.clipPlayInterval = setInterval(() => {
                    console.log("getCurrentTime", this.player.getCurrentTime());
                    const timeInDiff = clip.time_in - this.player.getCurrentTime();
                    const timeOutDiff = this.player.getCurrentTime() - clip.time_out;
                    if (timeInDiff > 0 || timeOutDiff > 0) {
                        if (timeOutDiff > 0 && timeOutDiff < 1) {
                            this.player.getInternalPlayer().pause();
                        }
                        clearInterval(this.clipPlayInterval)
                    }
                }, 500);
            });
        }, 1000)
    }

    render() {
        const twitchUrl = `https://www.twitch.tv/videos/${this.props.match.params.stream_id}`;

        let analyze = null;
        let clips = null;
        let montage = null;

        if (this.state.stream) {
            if (this.state.stream._status_analyze === 2) {
                let includedClips = 0;
                clips = this.state.clips.map((clip, i) => {
                    if (clip.include) {
                        includedClips += 1;
                    }
                    return (
                        <Clip key={i} clip={clip} play={this.clipPlay} include={this.clipInclude} />
                    );
                });
                montage = (
                    <button>Create Montage ({includedClips} Clips)</button>
                )
            }
            else if (this.state.stream._status_analyze === 1) {
                analyze = <button>Analyzing</button>
            }
            else {
                analyze = <button>Analyze</button>
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
                            autoPlay={true}
                            playing={true}
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
