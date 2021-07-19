import Entity from "app/core/entities/Entity";
import Product from "app/core/entities/product/Product";

class Statement extends Entity {
    /**
     * @public
     * @method getDateCharge
     * @returns {string}
     */
    getDateCharge() {
        return this.entity.date.charge || "";
    }

    /**
     * @public
     * @method getDateExpire
     * @returns {string}
     */
    getDateExpire() {
        return this.entity.date.expire || "";
    }

    /**
     * @public
     * @method getActionId
     * @returns {string}
     */
    getActionId() {
        return this.entity.actionId || "";
    }

    /**
     * @public
     * @method getActionTitle
     * @returns {string}
     */
    getDescription() {
        return this.entity.description || "";
    }

    /**
     * @public
     * @method getActionTitle
     * @returns {number}
     */
    getDuration() {
        return this.entity.duration || 0;
    }

    /**
     * @public
     * @method getQuantity
     * @returns {number}
     */
    getQuantity() {
        return this.entity.quantity || 0;
    }

    /**
     * @public
     * @method getProduct
     * @returns {Product}
     */
    getProduct() {
        return new Product(this.entity.target);
    }
}

export default Statement;
