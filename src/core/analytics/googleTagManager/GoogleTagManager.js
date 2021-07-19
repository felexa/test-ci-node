import ReactGtmModule from "react-gtm-module";

class GoogleTagManager {
    constructor(props) {
        /**
         * @property id
         * @type {string}
         */
        this.id = props.id;

        /**
         * @property gtmModule
         * @type {Object}
         */
        this.gtmModule = ReactGtmModule;

        /**
         * @property gtmEvents
         * @type {Object}
         */
        this.gtmEvents = {
            ABTestEvent: "optimize.activate",
            googleAnalyticsEvent: "eventToGA"
        };
    }

    /**
     * @public
     * @method init
     * @returns {GoogleTagManager}
     */
    init() {
        this.gtmModule.initialize({
            gtmId: this.id
        });

        return this;
    }

    /**
     * @public
     * @method sendGoogleAnalyticsEvent
     * @param eventCategory {string}
     * @param eventAction {string}
     * @param [eventLabel] {string}
     * @returns {GoogleTagManager}
     */
    sendGoogleAnalyticsEvent(eventCategory, eventAction, eventLabel = "") {
        this.gtmModule.dataLayer({
            dataLayer: {
                event: this.gtmEvents.googleAnalyticsEvent,
                eventAction,
                eventCategory,
                eventLabel
            }
        });

        return this;
    }

    /**
     * @public
     * @method sendABTestEvent
     * @returns {GoogleTagManager}
     */
    sendABTestEvent() {
        this.gtmModule.dataLayer({
            dataLayer: {
                event: this.gtmEvents.ABTestEvent
            }
        });

        return this;
    }
}

export default GoogleTagManager;
