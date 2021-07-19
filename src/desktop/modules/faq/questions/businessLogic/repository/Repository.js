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
     * @method getFAQ
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getFAQ(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getFaq.domain)
            .request({
                path: this.urls.getFaq.path,
                method: this.HttpClient.methods.GET,
                params: {},
                query: this.urls.getFaq.query
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
