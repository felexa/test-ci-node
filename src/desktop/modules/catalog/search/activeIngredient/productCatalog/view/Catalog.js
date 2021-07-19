/* eslint-disable react/prop-types,react/no-danger */
/* eslint-disable max-len */

import React from "react";
// import classNames from "classnames";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import TabNameEnum from "app/core/utilites/enum/tab";
import ContentTypeEnum from "app/core/utilites/enum/contentType";

import Dom from "app/core/utilites/dom";
import Numbers from "app/core/utilites/numbers";
import Strings from "app/core/utilites/strings";

import Tabs from "app/core/components/tabs/Tabs";

import Title from "components/title/Title";
import FAQ from "components/faq/FAQ";
import Blog from "components/rubric/blog/Blog";
// import Review from "components/review/type/full/Review";
import Rubric from "components/rubric/product/Rubric";
import Redactor from "components/redactor/Redactor";

import MicroDataFaq from "components/faq/microData/MicroData";
import MicroDataMedicalWebPage from "components/microData/MedicalWebPage";

import Analogs from "./analog/Analog";
import Tab from "./tabs/Tab";
import Review from "./review/Review";
import Instruction from "./instruction/Instruction";
import Description from "./description/Description";
import ForPregnant from "./forPregnant/ForPregnant";
import Prices from "./prices/Prices";

import styles from "../styles/main.module.scss";

