class Category {
    constructor(props) {
        this.Repository = props.dependencies.Repository;
        this.BannerEntity = props.dependencies.BannerEntity;
        this.CategoryEntity = props.dependencies.CategoryEntity;
        this.ProductRubricEntity = props.dependencies.ProductRubricEntity;
        this.CommentRubricEntity = props.dependencies.CommentRubricEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
        this.LanguageEnum = props.dependencies.LanguageEnum;

        this.BasketService = props.dependencies.BasketService;
        this.RubricService = props.dependencies.RubricService;
    }

    /**
     * @public
     * @method addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promo}
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
     * @private
     * @method _getBanner
     * @param resultContainer
     * @returns {Promise}
     */
    _getBanner(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getBanner((banner) => {
                resultContainer.banner = banner;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getTopCategory
     * @param resultContainer
     * @param language
     * @returns {Promise}
     */
    _getTopCategory(resultContainer, language) {
        return new Promise((resolve) => {
            this.Repository.getTopCategory((topCategory) => {
                resultContainer.topCategory = topCategory[language];

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getPopularCategory
     * @param resultContainer
     * @param language
     * @returns {Promise}
     */
    _getPopularCategory(resultContainer, language) {
        return new Promise((resolve) => {
            this.Repository.getPopularCategory((popularCategory) => {
                resultContainer.popularCategory = popularCategory[language];

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getAllCategory
     * @param resultContainer
     * @returns {Promise}
     */
    _getAllCategory(resultContainer/* , query */) {
        // let category = {category: query["0"]};
        let category = {category: "medikamenty"};

        return new Promise((resolve) => {
            this.Repository.getAllCategory(category, (allCategory) => {
                resultContainer.allCategory = allCategory;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getPopularDrugs
     * @param resultContainer
     * @returns {Promise}
     */
    _getPopularDrugs(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getPopularDrugs((rubric) => {
                if (new this.ProductRubricEntity(rubric).getItems().length) {
                    resultContainer.rubrics.push(rubric);
                }

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getVitaminsAndMinerals
     * @param resultContainer
     * @returns {Promise}
     */
    _getVitaminsAndMinerals(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getVitaminsAndMinerals((rubric) => {
                if (new this.ProductRubricEntity(rubric).getItems().length) {
                    resultContainer.rubrics.push(rubric);
                }
                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getAntibiotics
     * @param resultContainer
     * @returns {Promise}
     */
    _getAntibiotics(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getAntibiotics((rubric) => {
                if (new this.ProductRubricEntity(rubric).getItems().length) {
                    resultContainer.rubrics.push(rubric);
                }
                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getGynecologicalDrugs
     * @param resultContainer
     * @returns {Promise}
     */
    _getGynecologicalDrugs(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getGynecologicalDrugs((rubric) => {
                if (new this.ProductRubricEntity(rubric).getItems().length) {
                    resultContainer.rubrics.push(rubric);
                }
                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getUrologicalDrugs
     * @param resultContainer
     * @returns {Promise}
     */
    _getUrologicalDrugs(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getUrologicalDrugs((rubric) => {
                if (new this.ProductRubricEntity(rubric).getItems().length) {
                    resultContainer.rubrics.push(rubric);
                }
                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getLastReview
     * @param resultContainer
     * @returns {Promise}
     */
    _getLastReview(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getLastReview((lastReview) => {
                resultContainer.lastReview = lastReview;

                resolve();
            }, resolve);
        });
    }

    /**
     * @public
     * @method getInitialProps
     * @return {Promise}
     */
    getInitialProps(context) {
        let language = context.req.i18n.language || this.LanguageEnum.getRuAsValue(),
            result = {
                banner: {},
                lastReview: {},
                rubrics: [],
                topCategory: [],
                popularCategory: [],
                allCategory: []
            };

        return Promise.all([
            this._getBanner(result),
            this._getTopCategory(result, language),
            this._getPopularCategory(result, language),
            this._getPopularDrugs(result),
            this._getVitaminsAndMinerals(result),
            this._getAntibiotics(result),
            this._getUrologicalDrugs(result),
            this._getGynecologicalDrugs(result),
            this._getLastReview(result),
            this._getAllCategory(result, context.query)
        ])
            .then(function () {
                return result;
            })
            .catch(() => result);
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {{
     *   pageInfo: Object
     * }}
     */
    normalizeInitialProps(initialData, pageInfo) {
        initialData.rubrics.sort((a, b) => a.id - b.id);

        return {
            banner: new this.BannerEntity(initialData.banner),
            topCategory: initialData.topCategory.map((item) => new this.CategoryEntity(item)),
            popularCategory: initialData.popularCategory.map((item) => new this.CategoryEntity(item)),
            allCategory: initialData.allCategory.map((item) => new this.CategoryEntity(item)),
            rubrics: initialData.rubrics.map((item) => new this.ProductRubricEntity(item)),
            lastReview: [new this.CommentRubricEntity(initialData.lastReview)],
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Category;
