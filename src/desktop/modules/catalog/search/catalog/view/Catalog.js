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
import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import DeviceMobile from "components/deviceDetector/mobile/Detector";
import Rubric from "components/rubric/product/Rubric";
import ProductCard from "components/product/card/retail/size/xs/Product";
import FAQ from "components/faq/FAQ";
import MicroDataFaq from "components/faq/microData/MicroData";
import MicroDataMedicalWebPage from "components/microData/MedicalWebPage";
import Redactor from "components/redactor/Redactor";
import ProgressiveImage from "components/image/ProgressiveImage";
import Consultation from "desktop/components/consultation/Consultation";

import Filter from "./filter/Filter";
import Sort from "./sort/Sort";
import ActiveFilter from "./activeFilter/ActiveFilter";
import SeoText from "./seoText/SeoText";
import SeoPrices from "./seoPrices/SeoPrices";
import ShowMoreCard from "./showMoreCard/ShowMoreCard";

import styles from "../styles/main.module.scss";

class Catalog extends React.Component {
    constructor(props) {
        super(props);

        this.env = Env.getInstance();

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

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property selectors
         * @type {Object}
         */
        this.selectors = {
            catalog: ".catalog-result"
        };

        this.state = {
            rubrics: [],
            isOpenFilter: false,
            activeFilter: [],
            catalogData: props.options.initialData.catalogData,
            isLoading: false,
            items: props.options.initialData.catalogData.getProducts(),
            isShowMoreUpdate: false,
            faq: []
        };

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        this._toggleDisplayingFilterPanel = this._toggleDisplayingFilterPanel.bind(this);
        this._addToBasket = this._addToBasket.bind(this);

        this.changeSort = this.changeSort.bind(this);
        this._removeSelectedFilter = this._removeSelectedFilter.bind(this);
        this._resetAllFilters = this._resetAllFilters.bind(this);
        this.changePagination = this.changePagination.bind(this);
        this.changeAttribute = this.changeAttribute.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this._setUpdatedData = this._setUpdatedData.bind(this);
        this._getNextItems = this._getNextItems.bind(this);
        this._concatItems = this._concatItems.bind(this);
        this._buildUrlPagination = this._buildUrlPagination.bind(this);
    }

    componentDidMount() {
        this._getRubrics();
        this._getFAQ();
        this._updateActiveFilter();
    }

