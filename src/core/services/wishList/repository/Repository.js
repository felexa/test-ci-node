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
     * @method getLists
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getLists(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getLists.domain)
            .request({
                path: this.urls.getLists.path,
                method: this.HttpClient.methods.GET,
                headers: {
                    Accept: "application/json"
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method addItem
     * @param itemId {number|string}
     * @param [success] {Function}
     * @param [error] {Function}
     * @returns {Promise}
     */
    addItem(itemId, success = () => {}, error = () => {}) {
        return this.httpClient
            .setBaseUrl(this.urls.addItem.domain)
            .request({
                path: this.urls.addItem.path,
                method: this.HttpClient.methods.POST,
                headers: {
                    Accept: "application/json"
                },
                body: {
                    productId: itemId
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @method getLists
     * @param listId {string|number}
     * @param itemsId {Array}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    deleteItem(listId, itemsId, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.deleteItem.domain)
            .request({
                path: this.urls.deleteItem.path,
                method: this.HttpClient.methods.POST,
                headers: {
                    Accept: "application/json"
                },
                params: {
                    id: listId
                },
                body: {
                    products: itemsId
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
