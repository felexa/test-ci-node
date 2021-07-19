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
        this.EntityTransformer = props.dependencies.EntityTransformer;
        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method getCatalogData
     * @param apiUrl {Function}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getCatalogData(filters, query, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getCatalogByParamsAndQuery.domain)
            .request({
                path: this.urls.getCatalogByParamsAndQuery.path,
                method: this.HttpClient.methods.GET,
                query,
                params: filters
            })
            .then((response) => {
                success(new this.EntityTransformer(response.data).getFilterValue());
            }, error);
    }
}

export default Repository;
