import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import createActions from './actions';
import api from '../../services/api';
import SelectStream from '../../components/create/select_stream';
import Player from '../../components/create/player';

import './styles.css'

class Create extends Component {

    constructor(props, state) {
        super(props)
        autoBind(this)
        this.state = {}
    }

    onStreamNew(event) {
        event.preventDefault();
        const stream_id = event.target.querySelector("input[data-stream-id]").value
        this.props.streamNew(stream_id);
        api.getStream(stream_id, (stream) => {
            this.props.streamUpdate(stream);
        });
    }

    render() {
        let findStream = null;
        let player = null;

        if (!this.props.stream_id) {
            findStream = (
                <SelectStream
                    onStreamNew={this.onStreamNew}
                ></SelectStream>
            );
        }

        if (this.props.stream_id) {
            player = (
                <Player
                    stream_id={this.props.stream_id}
                ></Player>
            )
        }

        return (
            <div className='create'>
                {player}
                {findStream}
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

export default connect(mapState, mapActions)(Create);
