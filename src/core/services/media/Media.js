import _ from "lodash";

class Media {
    constructor(props) {
        /**
         * @private
         * @property _Repository
         * @type {Repository}
         */
        this._Repository = props.dependencies.Repository;
    }

    /**
     * @public
     * @method upload
     * @param image {string}
     * @param type {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    upload(image, type, success, error) {
        if (Boolean(image) && Boolean(type) && _.isFunction(success) && _.isFunction(error)) {
            this._Repository.upload(image, type, success, error);
        }

        return this;
    }
}

export default Media;
