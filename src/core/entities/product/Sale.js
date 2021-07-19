import Entity from "app/core/entities/Entity";

class Sale extends Entity {
    /**
     * @method getPercent
     * @returns {number}
     */
    getPercent() {
        return Number(this.entity.percent || 0);
    }

    /**
     * @method getValue
     * @returns {number}
     */
    getValue() {
        return Number(this.entity.value || 0);
    }
}

export default Sale;
