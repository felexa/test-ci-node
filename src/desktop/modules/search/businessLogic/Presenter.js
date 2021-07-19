/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import _ from "lodash";

class Presenter {
    constructor(props) {
        /**
         * @property language
         * @type {string}
         */
        this.language = "";

        this.Router = props.dependencies.Router;
        this.Model = props.dependencies.Model;
        this.env = props.dependencies.Env;
        this.LanguageEnum = props.dependencies.LanguageEnum;

        this.queryFromUpdate = null;
    }

    /**
     * @public
     * @method addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Presenter}
     */
    addToBasket(product, success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Model.addToBasket(product, success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getViewedProductsAsRubric
     * @param success
     * @param error
     * @return {Presenter}
     */
    getViewedProductsAsRubric(success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Model.getViewedProductsAsRubric(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method updateSearchResults
     * @param success {Function}
     * @return {Presenter}
     */
    async updateSearchResults(query, success, error) {
        if (_.isFunction(success)) {
            this.queryFromUpdate = query;
            await this.changeRoute(query);
            await this.Model.updateSearchResults(query, (searchData) => {
                success(searchData);
            },
            error);
        }

        return this;
    }

    /**
     * @private
     * @method changeRoute
     * @param queryParams {Object}
     * @returns {void}
     */
    changeRoute(queryParams) {
        this.Router.to(this._buildSearchLink(queryParams), {shallow: true});
    }

    /**
     * @public
     * @method checkRoute
     * @param queryFromstate {Object}
     * @param success {Function}
     * @returns {void}
     */
    checkRoute(queryFromstate, success, error) {
        if (this.queryFromUpdate) {
            if (!_.isEqual(this.queryFromUpdate, this.Router.getCurrentRoute().query)) {
                if (_.isEqual(queryFromstate, this.queryFromUpdate)) {
                    this.queryFromUpdate = this.Router.getCurrentRoute().query;
                    this.Model.updateSearchResults(this.Router.getCurrentRoute().query, (searchData) => {
                        success(searchData, this.Router.getCurrentRoute().query);
                    });
                } else {
                    this.Model.updateSearchResults(queryFromstate, (searchData) => {
                        success(searchData, this.queryFromUpdate);
                    }, error);
                }
            }
        }
    }

    /**
     * @private
     * @method _buildSearchLink
     * @param tabName {string}
     * @param ingredientName {string}
     * @returns {string}
     */
    _buildSearchLink(queryParams) {
        let queryParamsString = [],
            result = "";

        for (let key in queryParams) {
            queryParamsString.push(`${key}=${queryParams[key]}`);
        }

        if (this.LanguageEnum.isUa(this.language)) {
            result = `${this.env.getBitrixHost()}/${this.language}/search/?${queryParamsString.join('&')}`;
        } else {
            result = `${this.env.getBitrixHost()}/search/?${queryParamsString.join('&')}`;
        }

        return result;
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

        this.language = initialData.language;
        result.queryParams = this.Router.getCurrentRoute().query;

        return result;
    }
}

export default Presenter;
