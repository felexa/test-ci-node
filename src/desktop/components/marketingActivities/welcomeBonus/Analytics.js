import BaseAnalytics from "app/core/analytics";

class Analytics {
    constructor() {
        /**
         * @property eventCategory
         * @type {string}
         */
        this.eventCategory = "welcomeBonus";

        /**
         * @property eventActions
         * @type {Object}
         */
        this.eventActions = {
            firstShowedPopup: "first_showed_popup",
            startFillInPhone: "start_fill_in_phone",
            sendPhone: "send_phone",
            sendOTP: "send_otp",
            showThanksDisplay: "show_thanks_display",
            showThanksForEmailDisplay: "show_thanks_for_email_display",
            showEmailDisplay: "show_email_display",
            showSorryBonusDisplay: "show_sorry_bonus_display",
            sendEmail: "send_email"
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
     * @method firstShowedPopup
     * @returns {Analytics}
     */
    firstShowedPopup() {
        this.sendEvent(this.eventActions.firstShowedPopup);

        return this;
    }

    /**
     * @public
     * @method startFillInPhone
     * @returns {Analytics}
     */
    startFillInPhone() {
        this.sendEvent(this.eventActions.startFillInPhone);

        return this;
    }

    /**
     * @public
     * @method sendPhone
     * @returns {Analytics}
     */
    sendPhone() {
        this.sendEvent(this.eventActions.sendPhone);

        return this;
    }

    /**
     * @public
     * @method sendOTP
     * @returns {Analytics}
     */
    sendOTP() {
        this.sendEvent(this.eventActions.sendOTP);

        return this;
    }

    /**
     * @public
     * @method showThanksDisplay
     * @returns {Analytics}
     */
    showThanksDisplay() {
        this.sendEvent(this.eventActions.showThanksDisplay);

        return this;
    }

    /**
     * @public
     * @method showEmailDisplay
     * @returns {Analytics}
     */
    showEmailDisplay() {
        this.sendEvent(this.eventActions.showEmailDisplay);

        return this;
    }

    /**
     * @public
     * @method showThanksForEmailDisplay
     * @returns {Analytics}
     */
    showThanksForEmailDisplay() {
        this.sendEvent(this.eventActions.showThanksForEmailDisplay);

        return this;
    }

    /**
     * @public
     * @method showSorryBonusDisplay
     * @returns {Analytics}
     */
    showSorryBonusDisplay() {
        this.sendEvent(this.eventActions.showSorryBonusDisplay);

        return this;
    }

    /**
     * @public
     * @method sendEmail
     * @returns {Analytics}
     */
    sendEmail() {
        this.sendEvent(this.eventActions.sendEmail);

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
