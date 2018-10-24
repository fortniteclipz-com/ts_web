import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, FormControl } from 'react-bootstrap';
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

    componentDidMount() {
        // console.log("componentDidMount");
        api.getStreams((streams) => {
            streams = streams
                .map(function (stream) {
                    let user = "unknown";
                    if (stream.playlist_url) {
                        user = (stream.playlist_url.split("/")[3]).split("_")[1];
                    }
                    stream.user = user;
                    return stream;
                })
                .sort(function (a, b) {
                    if (a.user > b.user) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            this.setState({
                streams: streams,
            });
        });
    }

    onSubmit(event) {
        console.log("onSubmit");
        event.preventDefault();
        const stream_id = event.target.querySelector('input[data-stream-id]').value;
        this.props.history.push(`/create/${stream_id}`)
    };

    render() {
        const streamsHTML = this.state.streams.map(function (stream) {
                if (stream._status_analyze === 2) {
                    return (
                        <Link key={stream.stream_id} to={`/create/${stream.stream_id}`}>[{stream.user}—{stream.stream_id}]</Link>
                    );
                } else {
                    return (
                        <div key={stream.stream_id}>[{stream.user}—{stream.stream_id}]</div>
                    );
                }
            });

        return (
            <div className='select'>
                <div className='select__text'>Enter Twitch VideoID:</div>
                <form className='select__form' onSubmit={this.onSubmit}>
                  <FormControl
                    type='text'
                    className='select__input'
                    placeholder='Twitch VideoID'
                    data-stream-id
                  />
                    <Button type='submit' bsStyle='primary' className='select__button'>View Stream</Button>
                </form>
                <div className='select__streams'>
                    {streamsHTML}
                </div>
            </div>
        );
    }
};
