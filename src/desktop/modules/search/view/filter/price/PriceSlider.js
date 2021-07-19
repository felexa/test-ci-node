/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-did-update-set-state */
import React from "react";
import Nouislider from "nouislider-react";
import PropTypes from "prop-types";
import classNames from "classnames";
// import "nouislider/distribute/nouislider.css";

class PriceSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            priceFrom: this.props.selectedRange.min,
            priceTo: this.props.selectedRange.max,
            priceRangeError: false
        };

        this._updatePriceFromSlider = this._updatePriceFromSlider.bind(this);
        this._change = this._change.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedRange.min !== this.props.selectedRange.min ||
         prevProps.selectedRange.max !== this.props.selectedRange.max) {
            this.setState(() => ({
                priceFrom: this.props.selectedRange.min,
                priceTo: this.props.selectedRange.max
            }));
        }
    }

    /**
     * @private
     * @method isCorrectPriceRangeForRequest
     * @returns {boolean}
     */
    _isCorrectPriceRangeForRequest() {
        // eslint-disable-next-line max-len
        return (this.state.priceFrom !== this.props.filterValues.priceFrom || this.state.priceTo !== this.props.filterValues.priceTo) && !this.state.priceRangeError;
    }

    /**
     * @private
     * @method _checkErrorPriceRange
     * @returns {void}
     */
    _checkErrorPriceRange() {
        let selectedPriceFrom = this.state.priceFrom,
            selectedPriceTo = this.state.priceTo,
            emptyPriceFrom = selectedPriceFrom === "",
            emptyPriceTo = selectedPriceTo === "",
            isNaNPriceFrom = Number.isNaN(selectedPriceFrom),
            isNaNPriceTo = Number.isNaN(selectedPriceFrom),
            isBiggerPriceFromThenPriceTo = Number(selectedPriceFrom) > Number(selectedPriceTo),
            isBiggerPriceToThenRangeMax = Number(selectedPriceTo) > Number(this.props.range.max),
            isUseLessPriceTo = selectedPriceTo === "0";

        return isBiggerPriceFromThenPriceTo ||
            isBiggerPriceToThenRangeMax ||
            emptyPriceFrom ||
            emptyPriceTo ||
            isNaNPriceFrom ||
            isNaNPriceTo ||
            isUseLessPriceTo;
    }

    /**
     * @private
     * @method _onChanged
     * @param e {Object}
     * @param priceKey {string}
     * @returns {PriceSlider}
     */
    _onChanged(e, priceKey) {
        e.persist();

        this.setState((state) => ({
            ...state,
            [priceKey]: e.target.value

        }), this._updatePriceRangeErrorStatus);

        return this;
    }

    /**
     * @private
     * @method _change
     * @returns {void}
     */
    _change() {
        if (this._isCorrectPriceRangeForRequest()) {
            this.props.change({priceFrom: this.state.priceFrom, priceTo: this.state.priceTo});
        }
    }

    /**
     * @private
     * @method _updatePriceRangeErrorStatus
     * @returns {void}
     */
    _updatePriceRangeErrorStatus() {
        this.setState({
            priceRangeError: this._checkErrorPriceRange()
        });
    }

    /**
     * @private
     * @method _onUpdatePrice
     * @param price {Array}
     * @returns {PriceSlider}
     */
    _updatePriceFromSlider(price) {
        this.setState({
            priceFrom: `${Math.floor(Number(price[0]))}`,
            priceTo: `${Math.floor(Number(price[1]))}`,
            priceRangeError: false
        });
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className={classNames("price-slider", {"price-slider--error": this.state.priceRangeError})}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <input
                            className="form-control"
                            type="number"
                            value={this.state.priceFrom}
                            onChange={(e) => this._onChanged(e, "priceFrom")}
                        />

                        <span>-</span>

                        <input
                            className="form-control"
                            type="number"
                            value={this.state.priceTo}
                            onChange={(e) => this._onChanged(e, "priceTo")}
                        />
                    </div>

                    <button
                        className="price-slider__confirm btn-default btn-sm"
                        type="button"
                        onClick={this._change}
                        disabled={this.state.priceRangeError}
                    >
                        OK
                    </button>

                </div>

                <div className="price-slider__range">
                    <Nouislider
                        range={{
                            min: this.props.range.min,
                            max: this.props.range.max
                        }}
                        start={[
                            this.props.selectedRange.min,
                            this.props.selectedRange.max
                        ]}
                        onSlide={this._updatePriceFromSlider}
                        onEnd={this._change}
                        animate={false}
                        connect
                    />
                </div>
            </div>
        );
    }
}

PriceSlider.propTypes = {
    range: PropTypes.instanceOf(Object).isRequired,
    selectedRange: PropTypes.instanceOf(Object).isRequired,
    change: PropTypes.func.isRequired,
    filterValues: PropTypes.instanceOf(Object).isRequired
};

export default PriceSlider;
