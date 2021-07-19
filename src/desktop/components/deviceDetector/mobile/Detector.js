import React from "react";
import PropTypes from "prop-types";

import DeviceDetector from "app/core/utilites/deviceDetector";

class Detector extends React.Component {
    constructor(props) {
        super(props);

        this.deviceDetector = DeviceDetector.getInstance();
    }

    render() {
        return this.deviceDetector.isMobile() && this.props.children;
    }
}

Detector.propTypes = {
    children: PropTypes.node.isRequired
};

export default Detector;
