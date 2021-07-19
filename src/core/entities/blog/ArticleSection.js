import Entity from "app/core/entities/Entity";
import ProductRubric from "app/core/entities/rubric/ProductRubric";

class ArticleSection extends Entity {
    /**
     * @method getTitle
     * @returns {*|string}
     */
    getTitle() {
        return this.entity.name || "";
    }

    /**
     * @method
     * @returns {string}
     */
    getAlias() {
        return this.entity.alias || "";
    }

    /**
     * @method
     * @returns {number}
     */
    getPriority() {
        return this.entity.priority || 0;
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getContent() {
        return this.entity.text || "";
    }

    /**
     * @method getRubric
     * @returns {Array}
     */
    getRubric() {
        return new ProductRubric(this.entity.products || {});
    }
}

export default ArticleSection;
