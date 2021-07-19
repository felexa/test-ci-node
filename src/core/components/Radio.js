import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function Radio(props) {
    let {label, className, ...restProps} = props;

    return (
        <label className={classnames("custom-input--radio", className)}>
            <input type="radio" {...restProps} />
            <span className="custom-input__state" />
            <span className="custom-input__name">{label}</span>
        </label>
    );
}

Radio.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string
};

Radio.defaultProps = {
    label: "",
    className: ""
};

export default Radio;
