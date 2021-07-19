import _ from "lodash";

class Repository {
    constructor(props) {
        /**
         * @example
         *
         * urls = {
         *     getReview: {
         *         domain: string,
         *         path: string
         *     }
         * }
         *
         * @property urls
         * @type {Object}
         */
        this.urls = props.urls;

        /**
         * @property httpClient
         * @type {HttpClient}
         */
        this.httpClient = new props.dependencies.HttpClient();

        /**
         * @property HttpClient
         * @type {HttpClient}
         */
        this.HttpClient = props.dependencies.HttpClient;

        /**
         * @property ThreadEntity
         * @type {Thread}
         */
        this.ThreadEntity = props.dependencies.ThreadEntity;
    }

    /**
     * @method _enrichThread
     * @param thread {Object}
     * @param type {string}
     * @returns {Object}
     * @private
     */
    _enrichThread(thread, type) {
        return new this.ThreadEntity(thread).setType(type).getEntity();
    }

    /**
     * @method _enrichThreads
     * @param items {Array}
     * @param type {string}
     * @returns {Array}
     * @private
     */
    _enrichThreads(items, type) {
        return items.map((item) => (
            this._enrichThread(item, type)
        ));
    }

    /**
     * @method _buildReview
     * @param review {Object}
     * @return {Object}
     * @private
     */
    _buildReview(review) {
        let result = {
            targetId: review.targetId,
            name: review.name,
            email: review.email,
            text: review.comment,
            notify: review.notify,
            images: review.images,
            anonymous: review.anonymous
        };

        if (review.rating) {
            result.rating = review.rating;
        }

        if (review.threadId) {
            result.recordId = review.threadId;
        }

        return result;
    }

    /**
     * @method _buildFeedback
     * @param review {Object}
     * @return {Object}
     * @private
     */
    _buildFeedback(review) {
        return {
            email: review.email,
            text: review.comment
        };
    }

    /**
     * @public
     * @method getReview
     * @param params {object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getReview(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getReview.domain)
            .request({
                path: this.urls.getReview.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getReview.params, {id: params.entityId}),
                query: _.merge({}, this.urls.getReview.query, {page: params.page || 1})
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @method getReviewById
     * @param id {string|number}
     * @param success {Function}
     * @param error {Function}
     * @return {Review}
     */
    getReviewById(id, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getReviewById.domain)
            .request({
                path: this.urls.getReviewById.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getReviewById.params, {id}),
                query: this.urls.getReviewById.query,
                headers: {}
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @method getThreadsByUserId
     * @param params {Object}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getThreadsByUserId(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getThreadsByUserId.domain)
            .request({
                path: this.urls.getThreadsByUserId.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getThreadsByUserId.params, {id: params.id}),
                query: _.merge({}, this.urls.getThreadsByUserId.query, {page: params.page || 1})
            })
            .then((response) => {
                let result = response.data;

                result.forEach((item) => {
                    item.status = {
                        name: item.status
                    };
                });

                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method getLatestReview
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getLatestReview(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getLatestReview.domain)
            .request({
                path: this.urls.getLatestReview.path,
                method: this.HttpClient.methods.GET,
                params: this.urls.getLatestReview.params,
                query: this.urls.getLatestReview.query
            })
            .then((response) => {
                success(response.data);
            }, error);
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
        return this.httpClient
            .setBaseUrl(this.urls.getAnswers.domain)
            .request({
                path: this.urls.getAnswers.path,
                method: this.HttpClient.methods.GET,
                params: _.merge({}, this.urls.getAnswers.params, this.urls.create.params, {id}),
                query: _.merge({}, this.urls.getAnswers.query, this.urls.create.query, {page, itemsPerPage})
            })
            .then((response) => {
                success(this._enrichThreads(response.data, this.ThreadEntity.getCommentType()));
            }, error);
    }

    /**
     * @public
     * @method create
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    create(review, success, error) {
        return this
            .httpClient
            .setBaseUrl(this.urls.create.domain)
            .request({
                path: this.urls.create.path,
                method: this.HttpClient.methods.POST,
                params: this.urls.create.params,
                query: this.urls.create.query,
                body: this._buildReview(review)
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @public
     * @method createAnswer
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    createAnswer(review, success, error) {
        return this
            .httpClient
            .setBaseUrl(this.urls.createAnswer.domain)
            .request({
                path: this.urls.createAnswer.path,
                method: this.HttpClient.methods.POST,
                params: this.urls.createAnswer.params,
                query: this.urls.createAnswer.query,
                body: this._buildReview(review)
            })
            .then((response) => {
                success(response.data);
            }, error);
    }

    /**
     * @example
     *
     * vote = {
     *     id: string|number,
     *     threadType: ("reviews"|"comments"),
     *     voteType: ("like"|"unlike"|"dislike")
     * }
     *
     * @public
     * @method vote
     * @param vote {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    vote(vote, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.vote.domain)
            .request({
                path: this.urls.vote.path,
                method: this.HttpClient.methods.POST,
                params: _.merge(
                    {},
                    this.urls.vote.params,
                    {
                        id: vote.id,
                        entityType: vote.threadType,
                        voteType: vote.voteType
                    }
                )
            })
            .then((response) => {
                success(this._enrichThread(response.data, vote.threadType));
            }, error);
    }

    /**
     * @public
     * @method createFeedback
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    createFeedback(review, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.createFeedback.domain)
            .request({
                path: this.urls.createFeedback.path,
                method: this.HttpClient.methods.POST,
                body: this._buildFeedback(review)
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
