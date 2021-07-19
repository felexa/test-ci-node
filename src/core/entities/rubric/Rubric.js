import Entity from "app/core/entities/Entity";

class Rubric extends Entity {
    /**
     * @method getType
     * @return {string}
     */
    getType() {
        return this.entity.type || "";
    }

    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @method getItems
     * @returns {*[]}
     */
    getItems() {
        return [];
    }

    /**
     * @method getIconId
     * @returns {string}
     */
    getIconId() {
        return this.entity.iconId || "";
    }
}

export default Rubric;
