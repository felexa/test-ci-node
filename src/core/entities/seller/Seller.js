import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Seller extends Entity {
    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @method
     * @return {string}
     */
    getAlias() {
        return (this.entity.alias || "").toLowerCase();
    }

    /**
     * @method getLogo
     * @returns {Image}
     */
    getLogo() {
        return new Image(this.entity.logo);
    }
}

export default Seller;
