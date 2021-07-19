/* eslint-disable react/prop-types */

import React from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Strings from "app/core/utilites/strings";

import Analytics from "components/header/Analytics";

import Language from "components/language/Language";
import Account from "components/account/Account";
import Loader from "components/loader/Loader";
import Avatar from "components/avatar/Avatar";

import Item from "./Item";
import Screen from "./Screen";
import CatalogMenu from "./CatalogMenu";
import AccountNavigation from "./navigations/account/Navigation";

class Mobile extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            isMenuLoads: false
        };

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property analytics
         * @type {Object}
         */
        this.analytics = new Analytics();

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        this._toLogin = this._toLogin.bind(this);
        this.clickOnContactPhone = this.clickOnContactPhone.bind(this);
        this.openCatalog = this.openCatalog.bind(this);
    }

    componentDidMount() {
        let catalogElem = document.querySelector(".menu-item--catalog");

        if (window.innerWidth < 999) {
            document.head.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        }

        if (this.props.screen === "catalog" && catalogElem) {
            catalogElem.click();
        }
    }

    componentWillUnmount() {
        document.head.style.overflow = "initial";
        document.body.style.overflow = "initial";
    }

    /**
     * @method _hasBonus
     * @return {boolean}
     * @private
     */
    _hasBonus() {
        return this._getProfile().getBonus().hasBonus();
    }

    /**
     * @method _isAuthorized
     * @return {boolean}
     * @private
     */
    _isAuthorized() {
        return Boolean(this.props.profile.getId());
    }

    /**
     * @method _getName
     * @return {string}
     * @private
     */
    _getName() {
        let result = this._getProfile().getPhone();

        if (this._getProfile().getName()) {
            result = `${this._getProfile().getName()} ${this._getProfile().getLastName()}`;
        }

        return result;
    }

    /**
     * @method _getProfile
     * @return {Profile}
     * @private
     */
    _getProfile() {
        return this.props.profile;
    }

    /**
     * @method _getTotalBonusCount
     * @return {number}
     * @private
     */
    _getTotalBonusCount() {
        return this._getProfile().getBonus().getTotalAvailableCount();
    }

    /**
     * @method _getTotalBonusCountAsText
     * @return {string}
     * @private
     */
    _getTotalBonusCountAsText() {
        return this.strings.writeLine(
            this.stringsResource.amountOfBonusMoney, [this._getTotalBonusCount()]
        );
    }

    createScreen(items, title, parentCategoryUrl) {
        return {
            renderFunction: (config) => (<CatalogMenu config={config} />),
            items,
            title,
            parentCategoryUrl
        };
    }

    prepareSubMenuForRenderAsScreen(menu) {
        return menu.map((menuItem) => {
            if (menuItem.childrens && menuItem.childrens.length) {
                menuItem.childrens = this.prepareSubMenuForRenderAsScreen(menuItem.childrens);
            }

            if (menuItem.subItems && menuItem.subItems.length) {
                menuItem.subItems = this.prepareSubMenuForRenderAsScreen(menuItem.subItems);
            }

            return {
                ...menuItem,
                ...this.createScreen(menuItem.subItems || menuItem.childrens, menuItem.name, menuItem.url)
            };
        });
    }

    /**
     * @private
     * @method _toLogin
     * @returns {Mobile}
     */
    _toLogin() {
        this.analytics.toLogin();
        this.props.close();
        this.props.toLogin();

        return this;
    }

    /**
     * @private
     * @method clickOnContactPhone
     * @returns {Mobile}
     */
    clickOnContactPhone() {
        this.analytics.clickOnContactPhone();

        return this;
    }

    /**
     * @private
     * @method openCatalog
     * @returns {Mobile}
     */
    openCatalog(config) {
        config.renderNextScreen({
            renderFunction: (opts) => (<CatalogMenu config={opts} />),
            title: this.stringsResource.productCatalog,
            items: this.prepareSubMenuForRenderAsScreen(this.props.catalog)
        });

        this.analytics.openCatalog();

        return this;
    }

    /**
     * @private
     * @method _openAccountNavigation
     * @returns {Mobile}
     */
    _openAccountNavigation(config) {
        config.renderNextScreen({
            renderFunction: (opts) => (
                <AccountNavigation
                    title={opts.title}
                    items={opts.items}
                    toBack={opts.stepBack}
                    toNext={opts.renderNextScreen}
                    toLogout={this.props.toLogout}
                />
            ),
            title: this.stringsResource.back,
            items: this.props.accountNavigation
        });

        return this;
    }

    /**
     * @method _renderItems
     * @param items {Array}
     * @return {Array}
     * @private
     */
    _renderItems(items) {
        return items.map((item, index) => (
            <Item key={index} item={item} />
        ));
    }

    /**
     * @method _renderNavigation
     * @return {Array}
     * @private
     */
    _renderNavigation() {
        return this.props.navigation.map((items, index) => (
            <div key={index} className="menu-group">
                {this._renderItems(items)}
            </div>
        ));
    }

    /**
     * @method _renderMainScreen
     * @return {Object}
     * @private
     */
    _renderMainScreen() {
        return {
            renderFunction: (config) => (
                <>
                    <div className="menu-item menu-item--catalog" onClickCapture={() => this.openCatalog(config)}>
                        <span className="menu-item__body d-flex align-items-center justify-content-between w-100">
                            <span className="d-flex align-items-center f-weight-5">
                                <i className="icon icon-widget" /> {this.stringsResource.productCatalog}
                            </span>

                            { !this.state.isMenuLoads && <i className="icon icon-chevron-right" /> }
                            { this.state.isMenuLoads && <Loader /> }
                        </span>
                    </div>

                    <div className="menu-item menu-item--account">
                        <div className={ClassNames("menu-item__body", {"w-100": this._isAuthorized()})}>
                            {!this._isAuthorized() && (
                                <Account
                                    profile={this.props.profile}
                                    toLogin={this._toLogin}
                                    toLogout={this.props.toLogout}
                                />
                            )}

                            {this._isAuthorized() && (
                                <div
                                    className="menu-item__profile d-flex align-items-center justify-content-between"
                                    onClickCapture={() => this._openAccountNavigation(config)}
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="profile__avatar d-flex align-items-center justify-content-center rounded-100">
                                            <Avatar
                                                profile={this._getProfile()}
                                                size={30}
                                            />
                                        </div>

                                        <div>
                                            <p className="profile__name">
                                                {this._getName()}
                                            </p>

                                            {this._hasBonus() && (
                                                <p className="profile__bonus">
                                                    {this._getTotalBonusCountAsText()}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <span className="icon icon-chevron-right" />
                                </div>
                            )}
                        </div>
                    </div>

                    {this._renderNavigation()}

                    <div className="menu-item d-flex justify-content-between call-center-phone">
                        <a
                            href="tel:0800302244"
                            className="menu-item__body d-flex align-items-center flex-grow-1 justify-content-between"
                            onClick={this.clickOnContactPhone}
                        >
                            <span className="d-flex align-items-center">
                                <i className="icon icon-earphone" />0800 30 22 44
                            </span>

                            <span className="work-time">с 8:00 до 21:00</span>
                        </a>
                    </div>
                </>
            ),
            items: []
        };
    }

    render() {
        return (
            <div className={ClassNames("mobile-menu d-flex flex-column", this.props.className)}>
                <div className="mobile-menu__header d-flex align-items-center justify-content-between">
                    <a href="/">
                        <img
                            data-src={this.Resource.links.whiteLogo}
                            className="lazyload"
                            width="207"
                            height="34"
                            alt="apteka24.ua"
                        />
                    </a>

                    <div className="d-flex align-items-center">
                        <Language />

                        <span className="icon icon-close text-white" onClick={() => this.props.close()} />
                    </div>
                </div>

                <div className="mobile-menu__body">
                    <Screen menu={this._renderMainScreen()} />
                </div>
            </div>
        );
    }
}

Mobile.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    catalog: PropTypes.instanceOf(Array),
    navigation: PropTypes.instanceOf(Array),
    accountNavigation: PropTypes.instanceOf(Array),
    toLogin: PropTypes.func,
    toLogout: PropTypes.func,
    close: PropTypes.func
};

Mobile.defaultProps = {
    catalog: [],
    navigation: [],
    accountNavigation: [],
    toLogin: () => {},
    toLogout: () => {},
    close: () => {}
};

export default Mobile;
