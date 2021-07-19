import BaseAnalytics from "app/core/analytics";

class Analytics {
    constructor() {
        /**
         * @property eventCategory
         * @type {string}
         */
        this.eventCategory = "ecommerce";

        /**
         * @property eventActions
         * @type {Object}
         */
        this.eventActions = {
            closeBasket: "bascet_close",
            deleteItem: "basket_delete",
            decreaseCount: "pokupka_minus",
            increaseCount: "pokupka_plus",
            redirectToCheckout: "make_order",
            redirectToProduct: "pokupka_click",
            selectRecommendedProduct: "basket_recommended_product_select"
        };

        /**
         * @property analytics
         * @type {Object}
         */
        this.analytics = BaseAnalytics.getInstance();

        this._sendGTMEvent = this._sendGTMEvent.bind(this);
        this._sendAdmitAdEvent = this._sendAdmitAdEvent.bind(this);
    }

    /**
     * @private
     * @method _sendGTMEvent
     * @param eventAction {string|string[]}
     * @returns {Analytics}
     */
    _sendGTMEvent(eventAction) {
        this.analytics.sendGoogleAnalyticsEvent(this.eventCategory, eventAction);

        return this;
    }

    /**
     * @private
     * @method _sendAdmitAdEvent
     * @param basket {Object}
     * @returns {Analytics}
     */
    _sendAdmitAdEvent(basket) {
        this.analytics.sendAdmitAdEvent('basket', basket);

        return this;
    }

    /**
     * @public
     * @method selectRecommendedProduct
     * @returns {Analytics}
     */
    selectRecommendedProduct() {
        this._sendGTMEvent(this.eventActions.selectRecommendedProduct);

        return this;
    }

    /**
     * @public
     * @method addRecommendedProductToBasket
     * @returns {Analytics}
     */
    addRecommendedProductToBasket() {
        this._sendGTMEvent(this.eventActions.selectRecommendedProduct);

        return this;
    }

    /**
     * @public
     * @method redirectToRecommendedProductReview
     * @returns {Analytics}
     */
    redirectToRecommendedProductReview() {
        this._sendGTMEvent(this.eventActions.selectRecommendedProduct);

        return this;
    }

    /**
     * @public
     * @method closeBasket
     * @returns {Analytics}
     */
    closeBasket() {
        this._sendGTMEvent(this.eventActions.closeBasket);

        return this;
    }

    /**
     * @public
     * @method deleteItem
     * @returns {Analytics}
     */
    deleteItem() {
        this._sendGTMEvent(this.eventActions.deleteItem);

        return this;
    }

    /**
     * @public
     * @method decreaseCount
     * @returns {Analytics}
     */
    decreaseCount() {
        this._sendGTMEvent(this.eventActions.decreaseCount);

        return this;
    }

    /**
     * @public
     * @method increaseCount
     * @returns {Analytics}
     */
    increaseCount() {
        this._sendGTMEvent(this.eventActions.increaseCount);

        return this;
    }

    /**
     * @public
     * @method redirectToCheckout
     * @returns {Analytics}
     */
    redirectToCheckout() {
        this._sendGTMEvent(this.eventActions.redirectToCheckout);

        return this;
    }

    /**
     * @public
     * @method redirectToProduct
     * @returns {Analytics}
     */
    redirectToProduct() {
        this._sendGTMEvent(this.eventActions.redirectToProduct);

        return this;
    }

    /**
     * @public
     * @method sendAdmitAdEvent
     * @param basket {Object}
     * @returns {Analytics}
     */
    sendAdmitAdEvent(basket) {
        this._sendAdmitAdEvent(basket);

        return this;
    }

    /**
     * @method getEsputnik
     * @returns {Object}
     */
    getEsputnik() {
        return this.analytics.getEsputnik();
    }
}

export default Analytics;
