import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Translator from "app/core/utilites/strings/translator";
import Resource from "app/core/resource";
import Accordion from "../accordion/Accordion";

import Categories from "./categories/Categories";
import Price from "./price/Price";
import Attribute from "./Attribute";

class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this.Translator = Translator;

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = this.Translator.getInstance();
    }

    /**
     * @private
     * @method _isSelectedFilters
     * @returns {boolean}
     */
    _isSelectedFilters() {
        return Boolean(this.props.catalogData.getSelectedFilters().length);
    }

    /**
     * @private
     * @method _createProductsAmountHint
     * @return {string}
     */
    _createProductsAmountHint() {
        // eslint-disable-next-line max-len
        return `${this.Resource.strings.found} ${this.props.catalogData.getPagination().getTotalItemsCount()} ${this._getTitleOfPluralProducts()}`;
    }

    /**
     * @private
     * @method _getTotalItemsCount
     * @return {number}
     */
    _getTotalItemsCount() {
        return this.props.catalogData.getPagination().getTotalItemsCount();
    }

    /**
     * @private
     * @method _getTitleOfPluralProducts
     * @returns {string}
     */
    _getTitleOfPluralProducts() {
        return this.translator.plural(this._getTotalItemsCount(), Translator.stringKeys.products);
    }

    /**
     * @private
     * @method _createFilterItems
     * @returns {Array}
     */
    _createFilterItems() {
        let result = this.props.catalogData.getAttributes().map((element) => ({
            title: element.getName(),
            htmlDataAttribute: {attribute: "id", value: element.getAlias()},
            description: <Attribute
                items={element.getValues()}
                change={this.props.changeAttribute}
            />
        }));

        result.unshift({
            title: this.Resource.strings.price,
            htmlDataAttribute: {attribute: "id", value: "filter_prices"},
            description: <Price
                prices={this.props.catalogData.getPrices()}
                change={this.props.changePrice}
            />
        });

        if (this.props.catalogData.getCategories().length) {
            result.unshift({
                title: this.Resource.strings.subcategories,
                description: <Categories
                    items={this.props.catalogData.getCategories()}
                />
            });
        }

        return result;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div
                className={classNames("filter", {"filter-mobile": this.props.isOpenFilter})}
            >
                <div className="filter__header d-md-none">
                    <div className="filter__title d-flex justify-content-between align-items-center color-black">
                        <div className="d-flex align-items-center">
                            <span className="mr-12">{this.Resource.strings.filters}</span>
                            {this._isSelectedFilters() && (
                                <span className="badge">{this.props.catalogData.getSelectedFilters().length}</span>
                            )}
                        </div>
                        <i
                            className="icon icon-close"
                            onClick={this.props.toggleDisplayingFilterPanel}
                        />
                    </div>
                </div>

                <div className="filter__body">
                    {this._isSelectedFilters() && (
                        <div className="filter__active-filters bg-white new-super-lg-box-shadow rounded-16">
                            {this.props.activeFilter}
                        </div>
                    )}
                    <div className="filter__items">
                        <div className="item new-super-lg-box-shadow rounded-16">
                            <Accordion items={this._createFilterItems()} isActivePanels />
                        </div>
                    </div>
                </div>

                <div className="filter__footer d-md-none">
                    <div className="filter__found-products mb-12 text-center">
                        {this._createProductsAmountHint()}
                    </div>

                    <div className="filter__controls d-flex justify-content-between">
                        <button
                            className="controls__clear btn-default--outline btn-sm text-uppercase"
                            type="button"
                            onClick={this.props.reset}
                        >
                            {this.Resource.strings.clear}
                        </button>

                        <button
                            className="controls__show btn-default btn-sm text-uppercase"
                            type="button"
                            onClick={this.props.toggleDisplayingFilterPanel}
                        >
                            {this.Resource.strings.show.default}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Filter.propTypes = {
    isOpenFilter: PropTypes.bool,
    catalogData: PropTypes.instanceOf(Object).isRequired,
    toggleDisplayingFilterPanel: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    changeAttribute: PropTypes.func.isRequired,
    changePrice: PropTypes.func.isRequired,
    activeFilter: PropTypes.instanceOf(Object).isRequired
};

Filter.defaultProps = {
    isOpenFilter: false
};

export default Filter;
