import Entity from "app/core/entities/Entity";
import Product from "app/core/entities/product/Product";
import Price from "app/core/entities/price/Price";

class WishList extends Entity {
    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @method getProductList
     * @returns {Product[]}
     */
    getProductList() {
        return (this.entity.products || []).map((item) => new Product(item));
    }

    /**
     * @method getPrice
     * @return {Price}
     */
    getPrice() {
        return new Price({
            total: this.entity.totalPrice
        });
    }
}

export default WishList;
