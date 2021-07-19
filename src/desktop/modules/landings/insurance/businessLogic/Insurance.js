class Insurance {
    constructor(props) {
        this.Repository = props.dependencies.Repository;

        this.FAQEntity = props.dependencies.FAQEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
        this.LanguageEnum = props.dependencies.LanguageEnum;
    }

    /**
     * @private
     * @method _getFAQ
     * @param resultContainer {Object}
     * @param language {string}
     * @returns {Promise}
     */
    _getFAQ(resultContainer, language) {
        return new Promise((resolve) => {
            this.Repository.getFAQ((faq) => {
                resultContainer.faq = faq[language];

                resolve();
            });
        });
    }

    /**
     * @private
     * @method _getAdvantages
     * @param resultContainer {Object}
     * @param language {string}
     * @returns {Promise}
     */
    _getAdvantages(resultContainer, language) {
        return new Promise((resolve) => {
            this.Repository.getAdvantages((advantages) => {
                resultContainer.advantages = advantages[language];

                resolve();
            });
        });
    }

    /**
     * @public
     * @method getInitialProps
     * @param context {Object}
     * @returns {Promise}
     */
    getInitialProps(context) {
        let language = context.language || this.LanguageEnum.getRuAsValue(),
            result = {
                faq: [],
                advantages: []
            };

        return Promise.all([
            this._getFAQ(result, language),
            this._getAdvantages(result, language)
        ])
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
            faq: initialData.faq.map((item) => new this.FAQEntity(item)),
            advantages: initialData.advantages,
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Insurance;
