import ReactGA from 'react-ga';

import config from './config';

ReactGA.initialize(config.ga.trackingID, {debug: config.isDev()});
window.gaData = function(obj) {
    return Buffer.from(JSON.stringify(obj)).toString('base64');
};
document.onclick = (event) => {
    if (event.target.dataset.ga) {
        const gaEvent = JSON.parse(Buffer.from(event.target.dataset.ga, 'base64').toString());
        analytics.sendEvent(gaEvent);
    }
};

const analytics = {};

analytics.setUserId = function(userId) {
    // console.log("analytics | setUserId | userId", userId);
    ReactGA.set({
        userId: userId,
    });
};

analytics.sendPageview = function(location) {
    // console.log("analytics | sendPageview | location", location);
    ReactGA.pageview(`${location.pathname}${location.search}`);
};

analytics.sendModalview = function(modal) {
    // console.log("analytics | sendModalview | modal", modal);
    ReactGA.modalview(modal);
};

analytics.sendEvent = function(event) {
    // console.log("analytics | sendEvent | event", event);
    ReactGA.event(event);
};

export default analytics;
