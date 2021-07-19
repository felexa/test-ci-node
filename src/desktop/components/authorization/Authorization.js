/* eslint-disable max-len */

import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import classNames from "classnames";

import Env from "app/core/environment";

import Validator from "app/core/utilites/validator/Validator";
import Algorithms from "app/core/utilites/validator/Algorithms";

import Resource from "app/core/resource";

import AuthorizationService from "app/core/services/authorization";

import Timer from "components/timer/Timer";

class Authorization extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property OTPMaxLength
         * @type {number}
         */
        this.OTPMaxLength = 4;

        /**
         * @property timeoutAsMilliseconds
         * @type {number}
         */
        this.timeoutAsMilliseconds = 90000;

        /**
         * @property
         * @type {Object}
         */
        this.rootElementRef = React.createRef();

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property patterns
         * @type {{specialCharsOfPhone: RegExp}}
         */
        this.patterns = {
            specialCharsOfPhone: /[\+\s()-]/g
        };

        /**
         * @property validationErrors
         * @type {Object}
         */
        this.validationErrors = {
            login: {
                selector: ".error-login-field"
            },
            otpCode: {
                selector: ".error-otp-field"
            }
        };

        this.state = {
            isLoading: false,
            isAvailableOTP: true,
            nextTryTime: new Date(),
            errorMessage: "",
            previousLogin: "",
            login: props.login || "",
            otpCode: "",
            steps: {
                login: true,
                otp: false
            }
        };

        this.authorizationService = AuthorizationService.getInstance();

        this.Resource = Resource;
        this.Validator = Validator;
        this.Algorithms = Algorithms;

        this._toggleLoader = this._toggleLoader.bind(this);

        this._changeLogin = this._changeLogin.bind(this);
        this._changeOTPCode = this._changeOTPCode.bind(this);

        this._toOTPStep = this._toOTPStep.bind(this);
        this._toLoginStep = this._toLoginStep.bind(this);

        this._retryGenerateOTP = this._retryGenerateOTP.bind(this);
        this._verifyOTP = this._verifyOTP.bind(this);
    }

    componentDidMount() {
        if (this.props.autoActiveOTP) {
            this._toOTPStep();
        }
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
     * @method _isValidFields
     * @param fields {Object}
     * @return {boolean}
     * @private
     */
    _isValidFields(fields) {
        let report = new this.Validator(fields, this._getAlgorithms()).validate();

        this.Validator.toggleValidateErrors(report, this._getRootElement());

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
     * @method _getTimeoutValue
     * @return {number}
     * @private
     */
    _getTimeoutValue() {
        return this.timeoutAsMilliseconds;
    }

    /**
     * @private
     * @method _getRootElement
     * @returns {Object}
     */
    _getRootElement() {
        return this.rootElementRef && this.rootElementRef.current;
    }

    /**
     * @method _getLogin
     * @return {string}
     * @private
     */
    _getLogin() {
        return this.state.login.replace(this.patterns.specialCharsOfPhone, "");
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
     * @method _getOTPCode
     * @return {string}
     * @private
     */
    _getOTPCode() {
        return this.state.otpCode;
    }

    /**
     * @method _getOTPMaxLength
     * @return {number}
     * @private
     */
    _getOTPMaxLength() {
        return this.OTPMaxLength;
    }

    /**
     * @method _getAlgorithms
     * @return {Object}
     * @private
     */
    _getAlgorithms() {
        let self = this,
            base = new this.Algorithms().getAlgorithms([
                {
                    type: "phone",
                    selector: this.validationErrors.login.selector
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
                    message: this.stringsResource.enterCodeFromSMSOrViber,
                    selector: this.validationErrors.otpCode.selector
                }
            }
        });
    }

    /**
     * @method _getNextTryTime
     * @return {Date}
     * @private
     */
    _getNextTryTime() {
        return this.state.nextTryTime;
    }

    /**
     * @method _getErrorMessage
     * @return {Authorization}
     * @private
     */
    _getErrorMessage() {
        return this.state.errorMessage;
    }

    /**
     * @method _setErrorMessage
     * @param [message] {string}
     * @return {Authorization}
     * @private
     */
    _setErrorMessage(message = "") {
        this.setState((state) => _.merge({}, state, {errorMessage: message}));

        return this;
    }

    /**
     * @method _toggleAvailableOTP
     * @param state {boolean}
     * @return {Authorization}
     * @private
     */
    _toggleAvailableOTP(state = false) {
        this.setState((currentState) => _.merge({}, currentState, {isAvailableOTP: state}));

        return this;
    }

    /**
     * @method _toggleLoader
     * @param state {boolean}
     * @return {Authorization}
     * @private
     */
    _toggleLoader(state = false) {
        this.setState((currentState) => _.merge({}, currentState, {isLoading: state}));

        return this;
    }

    /**
     * @method _saveCurrentLogin
     * @return {Authorization}
     * @private
     */
    _saveCurrentLogin() {
        this.setState((currentState) => _.merge({}, currentState, {previousLogin: this._getLogin()}));

        return this;
    }

    /**
     * @method _changeLogin
     * @param e {Object}
     * @returns {Authorization}
     */
    _changeLogin(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {login: e.target.value}));

        return this;
    }

    /**
     * @method _changeOTPCode
     * @param e {Object}
     * @return {Authorization}
     * @private
     */
    _changeOTPCode(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {otpCode: e.target.value}));

        return this;
    }

    /**
     * @method _changeStep
     * @param [isLogin] {boolean}
     * @param [isOTP] {boolean}
     * @return {Authorization}
     * @private
     */
    _changeStep(isLogin = false, isOTP = false) {
        this.setState(function (state) {
            return _.merge({}, state, {
                steps: {
                    login: isLogin,
                    otp: isOTP
                }
            });
        });

        return this;
    }

    /**
     * @method _generateNextTryTime
     * @return {Authorization}
     * @private
     */
    _generateNextTryTime() {
        this.setState((state) => _.merge({}, state, {
            nextTryTime: new Date(new Date().getTime() + this._getTimeoutValue())
        }));

        return this;
    }

    /**
     * @method _generateOTP
     * @param [success] {Function}
     * @param [error] {Function}
     * @return {Authorization}
     * @private
     */
    _generateOTP(success = () => {}, error = () => {}) {
        if (this._isAvailableOTP()) {
            this
                ._toggleLoader(true)
                .authorizationService
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
     * @method _retryGenerateOTP
     * @return {Authorization}
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
     * @return {Authorization}
     * @private
     */
    _verifyOTP() {
        if (this._isValidOTP()) {
            this._toggleLoader(true);

            this
                .authorizationService
                .verifyOTP(
                    this._getLogin(),
                    this._getOTPCode(),
                    () => {
                        // eslint-disable-next-line no-underscore-dangle
                        this._setErrorMessage()._toggleLoader();
                        this.props.confirm();
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
     * @method _toLoginStep
     * @return {Authorization}
     * @private
     */
    _toLoginStep() {
        // eslint-disable-next-line no-underscore-dangle
        this._changeStep(true)._setErrorMessage();

        return this;
    }

    /**
     * @method _toOTPStep
     * @return {Authorization}
     * @private
     */
    _toOTPStep() {
        if (this._isValidLogin()) {
            // eslint-disable-next-line no-underscore-dangle
            this
                ._changeStep(false, true)
                ._generateOTP(
                    () => {
                        this._setErrorMessage();
                    },
                    () => {
                        // eslint-disable-next-line no-underscore-dangle
                        this._changeStep(true, false);
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
            <Timer expireDate={this._getNextTryTime()} expire={() => this._toggleAvailableOTP(true)} />
        );
    }

    render() {
        return (
            <div
                ref={this.rootElementRef}
                className={classNames("authorization", {
                    loading: this._isLoading()
                })}
            >
                {this._isActiveLoginStep() && (
                    <div className="authorization__header">
                        <span className="authorization__title">
                            {this.stringsResource.loginOrRegistration}
                        </span>
                    </div>
                )}

                <div className="authorization__body">
                    {this._isActiveLoginStep() && (
                        <div className="authorization__step step step--login">
                            <div className="step__body">
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

                                        <label>{this.stringsResource.phone}</label>
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
                                    {this.stringsResource.next}
                                </button>

                                <p>
                                    {this.stringsResource.userAgreement.acceptTerms}
                                    <br />
                                    <a href={this.Resource.links.userAgreement} target="_blank">
                                        {this.stringsResource.userAgreement.agreement.toLowerCase()}
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}

                    {this._isActiveOTPStep() && (
                        <div className="authorization__step step step--otp">
                            <div className="step__header">
                                <span>{this.stringsResource.toTheNumber} </span>

                                <span className="f-weight-5">
                                    {this._getLogin()}
                                </span>

                                <span> {this.stringsResource.sentSMSWithCode.toLowerCase()}</span>
                            </div>

                            <div className="step__body">
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

                                        <label>{this.stringsResource.enterCodeFromSMSOrViber}</label>
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
                                        {this.stringsResource.sendCodeAgain}
                                    </span>

                                    {!this._isAvailableOTP() && (
                                        <div className="d-flex justify-content-center">
                                            <span>{this.stringsResource.availableThrough.toLowerCase()}&nbsp;</span> {this._renderTimer()}
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
                                    {this.stringsResource.next}
                                </button>

                                <button
                                    type="button"
                                    className="step__to-back btn-default--outline btn-md btn-block text-uppercase"
                                    onClick={this._toLoginStep}
                                >
                                    {this.stringsResource.back}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Authorization.propTypes = {
    login: PropTypes.string,
    autoActiveOTP: PropTypes.bool,
    confirm: PropTypes.func.isRequired
};

Authorization.defaultProps = {
    login: "380",
    autoActiveOTP: false
};

export default Authorization;
