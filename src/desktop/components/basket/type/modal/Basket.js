/* eslint-disable max-len */
import React from "react";

import _ from "lodash";
import classNames from "classnames";

import Env from "app/core/environment";
import Dom from "app/core/utilites/dom";
import BasketService from "app/core/services/basket";
import Resource from "app/core/resource";

import Price from "components/price/Price";
import Image from "components/image/Image";
import Carousel from "components/carousel/Carousel";
import ProductCard from "components/product/card/retail/size/xs/Product";
import Alert from "components/alert/Alert";

import Analytics from "./Analytics";

class Basket extends React.Component {
    constructor(props) {
        super(props);

        this.carouselConfig = {
            slidesPerView: "auto",
            slideClass: "product-card",
            loop: false,
            spaceBetween: 10
        };

        this.delivery = {
            free: {
                price: 99
            }
        };

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
         * @property analytics
         * @type {Analytics}
         */
        this.analytics = new Analytics();

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property basketService
         * @type {Basket}
         */
        this.basketService = BasketService.getInstance();

        this.state = {
            basket: this.basketService.getEmptyBasket(),
            isLoading: false,
            isOpen: false
        };

        this._open = this._open.bind(this);
        this._close = this._close.bind(this);

        this._increaseCount = this._increaseCount.bind(this);
        this._decreaseCount = this._decreaseCount.bind(this);
        this._addItem = this._addItem.bind(this);
        this._deleteItem = this._deleteItem.bind(this);

        this._setBasket = this._setBasket.bind(this);
        this._changeCountByEvent = this._changeCountByEvent.bind(this);

        this._toProduct = this._toProduct.bind(this);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this
            .basketService
            .on("update", this._setBasket)
            .on("open", (basket) => {
                this._setBasket(basket);
                this._open();
            })
            .on("addedItem", this._open);
    }

    /**
     * @method _hasRecommendations
     * @returns {boolean}
     * @private
     */
    _hasRecommendations() {
        return Boolean(this.state.basket.getRecommendation().length);
    }

    /**
     * @private
     * @method _isAvailableFreeDelivery
     * @returns {boolean}
     */
    _isAvailableFreeDelivery() {
        return this._getRemainderAmountForFreeDelivery() > 0;
    }

    /**
     * @private
     * @method _isOpen
     * @returns {boolean}
     */
    _isOpen() {
        return this.state.isOpen;
    }

    /**
     * @private
     * @method _isLoading
     * @returns {boolean}
     */
    _isLoading() {
        return this.state.isLoading;
    }

    /**
     * @private
     * @method _isDisabledDecreaseCount
     * @param item {Object}
     * @returns {boolean}
     */
    _isDisabledDecreaseCount(item) {
        return item.getQuantity() <= 1;
    }

    /**
     * @private
     * @method _setBasket
     * @param basket {Object}
     * @returns {Basket}
     */
    _setBasket(basket) {
        this.setState(() => ({basket}));

        this.analytics.sendAdmitAdEvent(basket);

        this
            .analytics
            .getEsputnik()
            .sendStatusCartEvent(
                basket.getItems().map((basketItem) => ({
                    productKey: basketItem.getPosition().getCode(),
                    price: String(basketItem.getPosition().getPrice().getCurrent()),
                    quantity: basketItem.getQuantity()
                }))
            );

        return this;
    }

    /**
     * @private
     * @method _toggleDisplay
     * @param state {boolean}
     * @returns {Basket}
     */
    _toggleDisplay(state) {
        this.setState(() => ({isOpen: state}));

        this.dom.toggleScroll(!state);

        return this;
    }

    /**
     * @private
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {Basket}
     */
    _toggleLoader(state) {
        this.setState(() => ({isLoading: state}));

        return this;
    }

    /**
     * @private
     * @method _open
     * @returns {Basket}
     */
    _open() {
        this._toggleDisplay(true);

        return this;
    }

