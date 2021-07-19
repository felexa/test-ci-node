import BaseAnalytics from "app/core/analytics";

class Analytics {
    constructor() {
        /**
         * @property eventCategory
         * @type {string}
         */
        this.eventCategory = "homepage";

        /**
         * @property eventActions
         * @type {Object}
         */
        this.eventActions = {
            openCatalogMenu: "homepage_open_catalog",
            redirectFromPromoBanner: "homepage_click_mainbanner",
            changePromoBanner: "homepage_slide_mainbanner",
            // redirectToPromoPage: "homepage_click_promo",
            // redirectToStoryPage: "homepage_click_story",
            // showMoreStories: "homepage_click_story_more",
            selectPopularProduct: "homepage_click_popularproduct",
            showMorePopularProducts: "homepage_click_popularproduct_all",
            selectBrand: "homepage_click_popularbrands",
            showMoreReviews: "homepage_click_reviews_more"
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
     * @returns {Analytics}
     */
    _sendAdmitAdEvent() {
        this.analytics.sendAdmitAdEvent('home');

        return this;
    }

    /**
     * @public
     * @method openCatalogMenu
     * @returns {Analytics}
     */
    openCatalogMenu() {
        this._sendGTMEvent(this.eventActions.openCatalogMenu);

        return this;
    }

    /**
     * @public
     * @method redirectFromPromoBanner
     * @returns {Analytics}
     */
    redirectFromPromoBanner() {
        this._sendGTMEvent(this.eventActions.redirectFromPromoBanner);

        return this;
    }

    /**
     * @public
     * @method changePromoBanner
     * @returns {Analytics}
     */
    changePromoBanner() {
        this._sendGTMEvent(this.eventActions.changePromoBanner);

        return this;
    }

    // /**
    //  * @public
    //  * @method redirectToPromoPage
    //  * @returns {Analytics}
    //  */
    // redirectToPromoPage() {
    //     this._sendEvent(this.eventActions.redirectToPromoPage);

    //     return this;
    // }

    // /**
    //  * @public
    //  * @method redirectToStoryPage
    //  * @returns {Analytics}
    //  */
    // redirectToStoryPage() {
    //     this._sendEvent(this.eventActions.redirectToStoryPage);

    //     return this;
    // }

    // /**
    //  * @public
    //  * @method showMoreStories
    //  * @returns {Analytics}
    //  */
    // showMoreStories() {
    //     this._sendEvent(this.eventActions.showMoreStories);

    //     return this;
    // }

    /**
     * @public
     * @method selectPopularProduct
     * @returns {Analytics}
     */
    selectPopularProduct() {
        this._sendGTMEvent(this.eventActions.selectPopularProduct);

        return this;
    }

    /**
     * @public
     * @method showMorePopularProducts
     * @returns {Analytics}
     */
    showMorePopularProducts() {
        this._sendGTMEvent(this.eventActions.showMorePopularProducts);

        return this;
    }

    /**
     * @public
     * @method selectBrand
     * @returns {Analytics}
     */
    selectBrand() {
        this._sendGTMEvent(this.eventActions.selectBrand);

        return this;
    }

    /**
     * @public
     * @method showMoreReviews
     * @returns {Analytics}
     */
    showMoreReviews() {
        this._sendGTMEvent(this.eventActions.showMoreReviews);

        return this;
    }

    /**
     * @public
     * @method sendRetagEvent
     * @returns {Analytics}
     */
    pageEntry() {
        this._sendAdmitAdEvent();

        return this;
    }
}

export default Analytics;
