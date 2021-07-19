import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import AuthorizationService from "app/core/services/authorization";

class ProtectedComponent extends React.Component {
    constructor(props) {
        super(props);

        this.authorizationService = AuthorizationService.getInstance();

        this.state = {
            isAuthorized: false,
            isLoading: true
        };

        this._toggleAuthorizationState = this._toggleAuthorizationState.bind(this);
        this._redirectToHomePage = this._redirectToHomePage.bind(this);
        this._logout = this._logout.bind(this);
    }

    componentDidMount() {
        this._toggleAuthorizationState(this._redirectToHomePage);

        this
            .authorizationService
            .on(AuthorizationService.events.logout, this._logout)
            .on(AuthorizationService.events.login, this._toggleAuthorizationState);
    }

    componentWillUnmount() {
        this
            .authorizationService
            .off(AuthorizationService.events.logout, this._logout)
            .off(AuthorizationService.events.login, this._toggleAuthorizationState);
    }

    /**
     * @method _isAuthorized
     * @return {boolean}
     * @private
     */
    _isAuthorized() {
        return this.state.isAuthorized;
    }

    /**
     * @method _isLoading
     * @return {boolean}
     * @private
     */
    _isLoading() {
        return this.state.isLoading && this.props.hasLoader;
    }

    /**
     * @method _isEnableRedirect
     * @return {Boolean}
     * @private
     */
    _isEnableRedirect() {
        return this.props.enableRedirect;
    }

    /**
     * @method _toggleAuthorizationState
     * @param [callback] {Function}
     * @param [isLoading] {boolean}
     * @return {ProtectedComponent}
     * @private
     */
    _toggleAuthorizationState(callback = () => {}, isLoading = false) {
        this.setState(
            () => ({
                isLoading,
                isAuthorized: this.authorizationService.isAuthorized()
            }),
            () => callback()
        );

        return this;
    }

    /**
     * @method _redirectToHomePage
     * @return {ProtectedComponent}
     * @private
     */
    _redirectToHomePage() {
        if (!this._isAuthorized() && this._isEnableRedirect()) {
            window.location.href = this.props.redirectTo;
        }

        return this;
    }

    /**
     * @method _logout
     * @return {ProtectedComponent}
     * @private
     */
    _logout() {
        this._toggleAuthorizationState(this._redirectToHomePage, true);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <div
                className={classNames("protected-element position-relative", this.props.className, {
                    loading: this._isLoading()
                })}
            >
                {this._isAuthorized() && (
                    this.props.children
                )}
            </div>
        );
    }
}

ProtectedComponent.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    redirectTo: PropTypes.string,
    hasLoader: PropTypes.bool,
    enableRedirect: PropTypes.bool
};

ProtectedComponent.defaultProps = {
    className: "",
    redirectTo: "/",
    hasLoader: false,
    enableRedirect: false
};

export default ProtectedComponent;
