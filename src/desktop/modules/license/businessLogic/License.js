class License {
    constructor(props) {
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
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

export default License;
