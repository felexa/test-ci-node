import Entity from "app/core/entities/Entity";

class Sorting extends Entity {
    /**
     * @public
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @public
     * @method getApiUrl
     * @returns {string}
     */
    getApiUrl() {
        return this.entity.api || "";
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
     * @method getAlias
     * @returns {string}
     */
    getAlias() {
        return this.entity.alias || "";
    }

    /**
     * @public
     * @method isSelected
     * @returns {boolean}
     */
    isSelected() {
        return Boolean(this.entity.selected);
    }
}

export default Sorting;
