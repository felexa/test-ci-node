import Banner from "./fixture/Banner";
import TopCategory from "./fixture/TopCategory";
import PopularCategory from "./fixture/PopularCategory";

class Repository {
    constructor(props) {
        /**
         * @example
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

        this.banner = Banner;
        this.topCategory = TopCategory;
        this.popularCategory = PopularCategory;
    }

    /**
     * @public
     * @method getBanner
     * @param success {Function}
     * @returns {Promise}
     */
    getBanner(success) {
        success(this.banner);

        return Promise.resolve(this.banner);
    }

    /**
     * @public
     * @method getTopCategory
     * @param success {Function}
     * @returns {Promise}
     */
    getTopCategory(success) {
        success(this.topCategory);

        return Promise.resolve(this.topCategory);
    }

    /**
     * @public
     * @method getPopularCategory
     * @param success {Function}
     * @returns {Promise}
     */
    getPopularCategory(success) {
        success(this.popularCategory);

        return Promise.resolve(this.popularCategory);
    }

    /**
     * @public
     * @method getAllCategory
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getAllCategory(query, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.allCategory.domain)
            .request({
                path: this.urls.allCategory.path,
                method: this.HttpClient.methods.GET,
                params: {},
                query
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