    componentDidUpdate(prevProps) {
        // eslint-disable-next-line max-len
        if (!_.isEqual(prevProps.options.initialData.catalogData, this.props.options.initialData.catalogData) && !this.state.isShowMoreUpdate) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(() => ({
                catalogData: this.props.options.initialData.catalogData,
                items: this.props.options.initialData.catalogData.getProducts()
            }),
            this._updateActiveFilter);
        }
    }

    /**
     * @private
     * @method _isShowCatalogItems
     * @returns {boolean}
     */
    _isShowCatalogItems() {
        return Boolean(this.state.catalogData.getPagination().getTotalItemsCount());
    }

    /**
     * @private
     * @method _isFirstPage
     * @returns {boolean}
     */
    _isFirstPage() {
        return this.state.catalogData.getPagination().getCurrentPage() === 1;
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
     * @method _hasSeoText
     * @return {boolean}
     */
    _hasSeoText() {
        return Boolean(this._getSeoText());
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
     * @method _hasFAQ
     * @returns {boolean}
     */
    _hasFAQ() {
        return Boolean(this._isFirstPage() && this.state.faq.length);
    }

    /**
     * @private
     * @method _hasBanner
     * @returns {boolean}
     */
    _hasBanner() {
        return Boolean(this._getBanners().length);
    }

    /**
     * @private
     * @method _hasRedactor
     * @returns {boolean}
     */
    _hasRedactor() {
        return Boolean(this._getRedactor().getId());
    }

    /**
     * @private
     * @method _hasSeoPrices
     * @return {boolean}
     */
    _isShowSeoPrices() {
        return Boolean(this.state.catalogData.getProducts().length) && this._getProductsWithPrice().length > 2;
    }

    /**
     * @private
     * @method _toggleScroll
     * @param state {boolean}
     * @returns {Catalog}
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
     * @param [state] {boolean}
     * @returns {Catalog}
     */
    _toggleLoader(state) {
        this.setState({
            isLoading: Boolean(state)
        });

        return this;
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
     * @method _getPresenter
     * @return {Presenter}
     */
    _getPresenter() {
        return this.props.options.presenter;
    }

    /**
     * @method _getRedactor
     * @return {Profile}
     * @private
     */
    _getRedactor() {
        return this.props.options.initialData.redactor;
    }

    /**
     * @method _getReviewer
     * @return {Profile}
     * @private
     */
    _getReviewer() {
        return this.props.options.initialData.reviewer;
    }

    /**
     * @method _getLastUpdatedDate
     * @return {Date}
     * @private
     */
    _getLastUpdatedDate() {
        return this.props.options.initialData.lastUpdateDate;
    }

    /**
     * @method _getCreatedDate
     * @return {Date}
     * @private
     */
    _getCreatedDate() {
        return this.props.options.initialData.createdDate;
    }

    /**
     * @private
     * @method _getNextItems
     * @returns {void}
     */
    _getNextItems() {
        this._toggleLoader(true);

        this._getPresenter().getUpdatedData(
            this.state.catalogData.getPagination().getShowMoreApi(),
            this._concatItems
        );

        return this;
    }

    /**
     * @private
     * @method _getProductsWithPrice
     * @return {Array}
     */
    _getProductsWithPrice() {
        return this.state.catalogData.getProducts().filter((item) => item.getPrice().getCurrent() !== 0);
    }

    /**
     * @private
     * @method _getSeoText
     * @return {string}
     */
    _getSeoText() {
        return this.props.options.initialData.seoText;
    }

    /**
     * @private
     * @method _getBanners
     * @return {Banner[]}
     */
    _getBanners() {
        return this.props.options.initialData.banners;
    }

    /**
     * @private
     * @method _getRubrics
     * @return {void}
     */
    _getRubrics() {
        this._getPresenter().getViewedProductsAsRubric((items) => {
            this.setState({ rubrics: [items] });
        }, () => { });
    }

    /**
     * @private
     * @method _getFAQ
     * @return {void}
     */
    _getFAQ() {
        this._getPresenter().getFAQByCategory(this._getTargetCategory(), (items) => {
            this.setState({ faq: items });
        }, () => { });
    }

    /**
     * @private
     * @method _getTargetCategory
     * @return {string}
     */
    _getTargetCategory() {
        let baseCategoryUrl = this.props.options.initialData.catalogData.getBaseCategory().split("/");

        return baseCategoryUrl[baseCategoryUrl.length - 2];
    }

    /**
     * @private
     * @method _getTotalItemsCount
     * @return {number}
     */
    _getTotalItemsCount() {
        return this.state.catalogData.getPagination().getTotalItemsCount();
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
     * @method _getTitle
     * @return {string}
     */
    _getTitle() {
        return `${this.state.catalogData.getTitle()}`;
    }

    /**
     * @private
     * @method _getSelectedFilters
     * @param filters {Array}
     * @return {Array}
     */
    _getSelectedFilters(filters) {
        let result = [];

        filters.forEach((item) => {
            result.push({
                id: `${item.getUrl()}`,
                value: `${item.getName()}: ${item.getValue()}`
            });
        });

        return result;
    }

    /**
     * @private
     * @method _getUpdatedData
     * @param apiUrl {string}
     * @returns {void}
     */
    _getUpdatedData(apiUrl) {
        this._toggleLoader(true);

        this._getPresenter().getUpdatedData(
            apiUrl,
            this._setUpdatedData
        );
    }

    /**
     * @private
     * @method _setUpdatedData
     * @param catalogData {Object}
     * @returns {void}
     */
    _setUpdatedData(catalogData) {
        this._toggleLoader(false);

        this.setState(
            () => ({
                catalogData,
                items: catalogData.getProducts(),
                isShowMoreUpdate: false
            }),
            this._updateActiveFilter
        );
    }

    /**
     * @private
     * @method _removeSelectedFilter
     * @param e {Object}
     * @returns {Catalog}
     */
    _removeSelectedFilter(e) {
        this._getUpdatedData(e.target.dataset.id);

        return this;
    }

    /**
     * @private
     * @method _resetAllFilters
     * @returns {void}
     */
    _resetAllFilters() {
        this.setState(
            () => ({
                activeFilter: []
            }),
            () => this._getUpdatedData(this.state.catalogData.getBaseCategory())
        );
    }

    /**
     * @private
     * @method _updateActiveFilter
     * @return {void}
     */
    _updateActiveFilter() {
        this.setState((state) => ({
            activeFilter: this._getSelectedFilters(state.catalogData.getSelectedFilters())
        }));
    }

    /**
     * @public
     * @method changeAttribute
     * @param url {string}
     * @return {Catalog}
     */
    changeAttribute(url) {
        this._getUpdatedData(url);

        return this;
    }

    /**
     * @public
     * @method changePrice
     * @param prices {Object}
     * @returns {void}
     */
    changePrice(prices) {
        this._toggleLoader(true);

        this._getPresenter().getUpdatedDataByPrice(
            this.state.catalogData.getPrices().getApiUrl(),
            prices,
            this._setUpdatedData
        );

        return this;
    }

    /**
     * @public
     * @method changePagination
     * @param pageNumber {string}
     * @returns {Catalog}
     */
    changePagination(pageNumber) {
        this.dom.scrollToElementBySelector(this.selectors.catalog);

        this._toggleLoader(true);

        this._getPresenter().getUpdatedDataByPage(
            this.state.catalogData.getPagination().getApiUrl(),
            pageNumber,
            this._setUpdatedData
        );

        return this;
    }

    /**
     * @public
     * @method changeSort
     * @param apiUrl {string}
     * @return {Catalog}
     */
    changeSort(apiUrl) {
        this._getUpdatedData(apiUrl);

        return this;
    }

    /**
     * @private
     * @method _addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Catalog}
     */
    _addToBasket(product, success, error) {
        this._getPresenter().addToBasket(product, success, error);

        return this;
    }

    /**
     * @method _concatItems
     * @param catalogData {Filter}
     * @private
     */
    _concatItems(catalogData) {
        this._toggleLoader(false);

        this.setState((state) => ({
            catalogData,
            items: [...state.items, ...catalogData.getProducts()],
            isShowMoreUpdate: true
        }),

        this._updateActiveFilter);
    }

    /**
     * @private
     * @method _buildUrlPagination
     * @param page {number}
     * @return {string}
     */
    _buildUrlPagination(page) {
        // eslint-disable-next-line no-underscore-dangle
        return this._getPresenter().buildUrlPagination(page);
    }

    /**
     * @private
     * @method _buildActiveFilter
     * @return {React.element}
     */
    _buildActiveFilter() {
        return (
            <ActiveFilter
                items={this.state.activeFilter}
                reset={this._resetAllFilters}
                change={this._removeSelectedFilter}
            />
        );
    }

    /**
     * @private
     * @method _renderBanner
     * @return {React.element}
     */
    _renderBanner() {
        let banner = this._getBanners()[0];

        return (
            <a className="banner-body" href={banner.getUrl()}>
                <picture>
                    <DeviceMobile>
                        <ProgressiveImage
                            previewSrc={banner.getMobileImage().getPrimitive()}
                            src={banner.getMobileImage().getLarge()}
                            className="banner-preview lazyload"
                            alt={banner.getTitle()}
                            width={banner.getMobileImage().getSizes().getLarge().getWidth()}
                            height={banner.getMobileImage().getSizes().getLarge().getHeight()}
                        />
                    </DeviceMobile>

                    <DeviceDesktop>
                        <ProgressiveImage
                            previewSrc={banner.getDesktopImage().getPrimitive()}
                            src={banner.getDesktopImage().getOriginal()}
                            className="banner-preview lazyload"
                            alt={banner.getTitle()}
                            width={banner.getDesktopImage().getSizes().getOriginal().getWidth()}
                            height={banner.getDesktopImage().getSizes().getOriginal().getHeight()}
                        />
                    </DeviceDesktop>
                </picture>
            </a>
        );
    }

    /**
     * @private
     * @method _renderProducts
     * @return {Array}
     */
    _renderProducts() {
        return this.state.items.map((item) => (
            <ProductCard
                key={item.getId()}
                item={item}
                addToBasket={this._addToBasket}
                className="products__item bg-white new-super-box-shadow flex-shrink-0"
            />
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <>
                {this._hasFAQ() && this._isFirstPage() && (
                    <MicroDataFaq faq={this.state.faq} />
                )}

                <style jsx>
                    {styles}
                </style>

                <MicroDataMedicalWebPage
                    name={this._getTitle()}
                    description={this._getPageInfo().getMeta().getDescription()}
                    datePublished={this._getCreatedDate().toISOString()}
                    dateModified={this._getLastUpdatedDate().toISOString()}
                    lastReviewed={this._getLastUpdatedDate().toISOString()}
                    author={this._getRedactor()}
                    censor={this._getReviewer()}
                />

                <section className={classNames("catalog-result", {loading: this.state.isLoading})}>
                    <div className="catalog__header">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex align-items-end flex-wrap mb-10 mb-sm-16">
                                        <h1 className="catalog__title f-weight-5 color-black mb-6 mr-8">
                                            {this._getTitle()}
                                        </h1>

                                        <div className="catalog__found-products mb-8">
                                            {this._isShowCatalogItems() && (
                                                <span className="color-grey whitespace-nowrap">
                                                    <span className="d-md-inline d-none text-lowercase">
                                                        {this.stringsResource.found}&nbsp;
                                                    </span>
                                                    {this.state.catalogData.getPagination().getTotalItemsCount()}&nbsp;
                                                    {this._getTitleOfPluralProducts()}
                                                </span>
                                            )}

                                            {!this._isShowCatalogItems() && (
                                                <span className="color-grey">{this.stringsResource.emptySearchResult}</span>
                                            )}
                                        </div>

                                        {!this._hasRedactor() && (
                                            <div className="catalog__sort d-none d-md-block mb-8 ml-auto">
                                                <Sort
                                                    items={this.state.catalogData.getSort()}
                                                    change={this.changeSort}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {this._hasRedactor() && (
                                        <div className="d-flex justify-content-between align-items-center mb-16">
                                            <Redactor
                                                lastUpdateDate={this._getLastUpdatedDate()}
                                                profile={this._getRedactor()}
                                                reviewer={this._getReviewer()}
                                                shortName
                                            />

                                            <div className="catalog__sort d-none d-md-block">
                                                <Sort
                                                    items={this.state.catalogData.getSort()}
                                                    change={this.changeSort}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {this._hasBanner() && (
                                        <div className="catalog__banner catalog__banner--mobile">
                                            { this._renderBanner() }
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-between align-items-center mt-16 mt-md-24 d-md-none">
                                        <div className="catalog__controls d-flex flex-grow-1 flex-shrink-0 mb-16 align-self-end">
                                            <div className="catalog__show-filter d-md-none">
                                                <button
                                                    onClick={this._toggleDisplayingFilterPanel}
                                                    type="button"
                                                    className="bg-white btn-default--outline btn-md d-flex align-items-center justify-content-center"
                                                >
                                                    <i className="icon icon-filter" />
                                                    <span>{this.stringsResource.filter}</span>
                                                </button>
                                            </div>

                                            <div className="catalog__sort">
                                                <Sort
                                                    items={this.state.catalogData.getSort()}
                                                    change={this.changeSort}
                                                />
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
                                    <div className={classNames("catalog__aside", { "catalog__aside--active": this.state.isOpenFilter })}>
                                        <Filter
                                            reset={this._resetAllFilters}
                                            catalogData={this.state.catalogData}
                                            isOpenFilter={this.state.isOpenFilter}
                                            toggleDisplayingFilterPanel={this._toggleDisplayingFilterPanel}
                                            changePrice={this.changePrice}
                                            changeAttribute={this.changeAttribute}
                                            activeFilter={this._buildActiveFilter()}
                                        />
                                    </div>
                                </div>

                                {this._isShowCatalogItems() && (
                                    <div className="catalog__body">
                                        {this._hasBanner() && (
                                            <div className="catalog__banner catalog__banner--desktop">
                                                { this._renderBanner() }
                                            </div>
                                        )}

                                        <div className="mb-20">
                                            <Consultation />
                                        </div>

                                        <div className="catalog__products products d-flex flex-wrap">
                                            {this._renderProducts()}
                                        </div>

                                        <div className="catalog__pagination mt-16 pb-16">
                                            {this.state.catalogData.getPagination().hasShowMore() && (
                                                <ShowMoreCard
                                                    change={this._getNextItems}
                                                    count={this.state.catalogData.getPagination().getShowMoreCount()}
                                                />
                                            )}
                                            <Pagination
                                                hasPages
                                                activePage={this.state.catalogData.getPagination().getCurrentPage()}
                                                totalCount={this.state.catalogData.getPagination().getTotalItemsCount()}
                                                perPageCount={this.state.catalogData.getPagination().getPageCount()}
                                                change={this.changePagination}
                                                buildUrl={this._buildUrlPagination}
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
                                        items={this.state.rubrics}
                                        addToBasket={this._addToBasket}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {this._hasSeoText() && (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <SeoText content={this._getSeoText()} />
                                </div>
                            </div>
                        </div>
                    )}

                    {this._isShowSeoPrices() && this._isFirstPage() && (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <SeoPrices catalogData={this.state.catalogData} />
                                </div>
                            </div>
                        </div>
                    )}

                    {this._hasFAQ() && this._isFirstPage() && (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <FAQ
                                        className="faq--product"
                                        items={this.state.faq}
                                        title={this.stringsResource.frequentlyAskedQuestions}
                                        iconOpen="icon-chevron-down"
                                        iconClose="icon-chevron-up"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </>
        );
    }
}

Catalog.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Catalog;
