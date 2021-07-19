import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";
import Value from "./Value";

class Property extends Entity {
    /**
     * @method hasValues
     * @returns {Boolean}
     */
    hasValues() {
        return Boolean(this.entity.values && this.entity.values.length);
    }

    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @method getAlias
     * @returns {string}
     */
    getAlias() {
        return this.entity.alias || "";
    }

    /**
     * @method getValue
     * @returns {string}
     */
    getValue() {
        return this.entity.value || "";
    }

    /**
     * @method getValues
     * @returns {Array}
     */
    getValues() {
        return (this.entity.values || []).map((item) => new Value(item));
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @method getIcon
     * @returns {Image}
     */
    getIcon() {
        return new Image(this.entity.image);
    }
}

export default Property;
