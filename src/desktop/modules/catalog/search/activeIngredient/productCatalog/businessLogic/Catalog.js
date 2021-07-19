/* eslint-disable max-len */
import _ from "lodash";

class Catalog {
    constructor(props) {
        /**
         * @property currentIngredientName
         * @type {string}
         */
        this.currentIngredientName = "";

        /**
         * @property currentRouteFromServer
         * @type {{query: Object, pathname: string}}
         */
        this.currentRouteFromServer = {
            pathname: "",
            query: {}
        };

        this.Repository = props.dependencies.Repository;
        this.BasketService = props.dependencies.BasketService;
        this.ReviewService = props.dependencies.ReviewService;
        this.RubricService = props.dependencies.RubricService;
        this.FaqService = props.dependencies.FaqService;

        this.ProfileEntity = props.dependencies.ProfileEntity;
        this.BlogRubricEntity = props.dependencies.BlogRubricEntity;
        this.RangeEntity = props.dependencies.RangeEntity;
        this.ReviewEntity = props.dependencies.ReviewEntity;
        this.ProductEntity = props.dependencies.ProductEntity;
        this.ProductRubricEntity = props.dependencies.ProductRubricEntity;
        this.ProductGroupEntity = props.dependencies.ProductGroupEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;

        this.tabNameEnum = props.dependencies.TabNameEnum;
        this.LanguageEnum = props.dependencies.LanguageEnum;
    }

