import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Enum from "app/core/utilites/enum/product/status/type";

class BuyInOneClick extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property product
         * @type {Catalog}
         */
        this.product = props.product;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.statusTypeEnum = Enum.getInstance();
    }

    /**
     * @private
     * @method isAvailableButton
     * @returns {boolean}
     */
    isAvailableButton() {
        return this.statusTypeEnum.isAvailable(this.product.getStatus().getType());
    }

    /**
     * @private
     * @method getClasses
     * @returns {Object}
     */
    getClasses() {
        return classNames("btn-default", "btn-md", "btn-default--outline", this.props.className);
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            this.isAvailableButton() && (
                <button type="button" className={this.getClasses()} onClick={this.props.onClick}>
                    {this.stringsResource.buyInOneClick}
                </button>
            )
        );
    }
}

BuyInOneClick.propTypes = {
    product: PropTypes.instanceOf(Object).isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

BuyInOneClick.defaultProps = {
    className: ""
};

export default BuyInOneClick;
