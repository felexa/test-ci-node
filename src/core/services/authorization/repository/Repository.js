class Repository {
    constructor(props) {
        /**
         * @example
         *
         * @property urls
         * @type {Object}
         */
        this.urls = props.urls;

        /**
         * @property HttpClient
         * @type {HttpClient}
         */
        this.HttpClient = props.dependencies.HttpClient;

        /**
         * @property httpClient
         * @type {HttpClient}
         */
        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method getProfile
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getProfile(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getProfile.domain)
            .request({
                path: this.urls.getProfile.path,
                method: this.HttpClient.methods.GET,
                query: this.urls.getProfile.query
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method generateOTP
     * @param phone {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    generateOTP(phone, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.generateOTP.domain)
            .request({
                path: this.urls.generateOTP.path,
                method: this.HttpClient.methods.POST,
                query: this.urls.generateOTP.query,
                body: {phone}
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @method verifyOTP
     * @param phone {string}
     * @param code {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    verifyOTP(phone, code, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.verifyOTP.domain)
            .request({
                path: this.urls.verifyOTP.path,
                method: this.HttpClient.methods.POST,
                query: this.urls.verifyOTP.query,
                body: {
                    phone,
                    otp: code
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
