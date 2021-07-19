import Entity from "app/core/entities/Entity";

class Marker extends Entity {
    /**
     * @public
     * @method getLatitude
     * @returns {number}
     */
    getLatitude() {
        return this.entity.latitude || 0;
    }

    /**
     * @public
     * @method getLongitude
     * @returns {number}
     */
    getLongitude() {
        return this.entity.longitude || 0;
    }
}

export default Marker;
