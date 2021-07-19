import _ from "lodash";

class Repository {
    constructor(props) {
        /**
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
     * @method getAllCategories
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getAllCategories(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getCategories.domain)
            .request({
                path: this.urls.getCategories.path,
                method: this.HttpClient.methods.GET
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @method getAllArticles
     * @param params {{
     *   itemsPerPage: number,
     *   page: number
     * }}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getAllArticles(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getArticles.domain)
            .request({
                path: this.urls.getArticles.path,
                method: this.HttpClient.methods.GET,
                query: _.merge({}, this.urls.getArticles.query, {
                    itemsPerPage: params.itemsPerPage,
                    page: params.page
                })
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @method getCategoryArticles
     * @param params {{
     *   page: number,
     *   categoryAlias: string
     * }}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getArticlesByCategory(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getArticles.domain)
            .request({
                path: this.urls.getArticles.path,
                method: this.HttpClient.methods.GET,
                query: _.merge({}, this.urls.getArticles.query, {
                    page: params.page,
                    "category.alias": params.categoryAlias
                })
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @method getArticle
     * @param params {{
     *   alias: string
     * }}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getArticle(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getArticle.domain)
            .request({
                path: this.urls.getArticle.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getArticle.params, {
                    alias: params.alias
                })
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @method getCategory
     * @param params {{
     *   alias: string
     * }}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getCategory(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getCategory.domain)
            .request({
                path: this.urls.getCategory.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getCategory.params, {
                    alias: params.alias
                })
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
