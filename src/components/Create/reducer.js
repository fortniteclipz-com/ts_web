import { UPDATE_STREAM } from './actions';

const createReducer = function (state = {}, { type, payload }) {
    console.log("createReducer update", state, type, payload);
    switch (type) {
        case UPDATE_STREAM:
            state.stream = payload.stream
            return state;
        default:
            return state;
    }
}

export default createReducer;
