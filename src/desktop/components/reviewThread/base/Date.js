import React from "react";
import PropTypes from "prop-types";

class Date extends React.Component {
    /**
     * @private
     * @method _getDate
     * @returns {string}
     */
    _getDate() {
        return this.props.date;
    }

    /**
     * @private
     * @method _getDateAsISO
     * @returns {string}
     */
    _getDateAsISO() {
        return this
            ._getDate()
            .split('.')
            .reverse()
            .join('-');
    }

    /**
     * @public
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <time
                className={this.props.className}
                dateTime={this._getDateAsISO()}
            >
                {this._getDate()}
            </time>
        );
    }
}

Date.propTypes = {
    className: PropTypes.string,
    date: PropTypes.string
};

Date.defaultProps = {
    className: "",
    date: ""
};

export default Date;
