import { NotificationManager } from 'react-notifications';

import auth from './auth';
import config from './config';

const api = {};

api.getStream = async function(stream_id) {
    let stream = {};
    let stream_moments = [];
    try {
        const url = `${config.aws.apiGateway.url}/stream/${stream_id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.getToken(),
            },
        });
        const body = await response.json();
        if (body.stream) {
            stream = body.stream;
            stream_moments = body.stream_moments;
        }
    } catch (e) {
        console.log("api | getStream | e", e);
        const eStr = typeof(e) === 'object' ? e.message : e;
        NotificationManager.error(eStr, "Critical Error");
    }
    return [stream, stream_moments];
};

api.getStreams = async function() {
    let streams = [];
    try {
        const url = `${config.aws.apiGateway.url}/streams/recent`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.getToken(),
            },
        });
        const body = await response.json();
        if (body.streams) {
            streams = body.streams;
        }
    } catch (e) {
        console.log("api | getStreams | e", e);
        const eStr = typeof(e) === 'object' ? e.message : e;
        NotificationManager.error(eStr, "Critical Error");
    }
    return streams;
};

api.createMoments = async function(stream_id) {
    let stream = {};
    try {
        const url = `${config.aws.apiGateway.url}/stream/${stream_id}/moments`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.getToken(),
            },
            body: JSON.stringify({
                game: 'fortnite'
            }),
        })
        const body = await response.json();
        if (body.stream) {
            stream = body.stream;
        }
    } catch (e) {
        console.log("api | createMoments | e", e);
        const eStr = typeof(e) === 'object' ? e.message : e;
        NotificationManager.error(eStr, "Critical Error");
    }
    return stream
};

api.createMontage = async function(stream_id, clips) {
    let montage = null;
    try {
        const url = `${config.aws.apiGateway.url}/montage`
        const _clips = clips
            .filter(function(clip) {
                return clip.include;
            })
            .map(function(clip) {
                return {
                    time_in: clip.time_in,
                    time_out: clip.time_out,
                };
            })
        const data = {
            stream_id: stream_id,
            clips: _clips,
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.getToken(),
            },
            body: JSON.stringify(data),
        });
        const body = await response.json();
        if (body.montage) {
            montage = body.montage;
        }
    } catch (e) {
        console.log("api | createMontage | e", e);
        const eStr = typeof(e) === 'object' ? e.message : e;
        NotificationManager.error(eStr, "Critical Error");
    }
    return montage;
};

api.getMontages = async function() {
    let montages = [];
    try {
        let url = `${config.aws.apiGateway.url}/montages/recent`
        if (auth.getToken()) {
            url = `${config.aws.apiGateway.url}/montages`
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.getToken(),
            },
        });
        const body = await response.json();
        if (body.montages) {
            montages = body.montages;
        }
    } catch (e) {
        console.log("api | getMontages | e", e);
        const eStr = typeof(e) === 'object' ? e.message : e;
        NotificationManager.error(eStr, "Critical Error");
    }
    return montages
};

export default api;
