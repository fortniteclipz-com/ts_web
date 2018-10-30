import React, { Component } from 'react';
import autoBind from 'react-autobind';

import api from '../../services/api';

import './styles.css'

export default class Account extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {};
    }

    componentDidMount() {
        console.log("Account | componentDidMount");
    }

    render() {
        return (
            <div className='account'>
                <h1>Account</h1>
            </div>
        );
    }
};
