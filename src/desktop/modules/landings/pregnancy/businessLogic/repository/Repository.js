import recommendations from "./fixtures/recommendations";

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

        this.recommendations = recommendations;
    }

    /**
     * @method getDrugs
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getDrugs(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getDrugs.domain)
            .request({
                path: this.urls.getDrugs.path,
                method: this.HttpClient.methods.GET,
                params: {},
                query: this.urls.getDrugs.query
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @method getRecommendations
     * @param params {Object}
     * @param success {Function}
     // * @param error {Function}
     * @returns {Promise}
     */
    getRecommendations(params, success/*, error*/) {
        // return this.httpClient
        //     .setBaseUrl(this.urls.getRecommendations.domain)
        //     .request({
        //         path: this.urls.getRecommendations.path,
        //         method: this.HttpClient.methods.GET,
        //         params: {},
        //         query: this.urls.getRecommendations.query
        //     })
        //     .then((response) => {
        //         success(response.data);
        //     }, error);
        success(this.recommendations);

        return Promise.resolve(this.recommendations);
    }
}

export default Repository;
