import { TS_URL_ID, TS_URL, TS_API_KEY, TS_LIMIT } from './config';

console.log("TS_URL_ID", TS_URL_ID);
console.log("TS_URL", TS_URL);
console.log("TS_API_KEY", TS_API_KEY);
console.log("TS_LIMIT", TS_LIMIT);

const api = {};

api.getStream = function(stream_id, callback) {
    const url = `${TS_URL}/stream/${stream_id}`
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': TS_API_KEY,
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
    })
};

api.analyzeStream = function(stream_id, callback) {
    const url = `${TS_URL}/stream/${stream_id}/moments`
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": TS_API_KEY,
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
    const url = `${TS_URL}/montage`
    const _clips = clips.map(function(clip_id) {
        return {
            stream_id: parseInt(stream_id),
            time_in: clip_id.time_in,
            time_out: clip_id.time_out,
        };
    })
    const data = {
        clips: _clips,
    }
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": TS_API_KEY,
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
    const url = `${TS_URL}/montages?limit=${TS_LIMIT}`
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": TS_API_KEY,
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
