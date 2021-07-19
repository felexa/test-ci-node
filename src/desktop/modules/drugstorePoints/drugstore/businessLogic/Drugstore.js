class Drugstore {
    constructor(props) {
        this.DrugstoreEntity = props.dependencies.DrugstoreEntity;
        this.MarkerEntity = props.dependencies.MarkerEntity;
        this.Repository = props.dependencies.Repository;
    }

    /**
     * @private
     * @method _getPharmacyByName
     * @param cityAlias {string}
     * @param drugstoreAlias {string}
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getPharmacyByName(resultContainer, cityAlias, drugstoreAlias) {
        return new Promise((resolve) => {
            this.Repository.getDrugstoreByName(cityAlias, drugstoreAlias, (drugstore) => {
                resultContainer.drugstore = drugstore;
                resolve();
            }, resolve);
        });
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps(params) { //будет удалена после добавления линков
        let result = {
            drugstore: {}
        };

        return Promise.all([
            this._getPharmacyByName(result, params.query.cityAlias, params.query.drugstoreName)
        ])
            .then(() => result)
            .catch(() => result);
    }

    /**
     * @private
     * @method _buildMarker
     * @returns {Object}
     */
    _buildMarker() {
        return {
            address: this.drugstore.getAddressAsText(),
            name: this.drugstore.getName(),
            latitude: this.drugstore.getLatitude(),
            longitude: this.drugstore.getLongitude(),
            phone: this.drugstore.getPhone(),
            workTime: this.drugstore.getWorkTime(),
            url: this.drugstore.getUrl()
        };
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        this.drugstore = new this.DrugstoreEntity(initialData.drugstore);

        return {
            //drugstore - данные будут приходить с линков соответственно измениться модуль, репозиторий и индекс
            drugstore: this.drugstore,
            markers: [new this.MarkerEntity((this._buildMarker()))],
            pageInfo
        };
    }
}

export default Drugstore;
