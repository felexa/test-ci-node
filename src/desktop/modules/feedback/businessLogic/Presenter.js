class Presenter {
    constructor(props) {
        this.Model = props.dependencies.Model;
    }

    /**
     *
     * @public
     * @method createFeedback
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * returns Presenter
     */
    createFeedback(review, success, error) {
        this.Model.createFeedback(review, success, error);

        return this;
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {{result: Object}}
     */
    normalizeInitialProps(initialData, pageInfo) {
        let result = this.Model.normalizeInitialProps(initialData, pageInfo);

        return result;
    }
}

export default Presenter;
