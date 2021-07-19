class HowWeWork {
    constructor(props) {
        this.Repository = props.dependencies.Repository;

        this.RubricService = props.dependencies.RubricService;

        this.CommentRubricEntity = props.dependencies.CommentRubricEntity;
        this.FAQEntity = props.dependencies.FAQEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
    }

    /**
     * @method _getReviewFromDoctors
     * @param resultContainer {Object}
     * @returns {Promise}
     * @private
     */
    _getReviewFromDoctors(resultContainer) {
        return new Promise((resolve) => {
            this.RubricService.getReviewFromDoctors((reviewFromDoctors) => {
                resultContainer.reviewFromDoctors = reviewFromDoctors;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getFAQ
     * @returns {Promise}
     */
    _getFAQ(resultContainer, language) {
        return new Promise((resolve) => {
            this.Repository.getFAQ((faq) => {
                resultContainer.faq = faq[language];

                resolve();
            }, resolve);
        });
    }

    /**
     * @public
     * @method getInitialProps
     * @return {Promise}
     */
    getInitialProps(context) {
        let language = context.language || this.LanguageEnum.getRuAsValue(),
            result = {
                reviewFromDoctors: {},
                faq: []
            };

        return Promise.all([
            this._getReviewFromDoctors(result),
            this._getFAQ(result, language)
        ])
            .then(() => result)
            .catch(() => result);
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {{
     *   reviewFromDoctors: Object
     *   faq: Array
     *   pageInfo: Object
     * }}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return {
            reviewFromDoctors: [new this.CommentRubricEntity(initialData.reviewFromDoctors)],
            faq: initialData.faq.map((item) => new this.FAQEntity(item)),
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default HowWeWork;
