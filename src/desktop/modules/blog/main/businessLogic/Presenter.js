class Presenter {
    constructor(props) {
        this.Model = props.dependencies.Model;
    }

    /**
     * @public
     * @method buildUrlForNextPage
     * @param currentPage {number}
     * @returns {string}
     */
    buildUrlForNextPage(currentPage) {
        return this.Model.buildUrlForNextPage(currentPage);
    }

    /**
     * @public
     * @method buildUrlForCategory
     * @param categoryName {string}
     * @returns {string}
     */
    buildUrlForCategory(categoryName) {
        return this.Model.buildUrlForCategory(categoryName);
    }

    /**
     * @public
     * @method buildUrlForArticle
     * @param categoryName {string}
     * @param articleAlias {string}
     * @returns {string}
     */
    buildUrlForArticle(categoryName, articleAlias) {
        return this.Model.buildUrlForArticle(categoryName, articleAlias);
    }

    /**
     * @public
     * @method changePage
     * @param page {number}
     * @param success {Function}
     * @returns {Questions}
     */
    changePage(page, success) {
        this.Model.changePage(page, success);

        return this;
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return this.Model.normalizeInitialProps(initialData, pageInfo);
    }
}

export default Presenter;
