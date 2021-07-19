import Entity from "app/core/entities/Entity";
import AttributeValue from "app/core/entities/attribute/AttributeValue";

class Attribute extends Entity {
    /**
     * @public
     * @method getAlias
     * @returns {string}
     */
    getAlias() {
        return this.entity.alias || "";
    }

    /**
     * @public
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @public
     * @method isSelected
     * @returns {boolean}
     */
    isSelected() {
        return Boolean(this.entity.selected);
    }

    /**
     * @public
     * @method getValues
     * @returns {Item[]}
     */
    getValues() {
        return (this.entity.values || []).map((item) => new AttributeValue(item));
    }
}

export default Attribute;
