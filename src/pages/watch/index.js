import React from 'react';
import autoBind from 'react-autobind';
import { Button } from 'react-bootstrap';
import FilePlayer from 'react-player/lib/players/FilePlayer'
import { Link } from 'react-router-dom';
import Scrollbar from 'react-smooth-scrollbar';

import api from '../../services/api';
import auth from '../../services/auth';
import config from '../../services/config';
import helper from '../../services/helper';

import './styles.css'

export default class Watch extends React.Component {

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
        this.getMontages();
    }

    async getMontages() {
        // console.log("Watch | getMontages");
        const montages = await api.getMontages();
        this.setState({
            montages: montages,
        }, () => {
            const params = new URLSearchParams(this.props.location.search);
            const montageId = params.get('montageId');
            const montage = this.state.montages.find(function(montage) {
                return montage.montage_id === montageId;
            });
            if (!this.state.playerUrl && montage && montage._status === 2) {
                this.montageOnPlay(montage);
            }
            if (montages.some(m => m._status === 1)) {
                setTimeout(() => {
                    this.getMontages();
                }, 15000);
            }
        });
    }

    montageOnPlay(montage) {
        // console.log("Watch | montageOnPlay");
        this.props.history.push(`/watch?montageId=${montage.montage_id}`)
        const playerUrl = `https://s3.${config.aws.s3.region}.amazonaws.com/${config.aws.s3.bucket}/${montage.media_key}`
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
        let noMontagesHTML = null;
        let playerHTML = null;
        let montagesHTML = null;

        if (!auth.isAuthenticated()) {
            signUpHTML = (<Button className='watch__signup' bsStyle='primary' componentClass={Link} to='/account'>Sign Up to Create Your Own Montage</Button>);
        }

        if (auth.isAuthenticated() && this.state.montages && !this.state.montages.length) {
            noMontagesHTML = (
                <div className='watch__no-montages'>
                    <h4>No montages found. Go create your own!</h4>
                    <Button className='watch__create' bsStyle='primary' componentClass={Link} to='/create'>Create Montages</Button>
                </div>
            );
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
                            ref={p => this.player = p}
                        />
                    </div>
                </div>
            );
        }

        if (this.state.montages && this.state.montages.length) {
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
                            <div>({montage.clips} clips)</div>
                        </div>
                        <div className='watch__montage-cell watch__montage-cell--play'>{button}</div>
                    </div>
                );
            });

            montagesHTML = (
                <div className='watch__montages'>
                    <div className='watch__montage watch__montage--header'>
                        <div className='watch__montage-cell watch__montage-cell--montageid'>
                            <div>MontageID</div>
                            <div>Stream</div>
                            <div>Streamer</div>
                        </div>
                        <div className='watch__montage-cell watch__montage-cell--duration'>
                            <div>Duration</div>
                        </div>
                        <div className='watch__montage-cell watch__montage-cell--play'>
                            <div>Play</div>
                        </div>
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
                {noMontagesHTML}
                {playerHTML}
                {signUpHTML}
                {montagesHTML}
            </div>
        );
    }
};
