import _ from "lodash";

class Rubric {
    constructor(props) {
        /**
         * @property Repository
         * @type {Repository}
         */
        this.Repository = props.dependencies.Repository;
    }

    /**
     * @public
     * @method getRelatedProducts
     * @param id {string|number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getRelatedProducts(id, success, error) {
        if (id && _.isFunction(error) && _.isFunction(success)) {
            this.Repository.getRelatedProducts(id, success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getPopularProducts
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getPopularProducts(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getPopularProducts(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getPopularProductsJohnson
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getPopularProductsJohnson(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getPopularProductsJohnson(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getPopularProductsJohnson
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getAllProductsJohnson(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getAllProductsJohnson(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getShareProducts
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getShareProducts(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getShareProducts(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getPromoProducts
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getPromoProducts(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getPromoProducts(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getViewedProducts
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getViewedProducts(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getViewedProducts(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getReviewFromDoctors
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getReviewFromDoctors(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getReviewFromDoctors(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getArticles
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getArticles(params, success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getArticles(params, success, error);
        }

        return this;
    }

    /**
     * @method getArticlesByIngredientName
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getArticlesByIngredientName(params, success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Repository.getArticlesByIngredientName(params, (articles) => {
                success(articles);
            }, error);
        }

        return this;
    }

    /**
     * @public
     * @method getBrands
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getBrands(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getBrands(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getMassMedia
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getMassMedia(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getMassMedia(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getLastReview
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getLastReview(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getLastReview(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getPopularDrugs
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getPopularDrugs(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getPopularDrugs(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getVitaminsAndMinerals
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getVitaminsAndMinerals(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getVitaminsAndMinerals(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getAntibiotics
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getAntibiotics(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getAntibiotics(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getGynecologicalDrugs
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getGynecologicalDrugs(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getGynecologicalDrugs(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getUrologicalDrugs
     * @param success {Function}
     * @param error {Function}
     * @returns {Rubric}
     */
    getUrologicalDrugs(success, error) {
        if (_.isFunction(error) && _.isFunction(success)) {
            this.Repository.getUrologicalDrugs(success, error);
        }

        return this;
    }
}

export default Rubric;
