import auth from './auth';
import config from './config';

const api = {};

api.getStream = function(stream_id, callback) {
    const url = `${config.aws.apiGateway.url}/stream/${stream_id}`
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.getToken(),
        },
    })
    .then(response => response.json())
    .then(body => {
        let stream = {};
        let stream_moments = [];
        if (body.stream) {
            stream = body.stream;
            stream_moments = body.stream_moments;
        }
        callback(stream, stream_moments);
    });
};

api.getStreams = function(callback) {
    const url = `${config.aws.apiGateway.url}/streams?limit=${config.aws.apiGateway.limit}`
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.getToken(),
        },
    })
    .then(response => response.json())
    .then(body => {
        let streams = [];
        if (body.streams) {
            streams = body.streams;
        }
        callback(streams);
    });
};

api.createMoments = function(stream_id, callback) {
    const url = `${config.aws.apiGateway.url}/stream/${stream_id}/moments`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.getToken(),
        },
        body: JSON.stringify({}),
    })
    .then(response => response.json())
    .then(body => {
        let stream = {};
        if (body.stream) {
            stream = body.stream;
        }
        callback(stream);
    });
};

api.createMontage = function(stream_id, clips, callback) {
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
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.getToken(),
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(body => {
        let montage = {};
        if (body.montage) {
            montage = body.montage;
        }
        callback(montage);
    });
};

api.getMontages = function(callback) {
    const url = `${config.aws.apiGateway.url}/montages?limit=${config.aws.apiGateway.limit}`
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.getToken(),
        },
    })
    .then(response => response.json())
    .then(body => {
        let montages = [];
        if (body.montages) {
            montages = body.montages;
        }
        callback(montages);
    });
};

export default api;
