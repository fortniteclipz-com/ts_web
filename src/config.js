function getCookie(name) {
    const value = "; " + document.cookie
    const parts = value.split("; " + name + "=")
    if (parts.length === 2) return parts.pop().split(";").shift()
}

const TS_URL_ID = getCookie('ts_url_id')
export const TS_API_KEY = getCookie('ts_api_key')
export const TS_LIMIT = getCookie('ts_limit') || 10
export const TS_URL = `https://${TS_URL_ID}.execute-api.us-west-1.amazonaws.com/dev`

console.log("TS_URL_ID", TS_URL_ID)
console.log("TS_URL", TS_URL)
console.log("TS_API_KEY", TS_API_KEY)
console.log("TS_LIMIT", TS_LIMIT)
