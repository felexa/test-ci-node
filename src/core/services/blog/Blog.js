import _ from "lodash";

class Blog {
    constructor(props) {
        /**
         * @property Repository
         * @type {Repository}
         */
        this.Repository = props.dependencies.Repository;

        /**
         * @property BlogEntity
         * @type {Blog}
         */
        this.BlogEntity = props.dependencies.BlogEntity;

        this.env = props.dependencies.Env;
    }

    /**
     * @method getAllCategories
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getAllCategories(success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Repository.getAllCategories((categories) => {
                success(categories);
            }, error);
        }

        return this;
    }

    /**
     * @method getAllArticles
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getAllArticles(params, success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Repository.getAllArticles(params, (articles) => {
                success(articles);
            }, error);
        }

        return this;
    }

    /**
     * @method getArticlesByCategory
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getArticlesByCategory(params, success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Repository.getArticlesByCategory(params, (articles) => {
                success(articles);
            }, error);
        }

        return this;
    }

    /**
     * @method getArticle
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getArticle(params, success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Repository.getArticle(params, (article) => {
                success(article);
            }, error);
        }

        return this;
    }

    /**
     * @method getCategory
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getCategory(params, success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Repository.getCategory(params, (category) => {
                success(category);
            }, error);
        }

        return this;
    }

    /**
     * @public
     * @method convertBlogToEntity
     * @param blog {Object}
     * @returns {Blog}
     */
    convertBlogToEntity(blog) {
        return new this.BlogEntity(blog);
    }
}

export default Blog;
