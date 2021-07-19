import React from "react";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Box from "app/core/components/Box";
import Price from "components/price/Price";
import Sale from "components/sale/Sale";
import Seller from "components/seller/Seller";
import Status from "components/status/Status";
import BuyButton from "components/buttons/buy/Buy";
import InformAboutAvailabilityButton from "components/buttons/wishList/informAboutAvailability/InformAboutAvailability";
import BuyInOneClickButton from "components/buttons/buyInOneClick/BuyInOneClick";
import Image from "components/image/Image";
import Sticker from "components/sticker/Sticker";

import BuyBlockBase from "desktop/modules/product/card/retail/size/full/view/buyBlock/BuyBlock";

class BuyBlock extends BuyBlockBase {
    constructor(props) {
        super(props);

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
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <Box
                className={classnames("buy-block buy-block--mini bg-white adaptive-content new-super-box-shadow", this.className)}
                rounded={16}
            >
                <div className="buy-block__header mb-16">
                    <div className="row">
                        <div className="col-4">
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <Image
                                    className="mw-100"
                                    src={this.product.getPreview().getSmall()}
                                    alt={this.product.getName()}
                                />
                            </div>
                        </div>

                        <div className="col-8">
                            <span className="product-card__name text-black">{this.product.getName()}</span>
                        </div>
                    </div>
                </div>

                <div className="buy-block__body">
                    <Status className="buy-block__status text-uppercase f-weight-5" status={this.product.getStatus()} />

                    <Sticker items={this.product.getStickers()} type={this.stickerType} tooltip className="d-flex flex-wrap" />

                    {/*todo extract to component of product card*/}
                    <div className="product-card__prices mb-16">
                        <div className="d-flex align-items-center mb-8">
                            <Price value={this.product.getPrice().getOld()} oldPrice />

                            <Sale
                                percent={this.product.getSale().getPercent()}
                                // value={this.product.getSale().getValue()}
                            />
                        </div>

                        <Price className="d-block" value={this.product.getPrice().getCurrent()} />
                    </div>

                    {this.hasLastUpdateDate() && (
                        <div className="mb-16">
                            {this.stringsResource.priceAndAvailabilityAreRelevantTo} <br />

                            <time dateTime={this.getLastUpdateDateAsISO()}>
                                {this.getLastUpdateDate()}
                            </time>
                        </div>
                    )}

                    {this.isAvailableAddingToBasket() && (
                        <BuyButton
                            className="text-uppercase btn-block mb-24"
                            product={this.product}
                            hasIcon
                            addToBasket={(product, success, error) => this.addToBasket(product, success, error)}
                        />
                    )}

                    <InformAboutAvailabilityButton
                        className="btn-sm"
                        product={this.product}
                    />

                    <BuyInOneClickButton
                        className="text-uppercase btn-block mb-24"
                        product={this.product}
                        onClick={() => this.buyInOneClick()}
                    />

                    <Seller className="product-card__seller" seller={this.product.getSeller()} />
                </div>
            </Box>
        );
    }
}

export default BuyBlock;
