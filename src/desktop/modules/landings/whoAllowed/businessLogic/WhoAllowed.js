class WhoAllowed {
    constructor(props) {
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps() {
        return Promise.resolve({});
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
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default WhoAllowed;
