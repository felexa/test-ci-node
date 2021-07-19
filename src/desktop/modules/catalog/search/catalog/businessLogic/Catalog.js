class Catalog {
    constructor(props) {
        this.Repository = props.dependencies.Repository;

        this.RubricService = props.dependencies.RubricService;
        this.BasketService = props.dependencies.BasketService;
        this.FaqService = props.dependencies.FaqService;

        this.LanguageEnum = props.dependencies.LanguageEnum;

        this.EntityTransformer = props.dependencies.EntityTransformer;
        this.ProductRubricEntity = props.dependencies.ProductRubricEntity;
        this.FilterEntity = props.dependencies.FilterEntity;
        this.BannerEntity = props.dependencies.BannerEntity;
        this.ProfileEntity = props.dependencies.ProfileEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
    }

    /**
     * @method getViewedProductsAsRubric
     * @param success {Function}
     * @param error {Function}
     * @return {Catalog}
     */
    getViewedProductsAsRubric(success, error) {
        this.RubricService.getViewedProducts((rubric) => {
            success(new this.ProductRubricEntity(rubric));
        }, error);

        return this;
    }

    /**
     * @method getFAQByCategory
     * @param name {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Catalog}
     */
    getFAQByCategory(name, success, error) {
        this.FaqService.getFaqByCategory(name, (faq) => {
            success(this.FaqService.convertFaqToEntity(faq));
        }, error);

        return this;
    }

    /**
     * @private
     * @method _getCatalogData
     * @param resultContainer {Object}
     * @param params {Object}
     * @returns {Promise}
     */
    // _getCatalogData(resultContainer, params) {
    //     let queryParams = params.sorting ? {sorting: params.sorting} : {},
    //         filters = {filters: params["0"]};
    //
    //     return this.Repository.getCatalogData(filters, queryParams, (result) => {
    //         resultContainer.catalogData = result;
    //     });
    // }

    /**
     * @public
     * @method updateCatalogResults
     * @param filters {Object}
     * @param queryParams {Object}
     * @param callback {Function}
     * @returns {Catalog}
     */
    updateCatalogResults(filters, queryParams, callback) {
        this.Repository.getCatalogData(
            filters,
            queryParams,
            (catalogData) => callback(new this.FilterEntity(catalogData)),
            () => callback(new this.FilterEntity({}))
        );

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
     * @param context {Object}
     * @param props {Object}
     * @returns {Object}
     */
    // eslint-disable-next-line no-unused-vars
    getInitialProps(context, props) {
        let initialData = props.pageInfo.data || {},
            result = {
                catalogData: {},
                redactor: {},
                reviewer: {},
                lastUpdateDate: ""
            };

        result.catalogData = new this.EntityTransformer(initialData.search).getFilterValue() || {};
        result.redactor = initialData.category.author || {};
        result.reviewer = initialData.category.censor || {};
        result.createdDate = initialData.category.createdAt || "";
        result.lastUpdateDate = initialData.category.updatedAt || initialData.category.createdAt || "";

        return result;
        // return this._getCatalogData(result, context.query)
        //     .then(() => result)
        //     .catch(() => result);
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {{
     *   catalogData: Object{Filter}
     *   pageInfo: Object
     * }}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return {
            createdDate: new Date(initialData.createdDate),
            lastUpdateDate: new Date(initialData.lastUpdateDate),
            redactor: new this.ProfileEntity(initialData.redactor),
            reviewer: new this.ProfileEntity(initialData.reviewer),
            banners: initialData.banners.map((item) => new this.BannerEntity(item)),
            seoText: initialData.category.description,
            catalogData: new this.FilterEntity(initialData.catalogData),
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Catalog;
