/* eslint-disable max-len */
import _ from "lodash";

class Product {
    constructor(props) {
        /**
         * @property defaultCity
         * @type {{name: string, id: string}}
         */
        this.defaultCity = {
            id: "8000000000",
            name: "Киев"
        };

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
        this.ReviewService = props.dependencies.ReviewService;
        this.MediaService = props.dependencies.MediaService;
        this.RubricService = props.dependencies.RubricService;
        this.ViewedProductsService = props.dependencies.ViewedProductsService;
        this.AuthorizationService = props.dependencies.AuthorizationService;

        this.ProductEntity = props.dependencies.ProductEntity;
        this.ProductRubricEntity = props.dependencies.ProductRubricEntity;
        this.NoteEntity = props.dependencies.NoteEntity;
        this.ReviewEntity = props.dependencies.ReviewEntity;
        this.ThreadEntity = props.dependencies.ThreadEntity;
        this.OfferEntity = props.dependencies.OfferEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
        this.ImageEntity = props.dependencies.ImageEntity;
    }

    /**
     * @private
     * @method _buildReview
     * @param review {Object}
     * @return {Object}
     */
    _buildReview(review) {
        return _.merge({}, review, {targetId: this.product.getId()});
    }

    /**
     * @public
     * @method getProfile
     * @param success {Function}
     * @returns {Product}
     */
    getProfile(success) {
        this.AuthorizationService.getProfile(
            (profile) => success(this.AuthorizationService.convertToEmployeeEntity(profile)),
            () => success(this.AuthorizationService.convertToEmployeeEntity({}))
        );

        return this;
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
     * @public
     * @method getReviewByPage
     * @param page {number}
     * @param success {function}
     * @param error {function}
     * @returns {Product}
     */
    getReviewByPage(page, success, error) {
        this.ReviewService.getReview({
            entityId: this.product.getId(),
            page
        }, (review) => {
            success(this.ReviewService.convertReviewToEntity(review));
        }, function () {
            error();
        });

        return this;
    }

    /**
     * @public
     * @method getReviewById
     * @param id {string}
     * @param success {function}
     * @param error {function}
     * @returns {Product}
     */
    getReviewById(id, success, error) {
        this.ReviewService.getReviewById(id, (review) => {
            success(new this.ThreadEntity(review));
        }, () => {
            error();
        });

        return this;
    }

    /**
     * @public
     * @method getAllAnswers
     * @param threadEntity {Thread}
     * @param success {function}
     * @param error {function}
     * @returns {Product}
     */
    getAllAnswers(threadEntity, success, error) {
        this
            .ReviewService
            .getAnswers(
                threadEntity.getId(),
                1,
                threadEntity.getTotalItemsCount(),
                success,
                error
            );

        return this;
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
     * @param props {Object}
     * @return {Promise}
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
     * @method createReview
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    createReview(review, success, error) {
        this.ReviewService.create(this._buildReview(review), success, error);

        return this;
    }

    /**
     * @public
     * @method createAnswerToReview
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    createAnswerToReview(review, success, error) {
        this.ReviewService.createAnswer(this._buildReview(review), success, error);

        return this;
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
     * @method _voteToReview
     * @param thread {Thread}
     * @param voteType {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    voteToReview(thread, voteType, success, error) {
        this.ReviewService.vote(thread, voteType, success, error);

        return this;
    }

    /**
     * @public
     * @method uploadUnpackingPhoto
     * @param image {string}
     * @param type {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    uploadUnpackingPhoto(image, type, success, error) {
        this.MediaService.upload(image, type, success, error);

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
            profile: this.AuthorizationService.convertToEmployeeEntity({}),
            tabName: initialData.tabName,
            reviewId: initialData.reviewId,
            product: this.product,
            reviewImages: (initialData.review?.images || []).map((item) => new this.ImageEntity(item)),
            review: this.review,
            analogs: this.analogs,
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Product;
