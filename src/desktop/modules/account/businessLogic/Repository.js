import orders from "./fixture/orders.json";

class Repository {
    constructor(props) {
        this.urls = props.urls;

        this.orders = orders;

        this.HttpClient = props.dependencies.HttpClient;

        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method getOrders
     * @param success {Function}
     * @param success {Function}
     * @returns {Promise}
     */
    getOrders(userId, success) {
        success(this.orders);

        return Promise.resolve(this.orders);
    }

    /**
     * @public
     * @method updateProfile
     * @param profile {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    updateProfile(profile, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.updateProfile.domain)
            .request({
                path: this.urls.updateProfile.path,
                method: this.HttpClient.methods.PUT,
                body: profile
            })
            .then((response) => {
                success(response);
            }, error);
    }
}

export default Repository;
