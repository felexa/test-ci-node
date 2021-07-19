/* eslint-disable max-len */
import _ from "lodash";

class Product {
    constructor(props) {
        /**
         * @property verifiedProducts
         * @type {Array}
         */
        this.verifiedProducts = [
            // "22105",
            // "519",
            // "4798",
            // "4869",
            // "4035",
            // "13672",
            // "10935"
        ];

        /**
         * @property currentRouteFromServer
         * @type {{query: Object, pathname: string}}
         */
        this.currentRouteFromServer = {
            pathname: "",
            query: {}
        };

        /**
         * @property analogs
         * @type {Rubric[]}
         */
        this.analogs = [];

        /**
         * @property product
         * @type {Product}
         */
        this.product = null;

        /**
         * @property review
         * @type {Review}
         */
        this.review = null;

        this.Resource = props.dependencies.Resource;
        this.Repository = props.dependencies.Repository;

        this.BasketService = props.dependencies.BasketService;
        this.RubricService = props.dependencies.RubricService;
        this.ViewedProductsService = props.dependencies.ViewedProductsService;
        this.ReviewService = props.dependencies.ReviewService;

        this.AnalogTypeEnum = props.dependencies.AnalogTypeEnum;

        this.ProductEntity = props.dependencies.ProductEntity;
        this.ProductRubricEntity = props.dependencies.ProductRubricEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
    }

    /**
     * @public
     * @method hasGeneric
     * @returns {boolean}
     */
    hasGeneric() {
        // return Boolean(this.product.getGeneric().getId());
        return false;
    }

    /**
     * @public
     * @method getCurrentRouteFromServer
     * @return {Object}
     */
    getCurrentRouteFromServer() {
        return _.merge({}, this.currentRouteFromServer);
    }

    /**
     * @method getViewedProductsAsRubric
     * @param success
     * @param error
     * @return {Home}
     */
    getViewedProductsAsRubric(success, error) {
        this.RubricService.getViewedProducts((rubric) => {
            success(new this.ProductRubricEntity(rubric));
        }, error);

        return this;
    }

    /**
     * @public
     * @method addViewedProductId
     * @param id
     * @return {Home}
     */
    addViewedProductId(id) {
        this.ViewedProductsService.addId(id);

        return this;
    }

    /**
     * @public
     * @method parseRouteByQuery
     * @param query {Object}
     * @returns {{tabName: string, productId: string, reviewId: string}}
     */
    parseRouteByQuery(query) {
        let pageRouteKey = "0",
            productIdIndex = 0,
            tabNameIndex = 1,
            reviewIdIndex = 2,
            pageRouteComponents = (query[pageRouteKey] || "").split("/");

        return {
            productId: pageRouteComponents[productIdIndex],
            reviewId: pageRouteComponents[reviewIdIndex],
            tabName: pageRouteComponents[tabNameIndex]
        };
    }

    /**
     * @public
     * @method getInitialProps
     * @param params {Object}
     * @return {Object}
     */
    getInitialProps(params) {
        let query = this.parseRouteByQuery(params.query),
            initialData = {
                tabName: query.tabName,
                reviewId: query.reviewId,
                analogs: [],
                product: null,
                review: null
            };

        this.currentRouteFromServer.pathname = params.pathname;
        this.currentRouteFromServer.query = params.query;

        return initialData;
    }

    /**
     * @public
     * @method isVerifiedProduct
     * @returns {boolean}
     */
    isVerifiedProduct() {
        return this.verifiedProducts.includes(this.product.getOldId());
    }

    /**
     * @public
     * @method addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
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
     * @public
     * @method buyInOneClick
     * @param userData {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    buyInOneClick(userData, success, error) {
        this.BasketService.createOrder(
            {
                itemId: this.product.getOldId(),
                name: userData.name,
                phone: userData.phone,
                email: userData.email
            },
            success,
            error
        );

        return this;
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        this.product = new this.ProductEntity(initialData.product);
        this.review = this.ReviewService.convertReviewToEntity(initialData.review);
        this.analogs = initialData.analogs.map((item) => new this.ProductRubricEntity(item));

        return {
            tabName: initialData.tabName,
            reviewId: initialData.reviewId,
            product: this.product,
            review: this.review,
            analogs: this.analogs,
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Product;
