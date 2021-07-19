/* eslint-disable max-len */
import React from "react";

import Strings from "app/core/utilites/strings";
import Env from "app/core/environment";
import Resource from "app/core/resource";
import Translator from "app/core/utilites/strings/translator";

class Coupons extends React.Component {
    constructor(props) {
        super(props);

        this.translator = Translator.getInstance();
        this.strings = Strings.getInstance();

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.items = [
            {
                bonusValue: 1000,
                couponsQuantity: 50
            },
            {
                bonusValue: 250,
                couponsQuantity: 100
            },
            {
                bonusValue: 150,
                couponsQuantity: 500
            },
            {
                bonusValue: 90,
                couponsQuantity: 1000
            },
            {
                bonusValue: 30,
                couponsQuantity: 10000
            }
        ];
    }

    /**
     * @private
     * @method _getTitleOfPluralCoupons
     * @param count {number}
     * @returns {string}
     */
    _getTitleOfPluralCoupons(count) {
        return this.translator.plural(count, Translator.stringKeys.coupons);
    }

    /**
     * @method _getTotalBonusCountAsText
     * @return {string}
     * @private
     */
    _getTotalBonusCountAsText(totalBonus) {
        return this.strings.writeLine(
            this.stringsResource.amountOfBonusMoney, [totalBonus]
        );
    }

    /**
     * @method _renderItems
     * @return {Array}
     * @private
     */
    _renderItems() {
        return this.items.map((item, index) => (
            <li className="item" key={index}>
                <img
                    className="item__preview"
                    src={this.Resource.links.images.bonusesAirdrop.coupon}
                    alt="img"
                    width="92"
                    height="50"
                />

                <div className="item__money">
                    <span className="money__value">{item.bonusValue}</span>
                    <span className="money__text">{this._getTotalBonusCountAsText()}</span>
                </div>

                <div className="item__divider" />

                <div className="item__coupon-description">
                    <span className="coupon-description__value">{item.couponsQuantity} </span>
                    <span className="coupon-description__text">{this._getTitleOfPluralCoupons(item.couponsQuantity)}</span>
                </div>
            </li>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="bonuses-airdrop__coupons coupons section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <header className="coupons__header">
                                <h2 className="coupons__title section__title">
                                    {this.HTMLResource.bonusesAirdrop.couponsDescription.title}
                                </h2>

                                <div className="coupons__description">
                                    <p dangerouslySetInnerHTML={{__html: this.HTMLResource.bonusesAirdrop.couponsDescription.canWin}} />

                                    <p dangerouslySetInnerHTML={{__html: this.HTMLResource.bonusesAirdrop.couponsDescription.quantity}} />
                                </div>
                            </header>

                            <div className="coupons__body">
                                <ul className="coupons__items">
                                    {this._renderItems()}
                                </ul>
                            </div>

                            <div className="coupons__footer">
                                <a
                                    href={this.Resource.links.medikamenty}
                                    className="coupons__shopping btn-default btn-lg"
                                >
                                    {this.stringsResource.toShopping}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Coupons;
