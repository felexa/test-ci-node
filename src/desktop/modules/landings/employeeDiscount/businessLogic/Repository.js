class Repository {
    constructor(props) {
        /**
         * @example
         *
         * urls = {
         *     getProduct: {
         *         domain: string,
         *         path: string
         *     }
         * }
         *
         * @property urls
         * @type {Object}
         */
        this.urls = props.urls;

        this.HttpClient = props.dependencies.HttpClient;
        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method confirmInvite
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getRegistrationStatistics(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getRegistrationStatistics.domain)
            .request({
                path: this.urls.getRegistrationStatistics.path,
                method: this.HttpClient.methods.GET
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method confirmInvite
     * @param profile {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    confirmInvite(profile, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.confirmInvite.domain)
            .request({
                path: this.urls.confirmInvite.path,
                method: this.HttpClient.methods.POST,
                body: profile
            })
            .then(() => {
                success();
            }, error);
    }
}

export default Repository;
