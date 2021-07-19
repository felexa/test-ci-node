import _ from "lodash";

class Authorization {
    constructor(props) {
        // /**
        //  * @property requestsProcessing
        //  * @type {Object}
        //  */
        // this.requestsProcessing = {
        //     basket: {
        //         pending: false,
        //         queue: {
        //             success: new props.dependencies.Queue(),
        //             error: new props.dependencies.Queue(),
        //             addSuccess(callback) {
        //                 this.success.add(callback);
        //
        //                 return this;
        //             },
        //             addError(callback) {
        //                 this.error.add(callback);
        //
        //                 return this;
        //             }
        //         }
        //     }
        // };

        /**
         * @property events
         * @type {Object}
         */
        this.events = {
            toLogin: "toLogin",
            login: "login",
            logout: "logout"
        };

        /**
         * @property negativeStatusCodes
         * @type {{unauthorized: number}}
         */
        this.negativeStatusCodes = {
            unauthorized: 401
        };

        /**
         * @property user
         * @type {Object}
         */
        this.user = null;

        this.observer = new props.dependencies.Observer().installTo(this);

        this.Env = props.dependencies.Env;
        this.Repository = props.dependencies.Repository;
        this.LocalStorage = props.dependencies.LocalStorage;

        this.LocalStorageEnum = props.dependencies.LocalStorageEnum;

        this.EmployeeEntity = props.dependencies.EmployeeEntity;
        this.ProfileEntity = props.dependencies.ProfileEntity;
    }

    /**
     * @public
     * @method isAuthorized
     * @return {boolean}
     */
    isAuthorized() {
        return Boolean(this._getToken());
    }

    /**
     * @method _triggerEvent
     * @param event {string}
     * @param [data] {*}
     * @return {Authorization}
     * @private
     */
    _triggerEvent(event, ...data) {
        this.observer.trigger(event, ...data);

        return this;
    }

    /**
     * @method _reload
     * @return {Authorization}
     * @private
     */
    _reload() {
        if (window.location.reload) {
            window.location.reload();
        }

        return this;
    }

    /**
     * @method _getToken
     * @return {string}
     * @private
     */
    _getToken() {
        return this.LocalStorage.getItem(this.LocalStorageEnum.getTokenAsValue());
    }

    /**
     * @method _setToken
     * @param token {string}
     * @return {Authorization}
     * @private
     */
    _setToken(token) {
        this.LocalStorage.setItem(this.LocalStorageEnum.getTokenAsValue(), token);

        return this;
    }

    // /**
    //  * @private
    //  * @method _finallyProcessingRequest
    //  * @returns {Basket}
    //  */
    // _finallyProcessingRequest(requestsProcessing) {
    //     requestsProcessing.pending = false;
    //     requestsProcessing.queue.success.clear();
    //     requestsProcessing.queue.error.clear();
    //
    //     return this;
    // }

    // /**
    //  * @private
    //  * @method _setUser
    //  * @param user {Object}
    //  * @returns {Authorization}
    //  */
    // _setUser(user) {
    //     this.user = this._buildUser(user);
    //
    //     return this;
    // }

    /**
     * @method getProfile
     * @param success {Function}
     * @param error {Function}
     * @return {Authorization}
     */
    getProfile(success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            if (this._getToken()) {
                this.Repository.getProfile(success, (exception) => {
                    if (exception.getStatusCode() === this.negativeStatusCodes.unauthorized && this._getToken()) {
                        this.logout();
                        error(exception);
                    } else {
                        error(exception);
                    }
                });
            }
        }

        return this;
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
            this.Repository.generateOTP(phone, success, error);
        }

        return this;
    }

    /**
     * @method verifyOTP
     * @param phone {string}
     * @param code {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Authorization}
     */
    verifyOTP(phone, code, success, error) {
        if (phone && code && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.verifyOTP(phone, code, (data) => {
                // eslint-disable-next-line no-underscore-dangle
                this._setToken(data.token)._triggerEvent(this.events.login);

                success(data);
            }, error);
        }

        return this;
    }

    /**
     * @method toLogin
     * @param [login] {string}
     * @param [autoActiveOTP] {boolean}
     * @return {Authorization}
     */
    toLogin(login = "", autoActiveOTP = false) {
        this._triggerEvent(this.events.toLogin, login, autoActiveOTP);

        return this;
    }

    /**
     * @method logout
     * @return {Authorization}
     */
    logout() {
        // eslint-disable-next-line no-underscore-dangle
        this._setToken("")._triggerEvent(this.events.logout);

        setTimeout(() => {
            this._reload();
        }, 100);

        return this;
    }

    /**
     * @method convertToProfileEntity
     * @param profile {*}
     * @returns {Profile}
     */
    convertToProfileEntity(profile) {
        return new this.ProfileEntity(profile);
    }

    /**
     * @method convertToEmployeeEntity
     * @param employee {*}
     * @returns {Employee}
     */
    convertToEmployeeEntity(employee) {
        return new this.EmployeeEntity(employee);
    }
}

export default Authorization;
