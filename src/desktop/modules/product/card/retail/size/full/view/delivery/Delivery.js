/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Strings from "app/core/utilites/strings";

class Delivery extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        this.changeCity = this.changeCity.bind(this);
    }

    /**
     * @private
     * @method _hasPaidDelivery
     * @returns {Boolean}
     */
    _hasPaidDelivery() {
        return Boolean(this.getDeliveries().find((item) => item.getPrice() !== 0));
    }

    /**
     * @private
     * @method getDeliveries
     * @returns {Array}
     */
    getDeliveries() {
        return this.props.items;
    }

    /**
     * @private
     * @method getPrice
     * @param delivery {Delivery}
     * @returns {string}
     */
    getPrice(delivery) {
        let result = `${delivery.getPrice()} ${this.stringsResource.currency.uah}`;

        return delivery.getPrice() ? result : this.stringsResource.free;
    }

    /**
     * @private
     * @method _getFreeDeliveryStartPrice
     * @returns {string}
     */
    _getFreeDeliveryStartPrice() {
        return `500`; //todo temporary
    }

    /**
     * @private
     * @method getCurrentCityName
     * @returns {string}
     */
    getCurrentCityName() {
        let maxLength = 22;

        return this.strings.clip(this.props.currentCity.getName(), maxLength);
    }

    /**
     * @private
     * @method changeCity
     * @returns {Delivery}
     */
    changeCity() {
        this.props.changeCity();

        return this;
    }

    /**
     * @private
     * @method selectDelivery
     * @param delivery {Delivery}
     * @returns {Delivery}
     */
    selectDelivery(delivery) {
        this.props.selectDelivery(delivery);

        return this;
    }

    /**
     * @private
     * @method _renderTableHead
     * @returns {React.element}
     */
    _renderTableHead() {
        return (
            <thead className="delivery__thead">
                <tr className="text-uppercase text-small color-gray">
                    <td colSpan={2} className="f-weight-5">{this.stringsResource.deliveryCompany}</td>

                    {this._hasPaidDelivery() && (
                        <>
                            <td className="delivery__thead-item f-weight-5">
                                {`${this.stringsResource.orderUpTo} ${this._getFreeDeliveryStartPrice()} ${this.stringsResource.currency.uah}`}
                            </td>

                            <td className="delivery__thead-item f-weight-5">
                                {`${this.stringsResource.orderFrom} ${this._getFreeDeliveryStartPrice()} ${this.stringsResource.currency.uah}`}
                            </td>
                        </>
                    )}
                    <td />
                </tr>
            </thead>
        );
    }

    /**
     * @private
     * @method renderItems
     * @returns {Array}
     */
    renderItems() {
        return this.getDeliveries().map((item) => (
            <tr key={item.getId()}>
                <td className="delivery__logo vertical-align-top">
                    <img width="24" height="24" src={item.getLogo().getSrc()} alt={item.getTitle()} title={item.getTitle()} />
                </td>

                <td>
                    <span className="f-weight-4">{ item.getTitle() }</span>

                    <div className="d-lg-none mt-16">
                        <div className="d-flex align-items-center">
                            {this._hasPaidDelivery() && (
                                <span className="delivery__form-price text-uppercase text-small color-gray f-weight-5">
                                    {`${this.stringsResource.orderUpTo} ${this._getFreeDeliveryStartPrice()} ${this.stringsResource.currency.uah}`}
                                </span>
                            )}

                            <span className={classNames({"text-green": !item.getPrice()})}>
                                { this.getPrice(item) }
                            </span>
                        </div>

                        {this._hasPaidDelivery() && (
                            <div className="d-flex align-items-center mt-12">
                                <span className="delivery__up-to-price text-uppercase text-small color-gray f-weight-5">
                                    {`${this.stringsResource.orderFrom} ${this._getFreeDeliveryStartPrice()} ${this.stringsResource.currency.uah}`}
                                </span>

                                <span className="text-green">
                                    {this.stringsResource.free}
                                </span>
                            </div>
                        )}
                    </div>
                </td>

                <td className={classNames("d-none d-lg-table-cell delivery-price-value", {"text-green": !item.getPrice()})}>
                    { this.getPrice(item) }
                </td>

                {this._hasPaidDelivery() && (
                    <td className="d-none d-lg-table-cell delivery-price-value text-green">
                        {this.stringsResource.free}
                    </td>
                )}

                <td className="delivery__description text-right vertical-align-top">
                    <span className="icon icon-info" onClick={() => this.selectDelivery(item)} />
                </td>
            </tr>
        ));
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className={classNames("delivery", this.props.className)}>
                <div className="delivery__header">
                    <span>{this.stringsResource.deliveryTo}:</span>

                    <span className="delivery__to-location d-inline-flex align-items-center" onClick={this.changeCity}>
                        { this.getCurrentCityName() }

                        <span className="icon icon icon-chevron-down" />
                    </span>
                </div>

                <div className="delivery__body">
                    <table>
                        { this._renderTableHead() }

                        <tbody>
                            { this.renderItems() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Delivery.propTypes = {
    currentCity: PropTypes.instanceOf(Object).isRequired,
    changeCity: PropTypes.func.isRequired,
    className: PropTypes.string,
    items: PropTypes.instanceOf(Array),
    selectDelivery: PropTypes.func
};

Delivery.defaultProps = {
    className: "",
    items: [],
    selectDelivery: () => {}
};

export default Delivery;
