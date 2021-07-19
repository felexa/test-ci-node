class VendorCard {
    constructor(props) {
        this.CompanyEntity = props.dependencies.CompanyEntity;
        this.CategoryEntity = props.dependencies.CategoryEntity;
        this.TrademarkEntity = props.dependencies.TrademarkEntity;
        this.ProductRubricEntity = props.dependencies.ProductRubricEntity;
        this.BannerEntity = props.dependencies.BannerEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;

        this.Repository = props.dependencies.Repository;
        this.RubricService = props.dependencies.RubricService;
        this.BasketService = props.dependencies.BasketService;
    }

    /**
     * @private
     * @method _getCompany
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getCompany(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getCompany((company) => {
                resultContainer.company = company;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getCategories
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getCategories(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getCategories((categories) => {
                resultContainer.categories = categories;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getTrademarks
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getTrademarks(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getTrademarks((trademarks) => {
                resultContainer.trademarks = trademarks;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getPromo
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getPromo(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getPromo((promo) => {
                resultContainer.promo = promo;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getBanner
     * @param resultContainer {Object}
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
     * @method _getPopularProductsJohnson
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getPopularProducts(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getPopularProductsJohnson((popularProducts) => {
                if (new this.ProductRubricEntity(popularProducts).getItems().length) {
                    resultContainer.rubrics.push(popularProducts);
                }
                resolve();
            }, resolve);
        });
    }

    /**
     * @method _getAllProductsJohnson
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getAllProducts(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getAllProductsJohnson((popularProducts) => {
                if (new this.ProductRubricEntity(popularProducts).getItems().length) {
                    resultContainer.rubrics.push(popularProducts);
                }
                resolve();
            }, resolve);
        });
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
     * @public
     * @method getInitialProps
     * @return {Promise}
     */
    getInitialProps(context) {
        let result = {
            company: {},
            aboutCompany: {},
            categories: [],
            trademarks: [],
            promoTrademarks: [],
            rubrics: [],
            banner: {}
        };

        return Promise.all([
            this._getCompany(result),
            this._getCategories(result),
            this._getTrademarks(result),
            this._getPromo(result),
            this._getBanner(result),
            this._getPopularProducts(result),
            this._getAllProducts(result)
        ])
            .then(() => new Promise((resolve) => {
                result.vendorId = context.query.vendorId;
                resolve();
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
        return {
            company: new this.CompanyEntity(initialData.company),
            categories: initialData.categories.map((item) => new this.CategoryEntity(item)),
            trademarks: initialData.trademarks.map((item) => new this.TrademarkEntity(item)),
            promoTrademarks: initialData.promo.trademarks.map((item) => new this.TrademarkEntity(item)),
            rubrics: initialData.rubrics.map((rubric) => new this.ProductRubricEntity(rubric)),
            banner: new this.BannerEntity(initialData.banner),
            pageType: initialData.pageType,
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default VendorCard;
