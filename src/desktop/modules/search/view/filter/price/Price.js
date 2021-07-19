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
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="price-filter pb-16">
                <PriceSlider
                    range={{
                        min: this.props.searchData.getPrices().getRange().getMin(),
                        max: Number(this.props.searchData.getPrices().getRange().getMax()) + this.maxPriceInsurance
                    }}
                    selectedRange={{
                        min: this.props.filterValues.priceFrom ||
                            this._rounding(this.props.searchData.getPrices().getRange().getMin()),
                        max: this.props.filterValues.priceTo ||
                            this._rounding(this.props.searchData.getPrices().getRange().getMax())
                    }}
                    filterValues={this.props.filterValues}
                    change={this.props.change}
                />
            </div>
        );
    }
}

Price.propTypes = {
    searchData: PropTypes.instanceOf(Object).isRequired,
    change: PropTypes.func.isRequired,
    filterValues: PropTypes.instanceOf(Object).isRequired
};

export default Price;
