/* eslint-disable no-underscore-dangle, react/no-danger */
import React from "react";

class Esputnik {
    constructor(props) {
        /**
         * @property id
         * @type {string}
         */
        this.id = props.id;
    }

    /**
     * @public
     * @method getScript
     * @returns {string}
     */
    getScript() {
        return (
            <script
                dangerouslySetInnerHTML={{
                    __html: `setTimeout(() => {!function(a,b,d,c){var e=b.createElement(d);e.async=1,e.src="https://script.softcube.com/"+c+"/sc.js";var f=b.scripts[0];f.parentNode.insertBefore(e,f)}(window,document,"script","${this.id}");}, 2000);`
                }}
            />
        );
    }

    /**
     * @private
     * @method _sendEvent
     * @param name {string}
     * @param params {Object}
     * @returns {Esputnik}
     */
    _sendEvent(name, params) {
        let eventInterval = setInterval(function () {
            if (typeof window._sc === "object") {
                clearInterval(eventInterval);

                window._sc.sendEvent(name, params);
            }
        }, 100);

        setTimeout(function () {
            clearInterval(eventInterval);
        }, 3000);

        return this;
    }

    /**
     * @method sendProductPageEvent
     * @param productKey {string}
     * @param price {number}
     * @param isInStock {boolean}
     * @returns {Esputnik}
     */
    sendProductPageEvent(productKey, price, isInStock) {
        this._sendEvent("ProductPage", {
            ProductPage: {
                productKey,
                price: String(price),
                isInStock: Number(isInStock)
            }
        });

        return this;
    }

    /**
     * @method sendStatusCartEvent
     * @param products {[{productKey: string, price: string, quantity: number}]}
     * @returns {Esputnik}
     */
    sendStatusCartEvent(products = []) {
        this._sendEvent("StatusCart", {
            StatusCart: products
        });

        return this;
    }

    /**
     * @method sendPurchaseEvent
     * @param orderId {string}
     * @returns {Esputnik}
     */
    sendPurchaseEvent(orderId) {
        this._sendEvent("PurchasedItems", {
            OrderNumber: String(orderId)
        });

        return this;
    }

    /**
     * @method sendPurchaseOneClickEvent
     * @param orderId {string}
     * @param products {[{productKey: string, price: string, quantity: number}]}
     * @returns {Esputnik}
     */
    sendPurchaseOneClickEvent(orderId, products) {
        this._sendEvent("PurchasedItems", {
            OrderNumber: String(orderId),
            PurchasedItems: products
        });

        return this;
    }

    /**
     * @method sendCustomerDataEvent
     * @param email {string}
     * @param firstName {string}
     * @param phone {string}
     * @returns {Esputnik}
     */
    sendCustomerDataEvent(email, firstName, phone) {
        this._sendEvent("CustomerData", {
            email,
            firstName,
            phone: phone.replace(/\D/g, '')
        });

        return this;
    }
}

export default Esputnik;
