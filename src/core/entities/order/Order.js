import Entity from "app/core/entities/Entity";
import Status from "app/core/entities/status/Status";
import Profile from "app/core/entities/profile/Profile";
import Basket from "app/core/entities/basket/Basket";
import Price from "app/core/entities/price/Price";

import Strings from "app/core/utilites/strings";

class Order extends Entity {
    constructor(entity) {
        super(entity);

        this.strings = Strings.getInstance();
    }

    /**
     * @public
     * @method getOrderId
     * @return {string}
     */
    getOrderId() {
        return this.entity.orderId || "";
    }

    /**
     * @public
     * @method getStatus
     * @returns {Status}
     */
    getStatus() {
        return new Status(this.entity.status);
    }

    /**
     * @public
     * @method getAllStatues
     * @return {Status[]}
     */
    getAllStatues() {
        return (this.entity.statuses || []).map((item) => new Status(item));
    }

    /**
     * @public
     * @method getCreationDateAsText
     * @return {string}
     */
    getCreationDateAsText() {
        return this.strings.formatDate(new Date(this.entity.createdAt)) || "";
    }

    /**
     * @public
     * @method getCustomer
     * @return {Profile}
     */
    getCustomer() {
        return new Profile(this.entity.customer);
    }

    /**
     * @method getDelivery
     * @return {{getAddressAsText(): string, getType(): string, getPrice(): number}}
     */
    getDelivery() {
        let delivery = this.entity.delivery || {};

        return {
            /**
             * @public
             * @method getType
             * @return {string}
             */
            getType() {
                return delivery.type || "";
            },
            /**
             * @public
             * @method getTTN
             * @return {string}
             */
            getTTN() {
                return delivery.TTN || "";
            },
            /**
             * @public
             * @method getAddressAsText
             * @return {string}
             */
            getAddressAsText() {
                return "";
            },
            /**
             * @public
             * @method getPrice
             * @return {Price}
             */
            getPrice() {
                return new Price(delivery.price);
            }
        };
    }

    /**
     * @public
     * @method getPayment
     * @return {{getDescription(): string}}
     */
    getPayment() {
        let payment = this.entity.payment || {};

        return {
            /**
             * @public
             * @method getType
             * @return {string|number}
             */
            getType() {
                return payment.type || "";
            }
        };
    }

    /**
     * @public
     * @method getBasket
     * @return {Basket}
     */
    getBasket() {
        return new Basket(this.entity.basket);
    }
}

export default Order;
