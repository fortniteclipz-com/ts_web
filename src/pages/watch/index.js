import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button } from 'react-bootstrap';
import FilePlayer from 'react-player/lib/players/FilePlayer'
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
        console.log("componentDidMount");
        this.getMontages();

    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
        this.getMontages();
    }

    getMontages() {
        if (auth.isAuthenticated === undefined) {
            return;
        }

        api.getMontages((montages) => {
            montages = montages.sort(function(a, b) {
                if (a.stream_user > b.stream_user) {
                    return 1;
                } else {
                    return -1;
                }
            });
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
        // console.log("montageOnPlay");
        this.props.history.push(`/watch?montageId=${montage.montage_id}`)
        const playerUrl = `https://s3-us-west-1.amazonaws.com/twitch-stitch-main/${montage.media_key}`;
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
        let playerHTML = null;
        let montagesHTML = null;

        if (this.state.playerUrl) {
            playerHTML = (
                <div className='player'>
                    <div className='player__wrapper'>
                        <FilePlayer
                            className='player__player'
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
                    button = (<Button bsStyle='primary' onClick={(e) => this.montageOnPlay(montage)}>Play</Button>);
                }
                return (
                    <div key={montage.montage_id} className='montage'>
                        <div className='montage__cell montage__cell--stream'>
                            <div>{montage.stream_user}</div>
                            <div>{montage.stream_id}</div>
                        </div>
                        <div className='montage__cell montage__cell--montageid'>{montage.montage_id}</div>
                        <div className='montage__cell montage__cell--duration'>
                            <div>{helper.toHHMMSS(montage.duration)}</div>
                            <div>({montage.clip_ids.length} clips)</div>
                        </div>
                        <div className='montage__cell montage__cell--play'>{button}</div>
                    </div>
                );
            });

            montagesHTML = (
                <div className='montages'>
                    <div className='montage montage--header'>
                        <div className='montage__cell montage__cell--stream'>Stream</div>
                        <div className='montage__cell montage__cell--montageid'>MontageID</div>
                        <div className='montage__cell montage__cell--duration'>Duration</div>
                        <div className='montage__cell montage__cell--play'>Play</div>
                    </div>
                    <Scrollbar>
                        <div className='montages__overflow'>
                            <div className='montages__list'>
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
                {montagesHTML}
            </div>
        );
    }
};
