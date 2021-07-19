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

        this.observer = new props.dependencies.Observer().installTo(this);

        this.Resource = props.dependencies.Resource;
        this.Repository = props.dependencies.Repository;

        this.BasketService = props.dependencies.BasketService;
        this.DeliveryService = props.dependencies.DeliveryService;
        this.ReviewService = props.dependencies.ReviewService;
        this.MediaService = props.dependencies.MediaService;
        this.RubricService = props.dependencies.RubricService;
        this.FaqService = props.dependencies.FaqService;
        this.ViewedProductsService = props.dependencies.ViewedProductsService;
        this.AuthorizationService = props.dependencies.AuthorizationService;

        this.AnalogTypeEnum = props.dependencies.AnalogTypeEnum;
        this.MnnAliasEnum = props.dependencies.MnnAliasEnum;

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
     * @method _hasFaq
     * @param productMnnAlias
     * @returns {boolean}
     */
    _hasFaq(productMnnAlias) {
        return productMnnAlias === this.MnnAliasEnum.getParacetamolAsValue();
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
     * @private
     * @method _buildOffers
     * @return {Offer[]}
     */
    _buildOffers() {
        return this._getFullAnalogs().map((item) => new this.OfferEntity(item.getEntity()));
    }

    /**
     * @method _buildNotesData
     * @param lang {string}
     * @returns {Object}
     * @private
     */
    _buildNotesData(lang) {
        let resource = this.Resource.getHTML(lang).notes;

        return {
            properties: {
                position: 1,
                title: resource.properties.title,
                description: resource.properties.description
            },
            instruction: {
                position: 2,
                title: resource.instruction.title,
                description: resource.instruction.description
            },
            description: {
                position: 3,
                title: resource.description.title,
                description: resource.description.description
            },
            analogs: {
                position: 4,
                title: resource.analogs.title,
                description: resource.analogs.description
            },
            mainProperties: {
                position: 5,
                title: resource.mainProperties.title,
                description: resource.mainProperties.description
            },
            certificate: {
                position: 6,
                title: resource.certificate.title,
                description: resource.certificate.description
            }
        };
    }

    /**
     * @private
     * @method _buildNotes
     * @param lang {string}
     * @return {Object}
     */
    _buildNotes(lang) {
        let notes = this._buildNotesData(lang);

        return Object.keys(notes).reduce((result, key) => {
            result[key] = new this.NoteEntity(notes[key]);

            return result;
        }, {});
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
     * @method _getFullAnalogs
     * @return {Product[]}
     * @private
     */
    _getFullAnalogs() {
        let result = [];

        this.analogs.forEach((item) => {
            if (this.AnalogTypeEnum.isFull(item.getType())) {
                result = item.getItems();
            }
        });

        return result;
    }

    /**
     * @method _getRubrics
     * @param id {string}
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getRubrics(id, resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getRelatedProducts(id, (rubric) => {
                if (new this.ProductRubricEntity(rubric).getItems().length) {
                    resultContainer.rubrics.push(rubric);
                }

                resolve();
            }, resolve);
        });
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
     * @method getDeliveries
     * @param cityId {string|number}
     * @param productAlias {string}
     * @param callback {Function}
     * @returns {Product}
     */
    getDeliveries(cityId, productAlias, callback) {
        if (_.isFunction(callback)) {
            this.DeliveryService.getDeliveriesByProduct(cityId, productAlias, callback, () => {
                callback([]);
            });
        }

        return this;
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
     * @method _getFaq
     * @param productMnnAlias {string}
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getFaq(productMnnAlias, resultContainer) {
        if (this._hasFaq(productMnnAlias)) {
            return new Promise((resolve) => {
                this.FaqService.getFaq(productMnnAlias, (faq) => {
                    resultContainer.faq = faq;

                    resolve();
                }, resolve);
            });
        }

        return Promise.resolve([]);
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
     * @public
     * @method getDefaultCity
     * @returns {City}
     */
    getDefaultCity() {
        return this.DeliveryService.convertCityToEntity(this.defaultCity);
    }

    /**
     * @public
     * @method getPopularCities
     * @param callback {Function}
     * @returns {Product}
     */
    getPopularCities(callback) {
        if (_.isFunction(callback)) {
            this.DeliveryService.getPopularCities(callback, function () {
                callback([]);
            });
        }

        return this;
    }

    /**
     * @public
     * @method getCitiesByName
     * @param name {string}
     * @param callback {Function}
     * @returns {Product}
     */
    getCitiesByName(name, callback) {
        if (_.isFunction(callback)) {
            this.DeliveryService.getCitiesByName(name, callback, function () {
                callback([]);
            });
        }

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
    getInitialProps(params, props) {
        let query = this.parseRouteByQuery(params.query),
            marketedName = props.pageProps.initialData.product.marketedName,
            productMnnAlias = (marketedName && marketedName.alias) || "",
            initialData = {
                tabName: query.tabName,
                reviewId: query.reviewId,
                analogs: [],
                faq: [],
                rubrics: [],
                product: null,
                review: null,
                reviewImages: [],
                offers: [],
                topPositiveReview: null,
                topNegativeReview: null
            };

        this.currentRouteFromServer.pathname = params.pathname;
        this.currentRouteFromServer.query = params.query;

        return new Promise((resolve) => {
            Promise.all([
                this._getFaq(productMnnAlias, initialData),
                this._getRubrics(query.productId, initialData)
            ]).then(resolve);
        })
            .then(() => initialData)
            .catch(() => initialData);
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
            faq: this.FaqService.convertFaqToEntity(initialData.faq),
            product: this.product,
            review: this.review,
            reviewImages: (initialData.review?.images || []).map((item) => new this.ImageEntity(item)),
            analogs: this.analogs,
            rubrics: initialData.rubrics.map((item) => new this.ProductRubricEntity(item)),
            notices: this._buildNotes(pageInfo.language),
            offers: this._buildOffers(),
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Product;
