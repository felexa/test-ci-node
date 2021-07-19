import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";
import Range from "app/core/entities/range/Range";

class ProductGroup extends Entity {
    /**
     * @method getId
     * @returns {number|string}
     */
    getId() {
        return Math.random() * 1000000000;
    }

    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @method
     * @returns {string}
     */
    getAlias() {
        return this.entity.alias || "";
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "/active-ingredients/a";
    }

    /**
     * @method getPreview
     * @returns {Image}
     */
    getPreview() {
        return new Image(this.entity.preview);
    }

    /**
     * @method getItemsCount
     * @returns {number}
     */
    getItemsCount() {
        return Number(this.entity.itemsCount) || 0;
    }

    /**
     * @method getPriceRange
     * @returns {Range}
     */
    getPriceRange() {
        return new Range(this.entity.priceRange);
    }
}

export default ProductGroup;
