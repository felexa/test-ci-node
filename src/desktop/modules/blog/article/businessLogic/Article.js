class Article {
    constructor(props) {
        this.BlogService = props.dependencies.BlogService;
        this.BasketService = props.dependencies.BasketService;

        this.PageInfoEntity = props.dependencies.PageInfoEntity;
        this.ArticleEntity = props.dependencies.ArticleEntity;
    }

    // /**
    //  * @private
    //  * @method _getArticle
    //  * @param resultContainer {Object}
    //  * @param alias {string}
    //  * @returns {Promise}
    //  */
    // _getArticle(alias, resultContainer) {
    //     return new Promise((resolve) => {
    //         this.BlogService.getArticle({alias}, (article) => {
    //             resultContainer.article = article;
    //
    //             resolve();
    //         }, resolve);
    //     });
    // }

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
     * @returns {Promise}
     */
    getInitialProps() {
        let result = {
            article: null
        };

        return Promise.resolve(result);
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
            article: new this.ArticleEntity(initialData.post),
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Article;
