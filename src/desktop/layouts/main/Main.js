/* eslint-disable react/prop-types */

import React from "react";
import _ from "lodash";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import ComponentClassNameEnum from "app/core/utilites/enum/componentClassName";
import AccountSectionEnum from "app/core/utilites/enum/account/section";

import AuthorizationService from "app/core/services/authorization";
import ModalDialogService from "app/core/services/modalDialog";
import MenuService from "app/core/services/menu";
import WishListService from "app/core/services/wishList";

import Modal from "app/core/components/modal/Modal";

import Authorization from "components/authorization/Authorization";
import Basket from "components/basket/type/modal/Basket";
import PromoBanner from "components/promoBanner/PromoBanner";
import Breadcrumbs from "components/breadcrumbs/Breadcrumbs";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Menu from "components/menu/Menu";
import CookieAgreement from "components/cookieAgreement/CookieAgreement";
import InstallApp from "components/installApp/InstallApp";
import WelcomeBonus from "components/marketingActivities/welcomeBonus/WelcomeBonus";

class Main extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property authorizationService
         * @type {Authorization}
         */
        this.authorizationService = AuthorizationService.getInstance();

        /**
         * @property menuService
         * @type {Menu}
         */
        this.menuService = MenuService.getInstance();

        /**
         * @property modalDialogService
         * @type {ModalDialog}
         */
        this.modalDialogService = ModalDialogService.getInstance();

        /**
         * @property wishListService
         * @type {WishList}
         */
        this.wishListService = WishListService.getInstance();

        /**
         * @property resource
         * @type {Resource}
         */
        this.resource = Resource.getInstance(Env.getInstance().getLanguage());

        /**
         * @property componentClassNameEnumEnum
         * @type {Enum}
         */
        this.componentClassNameEnum = ComponentClassNameEnum.getInstance();

        /**
         * @property accountSectionEnum
         * @type {Enum}
         */
        this.accountSectionEnum = AccountSectionEnum.getInstance();

        this.state = {
            isMenuOpen: false,
            catalog: [],
            screen: "",
            eventName: '',
            productCountInWishList: 0,
            profile: this.authorizationService.convertToEmployeeEntity({})
        };

        this._toggleMenu = this._toggleMenu.bind(this);
        this._toggleMenuEvent = this._toggleMenuEvent.bind(this);
        this._getProductCountInWishList = this._getProductCountInWishList.bind(this);
        this._toLogin = this._toLogin.bind(this);
        this._toLogout = this._toLogout.bind(this);
        this._getProfile = this._getProfile.bind(this);
    }

    componentDidMount() {
        // eslint-disable-next-line no-underscore-dangle
        this._getProfile()._getProductCountInWishList();

        this.menuService.on("toggle", this._toggleMenuEvent);

        this.menuService.getCatalog((catalog) => {
            this.setState({ catalog });
        }, () => {});

        this
            .authorizationService
            .on("login", this._getProfile)
            .on("login", this._getProductCountInWishList)
            .on("toLogin", this._toLogin);

        this.wishListService.on("update", this._getProductCountInWishList);
    }

    componentWillUnmount() {
        this.menuService.off("toggle", this._toggleMenuEvent);

        this
            .authorizationService
            .off("login", this._getProfile)
            .off("login", this._getProductCountInWishList)
            .off("toLogin", this._toLogin);

        this.wishListService.off("update", this._getProductCountInWishList);
    }

    /**
     * @private
     * @method _hasBreadcrumbs
     * @returns {boolean}
     */
    _hasBreadcrumbs() {
        return Boolean(this.props.breadcrumbs.length);
    }

    /**
     * @private
     * @method _hasPromoBanner
     * @returns {boolean}
     */
    _hasPromoBanner() {
        return Boolean(this.props.promoBanner && this.props.promoBanner.length);
    }

    /**
     * @private
     * @method _isAuthorized
     * @returns {boolean}
     */
    _isAuthorized() {
        return this.authorizationService.isAuthorized();
    }

    /**
     * @method _toggleMenuEvent
     * @param state {boolean}
     * @param eventName {string}
     * @param screen {string}
     * @return {Main}
     * @private
     */
    _toggleMenuEvent(state, eventName, screen) {
        this.setState({ isMenuOpen: Boolean(state), eventName, screen });

        return this;
    }

    /**
     * @private
     * @method _toggleMenu
     * @param [state] {boolean}
     * @param eventName {string}
     * @returns {Apteka24}
     */
    _toggleMenu(state, eventName) {
        this.menuService.toggle(state, eventName);

        return this;
    }

    /**
     * @method _getProfile
     * @return {Main}
     * @private
     */
    _getProfile() {
        this.authorizationService.getProfile((profile) => {
            this._setProfile(this.authorizationService.convertToEmployeeEntity(profile));
        }, () => {});

        return this;
    }

    /**
     * @private
     * @method _getProductCountInWishList
     * @returns {Header}
     */
    _getProductCountInWishList() {
        this.wishListService.getLists(
            (lists) => {
                this._setProductCountInWishList(this.wishListService.getAllItems(lists).length);
            },
            () => this._setProductCountInWishList(0)
        );

        return this;
    }

    /**
     * @private
     * @method _setProductCountInWishList
     * @param count {number}
     * @returns {Header}
     */
    _setProductCountInWishList(count) {
        this.setState(function () {
            return {productCountInWishList: count};
        });

        return this;
    }

    /**
     * @method _setProfile
     * @param profile {Employee}
     * @return {Main}
     */
    _setProfile(profile) {
        this.setState((state) => _.merge({}, state, {profile}));

        return this;
    }

    /**
     * @method _buildAccountNavigation
     * @returns {Array}
     * @private
     */
    _buildAccountNavigation() {
        return this.resource.getAccount().getNavigation().map((item) => {
            if (this.accountSectionEnum.isWishList(item.getId())) {
                item.setCount(this.state.productCountInWishList);
            }

            return item;
        });
    }

    /**
     * @private
     * @method _toLogin
     * @param [login] {string}
     * @param [autoActiveOTP] {boolean}
     * @returns {Header}
     */
    _toLogin(login, autoActiveOTP) {
        this.modalDialogService.open({
            size: this.modalDialogService.getSizes().getSm(),
            className: this.componentClassNameEnum.getAuthorizationModalAsValue(),
            body: (
                <Authorization
                    login={login}
                    autoActiveOTP={autoActiveOTP}
                    confirm={() => this.modalDialogService.close()}
                />
            )
        });

        return this;
    }

    /**
     * @method _toLogout
     * @return {Header}
     * @private
     */
    _toLogout() {
        this.authorizationService.logout();

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <>
                <section className="layout layout--main d-flex flex-column" data-page-type={this.props.pageType}>
                    {this._hasPromoBanner() && (
                        <PromoBanner
                            banners={this.props.promoBanner}
                        />
                    )}

                    <Menu
                        isOpen={this.state.isMenuOpen}
                        eventName={this.state.eventName}
                        catalog={this.state.catalog}
                        mobileNavigation={this.resource.getMobileNavigation()}
                        accountNavigation={this._buildAccountNavigation()}
                        profile={this.state.profile}
                        toLogin={() => this._toLogin()}
                        toLogout={this._toLogout}
                        toggleMenu={this._toggleMenu}
                        screen={this.state.screen}
                    />

                    <Header
                        profile={this.state.profile}
                        profileWasSet={this.state.profileWasSet}
                        productCountInWishList={this.state.productCountInWishList}
                        toLogin={() => this._toLogin()}
                        toLogout={this._toLogout}
                    />

                    <div className="layout__body flex-grow-1">
                        {this._hasBreadcrumbs() && (
                            <div className="container-fluid">
                                <div className="row row--no-horizontal-sm-margins">
                                    <div className="col">
                                        <Breadcrumbs items={this.props.breadcrumbs} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {this.props.children}
                    </div>

                    <InstallApp />
                    <Footer />
                </section>

                <CookieAgreement />
                <Modal />
                <Basket />
                <WelcomeBonus profile={this.state.profile} isAuthorized={this._isAuthorized()} />
            </>
        );
    }
}

export default Main;
