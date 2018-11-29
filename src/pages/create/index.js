import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import TwitchPlayer from 'react-player/lib/players/Twitch'
import { Link } from 'react-router-dom';
import { arrayMove } from 'react-sortable-hoc';

import Clips from '../../components/create/clips';
import api from '../../services/api';
import auth from '../../services/auth';
import helper from '../../services/helper';

import './styles.css'

export default class Create extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {
            validStream: undefined,
            stream: null,
            clips: null,
            playingClip: null,
            analyzingStream: false,
            creatingMontage: false,
        };
    }

    componentDidMount() {
        // console.log("Create | componentDidMount");
        this.getStream();
    }

    componentWillUnmount() {
        // console.log("Create | componentWillUnmount");
        clearTimeout(this.validStreamTimeout)
        clearInterval(this.playerInterval)
    }

    async getStream() {
        // console.log("Create | getStream");
        const [stream, streamMoments] = await api.getStream(this.props.match.params.streamId);
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
                }, 15000);
            }
        });
    }

    onAnalyze() {
        // console.log("Create | onAnalyze");
        this.setState({
            analyzingStream: true,
        }, async () => {
            const stream = await api.createMoments(this.props.match.params.streamId);
            this.setState({
                stream: stream,
            }, () => {
                setTimeout(() => {
                    this.getStream();
                }, 15000);
            });
        });
    }

    onMontage() {
        // console.log("Create | onMontage");
        this.setState({
            creatingMontage: true,
        }, async () => {
            const montage = await api.createMontage(this.props.match.params.streamId, this.state.clips);
            if (montage) {
                NotificationManager.success(montage.montage_id, "Montage Created", 5000);
                this.props.history.push(`/watch?montageId=${montage.montage_id}`);
            }
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
        window.gaEvent({
            category: 'Clip',
            action: 'Edit',
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
        window.gaEvent({
            category: 'Clip',
            action: 'Sort',
        });
    }

    playerOnReady() {
        // console.log("Create | playerOnReady");
        const player = this.player.getInternalPlayer();
        player.play();
        player.pause();

        this.validStreamTimeout = setTimeout(() => {
            NotificationManager.error("Twitch took too long to respond. This usually means the stream has been removed from Twitch.com", "Invalid Twitch Stream");
            this.setState({
                validStream: false,
            });
        }, 5000);
    }

    playerOnDuration() {
        // console.log("Create | playerOnDuration");
        clearTimeout(this.validStreamTimeout);
        this.setState({
            validStream: true,
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
        let noClipsHTML = null;
        let clipsHTML = null;
        let montageHTML = null;

        const _status_analyze = (this.state.stream || {})._status_analyze || 0

        if (!_status_analyze && !auth.isAuthenticated) {
            analyzeHTML = (<Button className='create__analyze' bsStyle='primary' componentClass={Link} to='/account'>Sign Up to Analyze Streams</Button>);
        } else if (!_status_analyze && this.state.analyzingStream) {
            analyzeHTML = (<Button className='create__analyze' bsStyle='danger' disabled>Analyzing Stream</Button>);
        } else if (!_status_analyze && this.state.validStream === true) {
            analyzeHTML = (<Button className='create__analyze' bsStyle='primary' onClick={this.onAnalyze}>Analyze Stream for Fortnite Clips</Button>);
        } else if (!_status_analyze && this.state.validStream === false) {
            analyzeHTML = (<Button className='create__analyze' bsStyle='primary' componentClass={Link} to='/create'>Go Back and Select New Stream</Button>);
        } else if (_status_analyze === 1) {
            analyzeHTML = (<Button className='create__analyze' bsStyle='danger' disabled>Analyzing Stream ({parseInt(this.state.stream._status_analyze_percentage || 0)}%)</Button>);
        }

        if (_status_analyze === 2 && this.state.clips && !this.state.clips.length) {
            noClipsHTML = (
                <div className='create__no-clips'>
                    <h4>Sorry we couldn't find any clips for this stream.</h4>
                    <Button bsStyle='primary' componentClass={Link} to='/create'>Go Back and Select New Stream</Button>
                </div>
            )
        }

        if (_status_analyze === 2 && this.state.clips && this.state.clips.length) {
            let clipOrder = 0;
            const montageInfo = this.state.clips.reduce(function(info, clip) {
                clip.order = null;
                if (clip.include) {
                    clip.order = ++clipOrder;
                    info.clipCount += 1;
                    info.duration += clip.time_out - clip.time_in;
                }
                return info;
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

            let montageButton = null;
            if (!auth.isAuthenticated) {
                montageButton = (<Button className='create__montage-button' bsStyle='primary' componentClass={Link} to='/account'>Sign Up to Create Montages</Button>);
            } else if (this.state.creatingMontage) {
                montageButton = (<Button className='create__montage-button' bsStyle='danger' disabled>Creating Montage</Button>);
            } else if (montageInfo.clipCount === 0) {
                montageButton = (<Button className='create__montage-button' bsStyle='warning' disabled>Add Clips to Create Montage</Button>);
            } else {
                montageButton = (
                    <Button
                        className='create__montage-button'
                        bsStyle='success'
                        onClick={this.onMontage}
                        data-ga={window.gaData({
                            category: 'Montage',
                            action: 'Create',
                        })}
                    >
                            Create Montage ({montageInfo.clipCount} clips) ({montageInfo.duration} seconds)
                    </Button>
                );
            }
            montageHTML = (
                <div className='create__montage'>
                    {montageButton}
                </div>
            );
        }

        return (
            <div className='create'>
                <div className='create__player'>
                    <div className='create__player-wrapper'>
                        <TwitchPlayer
                            className='create__twitch-player'
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
                {noClipsHTML}
                {clipsHTML}
                {montageHTML}
            </div>
        );
    }
};