    /**
     * @private
     * @method _getLatestReview
     * @param ingredientName
     * @param resultContainer {Object}
     * @returns {Object}
     */
    _getReviews(ingredientName, resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getReviewByProductGroup(
                {groupId: ingredientName},
                (initialData) => {
                    resultContainer.totalReviewCount = initialData.itemsCount;
                    resultContainer.review = new this.ReviewEntity({}).setThreads(initialData.items).getEntity();

                    resolve();
                },
                function () {
                    resolve();
                }
            );
        });
    }

    /**
     * @private
     * @method _getInstruction
     * @param resultContainer {Object}
     * @returns {Object}
     */
    _getInstruction(resultContainer) {
        let firstProduct = resultContainer.products[0];

        return new Promise((resolve) => {
            if (!firstProduct) {
                resultContainer.instruction = "";

                resolve();
            } else {
                this.getInstructionById(new this.ProductEntity(firstProduct).getAlias(), (instruction) => {
                    resultContainer.instruction = instruction;

                    resolve();
                }, () => {
                    resultContainer.instruction = "";

                    resolve();
                });
            }
        });
    }

    /**
     * @private
     * @method _getFAQ
     * @param ingredientName {string}
     * @param resultContainer {Object}
     * @returns {Object}
     */
    _getFAQ(ingredientName, resultContainer) {
        return new Promise((resolve) => {
            this.FaqService.getFaq(ingredientName, (faq) => {
                resultContainer.faq = faq;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getAnalogsByForms
     * @param product {Catalog}
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getAnalogsByForms(product, resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getAnalogsByForms(
                product.getAlias(),
                function (items) {
                    resultContainer.analogs = resultContainer.analogs.concat(items);

                    resolve();
                }, function () {
                    resolve();
                }
            );
        });
    }

    /**
     * @private
     * @method _getForPregnant
     * @param ingredientName {string}
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getForPregnant(ingredientName, resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getForPregnant(ingredientName, function (forPregnant) {
                resultContainer.forPregnant = forPregnant;

                resolve();
            }, function () {
                resolve();
            });
        });
    }

    /**
     * @private
     * @method _getAnalogsByIngredient
     * @param ingredientName {string}
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getAnalogsByIngredient(ingredientName, resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getAnalogsByIngredient(ingredientName, function (items) {
                resultContainer.analogs = items;

                resolve();
            }, function () {
                resolve();
            });
        });
    }

    /**
     * @public
     * @method getCurrentRouteFromServer
     * @returns {Object}
     */
    getCurrentRouteFromServer() {
        return _.merge({}, this.currentRouteFromServer);
    }

    /**
     * @public
     * @method getInstructionById
     * @param id {string|number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Catalog}
     */
    getInstructionById(id, success, error) {
        if (id && _.isFunction(success)) {
            this.Repository.getInstructionById(
                id,
                (product) => {
                    success(new this.ProductEntity(product).getInstructionAsHTML());
                },
                error
            );
        }

        return this;
    }

    /**
     * @public
     * @method _getArticlesByIngredientName
     * @param ingredientName {string}
     * @param container {Object}
     * @returns {Promise}
     */
    _getArticlesByIngredientName(ingredientName, container) {
        let maxItemsCount = 4;

        return new Promise((resolve) => {
            this.RubricService.getArticlesByIngredientName({itemsPerPage: maxItemsCount, ingredientName}, (blog) => {
                container.blog = blog;

                resolve();
            }, resolve);
        });
    }

    /**
     * @public
     * @method getReviewByPage
     * @param page {number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Catalog}
     */
    getReviewByPage(page, success, error) {
        return new Promise(() => {
            this.Repository.getReviewByProductGroup(
                {
                    groupId: this.currentIngredientName,
                    page
                },
                (initialData) => {
                    success(new this.ReviewEntity({}).setThreads(initialData.items));
                },
                () => {
                    error();
                }
            );
        });
    }

    /**
     * @public
     * @method getViewedProducts
     * @param success {Function}
     * @param error {Function}
     * @return {Catalog}
     */
    getViewedProducts(success, error) {
        this.RubricService.getViewedProducts((rubric) => {
            success(new this.ProductRubricEntity(rubric));
        }, error);

        return this;
    }

    /**
     * @public
     * @method addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Catalog}
     */
    addToBasket(product, success, error) {
        this.BasketService.addItem(product.getCode(), success, error);

        return this;
    }

    /**
     * @public
     * @method getInitialProps
     * @param params {Object}
     * @returns {Promise}
     */
    getInitialProps(params) {
        let tabName = params.query.tabName || "",
            firstRouteSlug = this.LanguageEnum.isRu(params.language) ?
                params.asPath.split('/')[1] :
                params.asPath.split('/')[2];

        if (this.tabNameEnum.isPregnancy(firstRouteSlug)) {
            tabName = this.tabNameEnum.getPregnancyAsValue();
        }

        let result = {
            title: "",
            tabName,
            blog: {},
            priceRange: {},
            forPregnant: [],
            redactor: {},
            reviewer: {},
            products: [],
            tabs: [],
            analogs: [],
            review: {},
            instruction: "",
            description: "",
            notation: "",
            faq: [],
            currentIngredientName: params.query.ingredientName,
            totalReviewCount: 0,
            url: params.pathname,
            query: params.query.ingredientName
        };

        return new Promise((resolve) => {
            this.Repository.getInitialData(
                result.currentIngredientName,
                (initialData) => {
                    result.createdDate = initialData.createdAt || "";
                    result.lastUpdateDate = initialData.updatedAt || initialData.createdAt || "";
                    result.title = initialData.name;
                    result.priceRange = initialData.priceRange;
                    result.products = initialData.items;
                    result.description = initialData.description;
                    result.notation = initialData.notation;
                    result.redactor = initialData.author;
                    result.reviewer = initialData.censor;

                    resolve();
                }, () => {
                    resolve();
                }
            );
        })
            .then(() => new Promise((parentResolve) => {
                Promise.all([
                    //this._getAnalogsByForms(productEntity, result),
                    this._getAnalogsByIngredient(params.query.ingredientName, result),
                    this._getForPregnant(params.query.ingredientName, result),
                    this._getArticlesByIngredientName(params.query.ingredientName, result),
                    this._getInstruction(result),
                    this._getFAQ(params.query.ingredientName, result),
                    this._getReviews(params.query.ingredientName, result)
                ]).then(parentResolve);
            }))
            .then(() => result)
            .catch(() => result);
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        this.currentIngredientName = initialData.currentIngredientName;

        if (this.tabNameEnum.isPregnancy(initialData.tabName)) {
            this.currentRouteFromServer.pathname = initialData.url;
            this.currentRouteFromServer.query = {ingredientName: initialData.query};
        } else {
            this.currentRouteFromServer.pathname = initialData.ingredient.url;
            this.currentRouteFromServer.query = {ingredientName: initialData.ingredient.alias};
        }

        return {
            tabName: initialData.tabName,
            createdDate: new Date(initialData.createdDate),
            lastUpdateDate: new Date(initialData.lastUpdateDate),
            title: initialData.title,
            ingredient: this.currentIngredientName,
            rubrics: [
                new this.ProductRubricEntity({
                    id: 1,
                    name: "",
                    items: initialData.products
                })
            ],
            pricesAsRubric: [
                new this.ProductRubricEntity({
                    id: 2,
                    name: "",
                    items: initialData.products.slice(0, 6)
                })
            ],
            blog: new this.BlogRubricEntity(initialData.blog),
            forPregnant: initialData.forPregnant,
            redactor: new this.ProfileEntity(initialData.redactor),
            reviewer: new this.ProfileEntity(initialData.reviewer),
            priceRange: new this.RangeEntity(initialData.priceRange),
            review: new this.ReviewEntity(initialData.review),
            faq: this.FaqService.convertFaqToEntity(initialData.faq),
            analogs: (initialData.analogs.items || []).map((item) => new this.ProductGroupEntity(item)),
            totalReviewCount: initialData.totalReviewCount,
            instruction: initialData.instruction,
            description: initialData.description,
            notation: initialData.notation,
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Catalog;
