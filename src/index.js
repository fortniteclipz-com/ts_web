import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import * as serviceWorker from './serviceWorker';

import auth from './services/auth';
import config from './services/config';

import './index.css';

const tawkTo = function () {
    // eslint-disable-next-line
    const Tawk_API = window.Tawk_API || {};
    // eslint-disable-next-line
    const Tawk_LoadStart = new Date();
    (function(){
        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = `https://embed.tawk.to/${config.tawk.siteId}/default`;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
}

const render = async function() {
    await auth.check();
    ReactDOM.render(
        <App />,
        document.getElementById('root'),
    );
}

tawkTo();
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
