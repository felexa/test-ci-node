import BaseAnalytics from "app/core/analytics";

class Analytics {
    constructor() {
        /**
         * @property eventCategory
         * @type {string}
         */
        this.eventCategory = "blog";

        /**
         * @property eventActions
         * @type {Object}
         */
        this.eventActions = {
            joinTelegram: "join_telegram"
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
     * @method joinTelegram
     * @returns {Analytics}
     */
    joinTelegram() {
        this._sendEvent(this.eventActions.joinTelegram);

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
