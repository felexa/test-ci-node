import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Category extends Entity {
    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @method getDescription
     * @returns {string}
     */
    getDescription() {
        return this.entity.description || "";
    }

    /**
     * @method getUrl
     * @return {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @method getIcon
     * @return {Image}
     */
    getIcon() {
        return new Image(this.entity.icon);
    }

    /**
     * @method getChildren
     * @return {Category[]}
     */
    getChildren() {
        return (this.entity.children || []).map((item) => new Category(item));
    }

    /**
     * @method hasChildren
     * @return {boolean}
     */
    hasChildren() {
        return Array.isArray(this.entity.children) && Boolean(this.entity.children.length);
    }

    /**
    * @method getCount
    * @returns {number}
    */
    getCount() {
        return Number(this.entity.count) || 0;
    }

    /**
    * @method getAlias
    * @returns {string}
    */
    getAlias() {
        return this.entity.alias || "";
    }

    /**
    * @method getSelected
    * @returns {boolean}
    */
    getSelected() {
        return Boolean(this.entity.selected);
    }
}

export default Category;
