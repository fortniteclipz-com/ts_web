export const UPDATE_STREAM = 'create::updateStream'

export function updateStream(stream) {
    return {
        type: UPDATE_STREAM,
        payload: {
            stream: stream,
        },
    }
};
