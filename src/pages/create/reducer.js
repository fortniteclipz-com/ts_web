import { STREAM_UPDATE } from './actions';

export default function createReducer(state = {}, {type, payload}) {
    console.log("--------------------------");
    console.log("createReducer update state", JSON.parse(JSON.stringify(state)));
    console.log("createReducer update type", type);
    console.log("createReducer update payload", payload);
    console.log("--------------------------");
    switch (type) {
        case STREAM_UPDATE:
            state.stream = payload.stream
            return state;
        default:
            return state;
    }
};
