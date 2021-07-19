class Home {
    constructor(props) {
        this.Repository = props.dependencies.Repository;
        this.Router = props.dependencies.Router;
        this.Env = props.dependencies.Env;

        this.BasketService = props.dependencies.BasketService;
        this.RubricService = props.dependencies.RubricService;
        this.MenuService = props.dependencies.MenuService;

        this.BannerEntity = props.dependencies.BannerEntity;
        this.ProductEntity = props.dependencies.ProductEntity;
        this.StoryEntity = props.dependencies.StoryEntity;
        this.ProductRubricEntity = props.dependencies.ProductRubricEntity;
        this.CommentRubricEntity = props.dependencies.CommentRubricEntity;
        this.ShareEntity = props.dependencies.ShareEntity;
        this.ArticleEntity = props.dependencies.ArticleEntity;

        this.BrandRubricEntity = props.dependencies.BrandRubricEntity;
        this.BlogRubricEntity = props.dependencies.BlogRubricEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
        this.MassMediaRubricEntity = props.dependencies.MassMediaRubricEntity;
    }

    /**
     * @method _getPopularProducts
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getPopularProducts(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getPopularProducts((popularProducts) => {
                if (new this.ProductRubricEntity(popularProducts).getItems().length) {
                    resultContainer.rubrics.push(popularProducts);
                }
                resolve();
            }, resolve);
        });
    }

    /**
     * @method _getShareProducts
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getShareProducts(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getShareProducts((shareProducts) => {
                if (new this.ProductRubricEntity(shareProducts).getItems().length) {
                    resultContainer.rubrics.push(shareProducts);
                }

                resolve();
            }, resolve);
        });
    }

    /**
     * @method _getStory
     * @param resultContainer
     * @returns {Promise}
     * @private
     */
    _getStory(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getStory((items) => {
                resultContainer.story = items;

                resolve();
            }, resolve);
        });
    }

    /**
     * @method _getCatalogMenu
     * @param resultContainer
     * @returns {Promise}
     * @private
     */
    _getCatalogMenu(resultContainer) {
        return new Promise((resolve) => {
            this.MenuService.getCatalog((menu) => {
                resultContainer.menu = menu;

                resolve();
            }, resolve);
        });
    }

    /**
     * @method _getAboutContent
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getAboutContent(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getAboutContent((content) => {
                resultContainer.about = content;

                resolve();
            }, resolve);
        });
    }

    /**
     * @method _getAwards
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getAwards(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getAwards((items) => {
                resultContainer.awards = items;

                resolve();
            }, () => {
                resolve();
            });
        });
    }

    /**
     * @method _getShare
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getShare(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getShare((items) => {
                resultContainer.share = items;

                resolve();
            }, resolve);
        });
    }

    /**
     * @method _getLastReview
     * @param resultContainer
     * @returns {Promise}
     * @private
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
     * @method _getReviewFromDoctors
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getReviewFromDoctors(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getReviewFromDoctors((reviewFromDoctors) => {
                resultContainer.reviewFromDoctors = reviewFromDoctors;

                resolve();
            }, resolve);
        });
    }

    /**
     * @method _getBrands
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getBrands(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getBrands((brands) => {
                resultContainer.brands = brands;

                resolve();
            }, resolve);
        });
    }

    /**
     * @method _getMassMedia
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getMassMedia(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getMassMedia((massMedia) => {
                resultContainer.massMedia = massMedia;

                resolve();
            }, resolve);
        });
    }

    /**
     * @public
     * @method getInitialProps
     * @return {Promise}
     */
    getInitialProps() {
        let result = {
            lastReview: {},
            reviewFromDoctors: {},
            menu: [],
            rubrics: [],
            banners: [],
            story: [],
            share: [],
            brands: {},
            blog: {},
            massMedia: {},
            awards: [],
            about: ""
        };

        return Promise.all([
            this._getLastReview(result),
            this._getReviewFromDoctors(result),
            this._getBrands(result),
            this._getMassMedia(result),
            this._getCatalogMenu(result),
            this._getAwards(result)
            // this._getPopularProducts(result),
            // this._getShareProducts(result),
            // this._getShare(result),
            // this._getAboutContent(result),
            // this._getStory(result)
        ])
            .then(() => result)
            .catch(() => result);
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
     * @method getShareProducts
     * @param success
     * @param error
     * @return {Home}
     */
    getShareProducts(success, error) {
        this.RubricService.getShareProducts((rubric) => {
            success(new this.ProductRubricEntity(rubric));
        }, error);

        return this;
    }

    /**
     * @public
     * @method getPopularProducts
     * @param success {Function}
     * @param error {Function}
     * @returns {Home}
     */
    getPopularProducts(success, error) {
        this.RubricService.getPopularProducts((rubric) => {
            success(new this.ProductRubricEntity(rubric));
        }, error);

        return this;
    }

    /**
     * @public
     * @method getLastArticles
     * @param success {Function}
     * @param error {Function}
     * @returns {Home}
     */
    getLastArticles(success, error) {
        let maxItemsCount = 4;

        this.RubricService.getArticles({itemsPerPage: maxItemsCount}, (blog) => {
            success(new this.BlogRubricEntity(blog));
        }, error);

        return this;
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {{
     *   lastReview: CommentRubric[],
     *   reviewFromDoctors: CommentRubric[],
     *   brands: BrandRubric,
     *   massMedia: MassMediaRubric,
     *   blog: BlogRubric,
     *   banners: Banner[],
     *   story: Story[],
     *   share: Share[],
     *   awards: Article[],
     *   menu: [],
     *   about: string,
     *   pageInfo: Object
     *   rubrics: ProductRubric[]
     * }}
     */
    normalizeInitialProps(initialData, pageInfo) {
        let rubrics = [];

        rubrics = initialData.rubrics.map((rubric) => new this.ProductRubricEntity(rubric));
        rubrics.sort((rubricA, rubricB) => rubricA.getId() - rubricB.getId());

        return {
            lastReview: [new this.CommentRubricEntity(initialData.lastReview)],
            reviewFromDoctors: [new this.CommentRubricEntity(initialData.reviewFromDoctors)],
            brands: new this.BrandRubricEntity(initialData.brands),
            massMedia: new this.MassMediaRubricEntity(initialData.massMedia),
            blog: new this.BlogRubricEntity(initialData.blog),
            banners: initialData.banners.map((item) => new this.BannerEntity(item)),
            story: initialData.story.map((item) => new this.StoryEntity(item)),
            share: initialData.share.map((item) => new this.ShareEntity(item)),
            awards: initialData.awards.map((item) => new this.ArticleEntity(item)),
            menu: initialData.menu,
            about: initialData.about,
            pageInfo: new this.PageInfoEntity(pageInfo),
            rubrics
        };
    }
}

export default Home;
