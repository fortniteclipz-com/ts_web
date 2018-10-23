import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button } from 'react-bootstrap';
import FilePlayer from 'react-player/lib/players/FilePlayer'

import api from '../../services/api';
import helper from '../../services/helper';

import './styles.css'

export default class Export extends Component {

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
        api.getMontages((montages) => {
            this.setState({
                montages: montages,
            });
        });
    }

    montageOnPlay(montage) {
        console.log("montageOnPlay");
        const playerUrl = `https://s3-us-west-1.amazonaws.com/twitch-stitch-main/${montage.media_key}`;
        this.setState({
            playerUrl: playerUrl,
        }, () => {
            const player = this.player.getInternalPlayer();
            player.play();
        });
    }


    render() {
        let playerHTML = null;
        let montagesHTML = null;

        if (this.state.playerUrl) {
            playerHTML = (
                <FilePlayer
                    className='player__player'
                    url={this.state.playerUrl}
                    width={'100%'}
                    height={'100%'}
                    controls={true}
                    ref={player => this.player = player}
                />
            );
        }

        if (this.state.montages) {
            const montages = this.state.montages.map((montage) => {
                return (
                    <div key={montage.montage_id} className='montage'>
                        <div className='montage__cell montage__cell--montageid'>{montage.montage_id}</div>
                        <div className='montage__cell montage__cell--duration'>{helper.toHHMMSS(montage.duration)}</div>
                        <div className='montage__cell montage__cell--clips'>{montage.clip_ids.length}</div>
                        <div className='montage__cell montage__cell--play'>
                            <Button bsStyle='primary' onClick={(e) => this.montageOnPlay(montage)}>Play</Button>
                        </div>
                    </div>
                );
            });

            montagesHTML = (
                <div className='montages'>
                    <div className='montage montage--header'>
                        <div className='montage__cell montage__cell--montageid'>MontageID</div>
                        <div className='montage__cell montage__cell--duration'>Duration</div>
                        <div className='montage__cell montage__cell--clips'>Clips</div>
                        <div className='montage__cell montage__cell--play'>Play</div>
                    </div>
                    <div className='montages__overflow'>
                        <div className='montages__list'>
                            {montages}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className='export'>
                <div className='player'>
                    <div className='player__wrapper'>
                        {playerHTML}
                    </div>
                </div>
                {montagesHTML}
            </div>
        );
    }
};
