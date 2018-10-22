// 310285421
// 323596438
const getCookie = function(name) {
    const value = "; " + document.cookie
    const parts = value.split("; " + name + "=")
    if (parts.length === 2) return parts.pop().split(";").shift()
}

const TS_URL_ID = getCookie('ts_url_id')
const TS_API_KEY = getCookie('ts_api_key')
const TS_LIMIT = getCookie('ts_limit') || 10
const TS_URL = `https://${TS_URL_ID}.execute-api.us-west-1.amazonaws.com/dev`

console.log("TS_URL_ID", TS_URL_ID)
console.log("TS_URL", TS_URL)
console.log("TS_API_KEY", TS_API_KEY)
console.log("TS_LIMIT", TS_LIMIT)

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

api.analyzeStream = function (stream_id, callback) {
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

api.createMontage = function (stream_id, clips, callback) {
    console.log("clips", clips);
    const url = `${TS_URL}/montage`
    const _clips = clips.map(function (clip_id) {
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

export default api;
