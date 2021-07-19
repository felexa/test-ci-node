import Entity from "app/core/entities/Entity";

import Image from "app/core/entities/image/Image";

class Share extends Entity {
    /**
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.entity.title || "";
    }

    /**
     * @method getDescription
     * @returns {string}
     */
    getDescription() {
        return this.entity.description || "";
    }

    /**
     * @method getPreview
     * @returns {Image}
     */
    getPreview() {
        return new Image(this.entity.preview);
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }
}

export default Share;
