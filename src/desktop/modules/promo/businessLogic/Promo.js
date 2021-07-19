class Promo {
    constructor(props) {
        this.RubricEntity = props.dependencies.RubricEntity;
        this.BasketService = props.dependencies.BasketService;
        this.RubricService = props.dependencies.RubricService;
    }

    /**
     * @public
     * @method addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promo}
     */
    addToBasket(product, success, error) {
        this.BasketService.addItem(
            product.getCode(),
            success,
            error
        );

        return this;
    }

    /**
     * @public
     * @method getInitialProps
     * @return {Promise}
     */
    getInitialProps() {
        let result = {
            rubrics: []
        };

        return new Promise((resolve) => {
            this.RubricService.getPromoProducts((rubric) => {
                result.rubrics.push(rubric);

                resolve();
            }, () => {});
        })
            .then(() => result)
            .catch(() => result);
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {{
     *   rubrics: Rubric[]
     *   pageInfo: Object
     * }}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return {
            rubrics: initialData.rubrics.map((item) => new this.RubricEntity(item)),
            pageInfo
        };
    }
}

export default Promo;
