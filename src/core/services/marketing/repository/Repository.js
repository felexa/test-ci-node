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
     * @method verifyOTP
     * @param phone {string}
     * @param code {string}
     * @param bonus {Object}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    verifyOTP(phone, code, bonus, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.verifyOTP.domain)
            .request({
                path: this.urls.verifyOTP.path,
                method: this.HttpClient.methods.POST,
                query: this.urls.verifyOTP.query,
                body: {
                    phone,
                    otp: code,
                    ...bonus
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @method verifyEmail
     * @param email {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    verifyEmail(email, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.verifyEmail.domain)
            .request({
                path: this.urls.verifyEmail.path,
                method: this.HttpClient.methods.POST,
                query: this.urls.verifyEmail.query,
                body: {
                    email
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
