import _ from "lodash";

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
     * @example
     *
     * params = {
     *     page: number
     * }
     *
     * @public
     * @method getClassifier
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getClassifier(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getClassifier.domain)
            .request({
                path: this.urls.getClassifier.path,
                method: this.HttpClient.methods.GET,
                query: _.merge({}, this.urls.getClassifier.query, {page: params.page})
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @example
     *
     * params = {
     *     page: number,
     *     query: string
     * }
     *
     * @public
     * @method getIngredients
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getIngredients(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getIngredients.domain)
            .request({
                path: this.urls.getIngredients.path,
                method: this.HttpClient.methods.GET,
                query: _.merge({}, this.urls.getIngredients.query, {
                    page: params.page,
                    index: params.query
                })
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @example
     *
     * params = {
     *     page: number,
     *     classifierName: string
     * }
     *
     * @public
     * @method getIngredient
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getIngredient(params, success, error) {
        this.httpClient
            .setBaseUrl(this.urls.getIngredient.domain)
            .request({
                path: this.urls.getIngredient.path,
                method: this.HttpClient.methods.GET,
                params: {
                    classifierName: params.classifierName
                },
                query: _.merge({}, this.urls.getIngredient.query, {
                    page: params.page
                })
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
