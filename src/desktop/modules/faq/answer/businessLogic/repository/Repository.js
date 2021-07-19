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
     * @method getAnswer
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getAnswer(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getAnswer.domain)
            .request({
                path: this.urls.getAnswer.path,
                method: this.HttpClient.methods.GET,
                params: {
                    question: params.question
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
