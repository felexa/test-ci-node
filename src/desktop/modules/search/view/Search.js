import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Translator from "app/core/utilites/strings/translator";
import Dom from "app/core/utilites/dom";
import Resource from "app/core/resource";

import Pagination from "components/pagination/Pagination";
import Rubric from "components/rubric/product/Rubric";
import ProductCard from "components/product/card/retail/size/xs/Product";
import MicroDataWebPage from "components/microData/WebPage";

import Filter from "./filter/Filter";
import ActiveFilter from "./activeFilter/ActiveFilter";

import styles from "../styles/main.module.scss";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.Translator = Translator;

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = this.Translator.getInstance();

        /**
         * @property
         * @type {Object}
         */
        this.stringKeys = Translator.stringKeys;

        this.state = {
            rubrics: [],
            isOpenFilter: false,
            filterValues: props.options.initialData.queryParams,
            activeFilter: [],
            searchData: props.options.initialData.searchData,
            isLoading: false
        };

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property env
         * @type {Env}
         */
        this.env = Env.getInstance();

        this._toggleDisplayingFilterPanel = this._toggleDisplayingFilterPanel.bind(this);
        this._addToBasket = this._addToBasket.bind(this);
        this._removeSelectedFilter = this._removeSelectedFilter.bind(this);
        this._resetAllFilters = this._resetAllFilters.bind(this);
        this._refreshPageWithCorrectData = this._refreshPageWithCorrectData.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changePagination = this.changePagination.bind(this);
    }

    componentDidMount() {
        this._getRubrics();
        this.setState({
            activeFilter: this._createActiveFilter()
        });
    }

    /**
     * @protected
     * @method componentDidUpdate
     * @param prevProps {Object}
     * @param prevState {Object}
     * @returns {boolean}
     */
    componentDidUpdate(prevProps, prevState) {
        this._getPresenter().checkRoute(prevState.filterValues, (searchData, query) => {
            this.setState(() => ({
                searchData,
                filterValues: query
            }),
            this._updateFilterList);
        },
        (error) => console.log(error));
    }

    /**
     * @private
     * @method _isShowSearchItems
     * @returns {boolean}
     */
    _isShowSearchItems() {
        return Boolean(this.state.searchData.getPagination().getTotalItemsCount());
    }

    /**
     * @private
     * @method _isShowSuggestion
     * @return {boolean}
     */
    _isShowSuggestion() {
        //return Boolean(this.state.searchData.getSuggestion());
        return false; //waite for api
    }

    /**
     * @private
     * @method _hasActiveFilter
     * @returns {boolean}
     */
    _hasActiveFilter() {
        return Boolean(this.state.activeFilter.length);
    }

    /**
     * @private
     * @method _hasRubrics
     * @return {boolean}
     */
    _hasRubrics() {
        return Boolean(this.state.rubrics.length);
    }

    /**
     * @private
     * @method _addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {SearchPage}
     */
    _addToBasket(product, success, error) {
        this._getPresenter().addToBasket(product, success, error);

        return this;
    }

    /**
     * @private
     * @method _createProductsAmountHint
     * @return {string}
     */
    _createProductsAmountHint() {
        // eslint-disable-next-line max-len
        return `${this.stringsResource.found} ${this.state.searchData.getPagination().getTotalItemsCount()} ${this._getTitleOfPluralProducts()}`;
    }

    /**
     * @private
     * @method _getPageInfo
     * @returns {PageInfo}
     */
    _getPageInfo() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.pageInfo;
    }

    /**
     * @private
     * @method _getCategoryNameById
     * @param id {string}
     * @returns {string}
     */
    _getCategoryNameById(id) {
        let category = _.merge([], this.state.searchData.getCategories());

        return category.filter((item) => item.getId() === id)[0].getName();
    }

    /**
     * @private
     * @method _getViewedProductsAsRubric
     * @return {void}
     */
    _getRubrics() {
        this._getPresenter().getViewedProductsAsRubric((items) => {
            this.setState({ rubrics: [items] });
        }, () => { });
    }

    /**
     * @private
     * @method _getTotalItemsCount
     * @return {number}
     */
    _getTotalItemsCount() {
        return this.state.searchData.getPagination().getTotalItemsCount();
    }

    /**
     * @private
     * @method _getTitleOfPluralProducts
     * @returns {string}
     */
    _getTitleOfPluralProducts() {
        return this.translator.plural(this._getTotalItemsCount(), this.stringKeys.products);
    }

    /**
     * @private
     * @method _getPresenter
     * @return {Presenter}
     */
    _getPresenter() {
        return this.props.options.presenter;
    }

    /**
     * @private
     * @method _getTitle
     * @return {string}
     */
    _getTitle() {
        return `«${this.state.searchData.getQuery()}»`;
    }

    /**
    * @private
    * @method _toggleScroll
    * @param state {boolean}
    * @returns {SearchPage}
    */
    _toggleScroll(state) {
        this.dom.toggleScroll(state);

        return this;
    }

    /**
     * @private
     * @method _toggleDisplayingFilterPanel
     * @param e {Object}
     * @returns {void}
     */
    _toggleDisplayingFilterPanel(e) {
        e.stopPropagation();

        let isOpenFilter = !this.state.isOpenFilter;

        this._toggleScroll(!isOpenFilter);

        this.setState(() => ({
            isOpenFilter
        }));
    }

    /**
     * @private
     * @method _toggleLoader
     * @param flag {boolean}
     * @returns {SearchPage}
     */
    _toggleLoader(flag) {
        this.setState({
            isLoading: flag
        });

        return this;
    }

    /**
     * @method _renderProducts
     * @param items {Product[]}
     * @return {Array}
     */
    _renderProducts(items) {
        return items.map((item) => (
            <ProductCard
                key={item.getId()}
                item={item}
                addToBasket={this._addToBasket}
                className="products__item bg-white new-super-box-shadow flex-shrink-0"
            />
        ));
    }

    /**
     * @private
     * @method buildURLToRedirect
     * @param pathname {string}
     * @returns {string}
     */
    buildURLToRedirect(pathname) {
        return `${this.env.getBitrixHost()}/${pathname}`;
    }

    /**
     * @private
     * @method _createRequestQuery
     * @return {Object}
     */
    _createRequestQuery() {
        let result = {};

        result.query = this.state.searchData.getQuery();

        if (this.state.filterValues.priceFrom) {
            result.priceFrom = `${this.state.filterValues.priceFrom}`;
        }

        if (this.state.filterValues.priceTo) {
            result.priceTo = `${this.state.filterValues.priceTo}`;
        }

        if (this.state.filterValues["categoryIds[]"]) {
            result["categoryIds[]"] = this.state.filterValues["categoryIds[]"];
        }

        if (this.state.filterValues.page && Number(this.state.filterValues.page) > 1) {
            result.page = this.state.filterValues.page;
        }

        return result;
    }

    /**
     * @private
     * @method _createActiveFilter
     * @return {Array}
     */
    _createActiveFilter() {
        let result = [],
            filters = _.merge({}, this.state.filterValues);

        if (filters["categoryIds[]"]) {
            result.push({ id: "categoryIds[]", value: this._getCategoryNameById(filters["categoryIds[]"])});
        }

        if (filters.priceFrom) {
            result.push({
                id: `priceFrom`,
                value: `${this.stringsResource.priceFrom} ${filters.priceFrom} ${this.stringsResource.currency.uah}`
            });
        }

        if (filters.priceTo) {
            result.push({
                id: `priceTo`,
                value: `${this.stringsResource.priceTo} ${filters.priceTo} ${this.stringsResource.currency.uah}`
            });
        }

        return result;
    }

    /**
     * @private
     * @method _resetAllFilters
     * @returns {void}
     */
    _resetAllFilters() {
        this.setState((state) => ({
            activeFilter: [],
            filterValues: {query: state.searchData.getQuery(), page: "1"}
        }),
        this._updateData);
    }

    /**
     * @private
     * @method _removeSelectedFilter
     * @param e {Object}
     * @returns {Search}
     */
    _removeSelectedFilter(e) {
        let id = e.target.dataset.id;

        this.setState(() => ({
            filterValues: this._updateFilterValue(id)
        }),
        this._setActiveFilter);

        return this;
    }

    /**
     * @private
     * @method _setActiveFilter
     * @returns {Search}
     */
    _setActiveFilter() {
        this.setState(() => ({
            activeFilter: this._createActiveFilter()
        }),
        this._updateData());

        return this;
    }

    /**
     * @private
     * @method _setFilter
     * @param value {Object}
     * @return {Search}
     */
    _setFilter(value) {
        this.setState((state) => ({
            filterValues: {
                ...state.filterValues,
                ...value,
                page: "1"
            }
        }),
        this._setActiveFilter);

        return this;
    }

    /**
     * @private
     * @method _refreshPageWithCorrectData
     * @returns {void}
     */
    _refreshPageWithCorrectData() {
        // eslint-disable-next-line max-len
        window.location.href = this.buildURLToRedirect(`search/?query=${this.state.searchData.getSuggestion()}`);
    }

    /**
     * @private
     * @method _updateFilterValue
     * @param id {string}
     * @returns {Object}
     */
    _updateFilterValue(id) {
        let newFilterValue = {};

        // eslint-disable-next-line no-restricted-syntax
        for (let key in this.state.filterValues) {
            if (key !== id) {
                newFilterValue[key] = this.state.filterValues[key];
            }
        }

        newFilterValue.page = "1";

        return newFilterValue;
    }

    /**
     * @private
     * @method _updateData
     * @returns {void}
     */
    _updateData() {
        this._toggleLoader(true);
        this._getPresenter().updateSearchResults(this._createRequestQuery(), (searchData) => {
            this._toggleLoader(false);
            this.setState({
                searchData
            });
        },
        (error) => console.log(error));
    }

    /**
     * @public
     * @method changePrice
     * @param value {Object}
     * @returns {void}
     */
    changePrice(value) {
        this._setFilter(value);
    }

    /**
     * @public
     * @method changeCategory
     * @param value {string}
     * @returns {void}
     */
    changeCategory(value) {
        this._setFilter({"categoryIds[]": value});
    }

    /**
     * @public
     * @method changePagination
     * @returns {void}
     */
    changePagination(value) {
        this.setState((state) => ({
            filterValues: {
                ...state.filterValues,
                page: `${value}`
            }
        }),
        this._setActiveFilter);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className={classNames("search-result", {loading: this.state.isLoading})}>
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <div className="search__header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="search__title f-weight-5 color-black">
                                    {this._getTitle()}
                                </div>

                                <div className="search__found-products">
                                    {this._isShowSearchItems() && (
                                    <span className="color-grey">{this._createProductsAmountHint()}</span>
                                    )}

                                    {!this._isShowSearchItems() && (
                                    <span className="color-grey">{this.stringsResource.emptySearchResult}</span>
                                    )}
                                </div>

                                {this._isShowSuggestion() && (
                                    <div className="search__suggestion">
                                        <span className="color-black mr-8">{this.stringsResource.youMeant}:</span>
                                        <a href="#" className="text-decoration-none f-weight-5" onClick={this._refreshPageWithCorrectData}>
                                            {this.state.searchData.getSuggestion()}
                                        </a>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between align-items-center mt-16 mt-md-24">

                                    {this._hasActiveFilter() && (
                                        <ActiveFilter
                                            items={this.state.activeFilter}
                                            reset={this._resetAllFilters}
                                            change={this._removeSelectedFilter}
                                        />
                                    )}

                                    <div className="search__controls d-flex flex-grow-1 mb-16 align-self-end">
                                        <div className="search__show-filter d-md-none">
                                            <button
                                                onClick={this._toggleDisplayingFilterPanel}
                                                type="button"
                                                className="bg-white btn-default--outline btn-md d-flex align-items-center justify-content-center"
                                            >
                                                <i className="icon icon-filter" />
                                                <span>{this.stringsResource.filter}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col d-flex">
                            <div>
                                <div className={classNames("search__aside", { "search__aside--active": this.state.isOpenFilter })}>
                                    <Filter
                                        reset={this._resetAllFilters}
                                        searchData={this.state.searchData}
                                        filterValues={this.state.filterValues}
                                        isOpenFilter={this.state.isOpenFilter}
                                        toggleDisplayingFilterPanel={this._toggleDisplayingFilterPanel}
                                        changePrice={this.changePrice}
                                        changeCategory={this.changeCategory}
                                    />
                                </div>

                                <div className="overlay" onClick={this._toggleDisplayingFilterPanel} />
                            </div>

                            {this._isShowSearchItems() && (
                                <div className="search__body">
                                    <div className="search__products products d-flex flex-wrap">
                                        {this._renderProducts(this.state.searchData.getProducts())}
                                    </div>

                                    <div className="search__pagination mt-16 pb-16">
                                        <Pagination
                                            hasPages
                                            activePage={this.state.searchData.getPagination().getCurrentPage()}
                                            totalCount={this.state.searchData.getPagination().getTotalItemsCount()}
                                            perPageCount={this.state.searchData.getPagination().getPageCount()}
                                            change={this.changePagination}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {this._hasRubrics() && (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <Rubric
                                    items={this.state.viewedProductsAsRubric}
                                    addToBasket={this._addToBasket}
                                />
                            </div>
                        </div>
                    </div>
                )}

            </section>
        );
    }
}

Search.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Search;
