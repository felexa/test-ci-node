import React from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import StatusTypeEnum from "app/core/utilites/enum/product/status/type";
import Strings from "app/core/utilites/strings";

import Alert from "components/alert/Alert";
import Price from "components/price/Price";
import Sale from "components/sale/Sale";
import Seller from "components/seller/Seller";
import Status from "components/status/Status";
import BuyButton from "components/buttons/buy/Buy";
import InformAboutAvailabilityButton from "components/buttons/wishList/informAboutAvailability/InformAboutAvailability";
// eslint-disable-next-line import/no-named-as-default
import AddToWishList from "components/buttons/wishList/addToWishList/AddToWishList";
import BuyInOneClickButton from "components/buttons/buyInOneClick/BuyInOneClick";

import Share from "desktop/modules/product/card/retail/size/full/view/share/Share";
import BuyBlockBase from "desktop/modules/product/card/retail/size/full/view/buyBlock/BuyBlock";
import PromoBanner from "desktop/modules/product/card/retail/size/full/view/promoBanner/PromoBanner";
import Bonus from "desktop/components/bonus/Bonus";

class BuyBlock extends BuyBlockBase {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Resource}
         */
        this.Resource = Resource;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        /**
         * @property statusTypeEnum
         * @type {Enum}
         */
        this.statusTypeEnum = StatusTypeEnum.getInstance();

        /**
         * @property stickerType
         * @type {string}
         */
        this.stickerType = "original";

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @method isDisplayedShare
     * @returns {boolean}
     */
    isDisplayedShare() {
        return Boolean(this._createShareItems().length);
    }

    /**
     * @method isDisplayedPromoBanner
     * @returns {boolean}
     */
    isDisplayedPromoBanner() {
        return this.product.getCode() === "1600002";
    }

    /**
     * @private
     * @method _isDisplayedPrice
     * @returns {boolean}
     */
    _isDisplayedPrice() {
        return this._hasPrice() || this._hasOldPrice();
    }

    /**
     * @method _hasPrice
     * @returns {boolean}
     */
    _hasPrice() {
        return Boolean(this.product.getPrice().getCurrent());
    }

    /**
     * @private
     * @method _isAvailableButton
     * @returns {boolean}
     */
    _isAvailableProduct() {
        return this.statusTypeEnum.isAvailable(this.product.getStatus().getType());
    }

    /**
     * @method _hasOldPrice
     * @returns {boolean}
     */
    _hasOldPrice() {
        return Boolean(this.product.getPrice().getOld());
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
     * @method _getBonus
     * @returns {number}
     */
    _getBonus() {
        return this.product.getBonus();
    }

    /**
     * @private
     * @method _getLastUpdateDateDescription
     * @returns {string}
     */
    _getLastUpdateDateDescription() {
        return this.strings.writeLine(
            this.HTMLResource.warnings.lastUpdateDateDescription,
            this.getLastUpdateDateAsISO(),
            this.getLastUpdateDate()
        );
    }

    /**
     * @method _createShareItems
     * @returns {Array}
     */
    _createShareItems() {
        return this.product.getShares().map((content) => content.infoBlock || "");
    }

    /**
     * @method _renderShares
     * @returns {Array}
     */
    _renderShares() {
        return this._createShareItems().map((content, i) => (
            <Share content={content} key={i} />
        ));
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className={ClassNames("product-card__buy-block buy-block buy-block--full", this.props.className)}>
                {this.isDisplayedShare() && (
                    <div className="row">
                        <div className="col">
                            {this._renderShares()}
                        </div>
                    </div>
                )}

                {this.isDisplayedPromoBanner() && (
                    <div className="row">
                        <div className="col">
                            <PromoBanner code={this.product.getCode()} />
                        </div>
                    </div>
                )}

                {this.hasLastUpdateDate() && (
                    <div className="row mb-24">
                        <div className="col">
                            <Alert
                                type="info"
                                content={this._getLastUpdateDateDescription()}
                            />
                        </div>
                    </div>
                )}

                <div className="row mb-20">
                    <div className="col">
                        <Status className="buy-block__status text-uppercase f-weight-5" status={this.product.getStatus()} />
                    </div>
                </div>

                {this._isDisplayedPrice() && (
                    <div className="row mb-16">
                        <div className="col">
                            {/*todo extract to component of product card*/}
                            <div className="d-flex justify-content-between">
                                <div className="product-card__prices">
                                    {this._hasOldPrice() && (
                                        <div className="product-card__prices-old">
                                            <Price value={this.product.getPrice().getOld()} oldPrice />

                                            <Sale
                                                percent={this.product.getSale().getPercent()}
                                                value={this.product.getSale().getValue()}
                                            />
                                        </div>
                                    )}

                                    <div className="d-flex flex-md-row flex-column">
                                        <div className="product-card__prices-current">
                                            <Price className="d-block" value={this.product.getPrice().getCurrent()} />
                                        </div>
                                        <div className="product-card__bonus d-flex align-items-center">
                                            {this._hasBonus() && (
                                                <Bonus bonus={this._getBonus()} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <AddToWishList product={this.product} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="row mb-24">
                    {this.isAvailableAddingToBasket() && this._isAvailableProduct() && (
                        <div className="col-12 col-lg-6 col-md-12 d-md-block buy-button mb-md-0 mb-16">
                            <BuyButton
                                className="text-uppercase btn-block"
                                product={this.product}
                                hasIcon
                                addToBasket={(product, success, error) => this.addToBasket(product, success, error)}
                            />
                        </div>
                    )}

                    {!this._isAvailableProduct() && (
                        <div className={ClassNames("col-12 col-lg-7 col-md-12 d-md-block inform-about-availability-col")}>
                            <InformAboutAvailabilityButton
                                product={this.product}
                            />
                        </div>
                    )}

                    <div className="col-12 col-lg-6 col-md-12 ">
                        <BuyInOneClickButton
                            className="text-uppercase btn-block mb-0"
                            product={this.product}
                            onClick={() => this.buyInOneClick()}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <Seller className="product-card__seller" seller={this.product.getSeller()} />
                    </div>
                </div>
            </div>
        );
    }
}

BuyBlock.propTypes = {
    i18n: PropTypes.instanceOf(Object).isRequired,
    className: PropTypes.string
};

BuyBlock.defaultProps = {
    className: ""
};

export default BuyBlock;
