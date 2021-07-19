import _ from "lodash";

class MetaTag {
    constructor(props) {
        /**
         * @property Repository
         * @type {Repository}
         */
        this.Repository = props.dependencies.Repository;
    }

    /**
     * @public
     * @method getMetaTags
     * @param url {string}
     * @param lang {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getMetaTags(url, lang, success, error) {
        if (url && lang && _.isFunction(error) && _.isFunction(success)) {
            this.Repository.getMetaTags(url, lang, success, error);
        }

        return this;
    }
}

export default MetaTag;
