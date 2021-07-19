import React from "react";
import PropTypes from "prop-types";

import LocalStorage from "app/core/utilites/storage/localStorage";
import LocalStorageEnum from "app/core/utilites/enum/localStorageName";
import ComponentClassNameEnum from "app/core/utilites/enum/componentClassName";
import ModalDialogService from "app/core/services/modalDialog";

import Modal from "components/marketingActivities/welcomeBonus/Modal";

import Analytics from "./Analytics";

class WelcomeBonus extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _analytics
         * @type {Object}
         */
        this._analytics = new Analytics();

        /**
         * @private
         * @property _componentClassNameEnumEnum
         * @type {Enum}
         */
        this._componentClassNameEnum = ComponentClassNameEnum.getInstance();

        /**
         * @property _localStorage
         * @type {LocalStorage}
         */
        this._localStorage = LocalStorage.getInstance();

        /**
         * @property _localStorageEnum
         * @type {Enum}
         */
        this._localStorageEnum = LocalStorageEnum.getInstance();

        /**
         * @property _modalDialogService
         * @type {ModalDialog}
         */
        this._modalDialogService = ModalDialogService.getInstance();

        /**
         * @property _timeoutForPopup
         * @type {number}
         */
        this._timeoutForPopup = 5000;

        this._show = this._show.bind(this);
    }

    componentDidMount() {
        // this._open();
    }

    /**
     * @private
     * @method _hasPopupTimedOut
     * @returns {boolean}
     */
    _hasPopupTimedOut() {
        return this._getWelcomePopupInfo() && this._getWelcomePopupInfo().timeout < Date.now();
    }

    /**
     * @private
     * @method _isAuthorized
     * @returns {boolean}
     */
    _isAuthorized() {
        return this.props.isAuthorized;
    }

    /**
     * @private
     * @method _isStatusNeverShow
     * @return {boolean}
     */
    _isStatusNeverShow() {
        return this._getWelcomePopupInfo() && this._getWelcomePopupInfo().neverShow;
    }

    /**
     * @private
     * @method _isThereDelayForPopup
     * @return {boolean}
     */
    _isThereDelayForPopup() {
        return this._getWelcomePopupInfo() && this._getWelcomePopupInfo().timeout;
    }

    /**
     * @private
     * @method _isExistAndVerifiedEmail
     * @returns {boolean}
     */
    _isExistAndVerifiedEmail() {
        return Boolean(this.props.profile.isEmailVerified());
    }

    /**
     * @private
     * @method _getWelcomePopupInfo
     * @return {string}
     */
    _getWelcomePopupInfo() {
        return this._localStorage.getItem(this._localStorageEnum.getWelcomeBonusPopupAsValue());
    }

    /**
     * @private
     * @method _open
     * @returns {WelcomeBonus}
     */
    _open() {
        if (!this._isStatusNeverShow() && !this._isAuthorized()) {
            if (!this._isThereDelayForPopup()) {
                setTimeout(this._show, this._timeoutForPopup);
            } else {
                // eslint-disable-next-line no-unused-expressions
                this._showPopupAfterTimeout();
            }
        }

        return this;
    }

    /**
     * @private
     * @method _show
     * @returns {WelcomeBonus}
     */
    _show() {
        this._analytics.firstShowedPopup();

        this._modalDialogService.open({
            size: this._modalDialogService.getSizes().getSm(),
            className: this._componentClassNameEnum.getWelcomeBonusModalAsValue(),
            body: (
                <Modal
                    close={() => this._modalDialogService.close()}
                    isExistAndVerifiedEmail={this._isExistAndVerifiedEmail()}
                />
            )
        });

        return this;
    }

    /**
     * @private
     * @method _showPopupAfterTimeout
     * @returns {WelcomeBonus}
     */
    _showPopupAfterTimeout() {
        if (this._hasPopupTimedOut()) {
            setTimeout(this._show, this._timeoutForPopup);
        }

        return this;
    }

    render() {
        return null;
    }
}

WelcomeBonus.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    profile: PropTypes.instanceOf(Object)
};

WelcomeBonus.defaultProps = {
    profile: {}
};

export default WelcomeBonus;
