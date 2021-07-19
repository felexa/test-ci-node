import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import AccountSectionEnum from "app/core/utilites/enum/account/section";

import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import DeviceMobile from "components/deviceDetector/mobile/Detector";
import Bonus from "components/account/Bonus";
import Avatar from "components/avatar/Avatar";

class Account extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property resource
         * @type {Resource}
         */
        this.resource = Resource.getInstance(Env.getInstance().getLanguage());

        /**
         * @property accountSectionEnum
         * @type {Enum}
         */
        this.accountSectionEnum = AccountSectionEnum.getInstance();

        this.state = {
            isAccountReady: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isAccountReady: true
            });
        }, 1000);
    }

    /**
     * @private
     * @method _hasProfile
     * @return {boolean}
     */
    _hasProfile() {
        return Boolean(this.props.profile.getId());
    }

    /**
     * @private
     * @method _getUrlToAccount
     * @return {string}
     */
    _getUrlToAccount() {
        return this.resource.getAccount().getNavigationByKey(this.accountSectionEnum.getPersonalDataAsValue()).getUrl();
    }

    render() {
        return (
            <div className="account account--mini d-flex align-items-center justify-content-end">
                {this.state.isAccountReady && (
                    <div className="account__body">
                        <DeviceDesktop>
                            {!this._hasProfile() && (
                                <button
                                    className="account__to-login cursor-pointer f-weight-5 text-uppercase"
                                    type="button"
                                    onClick={this.props.toLogin}
                                >
                                    {this.stringsResource.logIn}
                                </button>
                            )}

                            {this._hasProfile() && (
                                <div className="d-flex align-items-center">
                                    <Bonus bonus={this.props.profile.getBonus()} />

                                    <div className="account__avatar ml-16">
                                        <a href={this._getUrlToAccount()} className="d-flex align-items-center justify-content-center rounded-100">
                                            <Avatar
                                                profile={this.props.profile}
                                                size={36}
                                            />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </DeviceDesktop>

                        <DeviceMobile>
                            {!this._hasProfile() && (
                                <span
                                    onClick={this.props.toLogin}
                                    className="d-flex align-items-center justify-content-end cursor-pointer"
                                >
                                    <i className="icon icon-user" /> {this.stringsResource.loginToYourAccount}
                                </span>
                            )}

                            {this._hasProfile() && (
                                <a href={this._getUrlToAccount()} className="d-flex align-items-center text-white text-decoration-none hover-color-white">
                                    <i className="icon icon-user" /> {this.props.profile.getFullName()}
                                </a>
                            )}
                        </DeviceMobile>
                    </div>
                )}
            </div>
        );
    }
}

Account.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    toLogin: PropTypes.func
};

Account.defaultProps = {
    toLogin: () => {}
};

export default Account;
