import Entity from "app/core/entities/Entity";

import PriceEntity from "app/core/entities/price/Price";
import ProductEntity from "app/core/entities/product/Product";

class Basket extends Entity {
    /**
     * @method getItems
     * @return {Array}
     */
    getItems() {
        return (this.entity.items || []).map(function (item) {
            return {
                /**
                 * @method
                 * @return {string|number}
                 */
                getId() {
                    return item.id || 0;
                },
                /**
                 * @method getPosition
                 * @return {Product}
                 */
                getPosition() {
                    return new ProductEntity(item.product);
                },
                /**
                 * @method getPrice
                 * @return {Price}
                 */
                getPrice() {
                    return new PriceEntity(item.price);
                },
                /**
                 * @method getQuantity
                 * @returns {number}
                 */
                getQuantity() {
                    return item.quantity || 0;
                }
            };
        });
    }

    /**
     * @method getRecommendation
     * @returns {Product[]}
     */
    getRecommendation() {
        return (this.entity.recommendationItems || []).map((item) => new ProductEntity(item));
    }

    /**
     * @method getPrice
     * @returns {Price}
     */
    getPrice() {
        return new PriceEntity(this.entity.price);
    }

    /**
     * @method getQuantity
     * @returns {number}
     */
    getQuantity() {
        return this.entity.quantity || 0;
    }
}

export default Basket;
