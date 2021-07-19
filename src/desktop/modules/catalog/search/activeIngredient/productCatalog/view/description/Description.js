/* eslint-disable max-len, react/no-danger */
import React from "react";
import PropTypes from "prop-types";

class Description extends React.Component {
    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="catalog__description description">
                <div
                    className="description__body"
                    dangerouslySetInnerHTML={{
                        __html: this.props.description
                    }}
                />
            </div>
        );
    }
}

Description.propTypes = {
    description: PropTypes.string
};

Description.defaultProps = {
    description: ""
};

export default Description;
