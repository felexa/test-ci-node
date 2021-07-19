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
     * @method getBasket
     * @param [success] {Function}
     * @param [error] {Function}
     * @returns {Promise}
     */
    getBasket(success = () => {}, error = () => {}) {
        return this.httpClient
            .setBaseUrl(this.urls.getBasket.domain)
            .request({
                path: this.urls.getBasket.path,
                method: this.HttpClient.methods.GET,
                adapterOptions: {
                    credentials: "include"
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method addItem
     * @param id {number|string}
     * @param [success] {Function}
     * @param [error] {Function}
     * @returns {Promise}
     */
    addItem(id, success = () => {}, error = () => {}) {
        return this.httpClient
            .setBaseUrl(this.urls.addItem.domain)
            .request({
                path: this.urls.addItem.path,
                method: this.HttpClient.methods.POST,
                adapterOptions: {
                    credentials: "include"
                },
                body: {
                    sku: id
                }
            })
            .then(function (response) {
                success(response.data);

                return response.data;
            }, error);
    }

    /**
     * @public
     * @method changeCount
     * @param id {string|number}
     * @param quantity {number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    changeCount(id, quantity, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.changeCount.domain)
            .request({
                path: this.urls.changeCount.path,
                method: this.HttpClient.methods.PATCH,
                adapterOptions: {
                    credentials: "include"
                },
                body: {
                    quantity
                },
                params: {
                    id
                }
            })
            .then(function (response) {
                success(response.data);

                return response.data;
            }, error);
    }

    /**
     * @public
     * @method createOrder
     * @param order {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    createOrder(order, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.createOrder.domain)
            .request({
                path: this.urls.createOrder.path,
                method: this.HttpClient.methods.POST,
                dataType: this.HttpClient.dataTypes.URLENCODED,
                adapterOptions: {
                    credentials: "include"
                },
                body: {
                    buyMode: "ONE",
                    itemId: order.itemId,
                    dubLetter: "s",
                    paysystemId: 1,
                    deliveryId: 2,
                    priceId: 1,
                    currencyCode: "UAH",
                    "new_order[FIO]": order.name,
                    "new_order[PHONE]": order.phone,
                    "new_order[EMAIL]": order.email,
                    buttonsubmit: 1649
                }
            })
            .then(function (response) {
                success(response.data);

                return response.data;
            }, error);
    }
}

export default Repository;
