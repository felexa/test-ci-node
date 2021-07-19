import Entity from "app/core/entities/Entity";

class Value extends Entity {
    /**
     * @method getName
     * @returns {string}
     */
    getValue() {
        return this.entity.value || "";
    }

    /**
     * @method getName
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @method getName
     * @returns {string}
     */
    getUnit() {
        return this.entity.unit || "";
    }
}

export default Value;
