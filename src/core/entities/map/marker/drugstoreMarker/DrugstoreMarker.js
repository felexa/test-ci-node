import Marker from "app/core/entities/map/marker/Marker";

class DrugstoreMarker extends Marker {
    /**
     * @public
     * @method getAddressAsText
     * @returns {string}
     */
    getAddressAsText() {
        return this.entity.address || "";
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
     * @method getPhone
     * @returns {string}
     */
    getPhone() {
        return this.entity.phone || "";
    }

    /**
     * @public
     * @method getWorkTime
     * @returns {string}
     */
    getWorkTime() {
        return this.entity.workTime || "";
    }

    /**
     * @public
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }
}

export default DrugstoreMarker;
