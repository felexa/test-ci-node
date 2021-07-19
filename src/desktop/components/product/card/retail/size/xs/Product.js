import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Router from "app/core/utilites/router";
import Strings from "app/core/utilites/strings";
import Translator from "app/core/utilites/strings/translator";

import Box from "app/core/components/Box";

import Buy from "components/buttons/buy/Buy";
// eslint-disable-next-line import/no-named-as-default
import AddToWishList from "components/buttons/wishList/addToWishList/AddToWishList";
import Rating from "components/rating/Rating";
import Price from "components/price/Price";
import Sale from "components/sale/Sale";
import Image from "components/image/Image";
import Sticker from "components/sticker/Sticker";
import Bonus from "components/bonus/Bonus";

class Product extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property maxNameLength
         * @type {number}
         */
        this.maxNameLength = 50;

        /**
         * @property item
         * @type {Product}
         */
        this.item = props.item;

        /**
         * @property stickerType
         * @type {string}
         */
        this.stickerType = "small";

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property stringKeys
         * @type {Object}
         */
        this.stringKeys = Translator.stringKeys;

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = Translator.getInstance();

        /**
         * @property strings
         * @type {Object}
         */
        this.strings = Strings.getInstance();

        /**
         * @property router
         * @type {Router}
         */
        this.router = Router.getInstance();

        this.goToProduct = this.goToProduct.bind(this);
        this.redirectToReview = this.redirectToReview.bind(this);
    }

    /**
     * @private
     * @method hasComments
     * @returns {boolean}
     */
    hasComments() {
        return Boolean(this.getCommentsCount());
    }

    /**
     * @private
     * @method _hasBonus
     * @returns {boolean}
     */
    _hasBonus() {
        return Boolean(this._getBonus().getValue());
    }

    /**
     * @private
     * @method _hasProperty
     * @returns {boolean}
     */
    _hasProperty() {
        return Boolean(this.props.item.getProperty().getId());
    }

    /**
     * @private
     * @method _getBonus
     * @returns {number}
     */
    _getBonus() {
        return this.item.getBonus();
    }

    /**
     * @private
     * @method getCommentsCount
     * @returns {number}
     */
    getCommentsCount() {
        return this.item.getReview().getCommentsCount();
    }

    /**
     * @private
     * @method translateCommentsCount
     * @returns {string}
     */
    translateCommentsCount() {
        return this.translator.plural(this.getCommentsCount(), this.stringKeys.review);
    }

    /**
     * @private
     * @method getRating
     * @returns {number}
     */
    getRating() {
        return this.item.getReview().getRating().getValue();
    }

    /**
     * @private
     * @method getReviewUrl
     * @returns {string}
     */
    getReviewUrl() {
        // return `${process.env.NEXT_PUBLIC_BITRIX_HOST}/${this.item.getAlias()}/review/`;
        return `${this.item.getUrl()}review/`;
    }

    /**
     * @private
     * @method goToProduct
     * @param event {Object}
     * @returns {Product}
     */
    goToProduct(event) {
        event.preventDefault();

        this.props.select();

        // this.router.to(`/${this.item.getAlias()}/`, {
        //     shallow: false
        // });

        window.location.href = event.currentTarget.href;

        return this;
    }

    /**
     * @private
     * @method redirectToReview
     * @param event {Object}
     * @returns {Product}
     */
    redirectToReview(event) {
        event.preventDefault();

        this.props.redirectToReview();

        // this.router.to(`/${this.item.getAlias()}/review/`, {
        //     shallow: false
        // });

        window.location.href = event.currentTarget.href;

        return this;
    }

    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.strings.clip(this.item.getName(), this.maxNameLength);
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <Box
                component="div"
                rounded={16}
                className={classNames("product-card product-card--xs", this.props.className)}
            >
                <div className="product-card__body d-flex flex-column h-100">
                    <Sticker items={this.item.getStickers()} type={this.stickerType} tooltip />
                    <AddToWishList product={this.item} />

                    <div className="product-card__preview d-flex align-items-center justify-content-center">
                        <a onClick={this.goToProduct} href={this.item.getUrl()} className="d-block">
                            <Image
                                alt={this.item.getPreview().getAlt()}
                                title={this.item.getPreview().getTitle()}
                                className="product-image lazyload"
                                data-src={this.item.getPreview().getSrc()}
                                width={this.item.getPreview().getSizes().getMedium().getWidth()}
                                height={this.item.getPreview().getSizes().getMedium().getHeight()}
                            />
                        </a>
                        {this._hasProperty() && (
                            <div className="product-card__warning align-items-center" title={this.stringsResource.carefully}>
                                <img src={this.Resource.links.icons.warning} alt="sticker-carefully" />
                                {this.stringsResource.carefully}
                            </div>
                        )}
                    </div>

                    {this.hasComments() && (
                        <div className="product-card__rating d-flex flex-wrap align-items-center">
                            <Rating className="d-inline-block" fontSize="18" rating={this.getRating()} readonly />

                            <a
                                onClick={this.redirectToReview}
                                href={this.getReviewUrl()}
                                className="whitespace-nowrap text-decoration-none"
                            >
                                {this.getCommentsCount()} {this.translateCommentsCount()}
                            </a>
                        </div>
                    )}

                    {!this.hasComments() && (
                        <div className="product-card__rating d-flex flex-wrap align-items-center">
                            <div className="rating">
                                <span className="text-gray">
                                    <i className="icon icon-comment" />
                                </span>
                            </div>

                            <a
                                onClick={this.redirectToReview}
                                href={this.getReviewUrl()}
                                className="whitespace-nowrap text-decoration-none"
                            >
                                {this.stringsResource.review.create}
                            </a>
                        </div>
                    )}

                    <div className="product-card__name flex-grow-1" title={this.item.getName()}>
                        <a onClick={this.goToProduct} href={this.item.getUrl()} className="text-decoration-none color-black">
                            {this.getName()}
                        </a>
                    </div>

                    <div className="product-card__bonus d-flex align-items-center">
                        {this._hasBonus() && (
                            <Bonus bonus={this._getBonus()} />
                        )}
                    </div>

                    <div className="product-card__old-price d-flex align-items-center">
                        <Price value={this.item.getPrice().getOld()} oldPrice hideCurrency />

                        <Sale percent={this.item.getSale().getPercent()} />
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="product-card__price">
                            <Price value={this.item.getPrice().getCurrent()} />
                        </div>

                        <div className="d-flex align-items-center">
                            <Buy
                                product={this.item}
                                addToBasket={this.props.addToBasket}
                                hasName={false}
                                hasIcon
                            />
                        </div>
                    </div>

                    <div className="product-card__status" data-status-id={this.item.getStatus().getId()}>
                        {this.item.getStatus().getName()}
                    </div>
                </div>
            </Box>
        );
    }
}

Product.propTypes = {
    className: PropTypes.string,
    item: PropTypes.instanceOf(Object).isRequired,
    select: PropTypes.func,
    addToBasket: PropTypes.func,
    redirectToReview: PropTypes.func
};

Product.defaultProps = {
    className: "",
    select() {},
    addToBasket() {},
    redirectToReview() {}
};

export default Product;
