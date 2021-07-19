class Presenter {
    constructor(props) {
        this.Model = props.dependencies.Model;
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
