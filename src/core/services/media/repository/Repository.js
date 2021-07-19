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
         * @property httpClient
         * @type {HttpClient}
         */
        this.httpClient = new props.dependencies.HttpClient();

        /**
         * @property HttpClient
         * @type {HttpClient}
         */
        this.HttpClient = props.dependencies.HttpClient;
    }

    /**
     * @public
     * @method upload
     * @param image {string}
     * @param type {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    upload(image, type, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.upload.domain)
            .request({
                path: this.urls.upload.path,
                method: this.HttpClient.methods.POST,
                body: { image, type },
                timeout: 3600000
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
