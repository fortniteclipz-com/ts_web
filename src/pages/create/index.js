import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createActions from './actions';
import Player from '../../components/create/player';
import api from '../../services/api';
import helper from '../../services/helper';

import './styles.css'

class Create extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        const stream_id = this.props.match.params.stream_id;
        console.log("stream_id", stream_id);
        api.getStream(stream_id, (stream) => {
            this.props.streamUpdate(stream);
        });
    }

    render() {
        let analyzeButton = null;
        let clips = null;
        let montageButton = null;

        if (this.props.stream) {
            if (this.props.stream._status_analyze === 2) {
                helper.getClipsFromMoments(this.props.stream);
                clips = <h3>Clips</h3>
                montageButton = <h3>Montage Button</h3>
            }
            else if (this.props.stream._status_analyze === 1) {
                analyzeButton = <h3>Analyzing</h3>
            }
            else {
                analyzeButton = <h3>Analyze</h3>
            }
        }

        return (
            <div className='create'>
                <Player stream_id={this.props.match.params.stream_id}></Player>
                {analyzeButton}
                {clips}
                {montageButton}
            </div>
        );
    }
};

const mapState = function(state) {
    return {
        config: state.config,
        ...state.create,
    };
};

const mapActions = {
    streamNew: createActions.streamNew,
    streamUpdate: createActions.streamUpdate,
};

export default withRouter(connect(mapState, mapActions)(Create));
