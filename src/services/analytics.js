import ReactGA from 'react-ga';

import config from './config';

ReactGA.initialize(config.ga.trackingID);
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

analytics.sendPageView = function(location) {
    // console.log("analytics | sendPageView | location", location);
    ReactGA.set({
        page: location.pathname,
    });
    ReactGA.pageview(location.pathname);
};

analytics.sendEvent = function(event) {
    // console.log("analytics | sendEvent | event", event);
    ReactGA.event(event);
};

export default analytics;
