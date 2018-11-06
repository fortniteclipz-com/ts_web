import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button } from 'react-bootstrap';
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
            streamIsValid: false,
            stream: null,
            clips: null,
            playingClip: null,
            disableMontage: false,
        };
    }

    componentDidMount() {
        console.log("Create | componentDidMount");
        this.getStream();
    }

    componentWillUnmount() {
        console.log("Create | componentWillUnmount");
        clearInterval(this.playerInterval)
    }

    getStream() {
        console.log("Create | getStream");
        const stream_id = this.props.match.params.streamId;
        api.getStream(stream_id, (stream, streamMoments) => {
            let clips = null;
            if (stream._status_analyze === 2) {
                clips = helper.createClips(stream, streamMoments);
            }
            this.setState({
                stream: stream,
                clips: clips,
            }, () => {
                if (stream._status_analyze === 1) {
                    setTimeout(() => {
                        this.getStream();
                    }, 5000);
                }
            });
        });
    }

    onAnalyze() {
        // console.log("Create | onAnalyze");
        const stream_id = this.props.match.params.streamId;
        api.createMoments(stream_id, (stream) => {
            this.setState({
                stream: stream,
            }, () => {
                setTimeout(() => {
                    this.getStream();
                }, 5000);
            });
        });
    }

    onMontage() {
        // console.log("Create | onMontage");
        const stream_id = this.props.match.params.streamId;
        this.setState({
            disableMontage: true,
        }, () => {
            api.createMontage(stream_id, this.state.clips, (montage) => {
                alert(`Montage created!\n\nMontageID:\n${montage.montage_id}`);
                this.props.history.push(`/watch?montageId=${montage.montage_id}`)
            });
        });

    }

    clipOnInclude(clip) {
        // console.log("Create | clipOnInclude");
        if (!clip.include === true) {
            const clipCount = this.state.clips.reduce(function(acc, clip) {
                return clip.include ? ++acc : acc;
            }, 0);
            if (clipCount >= 50) {
                return
            }
        }
        clip.include = !clip.include;
        this.setState({
            clips: this.state.clips,
        });
    }

    clipOnChange(value, clip) {
        // console.log("Create | clipOnChange");
        let seekTo = value[0];
        if (clip.time_in === value[0]) {
            seekTo = value[1];
        }
        const player = this.player.getInternalPlayer();
        player.seek(seekTo);
        player.pause();
    }

    clipOnAfterChange(value, clip) {
        // console.log("Create | clipOnAfterChange");
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
        // console.log("Create | clipOnPlay");
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

    clipOnEdit(clip) {
        // console.log("Create | clipOnEdit");
        const edit = !clip.edit
        this.state.clips.forEach((clip) => {
            clip.edit = false;
        });
        clip.edit = edit;
        this.setState({
            clips: this.state.clips,
        });
    }

    clipsOnIncludeAll() {
        // console.log("Create | clipsOnIncludeAll");
        const isClipSelected = this.state.clips.some(function(clip) {
            return clip.include;
        });
        if (isClipSelected) {
            this.state.clips.forEach((clip) => {
                clip.include = false;
            });
        } else {
            let clipCount = 0;
            this.state.clips.forEach((clip) => {
                return clipCount < 50 ? (clip.include = true && ++clipCount) : null
            });
        }
        this.setState({
            clips: this.state.clips,
        });
    }

    clipsOnSortEnd({ oldIndex, newIndex }) {
        // console.log("Create | clipsOnSortEnd");
        this.setState({
            clips: arrayMove(this.state.clips, oldIndex, newIndex),
        });
    }

    playerOnReady() {
        // console.log("Create | playerOnReady");
        const player = this.player.getInternalPlayer();
        player.play();
        player.pause();
    }

    playerOnDuration() {
        // console.log("Create | playerOnDuration");
        this.setState({
            streamIsValid: true,
        });
    }

    playerOnPlay() {
        // console.log("Create | playerOnPlay");
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
        // console.log("Create | playerOnPause");
        clearInterval(this.playerInterval)
    }

    render() {
        const twitchUrl = `https://www.twitch.tv/videos/${this.props.match.params.streamId}`;
        let analyzeHTML = null;
        let clipsHTML = null;
        let montageHTML = null;

        if (this.state.stream) {
            if (this.state.stream._status_analyze === 2) {
                let clipOrder = 0;
                const montageInfo = this.state.clips.reduce(function(acc, clip) {
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
                        clipsOnIncludeAll={this.clipsOnIncludeAll}
                        clipOnInclude={this.clipOnInclude}
                        clipOnPlay={this.clipOnPlay}
                        clipOnEdit={this.clipOnEdit}
                        clipOnChange={this.clipOnChange}
                        clipOnAfterChange={this.clipOnAfterChange}
                    />
                );
                if (this.state.disableMontage === true) {
                    montageHTML = (
                        <div className='create__montage'>
                            <Button className='create__montage-button' bsStyle='danger' disabled>Creating Montage</Button>
                        </div>
                    );
                } else if (montageInfo.clipCount === 0) {
                    montageHTML = (
                        <div className='create__montage'>
                            <Button className='create__montage-button' bsStyle='warning' disabled>Add Clips to Create Montage</Button>
                        </div>
                    );
                } else {
                    montageHTML = (
                        <div className='create__montage'>
                            <Button className='create__montage-button' bsStyle='success' onClick={this.onMontage}>Create Montage ({montageInfo.clipCount} clips) ({montageInfo.duration} seconds)</Button>
                        </div>
                    );
                }
            } else if (this.state.streamIsValid === true) {
                if (this.state.stream._status_analyze === 1) {
                    analyzeHTML = (<Button className='create__analyze create__analyze--analyzing' bsStyle='danger' disabled>Analyzing ({parseInt(this.state.stream._status_analyze_percentage || 0)}%)</Button>);
                } else {
                    analyzeHTML = (<Button className='create__analyze create__analyze--analyze' bsStyle='primary' onClick={this.onAnalyze}>Analyze</Button>);
                }
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
                            playsinline={true}
                            onPlay={this.playerOnPlay}
                            onPause={this.playerOnPause}
                            onReady={this.playerOnReady}
                            onDuration={this.playerOnDuration}
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
