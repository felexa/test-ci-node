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
    }

    /**
     * @private
     * @method _getFiltersFromApiUrl
     * @param apiUrl {string}
     * @return {string}
     */
    _getFiltersFromApiUrl(apiUrl) {
        let apiUrlWithoutBasePath = apiUrl.replace(/\/pub\/v1\/catalogs/gi, "");

        return apiUrlWithoutBasePath.split("?")[0];
    }

    /**
     * @private
     * @method _getQueryStringFromApiUrl
     * @param apiUrl {string}
     * @return {Object}
     */
    _getQueryStringFromApiUrl(apiUrl) {
        let queryString = apiUrl.split("?")[1],
            result = {};

        if (queryString) {
            result = {sorting: queryString.split("=")[1]};
        }

        return result;
    }

    /**
     * @public
     * @method buildUrlPagination
     * @param page {number}
     * @return {string}
     */
    buildUrlPagination(page) {
        let local = this.LanguageEnum.isRu(this.env.getLanguage()) ? "" : "/uk",
            baseUrl = `${this.env.getBitrixHost()}${local}${this.catalogData.getUrl()}`,
            baseUrlWithoutPage = baseUrl.replace(/\/page-\d+/, ""),
            result = baseUrlWithoutPage;

        if (page > 1) {
            result = `${baseUrlWithoutPage}page-${page}/`;
        }

        return result;
    }

    /**
     * @private
     * @method _changeRoute
     * @param url {string}
     * @return {void}
     */
    _changeRoute(url) {
        this.Router.to(`${url}`, {shallow: true});
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
     * @method getFAQ
     * @param name {string}
     * @param success
     * @param error
     * @return {Presenter}
     */
    getFAQByCategory(name, success, error) {
        if (_.isString(name) && _.isFunction(success) && _.isFunction(error)) {
            this.Model.getFAQByCategory(name, success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getUpdatedDataByPage
     * @param apiUrl {string}
     * @param page {number}
     * @param success {Function}
     * @return {Presenter}
     */
    getUpdatedDataByPage(apiUrl, page, success) {
        if (_.isFunction(success)) {
            let baseApiUrl = this._getFiltersFromApiUrl(apiUrl).replace(/page-0000000000/gi, ""),
                filters = {filters: baseApiUrl};

            if (page > 1) {
                filters = {filters: `${baseApiUrl}page-${page}/`};
            }

            this.Model.updateCatalogResults(filters, this._getQueryStringFromApiUrl(apiUrl), (catalogData) => {
                this._changeRoute(catalogData.getUrl());
                success(catalogData);
            });
        }

        return this;
    }

    /**
     * @public
     * @method getUpdatedDataByPrice
     * @param apiUrl {string}
     * @param prices {Object}
     * @param success {Function}
     * @return {Presenter}
     */
    getUpdatedDataByPrice(apiUrl, prices, success) {
        if (_.isFunction(success)) {
            let filters = {
                // eslint-disable-next-line max-len
                filters: `${this._getFiltersFromApiUrl(apiUrl)}/price_from:${prices.priceFrom}/price_to:${prices.priceTo}`
            };

            this.Model.updateCatalogResults(filters, this._getQueryStringFromApiUrl(apiUrl), (catalogData) => {
                this._changeRoute(catalogData.getUrl());
                success(catalogData);
            });
        }

        return this;
    }

    /**
     * @public
     * @method getUpdatedData
     * @param apiUrl {string}
     * @param success {Function}
     * @return {Presenter}
     */
    getUpdatedData(apiUrl, success) {
        if (_.isFunction(success)) {
            let filters = {filters: this._getFiltersFromApiUrl(apiUrl)};

            this.Model.updateCatalogResults(filters, this._getQueryStringFromApiUrl(apiUrl), (catalogData) => {
                this._changeRoute(catalogData.getUrl());
                success(catalogData);
            });
        }

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

        this.catalogData = result.catalogData;

        return result;
    }
}

export default Presenter;
