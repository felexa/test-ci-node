/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import Env from "app/core/environment";

import Resource from "app/core/resource";

import AccountSectionEnum from "app/core/utilites/enum/account/section";

import MenuService from "app/core/services/menu";
import BasketService from "app/core/services/basket";

import Language from "components/language/Language";
import Account from "components/account/Account";
import Search from "components/search/type/autocomplete/Search";
import Loader from "components/loader/Loader";

import Analytics from "./Analytics";

class Header extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property env
         * @type {Env}
         */
        this.env = Env.getInstance();

        /**
         * @property basketService
         * @type {Basket}
         */
        this.basketService = BasketService.getInstance();

        /**
         * @property menuService
         * @type {Menu}
         */
        this.menuService = MenuService.getInstance();

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

        /**
         * @property analytics
         * @type {Object}
         */
        this.analytics = new Analytics();

        /**
         * @property redirect
         * @type {Object}
         */
        this.redirect = {
            toBasket: `${this.env.getBasketServiceHost()}/personal/cart`
        };

        this.state = {
            productCount: 0,
            isMenuLoads: false,
            isMenuOpen: false
        };

        this._toggleMenu = this._toggleMenu.bind(this);
        this._toggleMenuState = this._toggleMenuState.bind(this);
        this._getProfile = this._getProfile.bind(this);
        this._setProductCount = this._setProductCount.bind(this);
        this._updateBasket = this._updateBasket.bind(this);
        this._trackOpenedBasket = this._trackOpenedBasket.bind(this);
        this._toBasket = this._toBasket.bind(this);
        this._toWishList = this._toWishList.bind(this);
        this._showDesktopMenu = this._showDesktopMenu.bind(this);
        this._clickOnContactPhone = this._clickOnContactPhone.bind(this);
        this._redirectToDownloadRecipe = this._redirectToDownloadRecipe.bind(this);
        this._focusToSearch = this._focusToSearch.bind(this);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this._getProductCount();

        this.basketService
            .on("update", this._updateBasket)
            .on("open", this._trackOpenedBasket);

        this.menuService.on("toggle", this._toggleMenuState);
    }

    /**
     * @protected
     * @method componentWillUnmount
     * @returns {void}
     */
    componentWillUnmount() {
        this
            .basketService
            .off("update", this._updateBasket)
            .off("open", this._trackOpenedBasket);

        this.menuService.off("toggle", this._toggleMenuState);
    }

    /**
     * @private
     * @method _hasProducts
     * @returns {boolean}
     */
    _hasProducts() {
        return Boolean(this.state.productCount);
    }

    /**
     * @private
     * @method _hasProductsInWishList
     * @returns {boolean}
     */
    _hasProductsInWishList() {
        return Boolean(this.props.productCountInWishList);
    }

    /**
     * @private
     * @method _toggleMenu
     * @param event {Object}
     * @param [state] {boolean}
     * @returns {Header}
     */
    _toggleMenu(event, state) {
        this.menuService.toggle(state, "click");

        if (_.isUndefined(state)) {
            event.stopPropagation();
        }

        return this;
    }

    /**
     * @method _toggleMenuState
     * @param state {boolean}
     * @returns {Header}
     * @private
     */
    _toggleMenuState(state) {
        this.setState({ isMenuOpen: state });

        return this;
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
     * @private
     * @method _getProductCount
     * @returns {Header}
     */
    _getProductCount() {
        this.basketService.getBasket(
            (basket) => this._setProductCount(basket.getQuantity()),
            () => this._setProductCount(0)
        );

        return this;
    }

    /**
     * @private
     * @method _setProductCount
     * @param productCount {number}
     * @returns {Header}
     */
    _setProductCount(productCount) {
        this.setState(function () {
            return {productCount};
        });

        return this;
    }

    /**
     * @private
     * @method _getDownloadRecipeUrl
     * @returns {string}
     */
    _getDownloadRecipeUrl() {
        return `${this.env.getBitrixHost()}/recipe/`;
    }

    /**
     * @method _getUrlForWishList
     * @return {string}
     * @private
     */
    _getUrlForWishList() {
        return this.resource.getAccount().getNavigationByKey(this.accountSectionEnum.getWishListAsValue()).getUrl();
    }

    /**
     * @private
     * @method _showDesktopMenu
     * @param event {Object}
     */
    _showDesktopMenu(event) {
        if (!this.state.isMenuOpen) {
            this.analytics.openCatalog();
        }

        this._toggleMenu(event);

        return this;
    }

    /**
     * @method _updateBasket
     * @param basketEntity {Basket}
     * @returns {Header}
     * @private
     */
    _updateBasket(basketEntity) {
        this._setProductCount(basketEntity.getQuantity());

        return this;
    }

    /**
     * @method _trackOpenedBasket
     * @returns {Header}
     * @private
     */
    _trackOpenedBasket() {
        this.analytics.openBasket();

        return this;
    }

    /**
     * @private
     * @method _toBasket
     * @returns {Header}
     */
    _toBasket() {
        if (this._hasProducts()) {
            this.basketService.open();
        }

        return this;
    }

    /**
     * @method _toWishList
     * @return {Header}
     * @private
     */
    _toWishList() {
        if (this.props.profile.getId()) {
            window.location.href = this._getUrlForWishList();
        } else {
            this.props.toLogin();
        }

        return this;
    }

    /**
     * @private
     * @method _clickOnContactPhone
     * @returns {Header}
     */
    _clickOnContactPhone() {
        this.analytics.clickOnContactPhone();

        return this;
    }

    /**
     * @private
     * @method _redirectToDownloadRecipe
     * @returns {Header}
     */
    _redirectToDownloadRecipe() {
        this.analytics.redirectToDownloadRecipe();

        return this;
    }

    /**
     * @private
     * @method _focusToSearch
     * @returns {Header}
     */
    _focusToSearch() {
        this.analytics.focusToSearch();

        return this;
    }

    /**
     * @method _renderAccount
     * @return {React.Element}
     * @private
     */
    _renderAccount() {
        return (
            <Account
                profile={this._getProfile()}
                toLogin={this.props.toLogin}
                toLogout={this.props.toLogout}
            />
        );
    }

    /**
     * @private
     * @method _renderToggleCartButton
     * @returns {string}
     */
    _renderToggleCartButton() {
        return (
            <button
                className="toggle-product-cart hover-color-white d-inline-flex"
                type="button"
                onClick={this._toBasket}
            >
                <i className="icon icon-cart align-self-end" />

                {this._hasProducts() && (
                    <span className="badge align-self-start">{ this.state.productCount }</span>
                )}
            </button>
        );
    }

    /**
     * @private
     * @method _renderWishListButton
     * @returns {string}
     */
    _renderWishListButton() {
        return (
            <button
                className="to-wishlist d-inline-flex"
                type="button"
                onClick={this._toWishList}
            >
                <i className="icon icon-heart align-self-end" />

                {this._hasProductsInWishList() && (
                    <span className="badge align-self-start">{ this.props.productCountInWishList }</span>
                )}
            </button>
        );
    }

    render() {
        return (
            <header className="header" onClick={(e) => this._toggleMenu(e, false)}>
                <div className="bg-primary d-none d-xl-block">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="company-phone d-inline-flex align-items-center">
                                            <i className="icon icon-earphone" />
                                            <div className="d-flex flex-column justify-content-center">
                                                <a href="tel:0800302244" className="header-white-color hover-color-white" onClick={this._clickOnContactPhone}>
                                                    0800 30 22 44
                                                </a>
                                                <p>8:00 - 21:00. {this.stringsResource.free}</p>
                                            </div>
                                        </div>

                                        <ul className="common-navigation d-inline-flex ">
                                            <li>
                                                <a
                                                    className="header-white-color hover-color-white text-decoration-none"
                                                    href={this.Resource.links.howWeWork}
                                                >
                                                    {this.stringsResource.howWeWork}
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    className="header-white-color hover-color-white text-decoration-none"
                                                    href={`${this.env.getBitrixHost()}/about/warranty/`}
                                                >
                                                    {this.stringsResource.qualityAssurance}
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    className="header-white-color hover-color-white text-decoration-none"
                                                    href={`${this.env.getBitrixHost()}/about/delivery/`}
                                                >
                                                    {this.stringsResource.deliveryAndPayment}
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    className="header-white-color hover-color-white text-decoration-none"
                                                    href={`${this.env.getBitrixHost()}/order-return/`}
                                                >
                                                    {this.stringsResource.returnConditions}
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    className="header-white-color hover-color-white text-decoration-none"
                                                    href={`${this.env.getBitrixHost()}/morkovki/`}
                                                >
                                                    {this.stringsResource.morkovki}

                                                    {/*<span className="white-shield rounded-10">Beta</span>*/}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="d-flex flex-column flex-md-row align-items-center">
                                        <Language />

                                        {this._getProfile() && (
                                            this._renderAccount()
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="container-fluid">
                        <div className="row d-xl-none mb-xl-10 mobile-header">
                            <div className="col d-flex justify-content-between align-items-center">
                                <div className="header__item catalog-navigation position-relative">
                                    <button
                                        onClick={(e) => this._toggleMenu(e)}
                                        className="toggle-catalog-list bg-white position-relative d-flex align-items-center"
                                        type="button"
                                    >
                                        <i className="icon icon-menu-hamburger" />
                                    </button>
                                </div>

                                {/*<div className="header__item d-flex align-items-center">
                                    <a href={this.env.getBitrixHost()} className="d-flex align-items-center">
                                        <img data-src={this.Resource.links.whiteLogo} className="lazyload" height="20" alt="apteka24.ua" />
                                    </a>
                                </div>*/}

                                <div className="header__item catalog-search flex-grow-1 d-flex header__item--search-z-index">
                                    <Search focus={this._focusToSearch} />
                                </div>

                                <div className="header__item">
                                    { this._renderToggleCartButton() }
                                </div>
                            </div>
                        </div>

                        <div className="row d-none d-xl-flex">
                            <div className="col d-flex align-items-center">
                                <div className="header__body d-flex flex-grow-1 align-items-center">
                                    <a href={this.Resource.links.homePage} title="Аптека 24" className="header__item company-logo d-none d-xl-flex">
                                        <img
                                            src={this.Resource.links.logo}
                                            alt="APTEKA24"
                                            width="207"
                                            height="34"
                                        />
                                    </a>

                                    <div className="header__item catalog-navigation position-relative d-none d-xl-block">
                                        <button
                                            onClick={this._showDesktopMenu}
                                            disabled={this.state.isMenuLoads}
                                            className="toggle-catalog-list bg-white position-relative d-flex align-items-center"
                                            type="button"
                                        >
                                            {
                                                !this.state.isMenuLoads && !this.state.isMenuOpen && (
                                                    <i className="icon icon-widget d-none d-xl-block" />
                                                )
                                            }

                                            {
                                                this.state.isMenuOpen && (<i className="icon icon-close d-none d-xl-block" />)
                                            }

                                            {
                                                this.state.isMenuLoads && (<Loader />)
                                            }

                                            <span className="d-none d-xl-inline-block toggle-catalog-list--title">
                                                {this.stringsResource.productCatalog}
                                            </span>
                                        </button>
                                    </div>

                                    <div className="header__item catalog-search flex-grow-1 d-flex header__item--search-z-index">
                                        <Search focus={this._focusToSearch} />
                                    </div>

                                    {/*<div className="header__item d-none d-xl-block position-relative">*/}
                                    {/*    <div className="toggle-banner-upload text-left d-flex align-items-center">*/}
                                    {/*        <span className="toggle-banner-upload-icon d-flex align-items-center position-relative">*/}
                                    {/*            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*                <rect width="36" height="36" rx="18" fill="#F64C6B" />*/}
                                    {/*                <path d="M18.9001 13.0001C18.9001 12.503 18.4972 12.1001 18.0001 12.1001C17.503 12.1001 17.1001 12.503 17.1001 13.0001V17.1001H13.0001C12.503 17.1001 12.1001 17.5031 12.1001 18.0001C12.1001 18.4972 12.503 18.9001 13.0001 18.9001H17.1001V23.0001C17.1001 23.4972 17.503 23.9001 18.0001 23.9001C18.4972 23.9001 18.9001 23.4972 18.9001 23.0001V18.9001H23.0001C23.4972 18.9001 23.9001 18.4972 23.9001 18.0001C23.9001 17.5031 23.4972 17.1001 23.0001 17.1001H18.9001V13.0001Z" fill="white" />*/}
                                    {/*            </svg>*/}
                                    {/*        </span>*/}

                                    {/*        <span>Собрать заказ<br />по фото рецепта</span>*/}
                                    {/*    </div>*/}

                                    {/*    <div className="upload-banner text-center position-absolute">*/}
                                    {/*        <div className="upload-banner__body position-relative box-shadow-9 rounded-3 bg-white">*/}
                                    {/*            <div className="mb-24">*/}
                                    {/*                <img*/}
                                    {/*                    height="114"*/}
                                    {/*                    data-src="https://www.apteka24.ua/bitrix/templates/apteka24/images/receptsteps.png"*/}
                                    {/*                    className="mw-100 lazyload"*/}
                                    {/*                    alt="Загрузить рецепт"*/}
                                    {/*                />*/}
                                    {/*            </div>*/}

                                    {/*            <a*/}
                                    {/*                href={this._getDownloadRecipeUrl()}*/}
                                    {/*                onClick={this._redirectToDownloadRecipe}*/}
                                    {/*                className="btn-default btn-md text-uppercase"*/}
                                    {/*                type="button"*/}
                                    {/*            >*/}
                                    {/*                Загрузить рецепт*/}
                                    {/*            </a>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    <div className="header__item d-none d-xl-block">
                                        { this._renderWishListButton() }
                                    </div>

                                    <div className="header__item d-none d-xl-block">
                                        { this._renderToggleCartButton() }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </header>
        );
    }
}

Header.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    productCountInWishList: PropTypes.number,
    toLogin: PropTypes.func,
    toLogout: PropTypes.func
};

Header.defaultProps = {
    productCountInWishList: 0,
    toLogin: () => {},
    toLogout: () => {}
};

export default Header;
