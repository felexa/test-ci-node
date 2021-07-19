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
    }

    /**
     * @method getBreadcrumbs
     * @param url {string}
     * @param [success] {Function}
     * @returns {Promise}
     */
    getBreadcrumbs(url, success = () => {}) {
        return this.httpClient
            .setBaseUrl(this.urls.getBreadcrumbs.domain)
            .request({
                path: this.urls.getBreadcrumbs.path,
                method: this.HttpClient.methods.POST,
                dataType: this.HttpClient.dataTypes.URLENCODED,
                body: {
                    url: `${this.urls.getBreadcrumbs.domain}${url}`
                }
            })
            .then(
                (response) => {
                    success(response.data);
                },
                () => {
                    success([]);
                }
            );
    }
}

export default Repository;
