class Repository {
    constructor(props) {
        /**
         * @example
         *
         * urls = {
         *     getPopularCities: {
         *         domain: string,
         *         path: string
         *     }
         * }
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
     * @method getPopularCities
     * @param [success] {Function}
     * @param [error] {Function}
     * @returns {Promise}
     */
    getPopularCities(success = () => {}, error = () => {}) {
        return this.httpClient
            .setBaseUrl(this.urls.getPopularCities.domain)
            .request({
                path: this.urls.getPopularCities.path,
                method: this.HttpClient.methods.GET
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method getCitiesByName
     * @param name {string}
     * @param [success] {Function}
     * @param [error] {Function}
     * @returns {Promise}
     */
    getCitiesByName(name, success = () => {}, error = () => {}) {
        return this.httpClient
            .setBaseUrl(this.urls.getCitiesByName.domain)
            .request({
                path: this.urls.getCitiesByName.path,
                method: this.HttpClient.methods.GET,
                query: {
                    cityName: name
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method getDeliveriesByProduct
     * @param cityId {string|number}
     * @param productAlias {string}
     * @param [success] {Function}
     * @param [error] {Function}
     * @return {Promise}
     */
    getDeliveriesByProduct(cityId, productAlias, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getDeliveriesByProduct.domain)
            .request({
                path: this.urls.getDeliveriesByProduct.path,
                method: this.HttpClient.methods.GET,
                params: {
                    alias: productAlias
                },
                query: {
                    cityId
                }
            })
            .then((response) => {
                success(response.data || []);
            }, error);
    }
}

export default Repository;
