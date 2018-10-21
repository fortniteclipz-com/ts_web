import React, { Component } from 'react';
import autoBind from 'react-autobind';
import TwitchPlayer from 'react-player/lib/players/Twitch'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import Clip from '../../components/create/clip';
import api from '../../services/api';
import helper from '../../services/helper';

import './styles.css'

class Create extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {
            stream: {},
            stream_moments: [],
            clips: [],
            playingClip: null,
        };
    }

    componentDidMount() {
        const stream_id = this.props.match.params.stream_id;
        api.getStream(stream_id, (stream, stream_moments) => {
            const clips = helper.createClips(stream, stream_moments);
            this.setState({
                stream: stream,
                stream_moments: stream_moments,
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

    clipOnChange(value, clip) {
        let seekTo = value[0];
        if (clip.time_in === value[0]) {
            seekTo = value[1];
        }
        const player = this.player.getInternalPlayer();
        player.pause();
        player.seek(seekTo);

        clip.time_in = value[0];
        clip.time_out = value[1];
        this.setState({
            clips: this.state.clips,
            playingClip: clip,
        });
    }

    clipOnAfterChange(value, clip) {
        const seekTo = value[0];
        const player = this.player.getInternalPlayer();
        player.pause();
        player.seek(seekTo);

        clip.time_in = value[0];
        clip.time_out = value[1];
        this.setState({
            clips: this.state.clips,
            playingClip: clip,
        });
    }

    clipOnPlay(clip) {
        this.setState({
            playingClip: null,
        }, () => {
            const player = this.player.getInternalPlayer();
            player.seek(clip.time_in);
            player.play();
            player.pause();
            setTimeout(() => {
                this.setState({
                    playingClip: clip,
                }, () => {
                    player.play();
                });
            }, 1000);
        });

    }

    playerOnReady() {
        const player = this.player.getInternalPlayer();
        player.play();
        player.pause();
    }

    playerOnPlay() {
        clearInterval(this.playerInterval)
        this.playerInterval = setInterval(() => {
            if (this.state.playingClip) {
                const timeOutDiff = this.player.getCurrentTime() - this.state.playingClip.time_out;
                if (timeOutDiff > 0) {
                    this.player.getInternalPlayer().pause();
                    this.setState({
                        playingClip: null,
                    });
                }
            }
        }, 500);
    }

    playerOnPause() {
        clearInterval(this.playerInterval)
    }

    render() {
        const twitchUrl = `https://www.twitch.tv/videos/${this.props.match.params.stream_id}`;

        let analyze = null;
        let clips = null;
        let montage = null;

        if (this.state.stream.stream_id) {
            if (this.state.stream._status_analyze === 2) {
                let montageClipCount = 0;
                let montageDuration = 0;
                clips = (
                    <div className='clips'>
                    {
                        this.state.clips.map((clip, i) => {
                            if (clip.include) {
                                montageClipCount += 1;
                                montageDuration += clip.time_out - clip.time_in
                            }
                            return (
                                <Clip
                                    key={i}
                                    clip={clip}
                                    onPlay={this.clipOnPlay}
                                    onInclude={this.clipOnInclude}
                                    onChange={this.clipOnChange}
                                />
                            );
                        })
                    }
                    </div>
                )
                montage = (
                    <button class="create__montage">Create Montage ({montageClipCount} clips) ({montageDuration} seconds)</button>
                );
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
                            onReady={this.playerOnReady}
                            onPlay={this.playerOnPlay}
                            onPause={this.playerOnPause}
                            ref={player => this.player = player}
                        />
                    </div>
                </div>
                {analyze}
                {clips}
                {montage}
            </div>
        );
    }
};

export default Create;
