/* eslint-disable quote-props */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Sticker extends React.Component {
    /**
     * @private
     * @method _getStatus
     * @returns {Status}
     */
    _getStatus() {
        return this.props.status;
    }

    /**
     * @private
     * @method _getLabel
     * @returns {string}
     */
    _getLabel(status) {
        let convert = {
            "Принят": "accepted",
            "На модерации": "modaration",
            "Отклонен": "reject"
        };

        return convert[status];
    }

    render() {
        return (
            <div className="sticker-outlined">
                <i className={classNames("sticker-outlined__label", `sticker-outlined__label--${this._getLabel(this._getStatus().getName())}`)} />
                <span>{this._getStatus().getName()}</span>
            </div>
        );
    }
}

Sticker.propTypes = {
    status: PropTypes.instanceOf(Object).isRequired
};

export default Sticker;
