import BaseAnalytics from "app/core/analytics";

class Analytics {
    constructor() {
        /**
         * @property eventCategory
         * @type {string}
         */
        this.eventCategory = "product_card";

        /**
         * @property eventActions
         * @type {Object}
         */
        this.eventActions = {
            addToBasket: ["card_click_buy", "addToCard"],
            buyInOneClick: ["card_click_oneclickbuy", "buyoneclick"],
            showAllProperties: "card_specification_all",
            showFullInstruction: "card_instruction_all",
            showAllRecomendations: "card_click_recomendations",
            showReviewsTab: "card_reviews_all",
            showAnalogsTab: "card_click_analogs",
            clickOnGalleryThumb: "card_switch_photo",
            showDeliveryDetails: "card_delivery_details",
            changeCity: "card_delivery_city",
            downloadCertificate: "card_sertificate_download"
        };

        /**
         * @property analytics
         * @type {Object}
         */
        this.analytics = BaseAnalytics.getInstance();

        this.sendEvent = this.sendEvent.bind(this);
    }

    /**
     * @public
     * @method addToBasket
     * @returns {Analytics}
     */
    addToBasket() {
        this.sendEvent(this.eventActions.addToBasket, window.navigator.userAgent);

        return this;
    }

    /**
     * @public
     * @method buyInOneClick
     * @returns {Analytics}
     */
    buyInOneClick() {
        this.sendEvent(this.eventActions.buyInOneClick);

        return this;
    }

    /**
     * @public
     * @method showAllProperties
     * @returns {Analytics}
     */
    showAllProperties() {
        this.sendEvent(this.eventActions.showAllProperties);

        return this;
    }

    /**
     * @public
     * @method showFullInstruction
     * @returns {Analytics}
     */
    showFullInstruction() {
        this.sendEvent(this.eventActions.showFullInstruction);

        return this;
    }

    /**
     * @public
     * @method showAllRecomendations
     * @returns {Analytics}
     */
    showAllRecomendations() {
        this.sendEvent(this.eventActions.showAllRecomendations);

        return this;
    }

    /**
     * @public
     * @method showReviewsTab
     * @returns {Analytics}
     */
    showReviewsTab() {
        this.sendEvent(this.eventActions.showReviewsTab);

        return this;
    }

    /**
     * @public
     * @method showAnalogsTab
     * @returns {Analytics}
     */
    showAnalogsTab() {
        this.sendEvent(this.eventActions.showAnalogsTab);

        return this;
    }

    /**
     * @public
     * @method clickOnGalleryThumb
     * @returns {Analytics}
     */
    clickOnGalleryThumb() {
        this.sendEvent(this.eventActions.clickOnGalleryThumb);

        return this;
    }

    /**
     * @public
     * @method showDeliveryDetails
     * @returns {Analytics}
     */
    showDeliveryDetails() {
        this.sendEvent(this.eventActions.showDeliveryDetails);

        return this;
    }

    /**
     * @public
     * @method changeCity
     * @returns {Analytics}
     */
    changeCity() {
        this.sendEvent(this.eventActions.changeCity);

        return this;
    }

    /**
     * @public
     * @method downloadCertificate
     * @returns {Analytics}
     */
    downloadCertificate() {
        this.sendEvent(this.eventActions.downloadCertificate);

        return this;
    }

    /**
     * @private
     * @method sendEvent
     * @param eventAction {string|string[]}
     * @param [eventLabel] {string}
     * @returns {Analytics}
     */
    sendEvent(eventAction, eventLabel = "") {
        this.analytics.sendGoogleAnalyticsEvent(this.eventCategory, eventAction, eventLabel);

        return this;
    }
}

export default Analytics;
