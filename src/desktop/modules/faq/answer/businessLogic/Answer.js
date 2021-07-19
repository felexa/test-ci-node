class Answer {
    constructor(props) {
        this.Repository = props.dependencies.Repository;

        this.FaqEntity = props.dependencies.FaqEntity;
    }

    /**
     * @private
     * @method _getAnswer
     * @param questionSlug {String}
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getAnswer(questionSlug, resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getAnswer({question: questionSlug}, (answer) => {
                resultContainer.answer = answer;

                resolve();
            }, () => {});
        });
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps(context) {
        let result = {
            answer: {}
        };

        return new Promise((resolve) => {
            Promise.all([
                this._getAnswer(context.query.question, result)
            ]).then(resolve);
        })
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
            answer: new this.FaqEntity(initialData.answer),
            pageInfo
        };
    }
}

export default Answer;
