import React from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

import Enum from "app/core/utilites/enum/product/status";

class Status extends React.Component {
    constructor(props) {
        super(props);

        this.status = props.status;

        this.statusEnum = Enum.getInstance();

        this.icons = {
            [this.statusEnum.getInStockAsValue()]: "icon-done",
            [this.statusEnum.getOutOfStockAsValue()]: "icon-minus"
        };
    }

    /**
     * @method getIconClass
     * @return {string}
     */
    getIconClass() {
        return this.icons[this.status.getId()] || "";
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className={ClassNames("status", this.props.className)} data-status-id={this.status.getId()}>
                <div className="status__body d-flex align-items-center">
                    <span className={ClassNames("status__icon icon rounded-10", this.getIconClass())} />
                    <span className="status__title">{ this.status.getName() }</span>
                </div>
            </div>
        );
    }
}

Status.propTypes = {
    className: PropTypes.string,
    status: PropTypes.instanceOf(Object).isRequired
};

Status.defaultProps = {
    className: ""
};

export default Status;
