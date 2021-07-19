import _ from "lodash";

import Entity from "app/core/entities/Entity";
import Sizes from "app/core/entities/image/Sizes";

class Image extends Entity {
    /**
     * @public
     * @method getSmall
     * @returns {string}
     */
    getSmall() {
        return _.get(this.entity, "src.small") || this.getOriginal();//60 * 60
    }

    /**
     * @public
     * @method getMedium
     * @returns {string}
     */
    getMedium() {
        return _.get(this.entity, "src.medium") || this.getOriginal();//250 * 250
    }

    /**
     * @public
     * @method getLarge
     * @returns {string}
     */
    getLarge() {
        return _.get(this.entity, "src.large") || this.getOriginal();//600 * 600
    }

    /**
     * @public
     * @method getExtraLarge
     * @returns {string}
     */
    getExtraLarge() {
        return _.get(this.entity, "src.xLarge") || this.getOriginal();
    }

    /**
     * @public
     * @method getOriginal
     * @returns {string}
     */
    getOriginal() {
        return _.get(this.entity, "src.original") || ""; //N * N
    }

    /**
     * @public
     * @method getPrimitive
     * @returns {string}
     */
    getPrimitive() {
        return _.get(this.entity, "src.primitive") || ""; //N * N
    }

    /**
     * @public
     * @method getSrc
     * @returns {string}
     */
    getSrc() {
        return this.getMedium();
    }

    /**
     * @method getSizes
     * @returns {Sizes}
     */
    getSizes() {
        return new Sizes(this.entity.size);
    }

    /**
     * @public
     * @method getAlt
     * @returns {string}
     */
    getAlt() {
        return this.entity.alt || "";
    }

    /**
     * @public
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.entity.title || "";
    }
}

export default Image;
