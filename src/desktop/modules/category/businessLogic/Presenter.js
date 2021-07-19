class Presenter {
    constructor(props) {
        this.Model = props.dependencies.Model;
    }

    /**
     * @public
     * @param product
     * @param success
     * @param error
     * @returns {*}
     */
    addToBasket(product, success, error) {
        return this.Model.addToBasket(product, success, error);
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
