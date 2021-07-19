/* eslint-disable no-underscore-dangle */
import _ from "lodash";

class Marketing {
    constructor(props) {
        /**
         * @property events
         * @type {Object}
         */
        this.events = {
            login: "login"
        };

        this.Repository = props.dependencies.Repository;
        this.LocalStorage = props.dependencies.LocalStorage;
        this.LocalStorageEnum = props.dependencies.LocalStorageEnum;
        this.AuthorizationService = props.dependencies.AuthorizationService;
    }

    /**
     * @method generateOTP
     * @param phone {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Authorization}
     */
    generateOTP(phone, success, error) {
        if (phone && _.isFunction(success) && _.isFunction(error)) {
            this.AuthorizationService.generateOTP(phone, success, error);
        }

        return this;
    }

    /**
     * @method verifyOTP
     * @param phone {string}
     * @param code {string}
     * @param bonus {Object}
     * @param success {Function}
     * @param error {Function}
     * @return {Authorization}
     */
    verifyOTP(phone, code, bonus, success, error) {
        if (phone && code && bonus && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.verifyOTP(phone, code, bonus, (data) => {
                this.AuthorizationService
                    ._setToken(data.token)
                    ._triggerEvent(this.events.login);

                success(data);
            }, error);
        }

        return this;
    }

    /**
     * @method verifyEmail
     * @param email {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Authorization}
     */
    verifyEmail(email, success, error) {
        if (email && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.verifyEmail(email, success, error);
        }

        return this;
    }
}

export default Marketing;
