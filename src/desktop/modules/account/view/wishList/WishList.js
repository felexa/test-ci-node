/* eslint-disable max-len */

import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Translator from "app/core/utilites/strings/translator";

import Checkbox from "app/core/components/Checkbox";

import ProductCard from "components/product/card/retail/size/xs/Product";
import Price from "components/price/Price";

class WishList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItems: {},
            isSelectedAll: false
        };

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property Translator
         * @type {Object}
         */
        this.Translator = Translator;

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = Translator.getInstance();

        this._selectItem = this._selectItem.bind(this);
        this._toggleSelectAll = this._toggleSelectAll.bind(this);
        this._addToBasket = this._addToBasket.bind(this);
        this._deleteItems = this._deleteItems.bind(this);
    }

    /**
     * @method _isSelectedAll
     * @return {boolean}
     * @private
     */
    _isSelectedAll() {
        return this.state.isSelectedAll;
    }

    /**
     * @method _isVisibleSelectionAllButton
     * @param wishList {WishList}
     * @returns {boolean}
     * @private
     */
    _isVisibleSelectionAllButton(wishList) {
        return wishList.getProductList().length > 1;
    }

    /**
     * @private
     * @method _isEmptyWishList
     * @param wishList {WishList}
     * @returns {boolean}
     */
    _isEmptyWishList(wishList) {
        return !wishList.getProductList().length;
    }

    /**
     * @method _isDisabledDeleteButton
     * @returns {boolean}
     * @private
     */
    _isDisabledDeleteButton() {
        return !this._getSelectedItemsId().length;
    }

    /**
     * @method _toggleSelectAll
     * @param wishList {WishList}
     * @private
     */
    _toggleSelectAll(wishList) {
        let selectedItems = {};

        wishList.getProductList().forEach((item) => {
            selectedItems[item.getId()] = !this.state.isSelectedAll;
        });

        this.setState((state) => ({
            selectedItems,
            isSelectedAll: !state.isSelectedAll
        }));
    }

    /**
     * @method _getButtonNameForSelectedAll
     * @return {string}
     * @private
     */
    _getButtonNameForSelectedAll() {
        return this._isSelectedAll() ? this.stringsResource.removeSelection : this.stringsResource.selectedAll;
    }

    /**
     * @method _getSelectedItemsId
     * @return {Array}
     * @private
     */
    _getSelectedItemsId() {
        let result = [];

        Object.keys(this.state.selectedItems).forEach((key) => {
            if (this.state.selectedItems[key]) {
                result.push(key);
            }
        });

        return result;
    }

    /**
     * @method _selectItem
     * @param id {string|number}
     * @return {WishList}
     * @private
     */
    _selectItem(id) {
        this.setState((state) => ({
            selectedItems: {
                ...state.selectedItems,
                [id]: !state.selectedItems[id]
            }
        }));

        return this;
    }

    /**
     * @method _addToBasket
     * @param item {Product}
     * @param success {Function}
     * @param error {Function}
     * @return {WishList}
     * @private
     */
    _addToBasket(item, success, error) {
        this.props.addToBasket(item, success, error);

        return this;
    }

    /**
     * @method _deleteItems
     * @param wishList {WishList}
     * @return {WishList}
     * @private
     */
    _deleteItems(wishList) {
        if (this._getSelectedItemsId().length) {
            this.props.deleteItems(wishList.getId(), this._getSelectedItemsId(), () => {
                this._getSelectedItemsId().forEach(this._selectItem);
            });
        }

        return this;
    }

    /**
     * @method _renderEmptyWishList
     * @method _renderEmptyReviewsPage
     * @returns {string}
     * @private
     */
    _renderEmptyWishList() {
        return (
            <div className="wish-list__empty-list d-flex flex-column align-items-center mt-40 text-center">
                <img
                    className="mb-24 mb-lg-32"
                    src={this.Resource.links.images.emptyWishList}
                    alt=""
                />

                <p className="empty-list__title f-weight-5 text-black m-0">
                    {this.stringsResource.wishList.emptyList}
                </p>

                <p className="empty-list__subtitle mt-12 mb-24">
                    {this.stringsResource.wishList.addProducts}
                </p>

                <a href={this.Resource.links.homePage} className="empty-list__to-home-page btn-default btn-md text-uppercase">
                    {this.stringsResource.toHomePage}
                </a>
            </div>
        );
    }

    /**
     * @private
     * @method _renderItems
     * @param wishList {WishList}
     * @returns {Array}
     */
    _renderItems(wishList) {
        return (
            <div className="d-flex flex-wrap wish-list-items">
                {wishList.getProductList().map((item) => (
                    //flex-column align-items-end flex-shrink-0
                    <div key={item.getId()} className="wish-list-item d-flex position-relative">
                        <Checkbox
                            onChange={() => this._selectItem(item.getId())}
                            checked={this.state.selectedItems[item.getId()]}
                        />

                        <ProductCard item={item} className="base-border w-100" addToBasket={this._addToBasket} />
                    </div>
                ))}
            </div>
        );
    }

    render() {
        return this.props.items.map((wishList) => (
            <section key={wishList.getId()} className="account__wish-list">
                <header className="wish-list__header mb-24">
                    <span className="account-section__title f-weight-5 color-black">
                        {this.stringsResource.wishList.title}
                    </span>

                    {!this._isEmptyWishList(wishList) && (
                        <div className="d-flex align-items-center justify-content-end">
                            {this._isVisibleSelectionAllButton(wishList) && (
                                <button
                                    type="button"
                                    className="wish-list__select-all-items btn-link d-flex align-items-center"
                                    data-id="1"
                                    onClick={() => this._toggleSelectAll(wishList)}
                                >
                                    <i className="icon icon-selection" />

                                    {this._getButtonNameForSelectedAll()}
                                </button>
                            )}

                            <button
                                type="button"
                                className="wish-list__delete-item btn-link d-flex align-items-center"
                                disabled={this._isDisabledDeleteButton()}
                                onClick={() => this._deleteItems(wishList)}
                            >
                                <i className="icon icon-trash" />

                                {this.stringsResource.delete}
                            </button>
                        </div>
                    )}
                </header>

                <div className="wish-list__body">
                    {!this._isEmptyWishList(wishList) && this._renderItems(wishList)}

                    {this._isEmptyWishList(wishList) && this._renderEmptyWishList()}
                </div>

                {!this._isEmptyWishList(wishList) && (
                    <footer className="base-border-top d-none align-items-center justify-content-start mt-24 pt-32">
                        <div className="mr-16">
                            <span className="mr-8 color-black">
                                {wishList.getProductList().length} {this.translator.plural(wishList.getProductList().length, this.Translator.stringKeys.products)} {this.stringsResource.forAmount.toLowerCase()}
                            </span>

                            <Price value={wishList.getPrice().getTotalPrice()} />
                        </div>

                        {/*<button type="button" className="btn-default btn-md text-uppercase">КУПИТЬ ВСЕ</button>*/}
                    </footer>
                )}
            </section>
        ));
    }
}

WishList.propTypes = {
    items: PropTypes.instanceOf(Array),
    addToBasket: PropTypes.func,
    deleteItems: PropTypes.func
};

WishList.defaultProps = {
    items: [],
    addToBasket: () => {},
    deleteItems: () => {}
};

export default WishList;
