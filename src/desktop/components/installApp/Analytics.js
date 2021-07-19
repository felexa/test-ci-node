import BaseAnalytics from "app/core/analytics";

class Analytics {
    constructor() {
        /**
         * @property eventCategory
         * @type {string}
         */
        this.eventCategory = "app_banner";

        /**
         * @property eventActions
         * @type {Object}
         */
        this.eventActions = {
            clickOnAppStore: "app_banner_click_appStore",
            clickOnGooglePlay: "app_banner_click_googlePlay"
        };

        /**
         * @property analytics
         * @type {Object}
         */
        this.analytics = BaseAnalytics.getInstance();

        this._sendEvent = this._sendEvent.bind(this);
    }

    /**
     * @public
     * @method clickOnAppStore
     * @returns {Analytics}
     */
    clickOnAppStore() {
        this._sendEvent(this.eventActions.clickOnAppStore);

        return this;
    }

    /**
     * @public
     * @method clickOnGooglePlay
     * @returns {Analytics}
     */
    clickOnGooglePlay() {
        this._sendEvent(this.eventActions.clickOnGooglePlay);

        return this;
    }

    /**
     * @private
     * @method _sendEvent
     * @param eventAction {string|string[]}
     * @returns {Analytics}
     */
    _sendEvent(eventAction) {
        this.analytics.sendGoogleAnalyticsEvent(this.eventCategory, eventAction);

        return this;
    }
}

export default Analytics;
