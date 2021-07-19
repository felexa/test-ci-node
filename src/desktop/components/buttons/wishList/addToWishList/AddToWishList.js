/* eslint-disable max-len */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Resource from "app/core/resource";
import Env from "app/core/environment";

import Queue from "app/core/utilites/queue/Queue";

import AccountSectionEnum from "app/core/utilites/enum/account/section";
import StatusTypeEnum from "app/core/utilites/enum/product/status/type";
import SellerEnum from "app/core/utilites/enum/seller";

import AuthorizationService from "app/core/services/authorization";
import WishListService from "app/core/services/wishList";

class AddToWishList extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property queue
         * @type {Queue}
         */
        this.queue = new Queue();

        /**
         * @property product
         * @type {Catalog}
         */
        this.product = props.product;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property resource
         * @type {Resource}
         */
        this.resource = Resource.getInstance();

        this.wishListService = WishListService.getInstance();
        this.authorizationService = AuthorizationService.getInstance();

        this.accountSectionEnum = AccountSectionEnum.getInstance();
        this.statusTypeEnum = StatusTypeEnum.getInstance();
        this.sellerEnum = SellerEnum.getInstance();

        this.btnNames = {
            defaultName: "",
            checkedName: ""
        };

        /**
         * @property state
         * @type {Object}
         */
        this.state = {
            inWishList: false,
            isDisabled: false
        };

        this._updateButton = this._updateButton.bind(this);
        this._updateAfterLogin = this._updateAfterLogin.bind(this);
        this.addToWishList = this.addToWishList.bind(this);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this._updateButton();

        this.authorizationService.on("login", this._updateAfterLogin);
        this.wishListService.on("update", this._updateButton);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentWillUnmount() {
        this.wishListService.off("update", this._updateButton);
        this.authorizationService.off("login", this._updateAfterLogin);
    }

    /**
     * @protected
     * @method isAvailableButton
     * @returns {boolean}
     */
    isAvailableButton() {
        return true;
    }

    /**
     * @protected
     * @method isDisabled
     * @returns {boolean}
     */
    isDisabled() {
        return this.state.isDisabled;
    }

    /**
     * @private
     * @method _toggleDisabled
     * @param state {boolean}
     * @returns {BuyBlock}
     */
    _toggleDisabled(state) {
        this.setState({isDisabled: state});

        return this;
    }

    /**
     * @method
     * @param inWishList {boolean}
     * @return {AddToWishList}
     * @private
     */
    _toggleButtonState(inWishList) {
        this.setState(() => ({
            inWishList,
            isDisabled: false
        }));

        return this;
    }

    /**
     * @method getUrlForWishList
     * @return {string}
     * @protected
     */
    getUrlForWishList() {
        return this.resource.getAccount().getNavigationByKey(this.accountSectionEnum.getWishListAsValue()).getUrl();
    }

    /**
     * @protected
     * @method getClasses
     * @returns {Object}
     */
    getClasses() {
        return classNames({
            "add-to-wishlist d-flex align-items-center justify-content-center reset-btn-styles": true,
            "add-to-wishlist--in-wishlist": this.state.inWishList
        }, this.props.className);
    }

    /**
     * @protected
     * @method getBtnName
     * @returns {string}
     */
    getBtnName() {
        return !this.state.inWishList ? this.btnNames.defaultName : this.btnNames.checkedName;
    }

    /**
     * @private
     * @method _updateButton
     * @returns {string}
     */
    _updateButton() {
        this.wishListService.hasItemById(this.product.getId(), (result) => {
            this._toggleButtonState(result);
        }, () => {});

        return this;
    }

    /**
     * @method _updateAfterLogin
     * @returns {AddToWishList}
     * @private
     */
    _updateAfterLogin() {
        this.queue.fire([]);

        this._updateButton();

        return this;
    }

    /**
     * @method
     * @return {AddToWishList}
     * @private
     */
    _addToQueueAddingToWishList() {
        if (!this.queue.getSize()) {
            this.queue.add(this.addToWishList);
        }

        return this;
    }

    /**
     * @protected
     * @method addToWishList
     * @returns {AddToWishList}
     */
    addToWishList() {
        if (this.authorizationService.isAuthorized()) {
            this._toggleDisabled(true);

            this.wishListService.addItem(0, this.product.getId(), () => {
                this._toggleButtonState(true);
            }, () => {
                this._toggleButtonState(false);
            });
        } else {
            this._addToQueueAddingToWishList();

            this.authorizationService.toLogin();
        }

        return this;
    }

    /**
     * @method renderAddingToWishListButton
     * @return {React.element}
     * @protected
     */
    renderAddingToWishListButton() {
        return (
            <button
                className={this.getClasses()}
                type="button"
                disabled={this.isDisabled()}
                onClick={this.addToWishList}
            >
                <span className="icon icon-heart" />

                {this.getBtnName()}
            </button>
        );
    }

    /**
     * @method renderRedirectToAccountButton
     * @return {React.element}
     * @protected
     */
    renderRedirectToAccountButton() {
        return (
            <a
                href={this.getUrlForWishList()}
                className={
                    classNames("add-to-wishlist add-to-wishlist--in-wishlist d-inline-flex align-items-center justify-content-center text-decoration-none", this.props.className)
                }
            >
                <span className="icon icon-heart-check" />

                {this.getBtnName()}
            </a>
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <>
                {this.isAvailableButton() && !this.state.inWishList && this.renderAddingToWishListButton()}

                {this.isAvailableButton() && this.state.inWishList && this.renderRedirectToAccountButton()}
            </>
        );
    }
}

AddToWishList.propTypes = {
    product: PropTypes.instanceOf(Object).isRequired,
    className: PropTypes.string
};

AddToWishList.defaultProps = {
    className: ""
};

export default AddToWishList;
