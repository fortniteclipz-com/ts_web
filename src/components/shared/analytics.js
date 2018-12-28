import { PropTypes } from 'prop-types';
import React from 'react';
import autoBind from 'react-autobind';

import analytics from '../../services/analytics';

export default class Analytics extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props, state) {
        super(props);
        autoBind(this);
        this.state = {};
    }

    componentDidMount() {
        // console.log("Analytics | componentDidMount");
        analytics.sendPageview(this.context.router.history.location);
        this.context.router.history.listen(analytics.sendPageview);
    }

    render() {
        return this.props.children;
    }
}
