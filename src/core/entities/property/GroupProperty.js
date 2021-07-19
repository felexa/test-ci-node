import Entity from "app/core/entities/Entity";
import Property from "app/core/entities/property/Property";

class GroupProperty extends Entity {
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
     * @method getItems
     * @returns {Property[]}
     */
    getItems() {
        return (this.entity.attributes || []).map((item) => new Property(item));
    }
}

export default GroupProperty;
