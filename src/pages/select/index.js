import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css'

export default class Select extends Component {

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {
            streams: [],
        };
    }

    async componentDidMount() {
        // console.log("componentDidMount");
        let streams = await api.getStreams();
        streams = streams.sort(function(a, b) {
            if (a.user > b.user) {
                return 1;
            } else {
                return -1;
            }
        });
        this.setState({
            streams: streams,
        });
    }

    onSubmit(event) {
        console.log("onSubmit");
        event.preventDefault();
        const stream_id = event.target.querySelector('input[data-stream-id]').value;
        this.props.history.push(`/create/${stream_id}`)
    }

    render() {
        const streamsHTML = this.state.streams.map(function(stream) {
            let bsStyle = 'default';
            if (stream._status_analyze === 2) {
                bsStyle = 'success';
            } else if (stream._status_analyze === 1) {
                bsStyle = 'danger';
            }

            return (
                <Button
                    key={stream.stream_id}
                    bsStyle={bsStyle}
                    componentClass={Link}
                    to={`/create/${stream.stream_id}`}
                >
                    {stream.stream_id} ({stream.streamer || "unknown"})
                </Button>
            );
        });

        return (
            <div className='select'>
                <h4>Find Twitch stream by manually entering Twitch VideoID...</h4>
                <form className='select__form' onSubmit={this.onSubmit}>
                    <FormGroup controlId='select__input'>
                        <FormControl
                            data-stream-id
                            type='text'
                            placeholder='Twitch VideoID'
                        />
                    </FormGroup>
                    <Button
                        type='submit'
                        bsStyle='primary'
                    >
                        Find Stream with Twitch VideoID
                    </Button>
                </form>
                <h4>Create with Twitch streams already analyzed...</h4>
                <div className='select__streams'>
                    {streamsHTML}
                </div>
            </div>
        );
    }
};
