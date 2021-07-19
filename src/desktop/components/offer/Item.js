import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Strings from "app/core/utilites/strings";

import Price from "components/price/Price";
import BuyButton from "components/buttons/buy/Buy";
import Image from "components/image/Image";

class Item extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property maxNameLength
         * @type {number}
         */
        this.maxNameLength = 50;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property
         * @type {Object}
         */
        this.strings = Strings.getInstance();
    }

    /**
     * @private
     * @method _hasLogo
     * @returns {boolean}
     */
    _hasLogo() {
        return Boolean(this.props.item.getBrand().getLogo().getSrc());
    }

    /**
     * @private
     * @method _hasBrand
     * @returns {boolean}
     */
    _hasBrand() {
        return Boolean(this.props.item.getBrand().getName());
    }

    /**
     * @private
     * @method _hasBrand
     * @returns {boolean}
     */
    _hasCountryOfProduction() {
        return Boolean(this.props.item.getCountryOfProduction());
    }

    /**
     * @method getName
     * @returns {string}
     */
    _getName() {
        return this.strings.clip(this.props.item.getName(), this.maxNameLength);
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        let { item, addToBasket } = this.props;

        return (
            <tr className="offer__item item">
                <td className="item__col text-center item__col-sm-width">
                    <div className="item__preview">
                        <a href={item.getUrl()}>
                            <Image
                                className="lazyload"
                                data-src={item.getPreview().getSrc()}
                                alt={item.getPreview().getAlt()}
                            />
                        </a>
                    </div>
                </td>

                <td className="item__col d-none d-md-table-cell item__col-md-width">
                    <div className="item__name">
                        <a className="text-decoration-none" href={item.getUrl()}>{this._getName()}</a>
                        <div className="item__properties">
                            <p className={classNames("mb-6 word-break-word", {"d-none": !this._hasBrand()})}>
                                <span className="pr-2">
                                    {this.stringsResource.vendor}:
                                </span>

                                <span className="m-0 f-weight-5 word-break-word">
                                    {item.getBrand().getName()}
                                </span>
                            </p>

                            <p className={classNames("mt-0 mb-6", {"d-none": !this._hasCountryOfProduction()})}>
                                <span className="pr-2">
                                    {this.stringsResource.countryOfManufacture}:
                                </span>

                                <span className="m-0 f-weight-5 word-break-word">
                                    {this.props.item.getCountryOfProduction()}
                                </span>
                            </p>
                        </div>
                    </div>
                </td>

                <td className="item__col d-none d-md-table-cell">
                    <div className="item__vendor">
                        <div className="d-flex flex-row align-items-center">
                            <div className={classNames("item__logo item__logo--border", {"visibility-hidden": !this._hasLogo()})}>
                                <Image
                                    className="lazyload"
                                    data-src={item.getBrand().getLogo().getSrc()}
                                    alt={item.getBrand().getLogo().getAlt()}
                                />
                            </div>

                            <div className={classNames("d-flex justify-content-center flex-column", {"visibility-hidden": !this._hasBrand()})}>
                                <p className="mt-0 mb-6">
                                    {this.stringsResource.vendor}
                                </p>

                                <p className="m-0 f-weight-5 word-break-word">
                                    {item.getBrand().getName()}
                                </p>
                            </div>
                        </div>
                    </div>
                </td>

                <td className="item__col d-none d-md-table-cell">
                    <div className="item__vendor">
                        <div className="d-flex flex-row align-items-center">
                            <div className="d-flex justify-content-center flex-column">
                                <p className={classNames("mt-0 mb-6", {"d-none": !this._hasCountryOfProduction()})}>
                                    {this.stringsResource.countryOfManufacture}:
                                </p>

                                <p className="m-0 f-weight-5 word-break-word">
                                    {item.getCountryOfProduction()}
                                </p>
                            </div>
                        </div>
                    </div>
                </td>

                <td className="item__col">
                    <div className="d-md-none d-flex flex-column">
                        <div className="item__name">
                            <a className="text-decoration-none" href={item.getUrl()}>{this._getName()}</a>

                            <p className={classNames("mb-6 word-break-word", {"d-none": !this._hasBrand()})}>
                                <span className="pr-2">
                                    {this.stringsResource.vendor}:
                                </span>

                                <span className="m-0 f-weight-5 word-break-word">
                                    {item.getBrand().getName()}
                                </span>
                            </p>

                            <p className={classNames("mt-0 mb-6", {"d-none": !this._hasCountryOfProduction()})}>
                                <span className="pr-2">
                                    {this.stringsResource.countryOfManufacture}:
                                </span>

                                <span className="m-0 f-weight-5 word-break-word">
                                    {this.props.item.getCountryOfProduction()}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center d-md-none mt-16 justify-content-between">
                        <Price value={item.getPrice().getCurrent()} />

                        <BuyButton
                            className="item__to-buy--mobile d-inline-flex align-items-center justify-content-center"
                            product={item}
                            hasIcon
                            hasName={false}
                            addToBasket={addToBasket}
                        />
                    </div>
                </td>

                <td className="item__col d-none d-md-table-cell">
                    <Price value={item.getPrice().getCurrent()} />
                </td>

                <td className="item__col d-none d-md-table-cell">
                    <BuyButton
                        className="btn-block text-uppercase"
                        product={item}
                        hasIcon
                        addToBasket={addToBasket}
                    />
                </td>
            </tr>
        );
    }
}

Item.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    addToBasket: PropTypes.func.isRequired
};

export default Item;
