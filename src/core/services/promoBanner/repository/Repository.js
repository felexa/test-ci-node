import promoBanner from "../fixture/PromoBanner";

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

        this.promoBanner = promoBanner;
    }

    /**
     * @public
     * @method getPromoBanner
     // * @param [success] {Function}
     // * @param [error] {Function}
     * @returns {Object}
     */
    getPromoBanner(/*success = () => {}, error = () => {}*/) {
        // return this.httpClient
        //     .setBaseUrl(this.urls.getPromoBanner.domain)
        //     .request({
        //         path: this.urls.getPromoBanner.path,
        //         method: this.HttpClient.methods.GET
        //     })
        //     .then((response) => {
        //         success(response.data);
        //     }, error);

        return this.promoBanner;
    }
}

export default Repository;
