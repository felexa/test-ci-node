import _ from "lodash";

class Translator {
    constructor(props) {
        /**
         * @property Env
         * @type {Env}
         */
        this.Env = props.dependencies.Env;

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = props.dependencies.Resource;

        /**
         * @property strings
         * @type {Strings}
         */
        this.Strings = props.dependencies.Strings;
    }

    /**
     * @method _getStringsResource
     * @returns {Object}
     * @private
     */
    _getStringsResource() {
        return this.Resource.getStrings(this.Env.getLanguage());
    }

    /**
     * @method _getPluralWorlds
     * @returns {Object}
     * @private
     */
    _getPluralWorlds() {
        let strings = this._getStringsResource().plural;

        return {
            review: strings.review || [],
            answers: strings.answers || [],
            days: strings.days || [],
            hours: strings.hours || [],
            minutes: strings.minutes || [],
            seconds: strings.seconds || [],
            products: strings.products || [],
            coupons: strings.coupons || []
        };
    }

    /**
     * @method _getPluralWorldsByKey
     * @param key {string}
     * @returns {Array}
     * @private
     */
    _getPluralWorldsByKey(key) {
        return this._getPluralWorlds()[key];
    }

    /**
     * @public
     * @method getStringKeys
     * @returns {Object}
     */
    getStringKeys() {
        let result = {};

        Object.keys(this._getPluralWorlds()).forEach(function (key) {
            result[key] = key;
        });

        return result;
    }

    /**
     * @public
     * @method plural
     * @param count {number}
     * @param stringKey {string}
     * @returns {string}
     */
    plural(count, stringKey) {
        return this.Strings.plural(count, this._getPluralWorldsByKey(stringKey));
    }

    /**
     * @public
     * @method getMonthNameByNumber
     * @param monthNumber {number}
     * @returns {string}
     */
    getMonthNameByNumber(monthNumber) {
        if (_.isNumber(monthNumber)) {
            return this._getStringsResource().calendar.months[monthNumber];
        }
    }
}

export default Translator;
