import _ from "lodash";

class ViewedProducts {
    constructor(props) {
        this.localStorage = props.dependencies.LocalStorage;
        this.localStorageEnum = props.dependencies.LocalStorageEnum;

        this.maxItemsCount = 12;
    }

    /**
     * @public
     * @method getProductsId
     * @return {Array}
     */
    getProductsId() {
        let viewedProducts = this.localStorage.getItem(this.localStorageEnum.getViewedProductsAsValue());

        if (!_.isArray(viewedProducts)) {
            viewedProducts = [];
        }

        return viewedProducts;
    }

    /**
     * @public
     * @param id {String}
     * @return {ViewedProducts}
     */
    addId(id) {
        let viewedProducts = this.getProductsId();

        viewedProducts.unshift(id);

        if (viewedProducts.length > this.maxItemsCount) {
            viewedProducts.length = this.maxItemsCount;
        }

        this.localStorage.setItem(this.localStorageEnum.getViewedProductsAsValue(), _.uniq(viewedProducts));

        return this;
    }
}

export default ViewedProducts;
