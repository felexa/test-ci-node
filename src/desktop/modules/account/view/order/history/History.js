import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import OrderStatusEnum from "app/core/utilites/enum/order/status";

class History extends React.Component {
    constructor(props) {
        super(props);

        this.icons = {};

        this.orderStatusEnum = OrderStatusEnum.getInstance();

        this._buildIcons();
    }

    /**
     * @method _isCompletedOrder
     * @return {boolean}
     * @private
     */
    _isCompletedOrder() {
        return this.orderStatusEnum.isCompleted(this.props.currentStatus.getId());
    }

    /**
     * @method _isCanceledOrder
     * @return {boolean}
     * @private
     */
    _isCanceledOrder() {
        return this.orderStatusEnum.isCanceled(this.props.currentStatus.getId());
    }

    /**
     * @method _getIconById
     * @param id {string}
     * @return {string}
     */
    _getIconById(id) {
        let defaultIcon = "icon-info";

        return this.icons[id] || defaultIcon;
    }

    /**
     * @method _buildIcons
     * @return {History}
     * @private
     */
    _buildIcons() {
        this.icons[this.orderStatusEnum.getCompletedAsValue()] = "icon-done";
        this.icons[this.orderStatusEnum.getCanceledAsValue()] = "icon-close-small";

        return this;
    }

    /**
     * @method _renderItems
     * @return {Array}
     * @private
     */
    _renderItems() {
        return this.props.items.map((item) => (
            <div
                key={item.getId()}
                className={classNames("item d-flex align-items-center", {
                    active: item.isActive(),
                    complete: item.isCompleted(),
                    abort: item.isAborted()
                })}
                data-status-id={item.getId()}
            >
                <div>
                    <span
                        className={classNames("icon", this._getIconById(item.getId()))}
                    />
                </div>

                <div>
                    <span className="item__name"> {item.getName()}</span>

                    {item.isCompleted() && (
                        <span className="item__date">{item.getDateAsText()}</span>
                    )}
                </div>
            </div>
        ));
    }

    render() {
        return (
            <section className="order-history">
                <div className="order-history__body">
                    <div
                        className={classNames("order-history__items", {
                            complete: this._isCompletedOrder(),
                            cancel: this._isCanceledOrder()
                        })}
                    >
                        {this._renderItems()}
                    </div>
                </div>
            </section>
        );
    }
}

History.propTypes = {
    currentStatus: PropTypes.instanceOf(Object).isRequired,
    items: PropTypes.instanceOf(Array)
};

History.defaultProps = {
    items: []
};

export default History;
