class VendorCard {
    constructor(props) {
        this.CompanyEntity = props.dependencies.CompanyEntity;
        this.BannerEntity = props.dependencies.BannerEntity;
        this.NoteEntity = props.dependencies.NoteEntity;
        this.ProductEntity = props.dependencies.ProductEntity;
        this.CategoryEntity = props.dependencies.CategoryEntity;
        this.ProductRubricEntity = props.dependencies.ProductRubricEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
        this.TrademarkEntity = props.dependencies.TrademarkEntity;

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
     * @private
     * @method _getVendorAdvantages
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getVendorAdvantages(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getVendorAdvantages((advantage) => {
                resultContainer.vendorAdvantages = advantage;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getMainProduct
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getMainProduct(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getMainProduct((product) => {
                resultContainer.mainProduct = product;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getProductAdvantages
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getProductAdvantages(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getProductAdvantages((advantage) => {
                resultContainer.productAdvantages = advantage;

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
            banner: {},
            vendorAdvantages: [],
            mainProduct: {},
            productAdvantages: [],
            categories: [],
            rubrics: [],
            trademarks: []
        };

        return Promise.all([
            this._getCompany(result),
            this._getBanner(result),
            this._getVendorAdvantages(result),
            this._getMainProduct(result),
            this._getProductAdvantages(result),
            this._getCategories(result),
            this._getTrademarks(result)
        ])
            .then(() => new Promise((resolve) => {
                result.vendorId = context.query.vendorId;
                // result.pageType = context.query.pageName || context.asPath.replace('?', '/').split('/')[2];
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
            banner: new this.BannerEntity(initialData.banner),
            vendorAdvantages: (initialData.vendorAdvantages || []).map((item) => new this.NoteEntity(item)),
            mainProduct: new this.ProductEntity(initialData.mainProduct),
            productAdvantages: (initialData.productAdvantages || []).map((item) => new this.NoteEntity(item)),
            categories: initialData.categories.map((item) => new this.CategoryEntity(item)),
            trademarks: initialData.trademarks.map((item) => new this.TrademarkEntity(item)),
            rubrics: initialData.rubrics.map((rubric) => new this.ProductRubricEntity(rubric)),
            pageType: initialData.pageType,
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default VendorCard;
