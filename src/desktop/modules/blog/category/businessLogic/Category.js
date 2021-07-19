class Blog {
    constructor(props) {
        this.RouteNamesEnum = props.dependencies.RouteNamesEnum;
        this.Router = props.dependencies.Router;
        this.BlogService = props.dependencies.BlogService;

        this.CategoryEntity = props.dependencies.CategoryEntity;
        this.ArticleEntity = props.dependencies.ArticleEntity;

        /**
         * @property currentRouteFromServer
         * @type {{query: Object, pathname: string}}
         */
        this.currentRouteFromServer = {
            pathname: "",
            query: {}
        };
    }

    /**
     * @private
     * @method _getArticles
     * @param params {object}
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getArticles(params, resultContainer) {
        return new Promise((resolve) => {
            this.BlogService.getArticlesByCategory({categoryAlias: params.category, page: params.page}, (articles) => {
                resultContainer.articles = articles;

                resolve();
            }, resolve);
        });
    }

    // /**
    //  * @private
    //  * @method _getCategory
    //  * @param resultContainer {Object}
    //  * @param alias {string}
    //  * @returns {Promise}
    //  */
    // _getCategory(alias, resultContainer) {
    //     return new Promise((resolve) => {
    //         this.BlogService.getCategory({alias}, (category) => {
    //             resultContainer.category = category;
    //
    //             resolve();
    //         }, resolve);
    //     });
    // }

    /**
     * @private
     * @method _getCurrentRoute
     * @returns {{query: Object, pathname: string}}
     */
    _getCurrentRoute() {
        let route = this.Router.getCurrentRoute();

        return route.pathname ? route : this.currentRouteFromServer;
    }

    /**
     * @public
     * @method buildUrlForNextPage
     * @param currentPage {number}
     * @returns {string}
     */
    buildUrlForNextPage(currentPage) {
        let category = this._getCurrentRoute().query.category,
            baseUrl = this.Router
                .getRouteByName(this.RouteNamesEnum.getBlogAsValue())
                .toPath({
                    subpath: this._getCurrentRoute().query.subpath
                });

        return currentPage > 1 ?
            `${baseUrl}/${category}/page-${currentPage}/` :
            `${baseUrl}/${category}/`;
    }

    /**
     * @public
     * @method buildUrlForCategory
     * @param categoryName {string}
     * @returns {string}
     */
    buildUrlForCategory(categoryName) {
        let baseUrl = this.Router
            .getRouteByName(this.RouteNamesEnum.getBlogAsValue())
            .toPath({
                subpath: this._getCurrentRoute().query.subpath
            });

        return `${baseUrl}/${categoryName}/`;
    }

    /**
     * @public
     * @method buildUrlForArticle
     * @param categoryName {string}
     * @param articleAlias {string}
     * @returns {string}
     */
    buildUrlForArticle(categoryName, articleAlias) {
        let baseUrl = this.Router
            .getRouteByName(this.RouteNamesEnum.getBlogAsValue())
            .toPath({
                subpath: this._getCurrentRoute().query.subpath
            });

        return `${baseUrl}/${categoryName}/${articleAlias}`;
    }

    /**
     * @public
     * @method changePage
     * @param page {number}
     * @param success {Function}
     * @returns {Questions}
     */
    changePage(page, success) {
        this.Router.to(this.buildUrlForNextPage(page), {}, success);

        return this;
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps(ctx) {
        let result = {
            articles: {},
            category: {},
            currentPage: (ctx.query.pageNumber && Number(ctx.query.pageNumber.replace(/page-/, ""))) || 1,
            totalCount: null
        };

        this.currentRouteFromServer.pathname = ctx.asPath;
        this.currentRouteFromServer.query = ctx.query;

        return Promise.all([
            this._getArticles({
                category: ctx.query.category,
                page: result.currentPage
            }, result)
            // this._getCategory(ctx.query.category, result)
        ])
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
            articles: initialData.articles.items.map((article) => new this.ArticleEntity(article)),
            category: new this.CategoryEntity(initialData.category),
            currentPage: initialData.currentPage,
            totalCount: initialData.articles.totalCount,
            pageInfo
        };
    }
}

export default Blog;
