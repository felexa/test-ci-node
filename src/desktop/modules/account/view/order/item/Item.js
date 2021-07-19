import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import PaymentTypeEnum from "app/core/utilites/enum/payment/type";
import DeliveryTypeEnum from "app/core/utilites/enum/delivery/type";
import DescriptionPaymentTypeEnum from "app/core/utilites/enum/payment/descriptionType";
import DescriptionDeliveryTypeEnum from "app/core/utilites/enum/delivery/descriptionType";

import Price from "desktop/components/price/Price";
import Status from "./status/Status";

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.classes = {
            chevronUp: "icon-chevron-up",
            chevronDown: "icon-chevron-down"
        };

        this.state = {
            isOpen: false
        };

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.paymentTypeEnum = PaymentTypeEnum.getInstance();
        this.deliveryTypeEnum = DeliveryTypeEnum.getInstance();
        this.descriptionPaymentTypeEnum = DescriptionPaymentTypeEnum.getInstance();
        this.descriptionDeliveryTypeEnum = DescriptionDeliveryTypeEnum.getInstance();

        this._toggleVisibility = this._toggleVisibility.bind(this);
        this._showHistory = this._showHistory.bind(this);
    }

    /**
     * @method _isOpen
     * @return {boolean}
     * @private
     */
    _isOpen() {
        return this.state.isOpen;
    }

    /**
     * @method _toggleVisibility
     * @return {Item}
     * @private
     */
    _toggleVisibility() {
        this.setState((prevState) => ({isOpen: !prevState.isOpen}));

        return this;
    }

    /**
     * @method _getFormattedDate
     * @return {string}
     * @private
     */
    _getFormattedDate() {
        let dateIndex = 0,
            separator = ".",
            date = this.props.item.getCreationDateAsText();

        return date.split(" ")[dateIndex].replace(/-/g, separator);
    }

    /**
     * @method _getPaymentDescription
     * @param type {string|number}
     * @return {string}
     * @private
     */
    _getPaymentDescription(type) {
        return this.descriptionPaymentTypeEnum.getValueByKey(this.paymentTypeEnum.getKeyByValue(type));
    }

    /**
     * @method _getDeliveryDescription
     * @param type {string|number}
     * @return {string}
     * @private
     */
    _getDeliveryDescription(type) {
        return this.descriptionDeliveryTypeEnum.getValueByKey(this.deliveryTypeEnum.getKeyByValue(type));
    }

    /**
     * @method _showHistory
     * @param e {Object}
     * @return {Item}
     * @private
     */
    _showHistory(e) {
        e.stopPropagation();

        this.props.showHistory(this.props.item);

        return this;
    }

    /**
     * @method _renderPreviewOfItems
     * @return {Array}
     * @private
     */
    _renderPreviewOfItems() {
        return this.props.item.getBasket().getItems().map((item) => (
            <div key={item.getId()} className="preview-of-items__item">
                <div className="item__preview">
                    <img
                        src={item.getPosition().getPreview().getSmall()}
                        alt={item.getPosition().getPreview().getAlt()}
                    />
                </div>
            </div>
        ));
    }

    /**
     * @method _renderHeader
     * @return {React.element}
     * @private
     */
    _renderHeader() {
        let item = this.props.item;

        return (
            <div className="row">
                <div className="col-lg-7 col-md-7 col-10 pl-0">
                    <div className="row">
                        <div className="col-lg-7 col-md-7 pr-0">
                            <div className="order-item__status mb-16 pl-8">
                                <Status status={item.getStatus()} />
                            </div>

                            <div className="pl-8">
                                <span className="order-item__id">№ {item.getOrderId()} </span>

                                <span className="order-item__date text-lowercase">
                                    {this.stringsResource.from} {this._getFormattedDate()}
                                </span>
                            </div>
                        </div>

                        <div className="col-lg-5 col-md-5 col--total-price">
                            <div className="d-flex align-items-center mt-6">
                                <span className="order-item__title">
                                    {this.stringsResource.orderPrice}:&nbsp;
                                </span>

                                <Price
                                    className="order-item__total-price text-black"
                                    value={item.getBasket().getPrice().getTotalPrice()}
                                />
                            </div>

                            <div className="d-flex align-items-start mt-16">
                                <button
                                    type="button"
                                    className="btn-link btn-sm p-0 f-weight-4"
                                    onClick={this._showHistory}
                                >
                                    {this.stringsResource.orderHistory}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 col-md-5 col-2">
                    <div className="d-flex justify-content-end align-items-center h-100">
                        <div className="order-item__preview-of-items d-none d-md-flex">
                            {this._renderPreviewOfItems()}
                        </div>

                        <span
                            className={
                                classNames(
                                    "icon order-item__toggle-visibility",
                                    this.props.className,
                                    {
                                        [this.classes.chevronUp]: this._isOpen(),
                                        [this.classes.chevronDown]: !this._isOpen()
                                    }
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @method _renderItems
     * @return {Array}
     * @private
     */
    _renderItems() {
        return this.props.item.getBasket().getItems().map((item) => (
            <div key={item.getId()} className="basket__item">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <div className="item__preview">
                            <img
                                src={item.getPosition().getPreview().getSmall()}
                                alt={item.getPosition().getPreview().getAlt()}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-10">
                        <a href={item.getPosition().getUrl()} target="_blank" className="text-decoration-none">
                            {item.getPosition().getName()}
                        </a>
                    </div>

                    <div className="col-lg-2 col-md-2 col--quantity">
                        <div className="d-flex justify-content-between justify-content-md-center">
                            <span className="order-item__title d-md-none">
                                {this.stringsResource.quantity}
                            </span>

                            <span className="text-black">
                                {item.getQuantity()}
                            </span>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-2">
                        <div className="d-flex justify-content-between justify-content-md-end">
                            <span className="order-item__title d-md-none">
                                {this.stringsResource.amount}
                            </span>

                            <Price value={item.getPrice().getCurrent()} />
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    /**
     * @method _renderSummary
     * @return {React.element}
     * @private
     */
    _renderSummary() {
        let item = this.props.item;

        return (
            <div className="order-item__summary">
                <div className="summary__header">
                    <span className="order-item__title">
                        {this.stringsResource.informationAboutOrder}
                    </span>
                </div>

                <div className="summary__body">
                    <p>ТТН {item.getDelivery().getTTN()}</p>

                    <p>
                        {this._getDeliveryDescription(item.getDelivery().getType())}
                    </p>

                    <p>{item.getDelivery().getAddressAsText()}</p>

                    <p>{item.getCustomer().getFullName()}</p>

                    <p>{item.getCustomer().getPhone()}</p>

                    <p>{item.getCustomer().getEmail()}</p>
                </div>
            </div>
        );
    }

    /**
     * @method
     * @return {*}
     * @private
     */
    _renderBasket() {
        let item = this.props.item;

        return (
            <div className="order-item__basket">
                <div className="basket__header">
                    <div className="row">
                        <div className="col-8">
                            <span className="order-item__title">
                                {this.stringsResource.informationAboutProduct}
                            </span>
                        </div>

                        <div className="col-2 d-none d-md-block text-center">
                            <span className="order-item__title">
                                {this.stringsResource.quantity}
                            </span>
                        </div>

                        <div className="col-2 d-none d-md-block text-right">
                            <span className="order-item__title">
                                {this.stringsResource.amount}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="basket__body">
                    <div className="basket__items">
                        {this._renderItems()}
                    </div>
                </div>

                <div className="basket__footer">
                    <ul className="basket__summary">
                        <li className="">
                            <span className="order-item__title">
                                {this.stringsResource.payment}
                            </span>

                            <span>
                                {this._getPaymentDescription(item.getPayment().getType())}
                            </span>
                        </li>

                        <li>
                            <span className="order-item__title">
                                {this.stringsResource.orderPrice}
                            </span>

                            <Price value={item.getBasket().getPrice().getCurrent()} />
                        </li>

                        <li>
                            <span className="order-item__title">
                                {this.stringsResource.deliveryPrice}
                            </span>

                            <Price value={item.getDelivery().getPrice().getCurrent()} />
                        </li>

                        <li>
                            <span className="order-item__title f-weight-5 text-medium">
                                {this.stringsResource.total}
                            </span>

                            <Price value={item.getBasket().getPrice().getTotalPrice()} />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={classNames("order-item rounded-10", this.props.className, {active: this._isOpen()})}>
                <div className="order-item__header cursor-pointer" onClick={this._toggleVisibility}>
                    {this._renderHeader()}
                </div>

                <div className="order-item__body">
                    <div className="row">
                        <div className="col-lg-4">
                            {this._renderSummary()}
                        </div>

                        <div className="col-lg-8">
                            {this._renderBasket()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    className: PropTypes.string,
    item: PropTypes.instanceOf(Object).isRequired,
    showHistory: PropTypes.func
};

Item.defaultProps = {
    className: "",
    showHistory: () => {}
};

export default Item;
