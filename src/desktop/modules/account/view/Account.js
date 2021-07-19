/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import classNames from "classnames";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import AccountSectionEnum from "app/core/utilites/enum/account/section";

import Review from "./review/Review";
import Order from "./order/Order";
import Bonus from "./bonus/Bonus";
import Profile from "./profile/Profile";
import WishList from "./wishList/WishList";
import Aside from "./aside/Aside";

import styles from "../styles/main.module.scss";

class Account extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property profile
         * @type {Profile}
         */
        this.profile = null;

        /**
         * @property componentsContainer
         * @type {Map}
         */
        this.componentsContainer = new Map();

        /**
         * @property
         * @type {Object}
         */
        this.titles = {};

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            isLoading: true,
            profile: this.props.options.initialData.profile,
            bonus: this.props.options.initialData.bonus,
            threads: this.props.options.initialData.threads,
            orders: this.props.options.initialData.orders,
            wishLists: this.props.options.initialData.wishLists
        };

        /**
         * @property accountSectionEnum
         * @type {Enum}
         */
        this.acountSectionEnum = AccountSectionEnum.getInstance();

        /**
         * @property resource
         * @type {Resource}
         */
        this.resource = Resource.getInstance(Env.getInstance().getLanguage());

        this._getBonus = this._getBonus.bind(this);

        this._buildProfileSection = this._buildProfileSection.bind(this);
        this._buildReviewSection = this._buildReviewSection.bind(this);
        this._buildOrderSection = this._buildOrderSection.bind(this);
        this._buildBonusSection = this._buildBonusSection.bind(this);
        this._buildWishListSection = this._buildWishListSection.bind(this);

        this._deleteItemsFromWishList = this._deleteItemsFromWishList.bind(this);
        this._updateProfile = this._updateProfile.bind(this);
        this._addToBasket = this._addToBasket.bind(this);
        this._toAnswer = this._toAnswer.bind(this);
        this._toLogout = this._toLogout.bind(this);

        // eslint-disable-next-line no-underscore-dangle
        this._buildTitles()._buildComponentsContainer();
    }

    componentDidMount() {
        this._getProfile(() => {
            if (this._isBonusSection()) {
                this._getBonus();
            }

            if (this._isReviewSection()) {
                this._getThreads();
            }

            if (this._isOrderSection()) {
                this._getOrders();
            }

            if (this._isProfileSection()) {
                this._toggleLoader(false);
            }

            if (this._isWishListSection()) {
                this._getWishLists();
            }
        });
    }

    /**
     * @private
     * @method _isProfileSection
     * @returns {boolean}
     */
    _isProfileSection() {
        return this._getCurrentSection() === this.acountSectionEnum.getPersonalDataAsValue();
    }

    /**
     * @private
     * @method _isReviewSection
     * @returns {boolean}
     */
    _isReviewSection() {
        return this._getCurrentSection() === this.acountSectionEnum.getReviewAsValue();
    }

    /**
     * @private
     * @method _isOrderSection
     * @returns {boolean}
     */
    _isOrderSection() {
        return this._getCurrentSection() === this.acountSectionEnum.getOrderAsValue();
    }

    /**
     * @private
     * @method _isBonusSection
     * @returns {boolean}
     */
    _isBonusSection() {
        return this._getCurrentSection() === this.acountSectionEnum.getBonusAsValue();
    }

    /**
     * @private
     * @method _isWishListSection
     * @returns {boolean}
     */
    _isWishListSection() {
        return this._getCurrentSection() === this.acountSectionEnum.getWishListAsValue();
    }

    /**
     * @method _isVisibleHeader
     * @return {boolean}
     * @private
     */
    _isVisibleHeader() {
        return !this._isWishListSection();
    }

    /**
     * @private
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {Account}
     */
    _toggleLoader(state) {
        this.setState((currentState) => _.merge({}, currentState, {isLoading: state}));

        return this;
    }

    /**
     * @method _buildTitles
     * @return {Account}
     */
    _buildTitles() {
        this.titles[this.acountSectionEnum.getPersonalDataAsValue()] = this.stringsResource.personalData;
        this.titles[this.acountSectionEnum.getReviewAsValue()] = this.stringsResource.myReviews;
        this.titles[this.acountSectionEnum.getOrderAsValue()] = this.stringsResource.myOrders;
        this.titles[this.acountSectionEnum.getBonusAsValue()] = this.stringsResource.myBonuses;
        this.titles[this.acountSectionEnum.getWishListAsValue()] = "";

        return this;
    }

    /**
     * @method _buildProfileSection
     * @return {React.element}
     * @private
     */
    _buildProfileSection() {
        return (
            <Profile
                profile={this._getProfileFromState()}
                updateProfile={this._updateProfile}
            />
        );
    }

    /**
     * @method _buildReviewSection
     * @return {React.element}
     * @private
     */
    _buildReviewSection() {
        return (
            <Review
                threads={this._getThreadsFromState()}
                toAnswer={this._toAnswer}
            />
        );
    }

    /**
     * @method _buildOrderSection
     * @return {React.element}
     * @private
     */
    _buildOrderSection() {
        return (<Order items={this._getOrdersFromState()} />);
    }

    /**
     * @method _buildBonusSection
     * @return {React.element}
     * @private
     */
    _buildBonusSection() {
        return (
            <Bonus
                bonus={this._getBonusFromState()}
                refreshBonus={this._getBonus}
            />
        );
    }

    /**
     * @method _buildWishListSection
     * @return {React.element}
     * @private
     */
    _buildWishListSection() {
        return (
            <WishList
                items={this._getWishListsFromState()}
                addToBasket={this._addToBasket}
                deleteItems={this._deleteItemsFromWishList}
            />
        );
    }

    /**
     * @private
     * @method _buildComponentsContainer
     * @returns {Account}
     */
    _buildComponentsContainer() {
        this.componentsContainer
            .set(this.acountSectionEnum.getPersonalDataAsValue(), this._buildProfileSection)
            .set(this.acountSectionEnum.getReviewAsValue(), this._buildReviewSection)
            .set(this.acountSectionEnum.getOrderAsValue(), this._buildOrderSection)
            .set(this.acountSectionEnum.getWishListAsValue(), this._buildWishListSection)
            .set(this.acountSectionEnum.getBonusAsValue(), this._buildBonusSection);

        return this;
    }

    /**
     * @private
     * @method _getPresenter
     * @returns {Presenter}
     */
    _getPresenter() {
        return this.props.options.presenter;
    }

    /**
     * @method _getTitle
     * @return {string}
     * @private
     */
    _getTitle() {
        return this.titles[this._getCurrentSection()];
    }

    /**
     * @private
     * @method _getPageType
     * @returns {string}
     */
    _getCurrentSection() {
        return this.props.options.initialData.currentSection;
    }

    /**
     * @private
     * @method _getProfile
     * @param callback {Function}
     * @returns {Account}
     */
    _getProfile(callback) {
        this._getPresenter().getProfile((profileEntity) => {
            this.profile = profileEntity;

            this.setState({profile: profileEntity});

            callback();
        });

        return this;
    }

    /**
     * @private
     * @method _getProfileFromState
     * @returns {Profile}
     */
    _getProfileFromState() {
        return this.state.profile;
    }

    /**
     * @private
     * @method _getNavigation
     * @returns {Array}
     */
    _getNavigation() {
        return this._setCurrentNavigationItem(this.resource.getAccount().getNavigation(), this._getCurrentSection());
    }

    /**
     * @method _getBonus
     * @return {Account}
     * @private
     */
    _getBonus() {
        this._toggleLoader(true);

        this._getPresenter().getBonus((bonus) => {
            this._toggleLoader(false);
            this.setState({bonus});
        });

        return this;
    }

    /**
     * @private
     * @method _getBonusFromState
     * @returns {Bonus}
     */
    _getBonusFromState() {
        return this.state.bonus;
    }

    /**
     * @private
     * @method _getReviews
     * @returns {Account}
     */
    _getThreads() {
        this._toggleLoader(true);

        this._getPresenter().getThreads(this.profile.getId(), (threads) => {
            this._toggleLoader(false);
            this.setState({threads});
        });

        return this;
    }

    /**
     * @private
     * @method _getThreadsFromState
     * @returns {Array}
     */
    _getThreadsFromState() {
        return this.state.threads;
    }

    /**
     * @private
     * @method _getOrders
     * @return {Account}
     */
    _getOrders() {
        this._toggleLoader(true);

        this._getPresenter().getOrders(this.profile.getId(), (orders) => {
            this._toggleLoader(false);
            this.setState({orders});
        });

        return this;
    }

    /**
     * @private
     * @method _getOrdersFromState
     * @returns {Array}
     */
    _getOrdersFromState() {
        return this.state.orders;
    }

    /**
     * @private
     * @method _getWishLists
     * @returns {Account}
     */
    _getWishLists() {
        this._toggleLoader(true);

        this._getPresenter().getWishLists((wishLists) => {
            this._toggleLoader(false);
            this.setState({wishLists});
        });

        return this;
    }

    /**
     * @private
     * @method _getWishListsFromState
     * @returns {WishList}
     */
    _getWishListsFromState() {
        return this.state.wishLists;
    }

    /**
     * @method _setCurrentNavigationItem
     * @param items {Array}
     * @param id {string}
     * @return {Array}
     * @private
     */
    _setCurrentNavigationItem(items, id) {
        items.forEach((item) => {
            item.setActive(item.getId() === id);
        });

        return items;
    }

    /**
     * @method _deleteItemsFromWishList
     * @param listId {string|number}
     * @param itemsId {Array}
     * @param success {Function}
     * @return {Account}
     * @private
     */
    _deleteItemsFromWishList(listId, itemsId, success) {
        this._toggleLoader(true);

        this._getPresenter().deleteItemsFromWishList(listId, itemsId, () => {
            // eslint-disable-next-line no-underscore-dangle
            this._toggleLoader(false)._getWishLists();

            success();
        });

        return this;
    }

    /**
     * @private
     * @method _updateProfile
     * @param profile {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Account}
     */
    _updateProfile(profile, success, error) {
        this._getPresenter().updateProfile(profile, success, error);

        return this;
    }

    /**
     * @method _addToBasket
     * @param item {Product}
     * @param success {Function}
     * @param error {Function}
     * @return {Account}
     */
    _addToBasket(item, success, error) {
        this._getPresenter().addToBasket(item, success, error);

        return this;
    }

    /**
     * @private
     * @method _toAnswer
     * @param productId {string}
     * @param threadEntity {Object}
     * @returns {Account}
     */
    _toAnswer(productId, threadEntity) {
        this._getPresenter().toAnswer(productId, threadEntity);

        return this;
    }

    /**
     * @method _toLogout
     * @return {Aside}
     * @private
     */
    _toLogout() {
        this._getPresenter().logout();

        return this;
    }

    /**
     * @method _renderAccountSection
     * @return {React.element}
     * @private
     */
    _renderAccountSection() {
        return this.componentsContainer.get(this._getCurrentSection())();
    }

    render() {
        return (
            <section className="account account--full">
                <style jsx>
                    {styles}
                </style>

                <div className="container-fluid">
                    <div className="row row--no-horizontal-sm-margins">
                        <div className="col-lg-3 order-lg-1 order-2">
                            <Aside
                                profile={this._getProfileFromState()}
                                navigation={this._getNavigation()}
                                logout={this._toLogout}
                            />
                        </div>

                        <div className="col-lg-9 order-lg-2 order-1">
                            <div className={classNames("account__body", {loading: this.state.isLoading})}>
                                <section className="account-section bg-white new-super-box-shadow rounded-16">
                                    {this._isVisibleHeader() && (
                                        <header className="mb-24">
                                            <span className="account-section__title f-weight-5 color-black">
                                                {this._getTitle()}
                                            </span>
                                        </header>
                                    )}

                                    <div className="account-section__body">
                                        {this._renderAccountSection()}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Account.propTypes = {
    options: PropTypes.instanceOf(Object)
};

Account.defaultProps = {
    options: {}
};

export default Account;
