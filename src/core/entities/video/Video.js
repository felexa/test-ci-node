import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Video extends Entity {
    /**
     * @method getCode
     * @returns {string}
     */
    getCode() {
        return this.entity.code || "";
    }

    /**
     * @method getPlatform
     * @returns {string}
     */
    getPlatform() {
        return this.entity.platform || "";
    }

    /**
     * @method getPreview
     * @returns {Image}
     */
    getPreview() {
        return new Image(this.entity.preview);
    }
}

export default Video;
