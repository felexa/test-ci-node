import React from "react";
import PropTypes from "prop-types";

import {Link as NextLink} from "config/routes";

class Link extends React.Component {
    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <NextLink route={this.props.route} params={this.props.params}>
                {this.props.children}
            </NextLink>
        );
    }
}

Link.propTypes = {
    route: PropTypes.string,
    params: PropTypes.instanceOf(Object),
    children: PropTypes.node
};

Link.defaultProps = {
    route: "",
    params: {},
    children: ""
};

export default Link;
