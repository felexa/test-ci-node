import Entity from "app/core/entities/Entity";

class PageInfo extends Entity {
    /**
     * @public
     * @method getLanguage
     * @return {string}
     */
    getLanguage() {
        return this.entity.language || "";
    }

    /**
     * @public
     * @method getMeta
     * @returns {{
     *     getTitle(): string,
     *     getDescription(): string
     * }}
     */
    getMeta() {
        let metadata = this.entity.metadata || {};

        return {
            /**
             * @public
             * @method getTitle
             * @returns {string}
             */
            getTitle() {
                return metadata.title || "";
            },

            /**
             * @public
             * @method getDescription
             * @returns {string}
             */
            getDescription() {
                return metadata.description || "";
            }
        };
    }
}

export default PageInfo;
