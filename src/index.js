import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './app';
import createReducer from './components/create/reducer'
import * as serviceWorker from './serviceWorker';

import './index.css';

const reducers = combineReducers({
    create: createReducer,
});
const state = {};
const store = createStore(
    reducers,
    state,
    window.devToolsExtension && window.devToolsExtension(),
);

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root'),
    window.devToolsExtension && window.devToolsExtension()
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
