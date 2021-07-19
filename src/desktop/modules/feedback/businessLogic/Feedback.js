class Feedback {
    constructor(props) {
        this.PageInfoEntity = props.dependencies.PageInfoEntity;

        this.ReviewService = props.dependencies.ReviewService;
    }

    /**
     * @example
     *
     * review = {
     *     email: string
     *     comment: string
     * }
     *
     * @public
     * @method createFeedback
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    createFeedback(review, success, error) {
        this.ReviewService.createFeedback(review, success, error);

        return this;
    }

    /**
     * @public
     * @method getInitialProps
     * @return {Promise}
     */
    getInitialProps() {
        return Promise.resolve({});
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {{
     *   pageInfo: Object
     * }}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return {
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Feedback;
