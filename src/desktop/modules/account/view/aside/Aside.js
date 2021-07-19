import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Numbers from "app/core/utilites/numbers";

import Image from "components/image/Image";

import Strings from "app/core/utilites/strings";

import Item from "./Item";

class Aside extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property numbers
         * @type {Numbers}
         */
        this.numbers = Numbers.getInstance();

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property env
         * @type {Env}
         */
        this.env = Env.getInstance();

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        this._toLogout = this._toLogout.bind(this);
    }

    /**
     * @private
     * @method _hasBonus
     * @returns {boolean}
     */
    _hasBonus() {
        return Boolean(this._getProfile().getBonus().getTotalAvailableCount());
    }

    /**
     * @private
     * @method _hasProfile
     * @returns {boolean}
     */
    _hasProfile() {
        return Boolean(this._getProfile().getId());
    }

    /**
     * @private
     * @method _getNavigation
     * @returns {Array}
     */
    _getNavigation() {
        return this.props.navigation;
    }

    /**
     * @private
     * @method _getProfile
     * @returns {Object}
     */
    _getProfile() {
        return this.props.profile;
    }

    /**
     * @private
     * @method _getLogin
     * @return {string}
     */
    _getLogin() {
        return this._getProfile().getPhone();
    }

    /**
     * @private
     * @method _getAvailableBonusCountAsHTML
     * @returns {string}
     */
    _getAvailableBonusCountAsHTML() {
        return this.strings.writeLine(
            this.HTMLResource.bonusesAmount,
            [this.numbers.toLocaleString(Math.floor(this._getProfile().getBonus().getTotalAvailableCount()))]
        );
    }

    /**
     * @private
     * @method _toLogout
     * @param event {Object}
     * @returns {Aside}
     */
    _toLogout(event) {
        event.preventDefault();

        this.props.logout();

        return this;
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this._getNavigation().map((item, i) => (
            <Item item={item} key={i} />
        ));
    }

    render() {
        return (
            <aside className="account__aside rounded-16 new-super-box-shadow bg-white">
                {this._hasProfile() && (
                    <div className="aside__profile">
                        <div className="profile__photo">
                            <Image
                                src={this._getProfile().getAvatar().getMedium()}
                                alt={this._getProfile().getAvatar().getAlt()}
                            />
                        </div>

                        <div>
                            <div className="aside__user-name text-medium text-black mb-8">{`${this._getProfile().getName()} ${this._getProfile().getLastName()}`}</div>

                            <span>{this._getLogin()}</span>
                        </div>
                    </div>
                )}
                {this._hasBonus() && (
                    <div className="aside__label rounded-16">
                        <img
                            src={this.Resource.links.images.yellowCarrot}
                            alt="bonus icon"
                            className="mr-12"
                        />

                        <div>
                            <p className="ml-0 mr-0 mt-0 mb-6">
                                {this.stringsResource.onYourBalance}:
                            </p>

                            <p
                                className="m-0 text-black f-weight-5 text-large"
                                dangerouslySetInnerHTML={{__html: this._getAvailableBonusCountAsHTML()}}
                            />
                        </div>
                    </div>
                )}

                <ul className="aside__navigation reset-list">
                    {this._renderItems()}

                    <li className="navigation__item">
                        <a className="item cursor-pointer" onClick={this._toLogout}>
                            <i className="icon icon-sign-out" />
                            <span className="text-black">{this.stringsResource.exit}</span>
                        </a>
                    </li>
                </ul>
            </aside>
        );
    }
}

Aside.propTypes = {
    navigation: PropTypes.instanceOf(Array),
    profile: PropTypes.instanceOf(Object).isRequired,
    logout: PropTypes.func.isRequired
};

Aside.defaultProps = {
    navigation: []
};

export default Aside;
