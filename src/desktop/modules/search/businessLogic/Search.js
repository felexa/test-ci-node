class Search {
    constructor(props) {
        this.ProductRubricEntity = props.dependencies.ProductRubricEntity;
        this.FilterEntity = props.dependencies.FilterEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;

        this.Repository = props.dependencies.Repository;
        this.RubricService = props.dependencies.RubricService;
        this.BasketService = props.dependencies.BasketService;
        this.Router = props.dependencies.Router;
        this.LanguageEnum = props.dependencies.LanguageEnum;
    }

    /**
     * @method getViewedProductsAsRubric
     * @param success {Function}
     * @param error {Function}
     * @return {Search}
     */
    getViewedProductsAsRubric(success, error) {
        this.RubricService.getViewedProducts((rubric) => {
            success(new this.ProductRubricEntity(rubric));
        }, error);

        return this;
    }

    /**
     * @private
     * @method _getSearchData
     * @param resultContainer {Object}
     * @param query {Object}
     * @returns {Promise}
     */
    _getSearchData(resultContainer, query) {
        let queryParams = query || {query: ""};

        return new Promise((resolve) => {
            this.Repository.getSearchData(queryParams, (searchData) => {
                resultContainer.searchData = searchData;

                resolve(this._getItemsFromCatalog(resultContainer, searchData));
            }, (error) => {
                console.log(error);
                resolve();
            });
        });
    }

    /**
     * @private
     * @method _getItemsFromCatalog
     * @param resultContainer {Object}
     * @param searchData {Object}
     * @returns {Promise}
     */
    _getItemsFromCatalog(resultContainer, searchData) {
        return new Promise((resolve) => {
            let productsId = this._getSearchItemsId(searchData);

            this.Repository.getItemsFromCatalog(productsId, (products) => {
                resultContainer.searchData.products = this._sortProducts(products, productsId);

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _sortProducts
     * @param productsId {Array}
     * @param products {Array}
     * @returns {Array}
     */
    _sortProducts(products, productsId) {
        let sortProducts = [];

        productsId.forEach((id) => {
            products.forEach((item) => {
                if (item.id === id) {
                    sortProducts.push(item);
                }
            });
        });

        return sortProducts;
    }

    /**
     * @private
     * @method _getSearchItemsId
     * @param searchData {Object}
     * @returns {Array}
     */
    _getSearchItemsId(searchData) {
        let result = [];

        if (searchData.searchItems && searchData.searchItems.length) {
            result = searchData.searchItems.map((item) => item.id);
        }

        return result;
    }

    /**
     * @public
     * @method updateSearchResults
     * @param query {string}
     * @param success {Function}
     * @returns {Filter}
     */
    updateSearchResults(query, success, error) {
        this.Repository.getSearchData(query, (searchData) => {
            this._updateItemsFromCatalog(searchData, success, error);
        });
    }

    /**
     * @private
     * @method _updateItemsFromCatalog
     * @param searchData {Object}
     * @param success {Function}
     * @returns {Filter}
     */
    _updateItemsFromCatalog(searchData, success, error) {
        let productsId = this._getSearchItemsId(searchData);

        this.Repository.getItemsFromCatalog(productsId, (products) => {
            searchData.products = this._sortProducts(products, productsId);

            return success(new this.FilterEntity(searchData));
        }, error);
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
     * @param context {Object}
     * @returns {Promise}
     */
    getInitialProps(context) {
        let result = {
            searchData: {},
            language: context.req ? context.req.i18n.language : this.LanguageEnum.ru
        };

        return this._getSearchData(result, context.query)
            .then(() => result)
            .catch(() => result);
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {{
     *   searchData: Object{Filter}
     *   language: string
     *   pageInfo: Object
     * }}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return {
            searchData: new this.FilterEntity(initialData.searchData),
            language: initialData.language,
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Search;
