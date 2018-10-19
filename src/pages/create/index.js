import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import { streamUpdate } from './actions';
import FindStream from '../../components/create/find_stream';

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
        const stream = {stream_id: stream_id};

        console.log("Create onStreamNew", this.props);
        console.log("Create onStreamNew", this.state);

        this.props.streamUpdate(stream)

        // const url = `${TS_URL}/stream/${stream.stream_id}`
        // fetch(url, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "x-api-key": TS_API_KEY,
        //     },
        // })
        // .then(response => response.json())
        // .then(body => {
        //     console.log("onStreamNew body", body)
        //     this.props.streamUpdate(stream)
        // })
    }

    render() {
        console.log("Create render", this.props);
        console.log("Create render", this.state);
        let view = <FindStream onStreamNew={this.onStreamNew}></FindStream>
        if (this.props.stream) {
            view = null;
        }

        return (
            <div className="create">
                {view}
            </div>
        );
    }
};

const mapState = function (state) {
    return {
        config: state.config,
        ...state.create,
    };
};

const mapActions = {
    streamUpdate: streamUpdate,
};

export default connect(mapState, mapActions)(Create);
