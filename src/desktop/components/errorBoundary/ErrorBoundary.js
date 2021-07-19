import React from "react";
import PropTypes from "prop-types";
import Error from "app/desktop/components/error/Error";

import BaseAnalytics from "app/core/analytics";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorDetails: null,
            hasError: false
        };

        this.analytics = BaseAnalytics.getInstance();
    }

    /**
     * @static
     * @method getDerivedStateFromError
     * @param errorDetails {Error}
     * @returns {Object}
     */
    static getDerivedStateFromError(errorDetails) {
        return {
            errorDetails,
            hasError: true
        };
    }

    render() {
        if (this.state.hasError) {
            this.analytics.sendGoogleAnalyticsEvent("error", "pageError");

            return (<Error lang={this.props.language} details={this.state.errorDetails} />);
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    language: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number])
};

ErrorBoundary.defaultProps = {
    language: "",
    children: ""
};

export default ErrorBoundary;
