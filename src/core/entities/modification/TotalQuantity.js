import Modification from "app/core/entities/modification/Modification";

class TotalQuantity extends Modification {
    /**
     * @method getUnit
     * @returns {string}
     */
    getUnit() {
        return this.entity.unit || "";
    }
}

export default TotalQuantity;
