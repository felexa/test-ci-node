class Repository {
    constructor(props) {
        this.urls = props.urls;

        this.HttpClient = props.dependencies.HttpClient;

        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method getDrugstoreById
     * @param cityName {string}
     * @param drugstoreName {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getDrugstoreByName(cityName, drugstoreName, success, error) { //будет удалена после добавления линков
        return this.httpClient
            .setBaseUrl(this.urls.getDrugstoreByName.domain)
            .request({
                path: this.urls.getDrugstoreByName.path,
                method: this.HttpClient.methods.GET,
                params: {
                    cityName,
                    drugstoreName
                }
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