class Catalog extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property mainTitle
         * @type {string}
         */
        this.mainTitle = this.props.options.initialData.title || "";

        /**
         * @property priceRange
         * @type {Range}
         */
        this.priceRange = this.props.options.initialData.priceRange;

        /**
         * @property rubrics
         * @type {Rubric[]}
         */
        //todo add prop types
        this.rubrics = props.options.initialData.rubrics;

        /**
         * @property analogs
         * @type {Array}
         */
        //todo add prop types
        this.analogs = props.options.initialData.analogs;

        /**
         * @property review
         * @type {Review}
         */
        //todo add prop types
        this.review = props.options.initialData.review;

        /**
         * @property faq
         * @type {Array}
         */
        //todo add prop types
        this.faq = props.options.initialData.faq;

        /**
         * @property selectors
         * @type {Object}
         */
        this.selectors = {
            catalog: ".catalog.catalog--search"
        };

        /**
         * @property titles
         * @type {Object}
         */
        this.titles = {};

        this.state = {
            tabs: props.options.initialData.tabs,
            viewedProducts: []
        };

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property numbers
         * @type {Numbers}
         */
        this.numbers = Numbers.getInstance();

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        /**
         * @property tabNameEnum
         * @type {Enum}
         */
        this.tabNameEnum = TabNameEnum.getInstance();

        /**
         * @property contentTypeEnum
         * @type {Enum}
         */
        this.contentTypeEnum = ContentTypeEnum.getInstance();

        /**
         * @property componentsContainer
         * @type {Map}
         */
        this.componentsContainer = new Map();

        this._getInstructionById = this._getInstructionById.bind(this);
        this._getReviewByPage = this._getReviewByPage.bind(this);

        this._changeTab = this._changeTab.bind(this);
        this._setTabs = this._setTabs.bind(this);
        this._changeToPricesTab = this._changeToPricesTab.bind(this);
        this._addToBasket = this._addToBasket.bind(this);

        this._buildPricesTab = this._buildPricesTab.bind(this);
        this._buildReviewTab = this._buildReviewTab.bind(this);
        this._buildInstructionTab = this._buildInstructionTab.bind(this);
        this._buildNotationTab = this._buildNotationTab.bind(this);
        this._buildDescriptionTab = this._buildDescriptionTab.bind(this);
        this._buildForPregnantTab = this._buildForPregnantTab.bind(this);
        this._buildAnalogsTab = this._buildAnalogsTab.bind(this);

        // eslint-disable-next-line no-underscore-dangle
        this._buildTitles()._buildComponentsContainer();
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this._getPresenter().on("changeTab", this._setTabs);
        this._getViewedProductsAsRubric();
    }

    /**
     * @protected
     * @method componentWillUnmount
     * @returns {void}
     */
    componentWillUnmount() {
        this._getPresenter().off("changeTab", this._setTabs);
    }

    /**
     * @method _hasDescription
     * @return {boolean}
     * @private
     */
    _hasDescription() {
        return Boolean(this._getDescription());
    }

    /**
     * @private
     * @method _hasFAQ
     * @returns {boolean}
     */
    _hasFAQ() {
        return Boolean(this._isMainTabActive() && this.faq.length);
    }

    /**
     * @private
     * @method _hasForPregnant
     * @returns {boolean}
     */
    _hasForPregnant() {
        return Boolean(this._getForPregnant().length);
    }

    /**
     * @method _hasViewedProductsAsRubric
     * @return {boolean}
     * @private
     */
    _hasViewedProductsAsRubric() {
        return Boolean(this.state.viewedProducts.length);
    }

    /**
     * @private
     * @method _hasBlogArticles
     * @returns {boolean}
     */
    _hasBlogArticles() {
        return Boolean(this._getBlog().getItems().length) && this._isMainTabActive();
    }

    /**
     * @method _hasRedactor
     * @return {boolean}
     * @private
     */
    _hasRedactor() {
        return Boolean(this._getRedactor().getId());
    }

    /**
     * @private
     * @method _isMainTabActive
     * @returns {boolean}
     */
    _isMainTabActive() {
        return Boolean(this.tabNameEnum.isMain(this._getCurrentTab().name));
    }

    /**
     * @private
     * @method _isDescriptionTabActive
     * @returns {boolean}
     */
    _isDescriptionTabActive() {
        return Boolean(this.contentTypeEnum.isDescription(this._getCurrentTab().contentType));
    }

    /**
     * @private
     * @method _isForPregnantTabActive
     * @returns {boolean}
     */
    _isForPregnantTabActive() {
        return Boolean(this.tabNameEnum.isPregnancy(this._getCurrentTab().name));
    }

    /**
     * @private
     * @method _isPricesTabActive
     * @returns {boolean}
     */
    _isPricesTabActive() {
        return Boolean(this.tabNameEnum.isPrices(this._getCurrentTab().name || this._getCurrentTab().contentType));
    }

    /**
     * @private
     * @method _isDisplayedPricesRubric
     * @returns {boolean}
     */
    _isDisplayedPricesRubric() {
        return Boolean(!this._isPricesTabActive() &&
            this.rubrics.length &&
            this.priceRange.getMin() &&
            this.priceRange.getMax());
    }

    /**
     * @method _isDisplayedRedactor
     * @return {boolean}
     * @private
     */
    _isDisplayedRedactor() {
        return this._hasRedactor() && this._isAvailableMicrodataForMedicalPage();
    }

    /**
     * @method _isAvailableMicrodataForMedicalPage
     * @return {boolean}
     */
    _isAvailableMicrodataForMedicalPage() {
        return this._isDescriptionTabActive() || this._isForPregnantTabActive();
    }

    /**
     * @method _getPageInfo
     * @return {PageInfo}
     * @private
     */
    _getPageInfo() {
        return this.props.options.initialData.pageInfo;
    }

    /**
     * @private
     * @method _getPresenter
     * @returns {Presenter}
     */
    _getPresenter() {
        return this.props.options.presenter;
    }

    /**
     * @method _getCreatedDateAsString
     * @return {string}
     * @private
     */
    _getCreatedDateAsString() {
        return this.props.options.initialData.createdDate.toISOString();
    }

    /**
     * @method _getLastUpdatedDateAsString
     * @return {string}
     * @private
     */
    _getLastUpdatedDateAsString() {
        return this.props.options.initialData.lastUpdateDate.toISOString();
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
     * @private
     * @method _getProducts
     * @returns {Array}
     */
    _getProducts() {
        return this.rubrics.reduce(function (result, rubric) {
            return result.concat(rubric.getItems());
        }, []);
    }

    /**
     * @private
     * @method _getTotalProductsCount
     * @returns {number}
     */
    _getTotalProductsCount() {
        return this._getProducts().length;
    }

    /**
     * @private
     * @method _getTotalReviewCount
     * @returns {number}
     */
    _getTotalReviewCount() {
        return this.props.options.initialData.totalReviewCount;
    }

    /**
     * @private
     * @method _getInstruction
     * @returns {string}
     */
    _getInstruction() {
        return this.props.options.initialData.instruction;
    }

    /**
     * @private
     * @method _getFAQ
     * @returns {Array}
     */
    _getFAQ() {
        return this.faq;
    }

    /**
     * @private
     * @method _getBlog
     * @returns {BlogRubric}
     */
    _getBlog() {
        return this.props.options.initialData.blog;
    }

    /**
     * @private
     * @method _getDescription
     * @returns {string}
     */
    _getDescription() {
        return this.props.options.initialData.description;
    }

    /**
     * @method _getNotation
     * @returns {string}
     * @private
     */
    _getNotation() {
        return this.props.options.initialData.notation;
    }

    /**
     * @private
     * @method _getForPregnant
     * @returns {string}
     */
    _getForPregnant() {
        return this.props.options.initialData.forPregnant;
    }

    /**
     * @private
     * @method _getViewedProductsAsRubric
     */
    _getViewedProductsAsRubric() {
        this._getPresenter().getViewedProducts(
            (itemsEntity) => {
                this.setState({viewedProducts: itemsEntity});
            }
        );
    }

    /**
     * @private
     * @method _getMainTitleConfig
     * @returns {Object}
     */
    _getMainTitleConfig() {
        return {
            title: this._buildTitle()
        };
    }

    /**
     * @private
     * @method _getPriceRangeAsText
     * @returns {string}
     */
    _getPriceRangeAsText() {
        let result = `от ${this.numbers.toLocaleString(this.priceRange.getMin())} грн до ${this.numbers.toLocaleString(this.priceRange.getMax())} грн`;

        return (this.priceRange.getMin() && this.priceRange.getMax() && result) || "";
    }

    /**
     * @private
     * @method _getTabs
     * @returns {Array}
     */
    _getTabs() {
        return this.state.tabs;
    }

    /**
     * @private
     * @method _setTabs
     * @returns {Catalog}
     */
    _setTabs(tabs) {
        this.setState(() => ({tabs}));

        return this;
    }

    /**
     * @private
     * @method _getCurrentTab
     * @returns {Object}
     */
    _getCurrentTab() {
        return this._getTabs().find(function (tab) {
            return tab.active;
        });
    }

    /**
     * @private
     * @method _getPricesTab
     * @returns {Object}
     */
    _getPricesTab() {
        return this._getTabs().find((tab) => (tab.name || tab.contentType) === this.tabNameEnum.getPricesAsValue());
    }

    /**
     * @private
     * @method _getInstructionById
     * @param id {string|number}
     * @param callback {Function}
     * @returns {Catalog}
     */
    _getInstructionById(id, callback) {
        this._getPresenter().getInstructionById(id, callback);

        return this;
    }

    /**
     * @private
     * @method _getReviewByPage
     * @returns {Catalog}
     */
    _getReviewByPage(page, success) {
        page((nextPage) => {
            this._getPresenter().getReviewByPage(
                nextPage,
                (review) => {
                    success(review);
                },
                (error) => {
                    error();
                }
            );
        });

        return this;
    }

    /**
     * @method _buildTitles
     * @returns {Catalog}
     * @private
     */
    _buildTitles() {
        this.titles = {
            [this.tabNameEnum.getMainAsValue()]: "",
            [this.tabNameEnum.getInstructionAsValue()]: this.stringsResource.instructionFromVendor.toLowerCase(),
            [this.tabNameEnum.getReviewAsValue()]: this.stringsResource.reviews.toLowerCase(),
            [this.tabNameEnum.getPricesAsValue()]: this.stringsResource.priceFor,
            [this.tabNameEnum.getNotationAsValue()]: `: ${this.strings.writeLine(this.stringsResource.amountOfThingsYouNeedToKnow, [7])}`,
            [this.tabNameEnum.getPregnancyAsValue()]: this.stringsResource.duringPregnancyAndBreastfeeding.toLowerCase(),
            [this.tabNameEnum.getAnalogsAsValue()]: this.stringsResource.analogs.toLowerCase()
        };

        return this;
    }

    /**
     * @private
     * @method _buildTitle
     * @returns {string}
     */
    _buildTitle() {
        let currentTab = this._getCurrentTab(),
            currentTabName = currentTab ? currentTab.name : "",
            title = this.titles[currentTabName],
            result = `${this.mainTitle} ${title}`;

        if (this.tabNameEnum.isNotation(currentTabName)) {
            result = `${this.mainTitle}${title}`;
        }

        if (this.tabNameEnum.isPrices(currentTabName)) {
            result = `
                ${title} ${this.mainTitle.toLocaleLowerCase()} ${this._getPriceRangeAsText()}
            `;
        }

        return result;
    }

    /**
     * @private
     * @method _buildTitleForPricesRubric
     * @returns {string}
     */
    _buildTitleForPricesRubric() {
        let result = `${this.stringsResource.prices} (${this.numbers.toLocaleString(this.priceRange.getMin())} - ${this.numbers.toLocaleString(this.priceRange.getMax())} ${this.stringsResource.currency.uah})`;

        return (this.priceRange.getMin() && this.priceRange.getMax() && result) || "";
    }

    /**
     * @private
     * @method _buildPricesTab
     * @returns {React.Element}
     */
    _buildPricesTab() {
        return (
            <Tab title="">
                <Rubric
                    items={this.rubrics}
                    minRubricItems={this._getTotalProductsCount()}
                    addToBasket={this._addToBasket}
                />
            </Tab>
        );
    }

    /**
     * @private
     * @method _buildReviewTab
     * @returns {React.Element}
     */
    _buildReviewTab() {
        return (
            <Tab title="">
                <Review
                    review={this.review}
                    getReview={this._getReviewByPage}
                    totalCount={this._getTotalReviewCount()}
                />
            </Tab>
        );
    }

    /**
     * @private
     * @method _buildInstructionTab
     * @returns {React.Element}
     */
    _buildInstructionTab() {
        return (
            <Tab title="">
                <Instruction
                    products={this._getProducts()}
                    getInstructionById={this._getInstructionById}
                    instruction={this._getInstruction()}
                />
            </Tab>
        );
    }

    /**
     * @private
     * @method _buildForPregnantTab
     * @returns {React.Element}
     */
    _buildForPregnantTab() {
        return (
            <Tab title="">
                <ForPregnant
                    forPregnant={this._getForPregnant()}
                />
            </Tab>
        );
    }

    /**
     * @private
     * @method _buildNotationTab
     * @returns {React.Element}
     */
    _buildNotationTab() {
        return (
            <Tab title="">
                <Description
                    description={this._getNotation()}
                />
            </Tab>
        );
    }

    /**
     * @private
     * @method _buildDescriptionTab
     * @returns {React.Element}
     */
    _buildDescriptionTab() {
        return (
            <Tab title="">
                <Description
                    description={this._getDescription()}
                />
            </Tab>
        );
    }

    /**
     * @private
     * @method _buildAnalogsTab
     * @returns {React.Element}
     */
    _buildAnalogsTab() {
        return (
            <Tab title="">
                <Analogs items={this.analogs} />
            </Tab>
        );
    }

    /**
     * @private
     * @method _buildComponentsContainer
     * @returns {Catalog}
     */
    _buildComponentsContainer() {
        this.componentsContainer
            .set(this.contentTypeEnum.getPricesAsValue(), this._buildPricesTab)
            .set(this.contentTypeEnum.getDescriptionAsValue(), this._buildDescriptionTab)
            .set(this.contentTypeEnum.getInstructionAsValue(), this._buildInstructionTab)
            .set(this.contentTypeEnum.getReviewAsValue(), this._buildReviewTab)
            .set(this.contentTypeEnum.getNotationAsValue(), this._buildNotationTab)
            .set(this.contentTypeEnum.getPregnancyAsValue(), this._buildForPregnantTab)
            .set(this.contentTypeEnum.getAnalogsAsValue(), this._buildAnalogsTab);

        return this;
    }

    /**
     * @private
     * @method _buildTabs
     * @returns {Array}
     */
    _buildTabs() {
        return this._getTabs().map((item) => {
            item.component = React.createElement(this.componentsContainer.get(item.contentType));

            return item;
        });
    }

    /**
     * @private
     * @method _changeTab
     * @returns {Catalog}
     */
    _changeTab(currentTab) {
        this._getPresenter().changeTab(currentTab);

        return this;
    }

    /**
     * @private
     * @method _changeToPricesTab
     * @returns {Catalog}
     */
    _changeToPricesTab() {
        this._changeTab(this._getPricesTab());

        this.dom.scrollToElementBySelector(this.selectors.catalog, {behavior: "auto"});

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
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <>
                {this._hasFAQ() && (
                    <MicroDataFaq faq={this._getFAQ()} />
                )}

                {this._isAvailableMicrodataForMedicalPage() && (
                    <MicroDataMedicalWebPage
                        name={this._buildTitle()}
                        description={this._getPageInfo().getMeta().getDescription()}
                        datePublished={this._getCreatedDateAsString()}
                        dateModified={this._getLastUpdatedDateAsString()}
                        lastReviewed={this._getLastUpdatedDateAsString()}
                        author={this._getRedactor()}
                        censor={this._getReviewer()}
                    />
                )}

                <style jsx>
                    {styles}
                </style>

                <section className="catalog catalog--search">
                    <header className="catalog__header">
                        <Title config={this._getMainTitleConfig()} tag="h1" />

                        {this._isDisplayedRedactor() && (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col mb-20">
                                        <Redactor
                                            lastUpdateDate={this.props.options.initialData.lastUpdateDate}
                                            profile={this._getRedactor()}
                                            reviewer={this._getReviewer()}
                                            shortName
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </header>

                    <div className="catalog__body">
                        <div className="container-fluid">
                            <div className="page-section row row--no-horizontal-sm-margins">
                                <div className="col">
                                    <Tabs
                                        items={this._buildTabs()}
                                        className="new-super-box-shadow rounded-16 bg-white"
                                        onChange={this._changeTab}
                                        horizontal
                                    />
                                </div>
                            </div>
                        </div>

                        {this._isDisplayedPricesRubric() && (
                            <Prices
                                title={this._buildTitleForPricesRubric()}
                                rubrics={this.props.options.initialData.pricesAsRubric}
                                addToBasket={this._addToBasket}
                                viewAll={this._changeToPricesTab}
                            />
                        )}

                        {this._hasFAQ() && (
                            <div className="container-fluid">
                                <div className="row row--no-horizontal-sm-margins">
                                    <div className="col">
                                        <FAQ
                                            className="mt-40 faq--product"
                                            items={this._getFAQ()}
                                            title={this.stringsResource.frequentlyAskedQuestions}
                                            iconOpen="icon-chevron-down"
                                            iconClose="icon-chevron-up"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {this._hasBlogArticles() && (
                            <div className="blog mt-40">
                                <Blog rubric={this._getBlog()} />
                            </div>
                        )}

                        {this._hasViewedProductsAsRubric() && (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <Rubric items={this.state.viewedProducts} addToBasket={this._addToBasket} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </>
        );
    }
}

export default Catalog;
