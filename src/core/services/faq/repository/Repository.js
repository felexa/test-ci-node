import _ from "lodash";

class Repository {
    constructor(props) {
        /**
         * @example
         *
         * urls = {
         *     getReview: {
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
        this.httpClient = new props.dependencies.HttpClient();
    }

    /**
     * @public
     * @method getFaq
     * @param activeIngredient {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getFaq(activeIngredient = "", success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getFaq.domain)
            .request({
                path: this.urls.getFaq.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getFaq.params),
                query: _.merge({}, this.urls.getFaq.query, {
                    mnn: activeIngredient
                })
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method getFaqByCategory
     * @param name {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getFaqByCategory(name, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getFaqByCategory.domain)
            .request({
                path: this.urls.getFaqByCategory.path,
                method: this.HttpClient.methods.GET,
                query: _.merge({}, this.urls.getFaqByCategory.query, {
                    category: name
                })
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
