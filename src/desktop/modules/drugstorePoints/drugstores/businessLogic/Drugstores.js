class Drugstores {
    constructor(props) {
        this.defaultCityName = "";

        this.DrugstoreEntity = props.dependencies.DrugstoreEntity;
        this.CityEntity = props.dependencies.CityEntity;
        this.MarkerEntity = props.dependencies.MarkerEntity;
        this.Repository = props.dependencies.Repository;
    }

    /**
     * @private
     * @method _getCities
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getCities(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getCityList((cities) => {
                resultContainer.cities = cities;
                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getDrugstores
     * @param cityAlias {string}
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getDrugstores(cityAlias, resultContainer) {
        // eslint-disable-next-line no-extra-boolean-cast
        if (Boolean(cityAlias)) {
            return new Promise((resolve) => {
                this.Repository.getDrugstoresByCityAlias(cityAlias, "", (drugstores) => {
                    resultContainer.drugstores = drugstores;
                    resolve();
                }, resolve);
            });
            // eslint-disable-next-line no-else-return
        } else {
            return new Promise((resolve) => {
                this.Repository.getAllDrugstores((drugstores) => {
                    resultContainer.drugstores = drugstores;
                    resolve();
                }, resolve);
            });
        }
    }

    /**
     * @private
     * @method _getCityAlias
     * @param context {Object}
     * @returns {string}
     */
    _getCityAlias(context) {
        return context.query.cityAlias || "";
    }

    /**
     * @private
     * @method _getCityName
     * @param cities {City[]}
     * @param cityAlias {string}
     * @returns {string}
     */
    _getCityName(cities, cityAlias) {
        let currentCity = cities.find((city) => city.getAlias() === cityAlias);

        return currentCity?.getName() || this.defaultCityName;
    }

    /**
     * @method getDrugstoresByCityAlias
     * @param cityAlias {string}
     * @param searchQuery {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Drugstores}
     */
    getDrugstoresByCityAlias(cityAlias, searchQuery, success, error) {
        this.Repository.getDrugstoresByCityAlias(cityAlias, searchQuery, (drugstores) => {
            let drugstoreList = this._buildDrugstores(drugstores);

            success(drugstoreList, this._convertToMarkerEntity(drugstoreList));
        }, error);

        return this;
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps(context) {
        let result = {
            drugstores: [],
            cities: [],
            cityAlias: this._getCityAlias(context)
        };

        return Promise.all([
            this._getDrugstores(result.cityAlias, result),
            this._getCities(result)
        ])
            .then(() => result)
            .catch(() => result);
    }

    /**
     * @private
     * @method _buildMarkers
     * @returns {Array}
     */
    _buildMarkers(drugstores) {
        return drugstores.map((drugstore) => ({
            address: drugstore.getAddressAsText(),
            name: drugstore.getName(),
            latitude: drugstore.getLatitude(),
            longitude: drugstore.getLongitude(),
            phone: drugstore.getPhone(),
            workTime: drugstore.getWorkTime(),
            url: drugstore.getUrl()
        }));
    }

    /**
     * @private
     * @method _buildCities
     * @return {Array}
     */
    _buildCities(cities) {
        return cities.map((city) => new this.CityEntity(city));
    }

    /**
     * @private
     * @method _buildDrugstores
     * @return {Array}
     */
    _buildDrugstores(drugstores) {
        return drugstores.map((drugstore) => new this.DrugstoreEntity(drugstore));
    }

    /**
     * @private
     * @method _convertToMarkerEntity
     * @return {Array}
     */
    _convertToMarkerEntity(drugstores) {
        return this._buildMarkers(drugstores).map((marker) => new this.MarkerEntity(marker));
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        this.cities = this._buildCities(initialData.cities);
        this.cityName = this._getCityName(this.cities, initialData.cityAlias);
        this.drugstores = this._buildDrugstores(initialData.drugstores);

        return {
            drugstores: this.drugstores,
            cities: this.cities,
            cityAlias: initialData.cityAlias,
            cityName: this.cityName,
            markers: this._convertToMarkerEntity(this.drugstores),
            pageInfo
        };
    }
}

export default Drugstores;
