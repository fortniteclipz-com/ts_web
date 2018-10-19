import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import createActions from './actions';
import api from '../../services/api';
import FindStream from '../../components/create/find_stream';
import ShowStream from '../../components/create/show_stream';

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
        let view = (
            <FindStream
                onStreamNew={this.onStreamNew}
            ></FindStream>
        );

        if (this.props.stream_id) {
            view = (
                <ShowStream
                    stream_id={this.props.stream_id}
                    stream={this.props.stream}
                ></ShowStream>
            );
        }

        return (
            <div className="create">
                {view}
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
