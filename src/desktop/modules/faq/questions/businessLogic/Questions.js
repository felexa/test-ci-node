class Questions {
    constructor(props) {
        this.Repository = props.dependencies.Repository;
        this.FaqEntity = props.dependencies.FaqEntity;
    }

    /**
     * @private
     * @method _getFAQ
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getFAQ(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getFAQ({}, (faq) => {
                resultContainer.faq = faq;

                resolve();
            }, () => {});
        });
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps() {
        let result = {
            faq: {}
        };

        return new Promise((resolve) => {
            Promise.all([
                this._getFAQ(result)
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
            questions: initialData.faq.items.map((item) => new this.FaqEntity(item)),
            totalCount: initialData.faq.totalCount,
            currentPage: 1,
            pageInfo
        };
    }
}

export default Questions;
