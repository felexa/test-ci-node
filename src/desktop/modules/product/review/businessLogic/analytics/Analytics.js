import BaseAnalytics from "app/core/analytics";

import StatusTypeEnum from "app/core/utilites/enum/product/status/type";

class Analytics {
    constructor() {
        /**
         * @property eventCategory
         * @type {string}
         */
        this.eventCategory = "product_card";

        /**
         * @property statusTypeEnum
         * @type {Enum}
         */
        this.statusTypeEnum = StatusTypeEnum.getInstance();

        /**
         * @property eventActions
         * @type {Object}
         */
        this.eventActions = {
            addToBasket: "card_click_buy",
            errorAddingToBasket: "error_card_click_buy",
            buyInOneClick: "card_click_oneclickbuy",
            showAllProperties: "card_specification_all",
            showFullInstruction: "card_instruction_all",
            showAllRecomendations: "card_click_recomendations",
            showReviewsTab: "card_reviews_all",
            showAnalogsTab: "card_click_analogs",
            clickOnGalleryThumb: "card_switch_photo",
            showDeliveryDetails: "card_delivery_details",
            changeCity: "card_delivery_city",
            downloadCertificate: "card_sertificate_download",
            showItem: "card_show_item"
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
     * @param [eventLabel] {string}
     * @returns {Analytics}
     */
    _sendGTMEvent(eventAction, eventLabel = "") {
        this.analytics.sendGoogleAnalyticsEvent(this.eventCategory, eventAction, eventLabel);

        return this;
    }

    /**
     * @private
     * @method _sendAdmitAdEvent
     * @param product {Object}
     * @returns {Analytics}
     */
    _sendAdmitAdEvent(product) {
        this.analytics.sendAdmitAdEvent("product", product);

        return this;
    }

    /**
     * @private
     * @method _sendABTestEvent
     * @returns {Analytics}
     */
    _sendABTestEvent() {
        this.analytics.sendABTestEvent();

        return this;
    }

    /**
     * @public
     * @method addToBasket
     * @returns {Analytics}
     */
    addToBasket() {
        this._sendGTMEvent(this.eventActions.addToBasket, window.navigator.userAgent);

        return this;
    }

    /**
     * @public
     * @method errorAddingToBasket
     * @returns {Analytics}
     */
    errorAddingToBasket() {
        this._sendGTMEvent(this.eventActions.errorAddingToBasket);

        return this;
    }

    /**
     * @public
     * @method buyInOneClick
     * @returns {Analytics}
     */
    buyInOneClick() {
        this._sendGTMEvent(this.eventActions.buyInOneClick);

        return this;
    }

    /**
     * @public
     * @method showAllProperties
     * @returns {Analytics}
     */
    showAllProperties() {
        this._sendGTMEvent(this.eventActions.showAllProperties);

        return this;
    }

    /**
     * @public
     * @method showFullInstruction
     * @returns {Analytics}
     */
    showFullInstruction() {
        this._sendGTMEvent(this.eventActions.showFullInstruction);

        return this;
    }

    /**
     * @public
     * @method showAllRecomendations
     * @returns {Analytics}
     */
    showAllRecomendations() {
        this._sendGTMEvent(this.eventActions.showAllRecomendations);

        return this;
    }

    /**
     * @public
     * @method showReviewsTab
     * @returns {Analytics}
     */
    showReviewsTab() {
        this._sendGTMEvent(this.eventActions.showReviewsTab);

        return this;
    }

    /**
     * @public
     * @method showAnalogsTab
     * @returns {Analytics}
     */
    showAnalogsTab() {
        this._sendGTMEvent(this.eventActions.showAnalogsTab);

        return this;
    }

    /**
     * @public
     * @method showItem
     * @param statusType {string}
     * @returns {Analytics}
     */
    showItem(statusType, productCode) {
        this.analytics.sendGoogleAnalyticsEvent(this.eventActions.showItem, statusType, productCode);

        return this;
    }

    /**
     * @public
     * @method clickOnGalleryThumb
     * @returns {Analytics}
     */
    clickOnGalleryThumb() {
        this._sendGTMEvent(this.eventActions.clickOnGalleryThumb);

        return this;
    }

    /**
     * @public
     * @method showDeliveryDetails
     * @returns {Analytics}
     */
    showDeliveryDetails() {
        this._sendGTMEvent(this.eventActions.showDeliveryDetails);

        return this;
    }

    /**
     * @public
     * @method changeCity
     * @returns {Analytics}
     */
    changeCity() {
        this._sendGTMEvent(this.eventActions.changeCity);

        return this;
    }

    /**
     * @public
     * @method downloadCertificate
     * @returns {Analytics}
     */
    downloadCertificate() {
        this._sendGTMEvent(this.eventActions.downloadCertificate);

        return this;
    }

    /**
     * @public
     * @method pageEntry
     * @param product {Object}
     * @returns {Analytics}
     */
    pageEntry(product) {
        this._sendAdmitAdEvent(product);

        if (this.statusTypeEnum.isAvailable(product.getStatus().getType())) {
            this._sendABTestEvent();
        }

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
