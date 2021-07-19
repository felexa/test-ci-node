import _ from "lodash";

class Faq {
    constructor(props) {
        /**
         * @property Repository
         * @type {Repository}
         */
        this.Repository = props.dependencies.Repository;

        /**
         * @property FaqEntity
         * @type {Faq}
         */
        this.FaqEntity = props.dependencies.FaqEntity;
    }

    /**
     * @public
     * @method getFaq
     * @param ingredientName {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Faq}
     */
    getFaq(ingredientName, success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Repository.getFaq(ingredientName, success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getFaqByCategory
     * @param name {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Faq}
     */
    getFaqByCategory(name, success, error) {
        if (_.isString(name) && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.getFaqByCategory(name, success, error);
        }

        return this;
    }

    /**
     * @public
     * @method convertFaqToEntity
     * @param faq {Array}
     * @returns {Array}
     */
    convertFaqToEntity(faq) {
        return ((Array.isArray(faq) && faq) || []).map((item) => new this.FaqEntity(item));
    }
}

export default Faq;
