import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function Checkbox(props) {
    let {label, className, ...restProps} = props;

    return (
        <label className={classnames("custom-input--checkbox", className)}>
            <input type="checkbox" {...restProps} />
            <span className="custom-input__state" />
            <span className="custom-input__name">{label}</span>
        </label>
    );
}

Checkbox.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string
};

Checkbox.defaultProps = {
    label: "",
    className: ""
};

export default Checkbox;
