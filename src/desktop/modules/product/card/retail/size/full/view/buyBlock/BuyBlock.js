import React from "react";
import PropTypes from "prop-types";

import Strings from "app/core/utilites/strings";

class BuyBlock extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property product
         * @type {Catalog}
         */
        this.product = props.product;

        this.strings = Strings.getInstance();
    }

    /**
     * @protected
     * @method hasLastUpdateDate
     * @returns {boolean}
     */
    hasLastUpdateDate() {
        return this.product.getPrice().hasLastUpdateDate();
    }

    /**
     * @protected
     * @method isAvailableAddingToBasket
     * @return {Boolean}
     */
    isAvailableAddingToBasket() {
        return this.props.availableBasket;
    }

    /**
     * @protected
     * @method getLastUpdateDate
     * @returns {string}
     */
    getLastUpdateDate() {
        return this.strings.formatDate(this.product.getPrice().getLastUpdateDate());
    }

    /**
     * @protected
     * @method getLastUpdateDateAsISO
     * @returns {string}
     */
    getLastUpdateDateAsISO() {
        return this.product
            .getPrice()
            .getLastUpdateDate()
            .toISOString();
    }

    /**
     * @protected
     * @method addToBasket
     * @param product {Catalog}
     * @param success {Function}
     * @param error {Function}
     * @returns {BuyBlock}
     */
    addToBasket(product, success, error) {
        // eslint-disable-next-line react/prop-types
        this.props.addToBasket(product, success, error);

        return this;
    }

    /**
     * @protected
     * @method buyInOneClick
     * @returns {BuyBlock}
     */
    buyInOneClick() {
        // eslint-disable-next-line react/prop-types
        this.props.buyInOneClick();

        return this;
    }
}

export default BuyBlock;

BuyBlock.propTypes = {
    availableBasket: PropTypes.bool,
    product: PropTypes.instanceOf(Object).isRequired,
    addToBasket: PropTypes.func.isRequired,
    buyInOneClick: PropTypes.func
};

BuyBlock.defaultProps = {
    availableBasket: false,
    buyInOneClick: () => {}
};
