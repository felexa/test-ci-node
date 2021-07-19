import Entity from "app/core/entities/Entity";

class Modification extends Entity {
    /**
     * @method isActive
     * @returns {boolean}
     */
    isActive() {
        return Boolean(this.entity.isActive);
    }

    /**string|
     * @method getValue
     * @returns {*|string}
     */
    getValue() {
        return this.entity.value || "";
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }
}

export default Modification;
