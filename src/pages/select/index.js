import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

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
        // console.log("Select | componentDidMount");
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
        // console.log("Select | onSubmit");
        event.preventDefault();
        const streamId = event.target.querySelector('input[data-stream-id]').value;
        if (this.validateStreamId(streamId)) {
            this.props.history.push(`/create/${streamId}`);
        } else {
            NotificationManager.error("Consists of only numbers", "Invalid Twitch VideoID");
        }
    }

    validateStreamId(streamId) {
        const isNum = /^\d+$/.test(streamId);
        return isNum;
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
                <h5>Find Twitch stream by entering VideoID...</h5>
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
                        Find Stream
                    </Button>
                </form>
                <h5>Create with Twitch streams already analyzed...</h5>
                <div className='select__streams'>
                    {streamsHTML}
                </div>
            </div>
        );
    }
};
