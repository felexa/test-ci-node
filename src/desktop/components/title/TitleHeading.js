import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function TitleHeading(props) {
    return React.createElement(
        props.tag || "div",
        {
            className: classNames("title-heading", props.className)
        },
        props.children
    );
}

TitleHeading.propTypes = {
    tag: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

TitleHeading.defaultProps = {
    tag: "",
    className: ""
};

export default TitleHeading;
