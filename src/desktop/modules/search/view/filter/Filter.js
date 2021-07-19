import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Translator from "app/core/utilites/strings/translator";

import Categories from "./categories/Categories";
import Price from "./price/Price";

class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
        this.Translator = Translator;

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = this.Translator.getInstance();
    }

    /**
     * @private
     * @method _hasCategories
     * @returns {boolean}
     */
    _hasCategories() {
        return Boolean(this.props.searchData.getCategories().length);
    }

    /**
     * @method _getTitleForPrice
     * @returns {string}
     * @private
     */
    _getTitleForPrice() {
        return `${this.stringsResource.price}, ${this.stringsResource.currency.uah}`;
    }

    /**
     * @private
     * @method _createProductsAmountHint
     * @return {string}
     */
    _createProductsAmountHint() {
        // eslint-disable-next-line max-len
        return `${this.Resource.strings.found} ${this.props.searchData.getPagination().getTotalItemsCount()} ${this._getTitleOfPluralProducts()}`;
    }

    /**
     * @private
     * @method _getTotalItemsCount
     * @return {number}
     */
    _getTotalItemsCount() {
        return this.props.searchData.getPagination().getTotalItemsCount();
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
                        {this.stringsResource.filters}

                        <i
                            className="icon icon-close"
                            onClick={this.props.toggleDisplayingFilterPanel}
                        />
                    </div>
                </div>

                <div className="filter__body">
                    <div className="filter__items">
                        {this._hasCategories() && (
                        <div className="item new-super-box-shadow rounded-16 bg-white overflow-hidden mb-16">
                            <div className="item__title color-black mb-24 d-md-none">
                                {this.stringsResource.categories}
                            </div>

                            <Categories
                                change={this.props.changeCategory}
                                items={this.props.searchData.getCategories()}
                            />
                        </div>
                        )}

                        <div className="item new-super-box-shadow rounded-16 bg-white overflow-hidden">
                            <div className="item__title color-black mb-24 ">
                                {this.stringsResource.price}
                            </div>

                            <Price
                                change={this.props.changePrice}
                                searchData={this.props.searchData}
                                filterValues={this.props.filterValues}
                            />
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
                            {this.stringsResource.clear}
                        </button>

                        <button
                            className="controls__show btn-default btn-sm text-uppercase"
                            type="button"
                            onClick={this.props.toggleDisplayingFilterPanel}
                        >
                            {this.stringsResource.show.default}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Filter.propTypes = {
    isOpenFilter: PropTypes.bool,
    searchData: PropTypes.instanceOf(Object).isRequired,
    filterValues: PropTypes.instanceOf(Object).isRequired,
    toggleDisplayingFilterPanel: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    changePrice: PropTypes.func.isRequired,
    changeCategory: PropTypes.func.isRequired
};

Filter.defaultProps = {
    isOpenFilter: false
};

export default Filter;
