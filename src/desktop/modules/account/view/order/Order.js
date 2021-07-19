import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import ModalDialogService from "app/core/services/modalDialog";

import Item from "./item/Item";
import History from "./history/History";

class Order extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property modalDialogService
         * @type {ModalDialog}
         */
        this.modalDialogService = ModalDialogService.getInstance();

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._showHistory = this._showHistory.bind(this);
    }

    /**
     * @method _showHistory
     * @param orderEntity {Order}
     * @return {Order}
     * @private
     */
    _showHistory(orderEntity) {
        this.modalDialogService.open({
            title: this.stringsResource.orderHistory,
            body: <History currentStatus={orderEntity.getStatus()} items={orderEntity.getAllStatues()} />
        });

        return this;
    }

    /**
     * @method _renderItems
     * @return {Array}
     * @private
     */
    _renderItems() {
        return this.props.items.map((item) => (
            <Item key={item.getId()} item={item} showHistory={this._showHistory} className="orders__order" />
        ));
    }

    render() {
        return (
            <section className="orders">
                <div className="orders__body">
                    <div className="orders__items">
                        {this._renderItems()}
                    </div>
                </div>
            </section>
        );
    }
}

Order.propTypes = {
    items: PropTypes.instanceOf(Array)
};

Order.defaultProps = {
    items: []
};

export default Order;
