import _ from "lodash";

class Classifier {
    constructor(props) {
        this.Router = props.dependencies.Router;
        this.Repository = props.dependencies.Repository;

        this.ClassifierEntity = props.dependencies.ClassifierEntity;

        this.RouteNamesEnum = props.dependencies.RouteNamesEnum;

        this.RubricService = props.dependencies.RubricService;

        this.BasketService = props.dependencies.BasketService;

        this.ProductRubricEntity = props.dependencies.ProductRubricEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
        /**
         * @property currentRouteFromServer
         * @type {{query: Object, pathname: string}}
         */
        this.currentRouteFromServer = {
            pathname: "",
            query: {}
        };
    }

    /**
     * @public
     * @method addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Classifier}
     */
    addToBasket(product, success, error) {
        this.BasketService.addItem(
            product.getCode(),
            success,
            error
        );

        return this;
    }

    /**
     * @method getViewedProductsAsRubric
     * @param success
     * @param error
     * @return {Classifier}
     */
    getViewedProductsAsRubric(success, error) {
        this.RubricService.getViewedProducts((rubric) => {
            success(new this.ProductRubricEntity(rubric));
        }, error);

        return this;
    }

    /**
     * @private
     * @method _getRequestConfig
     * @param routeParams {Object}
     * @returns {{name: string, args: string[]}}
     */
    _getRequestConfig(routeParams) {
        let result = {
            methodName: this.Repository.getClassifier.name,
            params: {
                query: null,
                page: Math.trunc(Number(routeParams.page) || 1)
            }
        };

        if (routeParams.query) {
            result.methodName = this.Repository.getIngredients.name;
            result.params.query = routeParams.query;
        }

        if (routeParams.classifierName) {
            result.methodName = this.Repository.getIngredient.name;
            result.params.classifierName = routeParams.classifierName;
        }

        return result;
    }

    /**
     * @method _getClassifier
     * @param requestConfig {Object}
     * @param success {Function}
     * @returns {Classifier}
     * @private
     */
    _getClassifier(requestConfig, success) {
        this.Repository[requestConfig.methodName](
            requestConfig.params,
            (classifier) => {
                success(classifier);
            },
            () => {
                success({});
            }
        );

        return this;
    }

    /**
     * @method getCurrentRoute
     * @returns {{query: Object, pathname: string}}
     */
    getCurrentRoute() {
        let route = this.Router.getCurrentRoute();

        return route.pathname ? route : this.currentRouteFromServer;
    }

    /**
     * @public
     * @method buildUrlWithQueryString
     * @param params {Object}
     * @returns {string}
     */
    buildUrlWithQueryString(params) {
        let currentPage = params.page,
            baseUrl = this.Router
                .getRouteByName(this.RouteNamesEnum.getActiveIngredientsAsValue())
                .toPath(_.merge({}, this.getCurrentRoute().query, params));

        return currentPage > 1 ? `${baseUrl}/page-${currentPage}/` : `${baseUrl}/`;
    }

    /**
     * @public
     * @method toPage
     * @param page {number}
     * @returns {Classifier}
     */
    toPage(page) {
        this.Router.to(this.buildUrlWithQueryString({page}));

        return this;
    }

    _normalizeRequestParams(params) {
        Object.keys(params).forEach(function (key) {
            let matchResult = params[key].match(/page-(\d+)/),
                page = matchResult && matchResult[1];

            if (matchResult) {
                delete params[key];
                params.page = Number(page);
            }
        });

        return params;
    }

    /**
     * @public
     * @method getInitialProps
     * @return {Promise}
     */
    getInitialProps(ctx) {
        let result = {
                currentPage: 1,
                classifier: {}
            },
            requestConfig = this._getRequestConfig(this._normalizeRequestParams(ctx.query));

        this.currentRouteFromServer.pathname = ctx.asPath;
        this.currentRouteFromServer.query = ctx.query;

        result.currentPage = requestConfig.params.page;

        return new Promise((resolve) => {
            this._getClassifier(requestConfig, (classifier) => {
                result.classifier = classifier;

                resolve();
            });
        }).then(() => result).catch(() => result);
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return {
            currentPage: initialData.currentPage,
            classifier: new this.ClassifierEntity(initialData.classifier),
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Classifier;
