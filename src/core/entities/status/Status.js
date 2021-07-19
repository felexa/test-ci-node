import Entity from "app/core/entities/Entity";
import Strings from "app/core/utilites/strings";

class Status extends Entity {
    constructor(entity) {
        super(entity);

        this.strings = Strings.getInstance();
    }

    /**
     * @public
     * @method isCompleted
     * @return {boolean}
     */
    isCompleted() {
        return Boolean(this.entity.completed);
    }

    /**
     * @public
     * @method isAborted
     * @return {boolean}
     */
    isAborted() {
        return Boolean(this.entity.aborted);
    }

    /**
     * @public
     * @method isActive
     * @return {boolean}
     */
    isActive() {
        return Boolean(this.entity.active);
    }

    /**
     * @public
     * @method getId
     * @returns {string|number}
     */
    getId() {
        return this.entity.id || 0;
    }

    /**
     * @public
     * @method getType
     * @returns {string}
     */
    getType() {
        return this.entity.type || ""; //"available"
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
     * @method getDescription
     * @return {string}
     */
    getDescription() {
        return this.entity.description || "";
    }

    /**
     * @method getDateAsText
     * @return {string}
     */
    getDateAsText() {
        return this.entity.createdAt ? this.strings.formatDate(new Date(this.entity.createdAt)) : "";
    }
}

export default Status;
