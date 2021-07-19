class Analytics {
    constructor(props) {
        /**
         * @property hotjar
         * @type {Object}
         */
        // this.hotjar = props.dependencies.hotjar;

        /**
         * @property facebookPixel
         * @type {Object}
         */
        this.facebookPixel = props.dependencies.facebookPixel;

        /**
         * @property googleTagManager
         * @type {Object}
         */
        this.googleTagManager = props.dependencies.googleTagManager;

        /**
         * @property admitAd
         * @type {Object}
         */
        this.admitAd = props.dependencies.admitAd;

        /**
         * @property esputnik
         * @type {Object}
         */
        this.esputnik = props.dependencies.esputnik;
    }

    /**
     * @public
     * @method init
     * @returns {Analytics}
     */
    init() {
        // this.hotjar.init();

        this.facebookPixel.init();

        this.googleTagManager.init();

        return this;
    }

    /**
     * @public
     * @method getEsputnik
     * @returns {Esputnik}
     */
    getEsputnik() {
        return this.esputnik;
    }

    /**
     * @public
     * @method sendGoogleAnalyticsEvent
     * @param category {string}
     * @param action {string}
     * @param [label] {string}
     * @returns {Analytics}
     */
    sendGoogleAnalyticsEvent(category, action, label) {
        this.googleTagManager.sendGoogleAnalyticsEvent(category, action, label);

        return this;
    }

    /**
     * @public
     * @method sendABTestEvent
     * @returns {GoogleTagManager}
     */
    sendABTestEvent() {
        this.googleTagManager.sendABTestEvent();

        return this;
    }

    /**
     * @public
     * @method sendAdmitAdEvent
     * @param type {String}
     * @param event {Object}
     * @returns {Analytics}
     */
    sendAdmitAdEvent(type, event) {
        switch (type) {
            case "home":
                this.admitAd.sendHomePageEvent();
                break;
            case "product":
                this.admitAd.sendProductPageEvent(event);
                break;
            case "basket":
                this.admitAd.sendBasketEvent(event);
                break;
            default:
                return this;
        }

        return this;
    }
}

export default Analytics;
