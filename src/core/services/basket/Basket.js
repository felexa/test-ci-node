import _ from "lodash";

class Basket {
    constructor(props) {
        /**
         * @property requestsProcessing
         * @type {Object}
         */
        this.requestsProcessing = {
            basket: new props.dependencies.RequestQueue()
        };

        /**
         * @property basket
         * @type {Object}
         */
        this.basket = null;

        this.observer = new props.dependencies.Observer().installTo(this);

        this.Env = props.dependencies.Env;
        this.Repository = props.dependencies.Repository;
        this.BasketEntity = props.dependencies.BasketEntity;

        this._setBasket({});
    }

    /**
     * @private
     * @method _hasItemByCurrentBasket
     * @param itemId {string|number}
     * @returns {boolean}
     */
    _hasItemByCurrentBasket(itemId) {
        return Boolean(this.basket.getItems().find((item) => item.getPosition().getId() === itemId));
    }

    /**
     * @private
     * @method _buildBasket
     * @param basket {Object}
     * @returns {{price: Pagination, id: string|number, items: Catalog[]}}
     */
    _buildBasket(basket) {
        return new this.BasketEntity(basket);
    }

    /**
     * @private
     * @method _setBasket
     * @param basket {Object}
     * @returns {Basket}
     */
    _setBasket(basket) {
        this.basket = this._buildBasket(basket);

        return this;
    }

    /**
     * @public
     * @method hasItem
     * @param id {string|number}
     * @param success {Function}
     * @returns {Basket}
     */
    hasItemById(id, success) {
        if (this.basket.getId()) {
            success(this._hasItemByCurrentBasket(id));
        } else {
            this.getBasket(
                () => {
                    success(this._hasItemByCurrentBasket(id));
                },
                () => success(false)
            );
        }

        return this;
    }

    /**
     * @public
     * @method getEmptyBasket
     * @returns {Basket}
     */
    getEmptyBasket() {
        return this._buildBasket({});
    }

    /**
     * @public
     * @method getBasket
     * @param success {Function}
     * @param error {Function}
     * @returns {Basket}
     */
    getBasket(success, error) {
        this.requestsProcessing.basket.addSuccess(success).addError(error);

        if (!this.requestsProcessing.basket.isPending()) {
            this.requestsProcessing.basket.toPending();

            this.Repository
                .getBasket(
                    (basket) => {
                        this._setBasket(basket);

                        this.requestsProcessing.basket.success(this.basket.copy());
                    },
                    (exception) => {
                        this.requestsProcessing.basket.error(exception);
                    }
                )
                .then(() => {
                    this.requestsProcessing.basket.clear();
                })
                .catch(() => {
                    this.requestsProcessing.basket.clear();
                });
        }

        return this;
    }

    /**
     * @public
     * @param itemId {string|number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Basket}
     */
    addItem(itemId, success, error) {
        if (itemId && _.isFunction(success) && _.isFunction(error)) {
            this
                .Repository
                .addItem(itemId, success, error)
                .then((basket) => {
                    if (basket) {
                        this
                            ._setBasket(basket)
                            .observer
                            .trigger("addedItem", this.basket.copy())
                            .trigger("update", this.basket.copy());
                    }
                });
        }

        return this;
    }

    /**
     * @public
     * @method deleteItem
     * @param itemId {string|number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Basket}
     */
    deleteItem(itemId, success, error) {
        if (itemId && _.isFunction(success) && _.isFunction(error)) {
            this
                .Repository
                .changeCount(itemId, 0, success, error)
                .then((basket) => {
                    if (basket) {
                        this
                            ._setBasket(basket)
                            .observer
                            .trigger("update", this.basket.copy());
                    }
                });
        }

        return this;
    }

    /**
     * @public
     * @method changeCount
     * @param itemId {string|number}
     * @param quantity {number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Basket}
     */
    changeCount(itemId, quantity, success, error) {
        if (itemId && _.isFinite(quantity) && _.isFunction(success) && _.isFunction(error)) {
            this
                .Repository
                .changeCount(itemId, quantity, success, error)
                .then((basket) => {
                    if (basket) {
                        this
                            ._setBasket(basket)
                            .observer
                            .trigger("update", this.basket.copy());
                    }
                });
        }

        return this;
    }

    /**
     * @public
     * @method open
     * @returns {Basket}
     */
    open() {
        if (this.basket.getId()) {
            this.observer.trigger("open", this.basket.copy());
        }

        return this;
    }

    /**
     * @public
     * @method toCheckout
     * @returns {Basket}
     */
    toCheckout() {
        window.location.href = `${this.Env.getBitrixHost()}/personal/order/make/`;

        return this;
    }

    /**
     * @public
     * @method createOrder
     * @param order {{itemId: string|number, name: string, phone: string, email: string}}
     * @param success {Function}
     * @param error {Function}
     * @returns {Basket}
     */
    createOrder(order, success, error) {
        if (order && _.isFunction(success) && _.isFunction(error)) {
            this
                .Repository
                .createOrder(order, success, error);
        }

        return this;
    }
}

export default Basket;
