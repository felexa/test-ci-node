import Entity from "app/core/entities/Entity";

import Strings from "app/core/utilites/strings";

class Transaction extends Entity {
    constructor(props) {
        super(props);

        this.strings = Strings.getInstance();
    }

    /**
     * @public
     * @method hasExpireDate
     * @return {boolean}
     */
    hasExpireDate() {
        return Boolean(this.entity.availableTill);
    }

    /**
     * @public
     * @method getType
     * @return {{getValue(): string, getDescription(): string}}
     */
    getType() {
        let type = this.entity.type || {};

        return {
            /**
             * @method getValue
             * @return {string}
             */
            getValue() {
                return type.value || "";
            },
            /**
             * @method getDescription
             * @return {string}
             */
            getDescription() {
                return type.description || "";
            }
        };
    }

    /**
     * @public
     * @method getOperationDateAsText
     * @return {string}
     */
    getOperationDateAsText() {
        return this.strings.formatDate(new Date(this.entity.createdAt));
    }

    /**
     * @public
     * @method getExpireDateAsText
     * @return {string}
     */
    getExpireDateAsText() {
        return this.strings.formatDate(new Date(this.entity.availableTill));
    }

    /**
     * @public
     * @method getAmount
     * @return {number}
     */
    getAmount() {
        return Number(this.entity.amount) || 0;
    }

    /**
     * @public
     * @method getDescription
     * @return {string}
     */
    getDescription() {
        return this.entity.text || "";
    }

    /**
     * @public
     * @method getTarget
     * @return {Object}
     */
    getTarget() {
        let target = this.entity.target || {};

        return {
            getName() {
                return target.name || "";
            },
            getUrl() {
                return target.url || "";
            }
        };
    }
}

export default Transaction;
