import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Delivery extends Entity {
    /**
     * @method getLogo
     * @returns {Image}
     */
    getLogo() {
        return new Image(this.entity.logo);
    }

    /**
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.entity.title || "";
    }

    /**
     * @method getDescription
     * @returns {string}
     */
    getDescription() {
        return this.entity.description || "";
    }

    /**
     * @method getPrice
     * @returns {number}
     */
    getPrice() {
        return Number(this.entity.price) || 0;
    }
}

export default Delivery;
