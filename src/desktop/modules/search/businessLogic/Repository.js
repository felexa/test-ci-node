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
        this.SearchToCatalogAdapter = props.dependencies.SearchToCatalogAdapter;

        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method getCards
     * @param success {Function}
     * @returns {Promise}
     */
    getSearchData(query, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getSearchByQueryParams.domain)
            .request({
                path: this.urls.getSearchByQueryParams.path,
                method: this.HttpClient.methods.GET,
                query
            })
            .then((response) => {
                success(new this.SearchToCatalogAdapter(response.data).getFilterValue());
            }, error);
    }

    /**
     * @public
     * @method getCards
     * @param success {Function}
     * @returns {Promise}
     */
    getItemsFromCatalog(ids, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getItemsFromCatalog.domain)
            .request({
                path: this.urls.getItemsFromCatalog.path,
                method: this.HttpClient.methods.GET,
                query: {
                    id: ids
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
