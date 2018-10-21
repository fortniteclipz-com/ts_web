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
        stream.moments = [];
        if (body.stream) {
            stream = body.stream;
            stream.moments = body.stream_moments;
        }
        callback(stream);
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
}

export default api;
