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
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return this.Model.normalizeInitialProps(initialData, pageInfo);
    }
}

export default Presenter;
