import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Drugstore extends Entity {
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
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @public
     * @method getCityId
     * @returns {string}
     */
    getCityId() {
        return this.entity.city_id || "";
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
     * @method getAddressAsText
     * @returns {string}
     */
    getAddressAsText() {
        return this.entity.address || "";
    }

    /**
     * @public
     * @method getLocationAsText
     * @returns {string}
     */
    getLocationAsText() {
        return this.entity.closest || "";
    }

    /**
     * @public
     * @method getWorkTime
     * @returns {string}
     */
    getWorkTime() {
        return this.entity.work_time || "";
    }

    /**
     * @public
     * @method getPreview
     * @returns {Image}
     */
    getPreview() {
        return new Image(this.entity.preview_image);
    }

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

export default Drugstore;
