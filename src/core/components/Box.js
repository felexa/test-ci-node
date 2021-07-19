import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function Box(props) {
    let {
        component, className, shadow, rounded, bg, ...restProps
    } = props;

    return React.createElement(component, {
        className: classnames({
            [`box-shadow-${shadow}`]: Boolean(shadow),
            [`rounded-${rounded}`]: Boolean(rounded),
            [`bg-${bg}`]: Boolean(bg),
            [className]: true
        }),
        ...restProps
    });
}

Box.defaultProps = {
    className: "",
    component: "div",
    shadow: 0,
    rounded: 0,
    bg: 0
};

Box.propTypes = {
    className: PropTypes.string,
    component: PropTypes.elementType,
    shadow: PropTypes.oneOf([Box.defaultProps.shadow, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    rounded: PropTypes.oneOf([Box.defaultProps.rounded, 3, 4, 5, 6, 7, 8, 9, 10, 16, 100]),
    bg: PropTypes.oneOf([Box.defaultProps.bg, "primary", "success", "danger", "warning", "info", "light", "dark"])
};

export default Box;
