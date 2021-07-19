import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Resource from "app/core/resource";
import Env from "app/core/environment";

import StatusTypeEnum from "app/core/utilites/enum/product/status/type";
import SellerEnum from "app/core/utilites/enum/seller";

import BasketService from "app/core/services/basket";

import Price from "components/price/Price";

class Buy extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property product
         * @type {Catalog}
         */
        this.product = props.product;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.basketService = BasketService.getInstance();

        this.statusTypeEnum = StatusTypeEnum.getInstance();
        this.sellerEnum = SellerEnum.getInstance();

        /**
         * @property state
         * @type {Object}
         */
        this.state = {
            btnName: this.stringsResource.buy,
            inBasket: false,
            isBuyDisabled: false
        };

        this._updateBuyButton = this._updateBuyButton.bind(this);
        this._addToBasket = this._addToBasket.bind(this);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this
            ._updateBuyButton()
            .basketService
            .on("update", this._updateBuyButton);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentWillUnmount() {
        this.basketService.off("update", this._updateBuyButton);
    }

    /**
     * @private
     * @method _isAvailableButton
     * @returns {boolean}
     */
    _isAvailableButton() {
        return this.statusTypeEnum.isAvailable(this.product.getStatus().getType()) &&
            this.sellerEnum.isMain(this.product.getSeller().getAlias());
    }

    /**
     * @private
     * @method _isBuyDisabled
     * @returns {boolean}
     */
    _isBuyDisabled() {
        return this.state.isBuyDisabled;
    }

    /**
     * @method _isPriceVisible
     * @return {boolean}
     * @private
     */
    _isPriceVisible() {
        return this.props.hasPrice && !this.state.inBasket;
    }

    /**
     * @private
     * @method _toggleDisabled
     * @param state {boolean}
     * @returns {BuyBlock}
     */
    _toggleDisabled(state) {
        this.setState({isBuyDisabled: state});

        return this;
    }

    /**
     * @private
     * @method _getClasses
     * @returns {Object}
     */
    _getClasses() {
        return classNames({
            "to-basket d-flex align-items-center btn-md justify-content-center": true,
            "btn-default": !this.state.inBasket,
            "to-basket--with-price": this.props.hasPrice,
            "btn-default--outline to-basket--in-basket": this.state.inBasket,
            "justify-content-between": this._isPriceVisible()
        }, this.props.className);
    }

    /**
     * @private
     * @method _getBtnName
     * @returns {string}
     */
    _getBtnName() {
        return (this.props.hasName && this.state.btnName) || "";
    }

    /**
     * @private
     * @method _getTitle
     * @returns {string}
     */
    _getTitle() {
        return this.state.btnName.toUpperCase();
    }

    /**
     * @private
     * @method _getIconClassNames
     * @returns {object}
     */
    _getIconClassNames() {
        return classNames({
            "icon-cart": this.props.hasIcon && !this.state.inBasket,
            "icon-cart-check": this.props.hasIcon && this.state.inBasket,
            "icon--default": true,
            icon: true
        });
    }

    /**
     * @private
     * @method _updateBuyButton
     * @returns {string}
     */
    _updateBuyButton() {
        this.basketService.hasItemById(this.product.getId(), (result) => {
            this.setState(() => ({
                btnName: !result ? this.stringsResource.buy : this.stringsResource.inBasket,
                inBasket: result,
                isBuyDisabled: false
            }));
        });

        return this;
    }

    /**
     * @private
     * @method _addToBasket
     * @returns {Buy}
     */
    _addToBasket() {
        this._toggleDisabled(true);

        this.props.addToBasket(this.product, () => {
            this._toggleDisabled(false);
        }, () => {
            this._toggleDisabled(false);
        });

        return this;
    }

    /**
     * @private
     * @method _renderIcon
     * @returns {string}
     */
    _renderIcon() {
        return (
            <span className="buy-icons d-inline-flex align-items-center justify-content-center">
                <span className={this._getIconClassNames()} />
                <span className="icon icon--hovered icon-cart" />
            </span>
        );
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return this._isAvailableButton() && (
            <button
                className={this._getClasses()}
                type="button"
                title={this._getTitle()}
                disabled={this._isBuyDisabled()}
                onClick={this._addToBasket}
            >
                <span className="d-flex align-items-center">
                    {this._renderIcon()} {this._getBtnName()}
                </span>

                {this._isPriceVisible() && (
                    <Price value={this.product.getPrice().getCurrent()} className="text-lowercase" />
                )}
            </button>
        );
    }
}

Buy.propTypes = {
    product: PropTypes.instanceOf(Object).isRequired,
    addToBasket: PropTypes.func.isRequired,
    className: PropTypes.string,
    hasName: PropTypes.bool,
    hasIcon: PropTypes.bool,
    hasPrice: PropTypes.bool
};

Buy.defaultProps = {
    className: "",
    hasName: true,
    hasIcon: false,
    hasPrice: false
};

export default Buy;
