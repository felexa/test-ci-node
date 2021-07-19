class MedicalExpert {
    constructor(props) {
        this.MedicalExpertEntity = props.dependencies.MedicalExpertEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
        this.ArticleEntity = props.dependencies.ArticleEntity;
        this.Repository = props.dependencies.Repository;
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps() {
        let result = {
            profile: {},
            employee: {}
        };

        return Promise.resolve(result);
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
            profile: new this.MedicalExpertEntity(initialData.employee),
            articles: (initialData.articles.items || []).map((item) => new this.ArticleEntity(item)),
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default MedicalExpert;
