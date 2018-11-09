import auth from './auth';
import config from './config';

const api = {};

api.getStream = async function(stream_id, callback) {
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
        let stream = {};
        let stream_moments = [];
        if (body.stream) {
            stream = body.stream;
            stream_moments = body.stream_moments;
        }
        callback(stream, stream_moments);
    } catch (e) {
        console.log("api | getStream | e", e);
    }
};

api.getStreams = async function(callback) {
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
        console.log("body", body);
        let streams = [];
        if (body.streams) {
            streams = body.streams;
        }
        callback(streams);
    } catch (e) {
        console.log("api | getStreams | e", e);
    }
};

api.createMoments = async function(stream_id, callback) {
    try {
        const url = `${config.aws.apiGateway.url}/stream/${stream_id}/moments`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.getToken(),
            },
            body: JSON.stringify({}),
        })
        const body = await response.json();
        let stream = {};
        if (body.stream) {
            stream = body.stream;
        }
        callback(stream);
    } catch (e) {
        console.log("api | createMoments | e", e);
    }
};

api.createMontage = async function(stream_id, clips, callback) {
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
        let montage = {};
        if (body.montage) {
            montage = body.montage;
        }
        callback(montage);
    } catch (e) {
        console.log("api | createMontage | e", e);
    }
};

api.getMontages = async function(callback) {
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
        let montages = [];
        if (body.montages) {
            montages = body.montages;
        }
        callback(montages);
    } catch (e) {
        console.log("api | getMontages | e", e);
    }
};

export default api;
