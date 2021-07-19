/* eslint-disable max-len */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import InputMask from "react-input-mask";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import ComponentClassNameEnum from "app/core/utilites/enum/componentClassName";

import Validator from "app/core/utilites/validator/Validator";
import Algorithms from "app/core/utilites/validator/Algorithms";

import AuthorizationService from "app/core/services/authorization";
import ModalDialogService from "app/core/services/modalDialog";

import Avatar from "components/avatar/Avatar";

class Invite extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @private
         * @property _validationErrors
         * @type {Object}
         */
        this._validationErrors = {
            phone: {
                selector: ".error-phone-field"
            },
            name: {
                selector: ".error-name-field"
            },
            lastName: {
                selector: ".error-last-name-field"
            }
        };

        /**
         * @private
         * @property _rootElementRef
         * @type {Object}
         */
        this._rootElementRef = React.createRef();

        this.state = {
            isAuthorized: false,
            loading: false,
            phone: "",
            name: "",
            lastName: "",
            errorMessage: ""
        };

        /**
         * @property _Validator
         * @type {Validator}
         * @private
         */
        this._Validator = Validator;

        /**
         * @property _Algorithms
         * @type {Algorithms}
         * @private
         */
        this._Algorithms = Algorithms;

        /**
         * @private
         * @property _HTMLResource
         * @type {Object}
         */
        this._HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @private
         * @property _stringsResource
         * @type {Object}
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property _authorizationService
         * @type {Authorization}
         * @private
         */
        this._authorizationService = AuthorizationService.getInstance();

        /**
         * @property _modalDialogService
         * @type {ModalDialog}
         * @private
         */
        this._modalDialogService = ModalDialogService.getInstance();

        /**
         * @private
         * @property _componentClassNameEnumEnum
         * @type {Enum}
         */
        this._componentClassNameEnum = ComponentClassNameEnum.getInstance();

        this._getProfile = this._getProfile.bind(this);
        this._changePhone = this._changePhone.bind(this);
        this._changeName = this._changeName.bind(this);
        this._changeLastName = this._changeLastName.bind(this);
        this._toLogin = this._toLogin.bind(this);
        this._confirmedAuthorization = this._confirmedAuthorization.bind(this);
        this._confirm = this._confirm.bind(this);
    }

    componentDidMount() {
        this._confirmedAuthorization();

        this._authorizationService.on("login", this._confirm);
    }

    /**
     * @method _hasErrorMessage
     * @returns {boolean}
     * @private
     */
    _hasErrorMessage() {
        return Boolean(this._getErrorMessage());
    }

    /**
     * @method _isLoading
     * @return {boolean}
     * @private
     */
    _isLoading() {
        return this.state.loading;
    }

    /**
     * @method _isAuthorized
     * @returns {boolean}
     * @private
     */
    _isAuthorized() {
        return this.state.isAuthorized;
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
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {Invite}
     * @private
     */
    _toggleLoader(state) {
        this.setState({loading: Boolean(state)});

        return this;
    }

    /**
     * @method _toggleAuthorizationState
     * @param state {boolean}
     * @param [callback] {Function}
     * @returns {Invite}
     * @private
     */
    _toggleAuthorizationState(state, callback) {
        this.setState({isAuthorized: Boolean(state)}, callback);

        return this;
    }

    /**
     * @method _getAlgorithms
     * @return {Object}
     * @private
     */
    _getAlgorithms() {
        return new this._Algorithms().getAlgorithms([
            {
                name: "phone",
                type: "phone",
                selector: this._validationErrors.phone.selector
            },
            {
                name: "name",
                type: "text",
                selector: this._validationErrors.name.selector
            },
            {
                name: "lastName",
                type: "text",
                selector: this._validationErrors.lastName.selector
            }
        ]);
    }

    /**
     * @private
     * @method _getRootElement
     * @returns {Object}
     */
    _getRootElement() {
        return this._rootElementRef && this._rootElementRef.current;
    }

    /**
     * @method _getInviter
     * @returns {Employee}
     * @private
     */
    _getInviter() {
        return this.props.inviter;
    }

    /**
     * @method _getProfile
     * @returns {Invite}
     * @private
     */
    _getProfile() {
        if (this._isAuthorized()) {
            this._toggleLoader(true);

            this._authorizationService.getProfile((profile) => {
                // eslint-disable-next-line no-underscore-dangle
                this
                    ._setProfile(this._authorizationService.convertToProfileEntity(profile))
                    ._toggleLoader(false);
            }, () => {
                this._toggleLoader(false);
            });
        }

        return this;
    }

    /**
     * @method _getErrorMessage
     * @returns {string}
     * @private
     */
    _getErrorMessage() {
        return this.state.errorMessage;
    }

    /**
     * @method _setErrorMessage
     * @param errorMessage {string}
     * @returns {Invite}
     * @private
     */
    _setErrorMessage(errorMessage) {
        this.setState({errorMessage});

        return this;
    }

    /**
     * @method _setProfile
     * @param profile {Profile}
     * @returns {Invite}
     * @private
     */
    _setProfile(profile) {
        this.setState((state) => ({
            phone: `+${profile.getPhone()}`,
            name: state.name || profile.getName(),
            lastName: state.lastName || profile.getLastName()
        }));

        return this;
    }

    /**
     * @method _getPhone
     * @returns {string}
     * @private
     */
    _getPhone() {
        return this.state.phone;
    }

    /**
     * @method _getName
     * @returns {string}
     * @private
     */
    _getName() {
        return this.state.name;
    }

    /**
     * @method _getLastName
     * @returns {string}
     * @private
     */
    _getLastName() {
        return this.state.lastName;
    }

    /**
     * @method _buildProfile
     * @returns {{lastName: string, phone: string, name: string}}
     * @private
     */
    _buildProfile() {
        return {
            phone: this._getPhone(),
            name: this._getName(),
            lastName: this._getLastName()
        };
    }

    /**
     * @method _changePhone
     * @param e {Object}
     * @returns {Invite}
     * @private
     */
    _changePhone(e) {
        e.persist();

        this.setState({phone: e.target.value});

        return this;
    }

    /**
     * @method _changeName
     * @param e {Object}
     * @returns {Invite}
     * @private
     */
    _changeName(e) {
        e.persist();

        this.setState({name: e.target.value});

        return this;
    }

    /**
     * @method _changeLastName
     * @param e {Object}
     * @returns {Invite}
     * @private
     */
    _changeLastName(e) {
        e.persist();

        this.setState({lastName: e.target.value});

        return this;
    }

    /**
     * @method _toLogin
     * @returns {Invite}
     * @private
     */
    _toLogin() {
        if (this._isValidFields(this._buildProfile())) {
            this._authorizationService.toLogin(this._getPhone(), true);
        }

        // this._showSuccessMessage();
        // this._showErrorMessage();

        return this;
    }

    /**
     * @method _showSuccessMessage
     * @returns {Invite}
     * @private
     */
    _showSuccessMessage() {
        this._modalDialogService.open({
            className: this._componentClassNameEnum.getEmployeeInviteCompletedModalAsValue(),
            size: this._modalDialogService.getSizes().getSm(),
            body: (
                <div className="text-center">
                    <span className="icon icon-done-circle" />

                    <div className="text-xl mb-24">
                        <strong>{this._stringsResource.yourDataIsBeingVerified}</strong>
                    </div>

                    <span className="text-medium">
                        {this._HTMLResource.employeeDiscount.invite.success.description}
                    </span>
                </div>
            ),
            confirm: {
                title: this._stringsResource.clearlyUnderstood,
                callback: () => {}
            }
        });

        return this;
    }

    /**
     * @method _showErrorMessage
     * @returns {Invite}
     * @private
     */
    _showErrorMessage() {
        this._modalDialogService.open({
            className: this._componentClassNameEnum.getEmployeeInviteFailureModalAsValue(),
            size: this._modalDialogService.getSizes().getSm(),
            body: (
                <div className="text-center">
                    <span className="icon icon-remove-circle" />

                    <div className="text-xl mb-24">
                        <strong>{this._stringsResource.oh.toUpperCase()}!</strong>
                    </div>

                    <span className="text-medium">
                        {this._stringsResource.youHaveAlreadyApplied}
                    </span>
                </div>
            ),
            confirm: {
                title: this._stringsResource.pity,
                callback: () => {}
            }
        });

        return this;
    }

    /**
     * @method _confirmedAuthorization
     * @returns {Invite}
     * @private
     */
    _confirmedAuthorization() {
        // eslint-disable-next-line no-underscore-dangle
        this._toggleAuthorizationState(this._authorizationService.isAuthorized(), this._getProfile);

        return this;
    }

    /**
     * @method _confirm
     * @returns {Invite}
     * @private
     */
    _confirm() {
        if (this._isValidFields(this._buildProfile())) {
            // eslint-disable-next-line no-underscore-dangle
            this._toggleLoader(true)._setErrorMessage("");

            this.props.confirm(this._buildProfile(), () => {
                // eslint-disable-next-line no-underscore-dangle
                this._toggleLoader(false)._showSuccessMessage();
            }, (exception) => {
                // eslint-disable-next-line no-underscore-dangle
                this._setErrorMessage(exception.getMessage())._toggleLoader(false)._showErrorMessage();
            });
        }

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section
                ref={this.rootElementRef}
                className={classNames("employee-discount__invite invite bg-white rounded-16", {
                    loading: this._isLoading()
                })}
            >
                <div className="invite__header">
                    <Avatar profile={this._getInviter()} size={80} />

                    <div className="invite__inviter-name">
                        {this._getInviter().getLastName()} {this._getInviter().getName()}. {this._getInviter().getMiddleName()}.
                    </div>

                    <div
                        className="text-medium text-center line-height-1-5"
                        dangerouslySetInnerHTML={{__html: this._HTMLResource.employeeDiscount.invite.from.toLowerCase()}}
                    />
                </div>

                <div className="invite__body mt-16">
                    <div className="outlined-text-form mb-16">
                        <InputMask
                            autoFocus
                            mask="+38 (999) 999-99-99"
                            maskChar={null}
                            type="text"
                            className="form-control"
                            required
                            disabled={this._isAuthorized()}
                            value={this._getPhone()}
                            onChange={this._changePhone}
                        />

                        {!this._isAuthorized() && (
                            <label>
                                {this._stringsResource.phone}
                            </label>
                        )}

                        <div className="error-message error-phone-field" />
                    </div>

                    <div className="outlined-text-form mb-16">
                        <input
                            type="text"
                            className="form-control"
                            value={this._getName()}
                            onChange={this._changeName}
                            required
                        />

                        <label>
                            {this._stringsResource.name}
                        </label>

                        <div className="error-message error-name-field" />
                    </div>

                    <div className="outlined-text-form">
                        <input
                            type="text"
                            className="form-control"
                            value={this._getLastName()}
                            onChange={this._changeLastName}
                            required
                        />

                        <label>
                            {this._stringsResource.lastName}
                        </label>

                        <div className="error-message error-last-name-field" />
                    </div>
                </div>

                <div className="invite__footer mt-24">
                    {/*{this._hasErrorMessage() && (*/}
                    {/*    <div className="error-message mb-24">*/}
                    {/*        {this._getErrorMessage()}*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {this._isAuthorized() && (
                        <button
                            type="button"
                            className="btn-default btn-md text-uppercase w-100"
                            onClick={this._confirm}
                        >
                            {this._stringsResource.send}
                        </button>
                    )}

                    {!this._isAuthorized() && (
                        <button
                            type="button"
                            className="btn-default btn-md text-uppercase w-100"
                            onClick={this._toLogin}
                        >
                            {this._stringsResource.next}
                        </button>
                    )}
                </div>
            </section>
        );
    }
}

Invite.propTypes = {
    inviter: PropTypes.instanceOf(Object),
    confirm: PropTypes.func
};

Invite.defaultProps = {
    inviter: null,
    confirm: () => {}
};

export default Invite;
