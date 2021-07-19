import BaseAnalytics from "app/core/analytics";

class Analytics {
    constructor() {
        /**
         * @property eventCategory
         * @type {string}
         */
        this.eventCategory = "header";

        /**
         * @property eventActions
         * @type {Object}
         */
        this.eventActions = {
            clickOnContactPhone: "header_click_phone",
            toLogin: "header_click_login",
            openCatalog: "header_click_catalog",
            focusToSearch: "header_click_search",
            redirectToDownloadRecipe: "header_click_recipe",
            openBasket: "header_click_basket"
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
     * @method clickOnContactPhone
     * @returns {Analytics}
     */
    clickOnContactPhone() {
        this.sendEvent(this.eventActions.clickOnContactPhone);

        return this;
    }

    /**
     * @public
     * @method toLogin
     * @returns {Analytics}
     */
    toLogin() {
        this.sendEvent(this.eventActions.toLogin);

        return this;
    }

    /**
     * @public
     * @method openCatalog
     * @returns {Analytics}
     */
    openCatalog() {
        this.sendEvent(this.eventActions.openCatalog);

        return this;
    }

    /**
     * @public
     * @method focusToSearch
     * @returns {Analytics}
     */
    focusToSearch() {
        this.sendEvent(this.eventActions.focusToSearch);

        return this;
    }

    /**
     * @public
     * @method redirectToDownloadRecipe
     * @returns {Analytics}
     */
    redirectToDownloadRecipe() {
        this.sendEvent(this.eventActions.redirectToDownloadRecipe);

        return this;
    }

    /**
     * @public
     * @method openBasket
     * @returns {Analytics}
     */
    openBasket() {
        this.sendEvent(this.eventActions.openBasket);

        return this;
    }

    /**
     * @private
     * @method sendEvent
     * @param eventAction {string|string[]}
     * @returns {Analytics}
     */
    sendEvent(eventAction) {
        this.analytics.sendGoogleAnalyticsEvent(this.eventCategory, eventAction);

        return this;
    }
}

export default Analytics;
