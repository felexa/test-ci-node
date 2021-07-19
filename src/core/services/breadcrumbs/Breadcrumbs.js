import _ from "lodash";

class Breadcrumbs {
    constructor(props) {
        /**
         * @property Repository
         * @type {Repository}
         */
        this.Repository = props.dependencies.Repository;
    }

    /**
     * @public
     * @method getBreadcrumbs
     * @param url {string}
     * @param success {Function}
     * @returns {Promise}
     */
    getBreadcrumbs(url, success) {
        if (_.isFunction(success)) {
            this.Repository.getBreadcrumbs(url, success);
        }

        return this;
    }
}

export default Breadcrumbs;
