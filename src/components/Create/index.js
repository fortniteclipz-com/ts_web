import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { updateStream } from './actions';

import './styles.css'

class Create extends Component {
    constructor(props, state) {
        super(props)
        autoBind(this)
    }

    render() {
        return (
            <div className="create">
                <p className="create__title">Create</p>
            </div>
        );
    }
};

const mapState = function (state) {
    return state;
};

const mapActions = {
    updateStream: updateStream,
};

export default connect(mapState, mapActions)(Create);
