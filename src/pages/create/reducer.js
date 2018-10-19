import { createTypes } from './actions';

export default function createReducer(state = {}, { type, payload }) {
    // console.log("--------------------------");
    // console.log("createReducer update state", JSON.parse(JSON.stringify(state)));
    // console.log("createReducer update type", type);
    // console.log("createReducer update payload", payload);

    switch (type) {
        case createTypes.STREAM_NEW:
            return Object.assign({}, state, {
                stream_id: payload.stream_id,
                stream: null,
            });
        case createTypes.STREAM_UPDATE:
            return Object.assign({}, state, {
                stream: payload.stream,
            });
        default:
            return state;
    }
};
