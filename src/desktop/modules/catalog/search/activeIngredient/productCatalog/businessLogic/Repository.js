import _ from "lodash";

import notations from "./fixtures/notation.json";

class Repository {
    constructor(props) {
        /**
         * @example
         *
         * urls = {
         *     getProduct: {
         *         domain: string,
         *         path: string
         *     }
         * }
         *
         * @property urls
         * @type {Object}
         */
        this.urls = props.urls;

        this.notations = notations;

        this.HttpClient = props.dependencies.HttpClient;

        this.httpClient = new this.HttpClient();

        /**
         * @example
         *
         * urls = {
         *     getProduct: {
         *         domain: string,
         *         path: string
         *     }
         * }
         *
         * @property urls
         * @type {Object}
         */
        this.urls = props.urls;

        this.HttpClient = props.dependencies.HttpClient;

        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method getInitialData
     * @param ingredientName {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getInitialData(ingredientName, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getInitialData.domain)
            .request({
                path: this.urls.getInitialData.path,
                method: this.HttpClient.methods.GET,
                params: {
                    name: ingredientName
                },
                query: this.urls.getInitialData.query
            })
            .then((response) => {
                response.data.notation = this.notations[response.getHeaders().getContentLanguage()][ingredientName] || "";

                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method getAnalogsByIngredient
     * @param ingredientName {string|number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getAnalogsByIngredient(ingredientName, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getAnalogsByIngredient.domain)
            .request({
                path: this.urls.getAnalogsByIngredient.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getAnalogsByIngredient.params, {ingredient: ingredientName})
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method getForPregnant
     * @param ingredientName {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getForPregnant(ingredientName, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getForPregnant.domain)
            .request({
                path: this.urls.getForPregnant.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getForPregnant.params, {ingredient: ingredientName})
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method getInstructionById
     * @param id {string|number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getInstructionById(id, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getInstructionById.domain)
            .request({
                path: this.urls.getInstructionById.path,
                method: this.HttpClient.methods.GET,
                params: {id},
                query: this.urls.getInstructionById.query
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @example
     *
     * params = {
     *     groupId: string|number,
     *     page: number
     * }
     *
     * @public
     * @method getReviewByProductGroup
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getReviewByProductGroup(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getReviewByProductGroup.domain)
            .request({
                path: this.urls.getReviewByProductGroup.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getReviewByProductGroup.params, {
                    ingredient: params.groupId
                }),
                query: _.merge({}, this.urls.getReviewByProductGroup.query, {
                    page: params.page
                })
            })
            .then((response) => success(response.data), error);
    }
}

export default Repository;
