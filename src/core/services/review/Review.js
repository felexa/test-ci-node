import _ from "lodash";

class Review {
    constructor(props) {
        /**
         * @private
         * @property _Repository
         * @type {Repository}
         */
        this._Repository = props.dependencies.Repository;

        /**
         * @private
         * @property _ReviewEntity
         * @type {Review}
         */
        this._ReviewEntity = props.dependencies.ReviewEntity;

        /**
         * @private
         * @property _ThreadEntity
         * @type {Thread}
         */
        this._ThreadEntity = props.dependencies.ThreadEntity;
    }

    /**
     * @example
     *
     * params = {
     *     entityId: string|number,
     *     page: string|number
     * }
     *
     * @public
     * @method getReview
     * @param params {object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getReview(params, success, error) {
        if (params.entityId && _.isFunction(success) && _.isFunction(error)) {
            this._Repository.getReview(params, success, error);
        }

        return this;
    }

    /**
     * @method getReviewById
     * @param id {string|number}
     * @param success {Function}
     * @param error {Function}
     * @return {Review}
     */
    getReviewById(id, success, error) {
        if (id && _.isFunction(success) && _.isFunction(error)) {
            this._Repository.getReviewById(id, success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getLatestReview
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getLatestReview(success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this._Repository.getLatestReview(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getAnswers
     * @param id {string|number}
     * @param page {number}
     * @param itemsPerPage {number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getAnswers(id, page, itemsPerPage, success, error) {
        if (id && page && itemsPerPage && _.isFunction(success) && _.isFunction(error)) {
            this._Repository.getAnswers(id, page, itemsPerPage, (items) => {
                success(items.map((item) => new this._ThreadEntity(item)));
            }, error);
        }

        return this;
    }

    /**
     * @example
     *
     * params = {
     *   id: string,
     *   page: string
     * }
     *
     * @public
     * @method getThreadsByUserId
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getThreadsByUserId(params, success, error) {
        if (params.id && _.isFunction(success) && _.isFunction(error)) {
            this._Repository.getThreadsByUserId(params, success, error);
        }

        return this;
    }

    /**
     * @example
     *
     * review = {
     *   email: string,
     *   comment: string
     * }
     *
     * @method createFeedback
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    createFeedback(review, success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this._Repository.createFeedback(review, success, error);
        }

        return this;
    }

    /**
     * @example
     *
     * review = {
     *   targetId: string|number
     *   rating: number,
     *   name: string,
     *   email: string,
     *   comment: string,
     *   notify: boolean
     * }
     *
     * @public
     * @method create
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    create(review, success, error) {
        if (_.isPlainObject(review) && _.isFunction(error) && _.isFunction(error)) {
            this._Repository.create(review, success, error);
        }

        return this;
    }

    /**
     * @example
     *
     * review = {
     *   targetId: string|number
     *   threadId: string|number
     *   name: string,
     *   email: string,
     *   comment: string,
     *   notify: boolean
     * }
     *
     * @public
     * @method createAnswer
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    createAnswer(review, success, error) {
        if (_.isPlainObject(review) && _.isFunction(error) && _.isFunction(error)) {
            this._Repository.createAnswer(review, success, error);
        }

        return this;
    }

    /**
     * @public
     * @method _vote
     * @param thread {Thread}
     * @param voteType {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Review}
     */
    vote(thread, voteType, success, error) {
        if (thread && voteType && _.isFunction(success) && _.isFunction(error)) {
            this._Repository.vote({
                id: thread.getId(),
                threadType: thread.getType(),
                voteType
            }, (data) => {
                success(new this._ThreadEntity(data));
            }, error);
        }

        return this;
    }

    /**
     * @public
     * @method convertReviewToEntity
     * @param review {Object}
     * @returns {Review}
     */
    convertReviewToEntity(review) {
        return new this._ReviewEntity(review);
    }
}

export default Review;
