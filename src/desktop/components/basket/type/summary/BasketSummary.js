/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Strings from "app/core/utilites/strings";
import Translator from "app/core/utilites/strings/translator";

import Box from "app/core/components/Box";
import BasketService from "app/core/services/basket";
import Price from "desktop/components/price/Price";

class BasketSummary extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property maxNameLength
         * @type {number}
         */
        this.maxNameLength = 20;

        /**
         * @property Translator
         * @type {Object}
         */
        this.Translator = Translator;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = this.Translator.getInstance();

        /**
         * @property
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        /**
         * @property basketService
         * @type {WishList}
         */
        this.basketService = BasketService.getInstance();

        this.state = {
            basket: this.basketService.getEmptyBasket(),
            isLoading: false,
            isVisible: false
        };

        this._setBasket = this._setBasket.bind(this);
        this._toCheckout = this._toCheckout.bind(this);
        this._toBasket = this._toBasket.bind(this);
        this._toggleVisible = this._toggleVisible.bind(this);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this
            .basketService
            .getBasket(this._setBasket)
            .on("update", this._setBasket);
    }

    /**
     * @private
     * @method _toggleVisible
     * @param [state] {boolean}
     * @returns {BasketSummary}
     */
    _toggleVisible(state) {
        this.setState(function () {
            return {
                isVisible: Boolean(state)
            };
        });

        return this;
    }

    /**
     * @private
     * @method _toggleLoading
     * @param state {boolean}
     * @returns {BasketSummary}
     */
    _toggleLoading(state) {
        this.setState({
            isLoading: state
        });

        return this;
    }

    /**
     * @private
     * @method _getTitleOfPluralProducts
     * @returns {string}
     */
    _getTitleOfPluralProducts() {
        return this.translator.plural(this.state.basket.getQuantity(), Translator.stringKeys.products);
    }

    /**
     * @private
     * @method _getTotalPrice
     * @returns {number}
     */
    _getTotalPrice() {
        return this.state.basket.getPrice().getCurrent();
    }

    /**
     * @method _getPositionName
     * @param position {Product}
     * @returns {string}
     */
    _getPositionName(position) {
        return this.strings.clip(position.getName(), this.maxNameLength);
    }

    /**
     * @private
     * @method _getItemsCount
     * @returns {number}
     */
    _getItemsCount() {
        return this.state.basket.getQuantity();
    }

    /**
     * @private
     * @method _getClasses
     * @returns {Object}
     */
    _getClasses() {
        return classnames({
            "d-none": !this.state.isVisible,
            "new-super-box-shadow bg-white overflow-hidden": true
        }, this.props.className);
    }

    /**
     * @private
     * @method _setBasket
     * @param basket {Object}
     * @returns {BasketSummary}
     */
    _setBasket(basket) {
        this.setState(() => ({basket}), () => {
            this._toggleVisible(Boolean(basket.getQuantity()));
        });

        return this;
    }

    /**
     * @private
     * @method _isDisplayedPositionTitle
     * @returns {boolean}
     */
    _isDisplayedPositionTitle() {
        return this.state.basket.getItems().length === 1;
    }

    /**
     * @private
     * @method _isBlurredItems
     * @returns Boolean
     */
    _isBlurredItems() {
        return this.state.basket.getItems().length > 4;
    }

    /**
     * @private
     * @method _toCheckout
     * @returns {BasketSummary}
     */
    _toCheckout() {
        this
            ._toggleLoading(true)
            .basketService.toCheckout();

        return this;
    }

    /**
     * @private
     * @method _toBasket
     * @returns {BasketSummary}
     */
    _toBasket() {
        this.basketService.open();

        return this;
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.state.basket.getItems().map((item) => (
            <div
                className="basket-summary__item d-flex align-items-center justify-content-center"
                key={item.getId()}
            >
                <div className="item__preview">
                    <a
                        href={item.getPosition().getUrl()}
                        target="_blank"
                        className="d-flex justify-content-center align-items-center h-100"
                    >
                        <img
                            src={item.getPosition().getPreview().getSmall()}
                            alt={item.getPosition().getName()}
                        />
                    </a>
                </div>

                {this._isDisplayedPositionTitle() && (
                    <div className="item__title">
                        <a
                            href={item.getPosition().getUrl()}
                            target="_blank"
                            className="whitespace-nowrap text-decoration-none"
                        >
                            { this._getPositionName(item.getPosition()) }
                        </a>
                    </div>
                )}
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <Box
                className={this._getClasses()}
                rounded={16}
            >
                <div
                    className={classnames({loading: this.state.isLoading},
                        "basket-summary d-flex justify-content-between align-items-center position-relative")}
                >
                    <div className="basket-summary__header">
                        <p className="basket-summary__title text-black mt-0 mb-10 mr-12 whitespace-nowrap">
                            {this.stringsResource.inBasket} <span>{ this._getItemsCount() }</span> { this._getTitleOfPluralProducts() }
                        </p>

                        <div className="basket-summary__count text-gray mb-0 mt-0">
                            {this.stringsResource.forAmount}&nbsp;
                            <Price
                                className="text-black"
                                value={this._getTotalPrice()}
                                currency="₴"
                            />
                        </div>

                        <i
                            className="icon icon-close basket-summary__close"
                            onClick={() => this._toggleVisible()}
                        />
                    </div>

                    <div className="basket-summary__body">
                        <div
                            className={classnames({"basket-summary__items--with-blur": this._isBlurredItems()},
                                "basket-summary__items d-none d-md-flex flex-wrap overflow-hidden")}
                        >
                            { this._renderItems() }
                        </div>
                    </div>

                    <div className="basket-summary__footer d-flex flex-nowrap align-items-center">
                        <button
                            type="button"
                            className="basket-summary__to-basket btn-link btn-sm"
                            onClick={() => this._toBasket()}
                        >
                            {this.stringsResource.toBasket}
                        </button>

                        <button
                            type="button"
                            className="basket-summary__to-checkout btn-default text-uppercase btn-sm"
                            onClick={() => this._toCheckout()}
                        >
                            {this.stringsResource.checkout}
                        </button>
                    </div>
                </div>
            </Box>
        );
    }
}

BasketSummary.propTypes = {
    className: PropTypes.string
};

BasketSummary.defaultProps = {
    className: ""
};

export default BasketSummary;
