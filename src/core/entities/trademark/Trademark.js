import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";
import Product from "app/core/entities/product/Product";

class Trademark extends Entity {
    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @method getLogo
     * @returns {Image}
     */
    getLogo() {
        return new Image(this.entity.logo);
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @method getRating
     * @returns {string}
     */
    getRating() {
        return this.entity.rating || "";
    }

    /**
     * @method getGeneric
     * @returns {Product}
     */
    getGeneric() {
        return new Product(this.entity.generic);
    }

    /**
     * @method getDescription
     * @returns {string}
     */
    getDescription() {
        return this.entity.description || "";
    }
}

export default Trademark;
