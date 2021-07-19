import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Story extends Entity {
    /**
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.entity.title || "";
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @method getPreview
     * @returns {Image}
     */
    getPreview() {
        return new Image(this.entity.preview);
    }
}

export default Story;
