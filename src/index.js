import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import { TS_API_KEY, TS_LIMIT, TS_URL } from './config';
import Routes from './routes';
import createReducer from './pages/create/reducer';

import * as serviceWorker from './serviceWorker';

import './index.css';

const reducers = combineReducers({
    config: (state = {}) => state,
    create: createReducer,
});
const state = {
    config: {
        TS_API_KEY: TS_API_KEY,
        TS_LIMIT: TS_LIMIT,
        TS_URL: TS_URL,
    }
};
const store = createStore(
    reducers,
    state,
    window.devToolsExtension && window.devToolsExtension(),
);

ReactDOM.render(
    (
        <Provider store={store}>
            <Routes />
        </Provider>
    ),
    document.getElementById('root'),
    window.devToolsExtension && window.devToolsExtension()
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
