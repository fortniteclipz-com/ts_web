import React, { Component } from 'react';
import autoBind from 'react-autobind';
import TwitchPlayer from 'react-player/lib/players/Twitch'
import { arrayMove } from 'react-sortable-hoc';

import Clips from '../../components/create/clips';
import api from '../../services/api';
import helper from '../../services/helper';

import './styles.css'

export default class Create extends Component {

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
        console.log("onAnalyze");
        const stream_id = this.props.match.params.stream_id;
        api.analyzeStream(stream_id, (stream) => {
            this.setState({
                stream: stream,
            });
        });
    }

    clipOnInclude(clip) {
        console.log("clipOnInclude");
        clip.include = !clip.include;
        this.setState({
            clips: this.state.clips,
        });
    }

    clipOnChange(value, clip) {
        console.log("clipOnChange");
        let seekTo = value[0];
        if (clip.time_in === value[0]) {
            seekTo = value[1];
        }
        const player = this.player.getInternalPlayer();
        player.seek(seekTo);
        player.play();
        player.pause();

        clip.time_in = value[0];
        clip.time_out = value[1];
        this.setState({
            clips: this.state.clips,
            playingClip: clip,
        });
    }

    clipOnAfterChange(value, clip) {
        console.log("clipOnAfterChange");
        const seekTo = value[0];
        const player = this.player.getInternalPlayer();
        player.seek(seekTo);
        player.play();
        player.pause();

        clip.time_in = value[0];
        clip.time_out = value[1];
        this.setState({
            clips: this.state.clips,
            playingClip: clip,
        });
    }

    clipOnPlay(clip) {
        console.log("clipOnPlay");
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
            }, 500);
        });

    }

    clipsOnSortEnd({ oldIndex, newIndex }) {
        console.log("clipsOnSortEnd");
        this.setState({
          clips: arrayMove(this.state.clips, oldIndex, newIndex),
        });
    }

    playerOnReady() {
        console.log("playerOnReady");
        const player = this.player.getInternalPlayer();
        player.play();
        player.pause();
    }

    playerOnPlay() {
        console.log("playerOnPlay");
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
        console.log("playerOnPause");
        clearInterval(this.playerInterval)
    }

    render() {
        const twitchUrl = `https://www.twitch.tv/videos/${this.props.match.params.stream_id}`;

        let analyzeHTML = null;
        let clipsHTML = null;
        let montageHTML = null;

        if (this.state.stream.stream_id) {
            if (this.state.stream._status_analyze === 2) {
                let clipOrder = 0;
                const montageInfo = this.state.clips.reduce(function (acc, clip) {
                    clip.order = null;
                    if (clip.include) {
                        clip.order = ++clipOrder;
                        acc.clipCount += 1;
                        acc.duration += clip.time_out - clip.time_in;
                    }
                    return acc;
                }, {
                    clipCount: 0,
                    duration: 0,
                });

                clipsHTML = (
                    <Clips
                        onSortEnd={this.clipsOnSortEnd}
                        useDragHandle={true}
                        clips={this.state.clips}
                        clipOnPlay={this.clipOnPlay}
                        clipOnInclude={this.clipOnInclude}
                        clipOnChange={this.clipOnChange}
                        clipOnAfterChange={this.clipOnAfterChange}
                    />
                );
                montageHTML = (<button className="btn btn-primary create__montage">Create Montage ({montageInfo.clipCount} clips) ({montageInfo.duration} seconds)</button>);
            }
            else if (this.state.stream._status_analyze === 1) {
                analyzeHTML = (<button disabled>Analyzing</button>);
            }
            else {
                analyzeHTML = (<button onClick={this.onAnalyze}>Analyze</button>);
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

                {analyzeHTML}
                {clipsHTML}
                {montageHTML}
            </div>
        );
    }
};
