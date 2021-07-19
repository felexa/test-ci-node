class Presenter {
    constructor(props) {
        /**
         * @property Model
         * @type {AboutUs}
         */
        this.Model = props.dependencies.Model;
    }

    /**
     * @public
     * @method changeRoute
     * @param url {string}
     // * @param needReplace {boolean}
     * @returns {Presenter}
     */
    changeRoute(url/*, needReplace = false*/) {
        this.Model.changeRoute(url);

        return this;
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        let result = this.Model.normalizeInitialProps(initialData, pageInfo);

        return result;
    }
}

export default Presenter;
