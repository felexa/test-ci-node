import _ from "lodash";

class Presenter {
    constructor(props) {
        this._Model = props.dependencies.Model;
    }

    /**
     * @method confirmInvite
     * @param profile {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Presenter}
     * @public
     */
    confirmInvite(profile, success, error) {
        if (profile && _.isFunction(success) && _.isFunction(error)) {
            this._Model.confirmInvite(profile, success, error);
        }

        return this;
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return this._Model.normalizeInitialProps(initialData, pageInfo);
    }
}

export default Presenter;
