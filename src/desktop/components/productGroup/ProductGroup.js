/* eslint-disable max-len */

import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import Translator from "app/core/utilites/strings/translator";
import Price from "desktop/components/price/Price";
import Resource from "app/core/resource";
import Env from "app/core/environment";

class ProductGroup extends React.Component {
    constructor(props) {
        super(props);

        this.item = props.item;

        this.classNames = props.classNames;

        /**
         * @property Translator
         * @type {Object}
         */
        this.Translator = Translator;

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = this.Translator.getInstance();

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @method _isAvailable
     * @returns {boolean}
     * @private
     */
    _isAvailable() {
        return Boolean(this.item.getPriceRange().getMin());
    }

    /**
     * @private
     * @method _getTitleOfPluralProducts
     * @returns {string}
     */
    _getTitleOfPluralProducts() {
        return this.translator.plural(this.item.getItemsCount(), Translator.stringKeys.products);
    }

    render() {
        let item = this.item;

        return (
            <div className={classNames("product-group rounded-10 bg-white", this.classNames)}>
                <div className="product-group__body d-flex flex-column h-100">
                    <div className="product-group__preview d-flex justify-content-center align-items-center mb-24">
                        <a href={item.getUrl()}>
                            <img
                                className="lazyload"
                                data-src={item.getPreview().getSrc()}
                                alt={item.getPreview().getAlt()}
                            />
                        </a>
                    </div>

                    <div className={classNames("product-group__name flex-grow-1")}>
                        <a href={item.getUrl()}>
                            {item.getName()}
                        </a>
                    </div>

                    <div className="product-group__quantity flex-grow-1">
                        {this.item.getItemsCount()} {this._getTitleOfPluralProducts()}
                    </div>

                    {this._isAvailable() && (
                        <div className="product-group__price">
                            {this.stringsResource.from.toLowerCase()} <Price value={this.item.getPriceRange().getMin()} />
                        </div>
                    )}

                    {!this._isAvailable() && (
                        <div className="product-group__status">
                            {this.stringsResource.notAvailable}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

ProductGroup.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    classNames: PropTypes.string
};

ProductGroup.defaultProps = {
    classNames: ""
};

export default ProductGroup;
