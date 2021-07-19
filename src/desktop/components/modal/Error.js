import React from "react";
import PropTypes from "prop-types";

class Error extends React.Component {
    render() {
        return (
            <div className="text-center mb-24">
                <p className="text-size--h2 text-red">{this.props.title}</p>
                <span>{this.props.description}</span>
            </div>
        );
    }
}

Error.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default Error;
