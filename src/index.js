import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import * as serviceWorker from './serviceWorker';

import auth from './services/auth';

import './index.css';

const render = async function() {
    await auth.check();
    ReactDOM.render(
        <App />,
        document.getElementById('root'),
    );
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
