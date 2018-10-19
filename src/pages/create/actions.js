export const STREAM_NEW = 'create::streamNew'
export const STREAM_UPDATE = 'create::streamUpdate'

export function streamUpdate(stream) {
    return {
        type: STREAM_UPDATE,
        payload: {
            stream: stream,
        },
    }
};
