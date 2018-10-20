import React, { Component } from 'react';
import autoBind from 'react-autobind';

import Player from '../../components/create/player';
import Clips from '../../components/create/clips';
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
        console.log("stream_id", stream_id);
        api.getStream(stream_id, (stream) => {
            const clips = helper.getClipsFromMoments(stream);
            this.setState({
                stream: stream,
                clips: clips,
            });
        });
    }

    render() {
        let analyzeButton = null;
        let clips = null;
        let montageButton = null;
        if (this.state.stream) {
            if (this.state.stream._status_analyze === 2) {
                clips = (
                    <Clips clips={this.state.clips} />
                );
                montageButton = <h3>Montage Button</h3>
            }
            else if (this.state.stream._status_analyze === 1) {
                analyzeButton = <h3>Analyzing</h3>
            }
            else {
                analyzeButton = <h3>Analyze</h3>
            }
        }

        return (
            <div className='create'>
                <Player stream_id={this.props.match.params.stream_id} />
                {analyzeButton}
                {clips}
                {montageButton}
            </div>
        );
    }
};

export default Create;
