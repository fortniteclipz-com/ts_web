import { PropTypes } from 'prop-types';
import { Component } from 'react';
import autoBind from 'react-autobind';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-129317052-1');

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
    }

    sendPageView(location) {
        // console.log("GAListener | sendPageView");
        ReactGA.set({
            page: location.pathname,
        });
        ReactGA.pageview(location.pathname);
    }

    render() {
        return this.props.children;
    }
}
