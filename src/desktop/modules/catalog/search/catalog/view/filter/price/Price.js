import React from "react";
import PropTypes from "prop-types";

import PriceSlider from "./PriceSlider";

class Price extends React.Component {
    constructor(props) {
        super(props);

        this.maxPriceInsurance = 0.001;
    }

    /**
     * @private
     * @method _rounding
     * @param price {string}
     * @returns {React.element}
     */
    _rounding(price) {
        return `${Math.floor(Number(price))}`;
    }

    /**
     * @private
     * @method _getMaxValueOfSelectedRange
     * @returns {number}
     */
    _getMaxValueOfSelectedRange() {
        return Number(this._rounding(this.props.prices.getSelectedRange().getMax())) ||
        this.props.prices.getRange().getMax();
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="price-filter pb-16">
                <PriceSlider
                    range={{
                        min: this.props.prices.getRange().getMin(),
                        max: Number(this.props.prices.getRange().getMax()) + this.maxPriceInsurance
                    }}
                    selectedRange={{
                        min: this._rounding(this.props.prices.getSelectedRange().getMin()),
                        max: this._getMaxValueOfSelectedRange()
                    }}
                    change={this.props.change}
                />
            </div>
        );
    }
}

Price.propTypes = {
    prices: PropTypes.instanceOf(Object).isRequired,
    change: PropTypes.func.isRequired
};

export default Price;
