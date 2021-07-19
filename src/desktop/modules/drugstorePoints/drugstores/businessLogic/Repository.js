import _ from "lodash";

class Repository {
    constructor(props) {
        this.urls = props.urls;

        this.HttpClient = props.dependencies.HttpClient;

        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method getDrugstoresByCityAlias
     * @param cityAlias {string}
     * @param searchQuery {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getDrugstoresByCityAlias(cityAlias, searchQuery, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getDrugstoresByCityAlias.domain)
            .request({
                path: this.urls.getDrugstoresByCityAlias.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getDrugstoresByCityAlias.params, {
                    cityAlias
                }),
                query: _.merge({}, this.urls.getDrugstoresByCityAlias.query, {
                    q: searchQuery
                })
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method getCityList
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getCityList(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getCityList.domain)
            .request({
                path: this.urls.getCityList.path,
                method: this.HttpClient.methods.GET
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method getAllDrugstores
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getAllDrugstores(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getAllDrugstores.domain)
            .request({
                path: this.urls.getAllDrugstores.path,
                method: this.HttpClient.methods.GET
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
