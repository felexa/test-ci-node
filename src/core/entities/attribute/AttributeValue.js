import Entity from "app/core/entities/Entity";

class AttributeValue extends Entity {
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
     * @method getCount
     * @returns {number}
     */
    getCount() {
        return Number(this.entity.count) || 0;
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
     * @method isEmpty
     * @returns {boolean}
     */
    isEmpty() {
        return Boolean(this.entity.empty);
    }
}

export default AttributeValue;
