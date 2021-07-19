import Entity from "app/core/entities/Entity";

class Rating extends Entity {
    /**
     * @method getMin
     * @returns {number}
     */
    getMin() {
        return Number(this.entity.min) || 1;
    }

    /**
     * @method getMax
     * @returns {number}
     */
    getMax() {
        return Number(this.entity.max) || 0;
    }

    /**
     * @method getValue
     * @returns {number}
     */
    getValue() {
        return Number(this.entity.value) || 0;
    }
}

export default Rating;
