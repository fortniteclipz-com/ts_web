import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button } from 'react-bootstrap';
import FilePlayer from 'react-player/lib/players/FilePlayer'
import { Link } from 'react-router-dom';
import Scrollbar from 'react-smooth-scrollbar';

import api from '../../services/api';
import auth from '../../services/auth';
import helper from '../../services/helper';

import './styles.css'

export default class Watch extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {
            montages: null,
            montage: null,
            playerUrl: null,
        };
    }

    componentDidMount() {
        // console.log("Watch | componentDidMount");
        api.getMontages((montages) => {
            this.setState({
                montages: montages,
            }, () => {
                const params = new URLSearchParams(this.props.location.search);
                const montageId = params.get('montageId');
                const montage = this.state.montages.find(function(montage) {
                    return montage.montage_id === montageId;
                });
                if (montage && montage._status === 2) {
                    this.montageOnPlay(montage);
                }
            });
        });
    }

    montageOnPlay(montage) {
        // console.log("Watch | montageOnPlay");
        this.props.history.push(`/watch?montageId=${montage.montage_id}`)
        const playerUrl = `https://s3-us-west-1.amazonaws.com/twitch-stitch-media-dev/${montage.media_key}`;
        this.setState({
            playerUrl: null,
        }, () => {
            this.setState({
                playerUrl: playerUrl,
            }, () => {
                const player = this.player.getInternalPlayer();
                player.play();
            });
        });
    }


    render() {
        let signUpHTML = null;
        let playerHTML = null;
        let montagesHTML = null;

        if (!auth.isAuthenticated) {
            signUpHTML = (<Button className='watch__signup' bsStyle='primary' componentClass={Link} to='/account'>Sign Up to Create Your Own Montage</Button>);
        }

        if (this.state.playerUrl) {
            playerHTML = (
                <div className='watch__player-container'>
                    <div className='watch__player-wrapper'>
                        <FilePlayer
                            className='watch__player'
                            url={this.state.playerUrl}
                            width={'100%'}
                            height={'100%'}
                            controls={true}
                            playsinline={true}
                            ref={player => this.player = player}
                        />
                    </div>
                </div>
            );
        }

        if (this.state.montages) {
            const montages = this.state.montages.map((montage) => {
                let button = (<Button bsStyle='default' onClick={(e) => this.montageOnPlay(montage)} disabled>Processing</Button>);
                if (montage._status === 2) {
                    button = (
                        <Button
                            bsStyle='primary'
                            onClick={(e) => this.montageOnPlay(montage)}
                            data-ga={window.gaData({
                                category: 'Montage',
                                action: 'Play',
                            })}
                        >
                            Play
                        </Button>
                    );
                }
                return (
                    <div key={montage.montage_id} className='watch__montage'>
                        <div className='watch__montage-cell watch__montage-cell--montageid'>
                            <div>{montage.montage_id}</div>
                            <div>{montage.stream_id}</div>
                            <div>{montage.streamer}</div>
                        </div>
                        <div className='watch__montage-cell watch__montage-cell--duration'>
                            <div>{helper.toHHMMSS(montage.duration)}</div>
                            <div>({montage.clip_ids.length} clips)</div>
                        </div>
                        <div className='watch__montage-cell watch__montage-cell--play'>{button}</div>
                    </div>
                );
            });

            montagesHTML = (
                <div className='watch__montages'>
                    <div className='watch__montage watch__montage--header'>
                        <div className='watch__montage-cell watch__montage-cell--montageid'>MontageID<br/>Stream<br/>Streamer</div>
                        <div className='watch__montage-cell watch__montage-cell--duration'>Duration</div>
                        <div className='watch__montage-cell watch__montage-cell--play'>Play</div>
                    </div>
                    <Scrollbar>
                        <div className='watch__montages-overflow'>
                            <div className='watch__montages-list'>
                                {montages}
                            </div>
                        </div>
                    </Scrollbar>
                </div>
            );
        }

        return (
            <div className='watch'>
                {playerHTML}
                {signUpHTML}
                {montagesHTML}
            </div>
        );
    }
};
