import { PropTypes } from 'prop-types';
import { Component } from 'react';
import autoBind from 'react-autobind';
import ReactGA from 'react-ga';

import config from '../../services/config';

ReactGA.initialize(config.ga.trackingID);
window.gaData = function(obj) {
    return Buffer.from(JSON.stringify(obj)).toString('base64');
};

export default class GAListener extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {};
    }

    componentDidMount() {
        // console.log("GAListener | componentDidMount");
        this.sendPageView(this.context.router.history.location);
        this.context.router.history.listen(this.sendPageView);
        window.gaEvent = (event) => {
            this.sendEvent(event);
        };
        document.onclick = (event) => {
            if (event.target.dataset.ga) {
                const gaEvent = JSON.parse(Buffer.from(event.target.dataset.ga, 'base64').toString());
                this.sendEvent(gaEvent);
            }
        };
    }

    sendPageView(location) {
        // console.log("GAListener | sendPageView", location);
        ReactGA.set({
            page: location.pathname,
        });
        ReactGA.pageview(location.pathname);
    }

    sendEvent(event) {
        // console.log("GAListener | sendEvent", event);
        ReactGA.event(event);
    }

    render() {
        return this.props.children;
    }
}
