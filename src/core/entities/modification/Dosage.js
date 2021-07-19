import Modification from "app/core/entities/modification/Modification";

class Dosage extends Modification {
    /**
     * @method
     * @returns {*|string}
     */
    getUnit() {
        return this.entity.unit || "";
    }
}

export default Dosage;
