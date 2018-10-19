import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import { updateStream } from './actions';
import SelectStream from '../../components/create/select_stream';

import './styles.css'

class Create extends Component {
    constructor(props, state) {
        super(props)
        autoBind(this)
    }

    render() {
        console.log("render props", this.props);
        console.log("render state", this.state);
        const view = <SelectStream></SelectStream>
        return (
            <div className="create">
                {view}
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
