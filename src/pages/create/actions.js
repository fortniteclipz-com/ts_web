export const createTypes = {
    STREAM_NEW: 'create::streamNew',
    STREAM_UPDATE: 'create::streamUpdate',
};

const createActions = {};

createActions.streamNew = function(stream_id) {
    return {
        type: createTypes.STREAM_NEW,
        payload: {
            stream_id: stream_id,
        },
    }
};


createActions.streamUpdate = function(stream) {
    return {
        type: createTypes.STREAM_UPDATE,
        payload: {
            stream: stream,
        },
    }
};

export default createActions;
