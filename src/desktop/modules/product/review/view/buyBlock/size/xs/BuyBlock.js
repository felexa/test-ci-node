import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import BuyBlockBase from "desktop/modules/product/card/retail/size/full/view/buyBlock/BuyBlock";

import BuyButton from "components/buttons/buy/Buy";
import InformAboutAvailabilityButton from "components/buttons/wishList/informAboutAvailability/InformAboutAvailability";

class BuyBlock extends BuyBlockBase {
    render() {
        return (
            <div className={classNames("buy-block buy-block--xs position-fixed bottom-0 w-100 d-md-none base-border-top", this.props.className)}>
                <div className="buy-block__body bg-white">
                    {this.isAvailableAddingToBasket() && (
                        <BuyButton
                            className="text-uppercase btn-block"
                            product={this.product}
                            addToBasket={(product, success, error) => this.addToBasket(product, success, error)}
                            hasIcon
                            hasPrice
                        />
                    )}

                    <InformAboutAvailabilityButton
                        className="text-uppercase justify-content-center"
                        product={this.product}
                    />
                </div>
            </div>
        );
    }
}

BuyBlock.propTypes = {
    className: PropTypes.string
};

BuyBlock.defaultProps = {
    className: ""
};

export default BuyBlock;
