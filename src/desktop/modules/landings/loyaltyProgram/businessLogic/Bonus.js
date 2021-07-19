class Bonus {
    constructor(props) {
        this.Repository = props.dependencies.Repository;
        this.FAQEntity = props.dependencies.FAQEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
    }

    /**
     * @private
     * @method _getFaq
     * @param resultContainer {Object}
     * @param language {string}
     * @returns {Promise}
     */
    _getFaq(resultContainer, language) {
        return new Promise((resolve) => {
            this.Repository.getFaq((faq) => {
                resultContainer.faq = faq[language];

                resolve();
            }, resolve());
        });
    }

    /**
     * @public
     * @method getInitialProps
     * @param context {Object}
     * @returns {Promise}
     */
    getInitialProps(context) {
        let language = context.req.i18n.language || this.LanguageEnum.getRuAsValue(), // todo enum
            result = {
                faq: []
            };

        return Promise.resolve([
            this._getFaq(result, language)
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
     *   pageInfo: Object
     * }}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return {
            faq: initialData.faq.map((item) => new this.FAQEntity(item)),
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default Bonus;
