import _ from "lodash";

class Presenter {
    constructor(props) {
        this.cities = [];

        this.Model = props.dependencies.Model;
        this.Router = props.dependencies.Router;
    }

    /**
     * @public
     * @method getDrugstoresByCityAlias
     * @param cityAlias {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Presenter}
     */
    getDrugstoresByCityAlias(cityAlias, success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Model.getDrugstoresByCityAlias(cityAlias, "", (drugstores, markers) => {
                this._changeRoute(cityAlias);
                success(drugstores, markers);
            },
            error);
        }

        return this;
    }

    /**
     * @public
     * @method getCitiesByName
     * @param name {string}
     * @param callback {Function}
     * @returns {Presenter}
     */
    getCitiesByName(name, callback) {
        let regExp = new RegExp(`^${name}`, "i"),
            result = this.cities.filter((city) => regExp.test(city.getName()));

        callback(result);

        return this;
    }

    /**
     * @public
     * @method getDrugstoresByQuery
     * @param cityAlias {string}
     * @param searchQuery {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Presenter}
     */
    getDrugstoresByQuery(cityAlias, searchQuery, success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Model.getDrugstoresByCityAlias(cityAlias, searchQuery, (drugstores, markers) => {
                success(drugstores, markers);
            },
            error);
        }

        return this;
    }

    /**
     * @private
     * @method _changeRoute
     * @param url {string}
     * @return {Presenter}
     */
    _changeRoute(cityAlias) {
        this.Router.to(`/pharmacy/${cityAlias}`, {shallow: false});

        return this;
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @return {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        let result = this.Model.normalizeInitialProps(initialData, pageInfo);

        this.cities = result.cities;

        return result;
    }
}

export default Presenter;