    /**
     * @private
     * @method _close
     * @returns {Basket}
     */
    _close() {
        this.analytics.closeBasket();

        this._toggleDisplay(false);

        return this;
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
     * @method _getTotalPrice
     * @returns {number}
     */
    _getTotalPrice() {
        return this.state.basket.getPrice().getCurrent();
    }

    /**
     * @private
     * @method _getRemainderAmountForFreeDelivery
     * @returns {number}
     */
    _getRemainderAmountForFreeDelivery() {
        return this._getTotalPrice() && (this.delivery.free.price - this._getTotalPrice());
    }

    /**
     * @private
     * @method _changeCount
     * @param item {Object}
     * @param count {number}
     * @param success {Function}
     * @returns {Basket}
     */
    _changeCount(item, count, success = () => {}) {
        this
            ._toggleLoader(true)
            .basketService
            .changeCount(
                item.getId(),
                count,
                () => {
                    success();
                    this._toggleLoader(false);
                },
                () => {
                    this._toggleLoader(false);
                }
            );

        return this;
    }

    /**
     * @private
     * @method _changeCountByEvent
     * @param e {Object}
     * @param item {Object}
     * @returns {Basket}
     */
    _changeCountByEvent(e, item) {
        let count = Number(e.target.value.trim());

        if (count && count !== item.getQuantity() && _.isFinite(count)) {
            this._changeCount(item, Number(e.target.value));
        }

        return this;
    }

    /**
     * @private
     * @method _addItem
     * @param item {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Basket}
     */
    _addItem(item, success, error) {
        this
            ._toggleLoader(true)
            .basketService
            .addItem(
                item.getCode(),
                (basket) => {
                    if (!basket.items.length) {
                        this._close();
                    }

                    success();
                    this.analytics.addRecommendedProductToBasket();
                    this._toggleLoader(false);
                },
                () => {
                    error();
                    this._toggleLoader(false);
                }
            );

        return this;
    }

    /**
     * @private
     * @method _deleteItem
     * @param item {Object}
     * @returns {Basket}
     */
    _deleteItem(item) {
        this
            ._toggleLoader(true)
            .basketService
            .deleteItem(
                item.getId(),
                (basket) => {
                    this.analytics.deleteItem();

                    if (!basket.items.length) {
                        this._close();
                    }

                    this._toggleLoader(false);
                },
                () => {
                    this._toggleLoader(false);
                }
            );

        return this;
    }

    /**
     * @private
     * @method _decreaseCount
     * @param item {Object}
     * @returns {Basket}
     */
    _decreaseCount(item) {
        this._changeCount(item, item.getQuantity() - 1, () => {
            this.analytics.decreaseCount();
        });

        return this;
    }

    /**
     * @private
     * @method _increaseCount
     * @param item {Object}
     * @returns {Basket}
     */
    _increaseCount(item) {
        this._changeCount(item, item.getQuantity() + 1, () => {
            this.analytics.increaseCount();
        });

        return this;
    }

    /**
     * @private
     * @method _toCheckout
     * @returns {Basket}
     */
    _toCheckout() {
        this._toggleLoader(true);

        this.analytics.redirectToCheckout();

        this.basketService.toCheckout();

        return this;
    }

    /**
     * @private
     * @method _toProduct
     * @returns {Basket}
     */
    _toProduct(event) {
        event.preventDefault();

        this.analytics.redirectToProduct();

        window.location.href = event.currentTarget.href;

        return this;
    }

    /**
     * @method _renderRecommendationItems
     * @returns {Array}
     * @private
     */
    _renderRecommendationItems() {
        return this.state.basket.getRecommendation().map((item) => (
            <ProductCard
                className="flex-shrink-0 box-shadow-1"
                key={item.getId()}
                item={item}
                addToBasket={this._addItem}
                select={() => this.analytics.selectRecommendedProduct()}
                redirectToReview={() => this.analytics.redirectToRecommendedProductReview()}
            />
        ));
    }

    /**
     * @private
     * @method renderItems
     * @returns {Array}
     */
    renderItems() {
        return this.state.basket.getItems().map((item) => (
            <div key={item.getId()} className="item rounded-10" data-productkey={item.getPosition().getCode()}>
                {item.getPosition().getRestrictions().isPrescription() && (
                    <div className="row">
                        <div className="col">
                            <Alert
                                className="item__restriction item__restriction--prescription mb-16"
                                content={this.HTMLResource.warnings.prescription}
                                closeable
                            />
                        </div>
                    </div>
                )}

                {item.getPosition().getRestrictions().isThermolabile() && (
                    <div className="row">
                        <div className="col">
                            <Alert
                                className="item__restriction item__restriction--thermolabile mb-16"
                                content={this.HTMLResource.warnings.thermolabile}
                                closeable
                            />
                        </div>
                    </div>
                )}

                <div className="row">
                    <div className="col-3 col-sm-2">
                        <div className="item__preview">
                            <a
                                href={item.getPosition().getUrl()}
                                onClick={this._toProduct}
                                className="d-flex align-items-start align-items-sm-center justify-content-center"
                            >
                                <Image
                                    src={item.getPosition().getPreview().getSrc()}
                                    alt={item.getPosition().getPreview().getTitle()}
                                />
                            </a>
                        </div>
                    </div>

                    <div className="col-8 col-sm-9">
                        <div className="row w-100 h-100">
                            <div className="col-sm-5 mb-12 mb-sm-0">
                                <div className="d-flex flex-column align-items-start justify-content-center h-100">
                                    <a
                                        href={item.getPosition().getUrl()}
                                        onClick={this._toProduct}
                                        className="item__name text-decoration-none"
                                    >
                                        {item.getPosition().getName()}
                                    </a>

                                    <p className="item__code">
                                        <span className="text-gray">
                                            {this.stringsResource.productCode}:&nbsp;
                                        </span>

                                        <span className="text-black">
                                            {item.getPosition().getCode()}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="col-sm-4 mb-16 mb-sm-0">
                                <div className="d-flex align-items-center justify-content-sm-center h-100">
                                    <div className="item__quantity d-flex align-items-center">
                                        <button
                                            type="button"
                                            className="btn-link icon icon-minus item__decrease d-flex align-items-center justify-content-center"
                                            disabled={this._isDisabledDecreaseCount(item)}
                                            onClick={() => this._decreaseCount(item)}
                                        />

                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => this._changeCountByEvent(e, item)}
                                            value={item.getQuantity()}
                                        />

                                        <button
                                            type="button"
                                            className="btn-link icon icon-plus item__increase d-flex align-items-center justify-content-center"
                                            onClick={() => this._increaseCount(item)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="d-flex align-items-center justify-content-sm-center h-100">
                                    <Price className="d-block" value={item.getPrice().getCurrent()} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-1">
                        <div className="d-flex align-items-start align-items-sm-center justify-content-end h-100">
                            <button
                                type="button"
                                className="btn-link icon icon-remove-circle item__delete"
                                onClick={() => this._deleteItem(item)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return this._isOpen() && (
            <div className="basket modal modal-lg d-flex align-items-center">
                <div className="modal-overlay" onClick={this._close} />

                <div className="modal-dialog">
                    <div className={classNames("modal-content box-shadow-7", {loading: this._isLoading()})}>
                        <div className="basket__header modal__header">
                            <button type="button" className="modal__close" onClick={this._close}>
                                <span className="icon icon-close" />
                            </button>

                            <p className="modal__title clip">
                                {this.stringsResource.basket}
                            </p>
                        </div>

                        <div className="basket__body modal__body custom-scroll w-100">
                            <div className="basket__items">
                                {this.renderItems()}
                            </div>

                            {/*{this._isAvailableFreeDelivery() && (*/}
                            {/*    <div className="alert-info">*/}
                            {/*        Добавьте товаров еще на <Price value={this._getRemainderAmountForFreeDelivery()} /> и получите доставку <strong>БЕСПЛАТНО</strong>*/}
                            {/*    </div>*/}
                            {/*)}*/}

                            <div className="d-flex justify-content-center justify-content-md-between align-items-end flex-wrap flex-md-nowrap">
                                <div className="d-flex order-1 order-md-0 mt-16 mt-md-0">
                                    <button
                                        type="button"
                                        className="btn-link btn-md basket__to-continue text-uppercase text-left d-sm-block"
                                        onClick={this._close}
                                    >
                                        {this.stringsResource.continueShopping}
                                    </button>
                                </div>

                                <div className="d-flex flex-column w-100">
                                    {/* eslint-disable-next-line max-len */}
                                    {/*<div className="basket__discount discount text-black mb-16 ml-auto rounded-10">*/}
                                    {/*    Вы экономите&nbsp;*/}

                                    {/*    <span className="discount__value text-green">*/}
                                    {/*        164*/}
                                    {/*    </span>*/}

                                    {/*    <span className="discount__currency text-green">*/}
                                    {/*        грн*/}
                                    {/*    </span>*/}
                                    {/*</div>*/}

                                    <div className="basket__total text-black d-flex align-items-end justify-content-between mb-16 ml-auto">
                                        <p className="f-weight-5">
                                            {this.stringsResource.total}:
                                        </p>

                                        <Price className="price" value={this._getTotalPrice()} />
                                    </div>

                                    <button
                                        type="button"
                                        className="btn-default btn-md basket__to-checkout text-uppercase d-block ml-auto"
                                        onClick={() => this._toCheckout()}
                                    >
                                        {this.stringsResource.checkout}
                                    </button>
                                </div>
                            </div>

                            {
                                this._hasRecommendations() && (
                                    <div className="basket__recommendation recommendation">
                                        <div className="recommendation__header mb-20">
                                            <strong className="recommendation__title f-weight-4 text-dark">
                                                {this.stringsResource.recommendedForPurchase}
                                            </strong>
                                        </div>

                                        <div className="recommendation__body">
                                            <div className="recommendation__items">
                                                <Carousel config={this.carouselConfig} hidePagination>
                                                    {this._renderRecommendationItems()}
                                                </Carousel>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Basket;
