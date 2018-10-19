import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import createActions from './actions';
// import api from '../../services/api';
import ViewFindStream from '../../components/create/view_find_stream';

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
        console.log("Create onStreamNew", this.props);
        console.log("Create onStreamNew", this.state);
        this.props.streamNew(stream_id)


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
        let view = <ViewFindStream onStreamNew={this.onStreamNew}></ViewFindStream>
        if (this.props.stream_id) {
            view = (<h1>Sachin was here</h1>);
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
    streamNew: createActions.streamNew,
    streamUpdate: createActions.streamUpdate,
};

export default connect(mapState, mapActions)(Create);
