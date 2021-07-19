/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import _ from "lodash";

import Resource from "app/core/resource";
import Env from "app/core/environment";

import MarketingService from "app/core/services/marketing";

import Validator from "app/core/utilites/validator/Validator";
import Algorithms from "app/core/utilites/validator/Algorithms";
import LocalStorage from "app/core/utilites/storage/localStorage";
import LocalStorageEnum from "app/core/utilites/enum/localStorageName";

import Timer from "components/timer/Timer";

import Analytics from "./Analytics";

class Modal extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _OTPMaxLength
         * @type {number}
         */
        this._OTPMaxLength = 4;

        /**
         * @property _patterns
         * @type {{specialCharsOfPhone: RegExp}}
         */
        this._patterns = {
            specialCharsOfPhone: /[\+\s()-]/g
        };

        /**
         * @property _timeoutAsMilliseconds
         * @type {number}
         */
        this._timeoutAsMilliseconds = 90000;

        /**
         * @property _thirtyMinutesInMilliseconds
         * @type {number}
         */
        this._thirtyMinutesInMilliseconds = 1800000;

        /**
         * @property _validationErrors
         * @type {Object}
         */
        this._validationErrors = {
            login: {
                selector: ".error-login-field"
            },
            otpCode: {
                selector: ".error-otp-field"
            },
            email: {
                selector: ".error-email-field"
            }
        };

        this.state = {
            isLoading: false,
            isAvailableOTP: true,
            errorMessage: "",
            login: "380",
            otpCode: "",
            email: "",
            steps: {
                login: true,
                otp: false,
                email: false,
                bonusForPhone: false,
                bonusForEmail: false,
                sorryBonus: false
            }
        };

        /**
         * @property _marketingService
         * @type {Object}
         */
        this._marketingService = MarketingService.getInstance();

        /**
         * @property _analytics
         * @type {Object}
         */
        this._analytics = new Analytics();

        /**
         * @property _HTMLResource
         * @type {Object}
         */
        this._HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property _linksResource
         * @type {Object}
         */
        this._linksResource = Resource.links;

        /**
         * @property _LocalStorage
         * @type {LocalStorage}
         */
        this._LocalStorage = LocalStorage.getInstance();

        /**
         * @property _LocalStorageEnum
         * @type {Enum}
         */
        this._LocalStorageEnum = LocalStorageEnum.getInstance();

        /**
         * @property _rootElementRef
         * @type {Object}
         */
        this._rootElementRef = React.createRef();

        this._Resource = Resource;
        this._Validator = Validator;
        this._Algorithms = Algorithms;

        /**
         * @property _stringsResource
         * @type {Object}
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._toggleLoader = this._toggleLoader.bind(this);

        this._changeLogin = this._changeLogin.bind(this);
        this._changeOTPCode = this._changeOTPCode.bind(this);
        this._changeEmail = this._changeEmail.bind(this);

        this._toOTPStep = this._toOTPStep.bind(this);
        this._verifyOTP = this._verifyOTP.bind(this);
        this._verifyEmail = this._verifyEmail.bind(this);

        this._retryGenerateOTP = this._retryGenerateOTP.bind(this);
        this._close = this._close.bind(this);
    }

    componentDidMount() {
        this._setTimeOfLastShow();
    }

    /**
     * @method _isLoading
     * @return {boolean}
     * @private
     */
    _isLoading() {
        return this.state.isLoading;
    }

    /**
     * @method _isActiveLoginStep
     * @return {boolean}
     * @private
     */
    _isActiveLoginStep() {
        return this.state.steps.login;
    }

    /**
     * @method _isActiveOTPStep
     * @return {boolean}
     * @private
     */
    _isActiveOTPStep() {
        return this.state.steps.otp;
    }

    /**
     * @method _isActiveEmailStep
     * @return {boolean}
     * @private
     */
    _isActiveEmailStep() {
        return this.state.steps.email;
    }

    /**
     * @method _isActiveBonusForPhoneStep
     * @return {boolean}
     * @private
     */
    _isActiveBonusForPhoneStep() {
        return this.state.steps.bonusForPhone;
    }

    /**
     * @method _isActiveBonusForEmailStep
     * @return {boolean}
     * @private
     */
    _isActiveBonusForEmailStep() {
        return this.state.steps.bonusForEmail;
    }

    /**
     * @method _isActiveSorryBonusStep
     * @return {boolean}
     * @private
     */
    _isActiveSorryBonusStep() {
        return this.state.steps.sorryBonus;
    }

    /**
     * @method _isBonusAwarded
     * @param response {Object}
     * @return {boolean}
     * @private
     */
    _isBonusAwarded(response) {
        return Boolean(response && response.welcome);
    }

    /**
     * @method _isValidFields
     * @param fields {Object}
     * @return {boolean}
     * @private
     */
    _isValidFields(fields) {
        let report = new this._Validator(fields, this._getAlgorithms()).validate();

        this._Validator.toggleValidateErrors(report, this._getRootElement());

        return !report.hasError();
    }

    /**
     * @method _isValidLogin
     * @return {boolean}
     * @private
     */
    _isValidLogin() {
        return this._isValidFields({phone: `+${this._getLogin()}`});
    }

    /**
     * @method _isValidOTP
     * @return {boolean}
     * @private
     */
    _isValidOTP() {
        return this._isValidFields({code: this._getOTPCode()});
    }

    /**
     * @method _isValidEmail
     * @return {boolean}
     * @private
     */
    _isValidEmail() {
        return this._isValidFields({email: this._getEmail()});
    }

    /**
     * @method _isAvailableOTP
     * @return {boolean}
     * @private
     */
    _isAvailableOTP() {
        return this.state.isAvailableOTP || this._isChangedLogin();
    }

    /**
     * @method _isChangedLogin
     * @return {boolean}
     * @private
     */
    _isChangedLogin() {
        return this._getLogin() !== this._getPreviousLogin();
    }

    /**
     * @method _getRootElement
     * @returns {Object}
     * @private
     */
    _getRootElement() {
        return this._rootElementRef && this._rootElementRef.current;
    }

    /**
     * @method _getAlgorithms
     * @return {Object}
     * @private
     */
    _getAlgorithms() {
        let self = this,
            base = new this._Algorithms().getAlgorithms([
                {
                    type: "phone",
                    selector: this._validationErrors.login.selector
                },
                {
                    type: "email",
                    selector: this._validationErrors.email.selector
                }
            ]);

        return _.merge({}, base, {
            code: {
                isValid(value) {
                    // eslint-disable-next-line no-underscore-dangle
                    return value.length === self._getOTPMaxLength();
                },
                error: {
                    fieldName: "OTP",
                    message: this._stringsResource.enterCodeFromSMSOrViber,
                    selector: this._validationErrors.otpCode.selector
                }
            }
        });
    }

    /**
     * @method _getLogin
     * @return {string}
     * @private
     */
    _getLogin() {
        return this.state.login.replace(this._patterns.specialCharsOfPhone, "");
    }

    /**
     * @method _getOTPCode
     * @return {string}
     * @private
     */
    _getOTPCode() {
        return this.state.otpCode;
    }

    /**
     * @method _getEmail
     * @return {string}
     * @private
     */
    _getEmail() {
        return this.state.email;
    }

    /**
     * @method _getOTPMaxLength
     * @return {number}
     * @private
     */
    _getOTPMaxLength() {
        return this._OTPMaxLength;
    }

    /**
     * @method _getPreviousLogin
     * @return {string}
     * @private
     */
    _getPreviousLogin() {
        return this.state.previousLogin;
    }

    /**
     * @method _getTimeoutValue
     * @return {number}
     * @private
     */
    _getTimeoutValue() {
        return this._timeoutAsMilliseconds;
    }

    /**
     * @method _getErrorMessage
     * @return {Modal}
     * @private
     */
    _getErrorMessage() {
        return this.state.errorMessage;
    }

    /**
     * @method _setErrorMessage
     * @param [message] {string}
     * @return {Modal}
     * @private
     */
    _setErrorMessage(message = "") {
        this.setState((state) => _.merge({}, state, {errorMessage: message}));

        return this;
    }

    /**
     * @method _setTimeOfLastShow
     * @return {Modal}
     * @private
     */
    _setTimeOfLastShow() {
        this._LocalStorage.setItem(
            this._LocalStorageEnum.getWelcomeBonusPopupAsValue(),
            {timeout: (Date.now() + this._thirtyMinutesInMilliseconds)}
        );

        return this;
    }

    /**
     * @private
     * @method _setStatusNeverShow
     * @return {Modal}
     */
    _setStatusNeverShow() {
        this._LocalStorage.setItem(this._LocalStorageEnum.getWelcomeBonusPopupAsValue(), {neverShow: true});

        return this;
    }

    /**
     * @method _changeLogin
     * @param e {Object}
     * @returns {Modal}
     * @private
     */
    _changeLogin(e) {
        e.persist();

        this._analytics.startFillInPhone();
        this.setState((state) => _.merge({}, state, {login: e.target.value}));

        return this;
    }

    /**
     * @method _changeOTPCode
     * @param e {Object}
     * @return {Modal}
     * @private
     */
    _changeOTPCode(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {otpCode: e.target.value}));

        return this;
    }

    /**
     * @method _changeEmail
     * @param e {Object}
     * @return {Modal}
     * @private
     */
    _changeEmail(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {email: e.target.value}));

        return this;
    }

    /**
     * @method _changeStep
     * @param changedStep {string}
     * @return {Modal}
     * @private
     */
    _changeStep(changedStep) {
        let steps = {
            login: false,
            otp: false,
            email: false,
            bonusForPhone: false,
            bonusForEmail: false,
            sorryBonus: false
        };

        steps[changedStep] = true;

        this.setState({steps});

        return this;
    }

    /**
     * @method _close
     * @return {Modal}
     * @private
     */
    _close() {
        this._setStatusNeverShow();
        this.props.close();

        return this;
    }

    /**
     * @method _generateOTP
     * @param [success] {Function}
     * @param [error] {Function}
     * @return {Modal}
     * @private
     */
    _generateOTP(success = () => {}, error = () => {}) {
        if (this._isAvailableOTP()) {
            // eslint-disable-next-line no-underscore-dangle
            this
                ._toggleLoader(true)
                ._marketingService
                .generateOTP(this._getLogin(), () => {
                    // eslint-disable-next-line no-underscore-dangle
                    this
                        ._saveCurrentLogin()
                        ._generateNextTryTime()
                        ._toggleAvailableOTP()
                        ._setErrorMessage()
                        ._toggleLoader();

                    success();
                }, (exception) => {
                    // eslint-disable-next-line no-underscore-dangle
                    this._toggleLoader()._setErrorMessage(exception.getMessage());

                    error();
                });
        }

        return this;
    }

    /**
     * @method _saveCurrentLogin
     * @return {Modal}
     * @private
     */
    _saveCurrentLogin() {
        this.setState((currentState) => _.merge({}, currentState, {previousLogin: this._getLogin()}));

        return this;
    }

    /**
     * @method _generateNextTryTime
     * @return {Modal}
     * @private
     */
    _generateNextTryTime() {
        this.setState((state) => _.merge({}, state, {
            nextTryTime: new Date(new Date().getTime() + this._getTimeoutValue())
        }));

        return this;
    }

    /**
     * @method _toggleLoader
     * @param state {boolean}
     * @return {Modal}
     * @private
     */
    _toggleLoader(state = false) {
        this.setState((currentState) => _.merge({}, currentState, {isLoading: state}));

        return this;
    }

    /**
     * @method _toggleAvailableOTP
     * @param state {boolean}
     * @return {Modal}
     * @private
     */
    _toggleAvailableOTP(state = false) {
        this.setState((currentState) => _.merge({}, currentState, {isAvailableOTP: state}));

        return this;
    }

    /**
     * @method _toOTPStep
     * @return {Modal}
     * @private
     */
    _toOTPStep() {
        if (this._isValidLogin()) {
            this._analytics.sendPhone();

            // eslint-disable-next-line no-underscore-dangle
            this
                ._changeStep("otp")
                ._generateOTP(
                    () => {
                        this._setErrorMessage();
                    },
                    () => {
                        // eslint-disable-next-line no-underscore-dangle
                        this._changeStep("login");
                    }
                );
        }

        return this;
    }

    /**
     * @method _toEmailStep
     * @return {Modal}
     * @private
     */
    _toEmailStep() {
        this._analytics.showEmailDisplay();
        this._changeStep("email");

        return this;
    }

    /**
     * @method _toBonusForPhoneStep
     * @return {Modal}
     * @private
     */
    _toBonusForPhoneStep() {
        this._analytics.showThanksDisplay();
        this._changeStep("bonusForPhone");
        this._setStatusNeverShow();

        return this;
    }

    /**
     * @method _toBonusForEmailStep
     * @return {Modal}
     * @private
     */
    _toBonusForEmailStep() {
        this._analytics.showThanksForEmailDisplay();
        this._changeStep("bonusForEmail");
        this._setStatusNeverShow();

        return this;
    }

    /**
     * @method _toSorryBonusStep
     * @return {Modal}
     * @private
     */
    _toSorryBonusStep() {
        this._analytics.showSorryBonusDisplay();
        this._changeStep("sorryBonus");
        this._setStatusNeverShow();

        return this;
    }

    /**
     * @method _toNextStepAfterOTP
     * @return {Modal}
     * @private
     */
    _toNextStepAfterOTP(response) {
        if (this._isBonusAwarded(response)) {
            this._toBonusForPhoneStep();
        }

        if (!this._isBonusAwarded(response) && this.props.isExistAndVerifiedEmail) {
            this._toSorryBonusStep();
        }

        if (!this._isBonusAwarded(response) && !this.props.isExistAndVerifiedEmail) {
            this._toEmailStep();
        }

        return this;
    }

    /**
     * @method _retryGenerateOTP
     * @return {Modal}
     * @private
     */
    _retryGenerateOTP() {
        if (this._isAvailableOTP()) {
            this._generateOTP();
        }

        return this;
    }

    /**
     * @method _verifyOTP
     * @return {Modal}
     * @private
     */
    _verifyOTP() {
        if (this._isValidOTP()) {
            this._analytics.sendOTP();
            this._toggleLoader(true);

            this
                ._marketingService
                .verifyOTP(
                    this._getLogin(),
                    this._getOTPCode(),
                    {welcome: true},
                    (data) => {
                        // eslint-disable-next-line no-underscore-dangle
                        this
                            ._setErrorMessage()
                            ._toggleLoader()
                            ._toNextStepAfterOTP(data);
                    },
                    (error) => {
                        // eslint-disable-next-line no-underscore-dangle
                        this._setErrorMessage(error.getMessage())._toggleLoader();
                    }
                );
        }

        return this;
    }

    /**
     * @method _verifyEmail
     * @return {Modal}
     * @private
     */
    _verifyEmail() {
        if (this._isValidEmail()) {
            this._analytics.sendEmail();
            this._toggleLoader(true);

            this
                ._marketingService
                .verifyEmail(
                    this._getEmail(),
                    () => {
                        // eslint-disable-next-line no-underscore-dangle
                        this
                            ._setErrorMessage()
                            ._toggleLoader()
                            ._toBonusForEmailStep();
                    },
                    (error) => {
                        // eslint-disable-next-line no-underscore-dangle
                        this._setErrorMessage(error.getMessage())._toggleLoader();
                    }
                );
        }

        return this;
    }

    /**
     * @method _renderTimer
     * @return {React.Element}
     */
    _renderTimer() {
        return (
            <Timer expireDate={this.state.nextTryTime} expire={() => this._toggleAvailableOTP(true)} />
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="welcome-bonus">
                <div className="welcome-bonus__body">
                    {this._isActiveLoginStep() && (
                        <div className="welcome-bonus__step step step--login">
                            <div className="step__header">
                                <div className="step__banner text-center">
                                    <img
                                        src={this._linksResource.images.welcomeBonus.login}
                                        alt="bannner"
                                        width="180"
                                        height="157"
                                    />
                                </div>
                            </div>

                            <div className="step__body">
                                <div
                                    className="step__title text-center"
                                    dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.getDiscountOnYourFirstPurchase}}
                                />

                                <div className="step__field">
                                    <div className="outlined-text-form">
                                        <InputMask
                                            autoFocus
                                            mask="+38 (999) 999-99-99"
                                            maskChar={null}
                                            type="text"
                                            className="form-control"
                                            required
                                            value={this._getLogin()}
                                            onChange={this._changeLogin}
                                        />

                                        <label>{this._stringsResource.phone}</label>
                                    </div>

                                    <div className="error-message error-login-field" />

                                    <div className="error-message">
                                        {this._getErrorMessage()}
                                    </div>
                                </div>
                            </div>

                            <div className="step__footer">
                                <button
                                    type="button"
                                    className="btn-default btn-md btn-block text-uppercase"
                                    onClick={this._toOTPStep}
                                >
                                    {this._stringsResource.next}
                                </button>
                            </div>
                        </div>
                    )}

                    {this._isActiveOTPStep() && (
                        <div className="welcome-bonus__step step step--otp">
                            <div className="step__header">
                                <div className="step__banner text-center">
                                    <img
                                        src={this._linksResource.images.welcomeBonus.otp}
                                        alt="bannner"
                                        width="318"
                                        height="165"
                                    />
                                </div>
                            </div>

                            <div className="step__body">
                                <div
                                    className="step__title text-center"
                                    dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.otp}}
                                />

                                <div className="step__field">
                                    <div className="outlined-text-form">
                                        <InputMask
                                            autoFocus
                                            mask="9999"
                                            maskChar={null}
                                            type="text"
                                            className="form-control"
                                            required
                                            value={this._getOTPCode()}
                                            onChange={this._changeOTPCode}
                                        />

                                        <label>{this._stringsResource.enterCode}</label>
                                    </div>

                                    <div className="error-message error-otp-field" />

                                    <div className="error-message">
                                        {this._getErrorMessage()}
                                    </div>
                                </div>

                                <div className="step__repeat-otp text-center">
                                    <span
                                        className="cursor-pointer text-decoration-underline"
                                        onClick={this._retryGenerateOTP}
                                    >
                                        {this._stringsResource.sendCodeAgain}
                                    </span>

                                    {!this._isAvailableOTP() && (
                                        <div className="d-flex justify-content-center">
                                            <span>{this._stringsResource.availableThrough}&nbsp;</span>
                                                {this._renderTimer()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="step__footer">
                                <button
                                    type="button"
                                    className="btn-default btn-md btn-block text-uppercase"
                                    onClick={this._verifyOTP}
                                >
                                    {this._stringsResource.next}
                                </button>
                            </div>
                        </div>
                    )}

                    {this._isActiveEmailStep() && (
                        <div className="welcome-bonus__step step step--email">
                            <div className="step__header">
                                <div className="step__banner text-center">
                                    <img
                                        src={this._linksResource.images.welcomeBonus.email}
                                        alt="bannner"
                                        width="250"
                                        height="165"
                                    />
                                </div>
                            </div>

                            <div className="step__body">
                                <div
                                    className="step__title text-center"
                                    dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.email.title}}
                                />

                                <div
                                    className="step__description text-center line-height-1-5"
                                    dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.email.description}}
                                />

                                <div className="step__field">
                                    <div className="outlined-text-form">
                                        <InputMask
                                            autoFocus
                                            mask=""
                                            maskChar={null}
                                            type="text"
                                            className="form-control"
                                            required
                                            value={this._getEmail()}
                                            onChange={this._changeEmail}
                                        />

                                        <label>{this._stringsResource.yourEmail}</label>
                                    </div>

                                    <div className="error-message error-email-field" />

                                    <div className="error-message">
                                        {this._getErrorMessage()}
                                    </div>
                                </div>
                            </div>

                            <div className="step__footer">
                                <button
                                    type="button"
                                    className="btn-default btn-md btn-block text-uppercase"
                                    onClick={this._verifyEmail}
                                >
                                    {this._stringsResource.receive}
                                </button>
                            </div>
                        </div>
                    )}

                    {this._isActiveBonusForPhoneStep() && (
                        <div className="welcome-bonus__step step step--bonus">
                            <div className="step__header">
                                <div className="step__banner text-center">
                                    <img
                                        src={this._linksResource.images.welcomeBonus.bonus}
                                        alt="bannner"
                                        width="250"
                                        height="165"
                                    />
                                </div>
                            </div>

                            <div className="step__body">
                                <div
                                    className="step__title text-center"
                                    dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.bonusForPhone.title}}
                                />
                                <div
                                    className="step__description"
                                    dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.bonusForPhone.description}}
                                />
                            </div>
                        </div>
                    )}

                    {this._isActiveBonusForEmailStep() && (
                        <div className="welcome-bonus__step step step--bonus">
                            <div className="step__header">
                                <div className="step__banner text-center">
                                    <img
                                        src={this._linksResource.images.welcomeBonus.bonus}
                                        alt="bannner"
                                        width="250"
                                        height="165"
                                    />
                                </div>
                            </div>

                            <div className="step__body">
                                <div
                                    className="step__title"
                                    dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.bonusForEmail.title}}
                                />
                                <div
                                    className="step__description step__description--mb"
                                    dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.bonusForEmail.description}}
                                />
                            </div>

                            <div className="step__footer">
                                <button
                                    type="button"
                                    className="btn-default btn-md btn-block text-uppercase"
                                    onClick={this._close}
                                >
                                    {this._stringsResource.fine}
                                </button>
                            </div>
                        </div>
                    )}

                    {this._isActiveSorryBonusStep() && (
                        <div className="welcome-bonus__step step step--sorry-bonus">
                            <div className="step__header">
                                <div className="step__banner text-center">
                                    <img
                                        src={this._linksResource.images.welcomeBonus.sorryBonus}
                                        alt="bannner"
                                        width="69"
                                        height="65"
                                    />
                                </div>
                            </div>

                            <div className="step__body">
                                <div
                                    className="step__title text-center"
                                    dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.sorryBonus.title}}
                                />
                                <div
                                    className="step__description"
                                    dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.sorryBonus.description}}
                                />
                            </div>
                            <div
                                className="step__footer"
                                dangerouslySetInnerHTML={{__html: this._HTMLResource.welcomeBonus.sorryBonus.howGetMoreBonuses}}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    isExistAndVerifiedEmail: PropTypes.bool,
    close: PropTypes.func
};

Modal.defaultProps = {
    isExistAndVerifiedEmail: false,
    close: () => {}
};

export default Modal;
