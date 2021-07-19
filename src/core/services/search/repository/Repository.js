import HttpClient from "app/core/utilites/httpClient/HttpClient";

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
        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method getItemsByQuery
     * @param query {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Search}
     */
    getItemsByQuery(query, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getItemsByQuery.domain)
            .request({
                path: this.urls.getItemsByQuery.path,
                method: this.HttpClient.methods.POST,
                dataType: HttpClient.dataTypes.URLENCODED,
                adapterOptions: {
                    mode: 'cors'
                },
                body: {
                    action: "popupsearcher",
                    q: query
                }
            })
            .then((response) => {
                success(response.data.ITEMS || []);
            }, error);
    }

    /**
     * @public
     * @method getItemsByQuery
     * @param query {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Search}
     */
    getItemsByQueryAutocomplete(query, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getItemsByQueryAutocomplete.domain)
            .request({
                path: this.urls.getItemsByQueryAutocomplete.path,
                method: this.HttpClient.methods.GET,
                query: {query}
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
