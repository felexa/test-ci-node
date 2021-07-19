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
     * @method _getCategories
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getCategories(resultContainer) {
        return new Promise((resolve) => {
            this.BlogService.getAllCategories((categories) => {
                resultContainer.categories = categories;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getArticles
     * @param page {Number}
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getArticles(page, resultContainer) {
        return new Promise((resolve) => {
            this.BlogService.getAllArticles({page}, (articles) => {
                resultContainer.articles = articles;

                resolve();
            }, resolve);
        });
    }

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
        let baseUrl = this.Router
            .getRouteByName(this.RouteNamesEnum.getBlogAsValue())
            .toPath({
                subpath: this._getCurrentRoute().query.subpath
            });

        return currentPage > 1 ? `${baseUrl}/page-${currentPage}/` : `${baseUrl}/`;
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
            categories: [],
            articles: {},
            currentPage: (ctx.query.pageNumber && Number(ctx.query.pageNumber.replace(/page-/, ""))) || 1,
            totalCount: null
        };

        this.currentRouteFromServer.pathname = ctx.asPath;
        this.currentRouteFromServer.query = ctx.query;

        return Promise.all([
            this._getCategories(result),
            this._getArticles(result.currentPage, result)
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
            categories: initialData.categories.map((item) => new this.CategoryEntity(item)),
            articles: initialData.articles.items.map((item) => new this.ArticleEntity(item)),
            totalCount: initialData.articles.totalCount,
            currentPage: initialData.currentPage,
            pageInfo
        };
    }
}

export default Blog;
