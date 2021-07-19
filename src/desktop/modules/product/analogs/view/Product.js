/* eslint-disable max-len */
/* eslint-disable react/jsx-no-target-blank */

import React from "react";
// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import StatusTypeEnum from "app/core/utilites/enum/product/status/type";
import SellerEnum from "app/core/utilites/enum/seller";
import TabNameEnum from "app/core/utilites/enum/tab";
import DateEnum from "app/core/utilites/enum/date";
import ContentTypeEnum from "app/core/utilites/enum/contentType";
import ComponentClassNameEnum from "app/core/utilites/enum/componentClassName";

import Dom from "app/core/utilites/dom";
import Strings from "app/core/utilites/strings";
import Translator from "app/core/utilites/strings/translator";

import ModalDialogService from "app/core/services/modalDialog";

import Tabs from "app/core/components/tabs/Tabs";

import Rating from "components/rating/Rating";
import Rubric from "components/rubric/product/Rubric";
import BuyInOneClick from "components/buyInOneClick/BuyInOneClick";
import Analog from "components/analog/Analog";
import Redactor from "components/redactor/Redactor";
import MicroDataWebPage from "components/microData/WebPage";

import MicroDataProduct from "./microData/MicroData";
import BuyBlock from "./buyBlock/size/mini/BuyBlock";
import Tab from "./tabs/Tab";

import styles from "../styles/main.module.scss";

class Product extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _maxCommentsCountForMainTab
         * @type {number}
         * @private
         */
        this._maxCommentsCountForMainTab = 3;

        /**
         * @property _maxCommentsCountForReviewTab
         * @type {number}
         * @private
         */
        this._maxCommentsCountForReviewTab = 30;

        /**
         * @property _microData
         * @type {Object}
         * @private
         */
        this._microData = {
            maxCommentsCount: {}
        };

        /**
         * @property _componentsContainer
         * @type {Map}
         * @private
         */
        this._componentsContainer = new Map();

        /**
         * @property
         * @type {Object}
         */
        this.stringKeys = Translator.stringKeys;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = Translator.getInstance();

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property modalDialogService
         * @type {ModalDialog}
         */
        this.modalDialogService = ModalDialogService.getInstance();

        /**
         * @property tabNameEnum
         * @type {Enum}
         */
        this.tabNameEnum = TabNameEnum.getInstance();

        /**
         * @property componentClassNameEnumEnum
         * @type {Enum}
         */
        this.componentClassNameEnum = ComponentClassNameEnum.getInstance();

        /**
         * @property dateEnum
         * @type {Enum}
         */
        this.dateEnum = DateEnum.getInstance();

        /**
         * @property statusTypeEnum
         * @type {Enum}
         */
        this.statusTypeEnum = StatusTypeEnum.getInstance();

        /**
         * @property sellerEnum
         * @type {Enum}
         */
        this.sellerEnum = SellerEnum.getInstance();

        /**
         * @property contentTypeEnum
         * @type {Enum}
         */
        this.contentTypeEnum = ContentTypeEnum.getInstance();

        this.state = {
            viewedProductsAsRubric: [],
            // eslint-disable-next-line react/prop-types
            tabs: this.props.options.initialData.tabs,
            // eslint-disable-next-line react/prop-types
            review: this.props.options.initialData.review
        };

        this.changeTab = this.changeTab.bind(this);

        this._setTabs = this._setTabs.bind(this);

        this.openReviewTab = this.openReviewTab.bind(this);
        this._getCommentsCount = this._getCommentsCount.bind(this);
        this._getReviewFromState = this._getReviewFromState.bind(this);

        this._addToBasket = this._addToBasket.bind(this);
        this._toBuyInOneClick = this._toBuyInOneClick.bind(this);
        this._createOrderByOneClick = this._createOrderByOneClick.bind(this);

        this._buildMainTab = this._buildMainTab.bind(this);
        this._buildReviewTab = this._buildReviewTab.bind(this);
        this._buildAnalogsTab = this._buildAnalogsTab.bind(this);

        // eslint-disable-next-line no-underscore-dangle
        this._buildComponentsContainer()._buildMicroDataSettings();
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this._getAnalytics().pageEntry(this._getProduct());

        this._getAnalytics()
            .getEsputnik()
            .sendProductPageEvent(
                this._getProduct().getCode(),
                this._getProduct().getPrice().getCurrent(),
                this.statusTypeEnum.isAvailable(this._getProduct().getStatus().getType())
            );

        this._saveViewedProduct();
        this._getViewedProductsAsRubric();

        this._getAnalytics().showItem(this._getProduct().getStatus().getType(), this._getProduct().getCode());
    }

    /**
     * @method _isMainSeller
     * @return {boolean}
     * @private
     */
    _isMainSeller() {
        return this.sellerEnum.isMain(this._getProduct().getSeller().getAlias());
    }

    /**
     * @private
     * @method _hasComments
     * @returns {boolean}
     */
    _hasComments() {
        return Boolean(this._getCommentsCount());
    }

    /**
     * @method _hasViewedProductsAsRubric
     * @return {boolean}
     * @private
     */
    _hasViewedProductsAsRubric() {
        return Boolean(this.state.viewedProductsAsRubric.length);
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
     * @method _getModel
     * @returns {Object}
     */
    _getModel() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.model;
    }

    /**
     * @method _getPresenter
     * @return {Presenter}
     * @private
     */
    _getPresenter() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.presenter;
    }

    /**
     * @method _getAnalytics
     * @returns {Analytics}
     * @private
     */
    _getAnalytics() {
        return this._getPresenter().getAnalytics();
    }

    /**
     * @private
     * @method _getProduct
     * @returns {Object}
     */
    _getProduct() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.product;
    }

    /**
     * @private
     * @method _getReviewFromState
     * @returns {Review}
     */
    _getReviewFromState() {
        return this.state.review;
    }

    /**
     * @private
     * @method _getAnalogs
     * @returns {Rubric[]}
     */
    _getAnalogs() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.analogs;
    }

    /**
     * @method _getViewedProductsAsRubric
     * @private
     */
    _getViewedProductsAsRubric() {
        this._getModel().getViewedProductsAsRubric((items) => {
            this.setState({viewedProductsAsRubric: [items]});
        }, () => {});
    }

    /**
     * @private
     * @method _getCurrentTabs
     * @returns {Array}
     */
    _getCurrentTabs() {
        return this.state.tabs;
    }

    /**
     * @private
     * @method _getGenericName
     * @returns {string}
     */
    _getGenericName() {
        return this._getProduct().getGeneric().getAlias();
    }

    /**
     * @private
     * @method _getCurrentTabName
     * @returns {string}
     */
    _getCurrentTabName() {
        let currentTab = this._getCurrentTabs().find((tab) => tab.active);

        return (currentTab && currentTab.name) || "";
    }

    /**
     * @private
     * @method _buildTitle
     * @param title {string}
     * @returns {string}
     */
    _buildTitle(title) {
        return this.strings.writeLine(
            title,
            [
                `<span class="text-lowercase product-name">${this._getProduct().getName()}</span>`
            ]
        );
    }

    /**
     * @property _buildTitleForReviewTab
     * @returns {string}
     * @private
     */
    _buildTitleForReviewTab() {
        return this._buildTitle(this.stringsResource.review.about);
    }

    /**
     * @method _buildTitleForAnalogsTab
     * @returns {string}
     * @private
     */
    _buildTitleForAnalogsTab() {
        return this._buildTitle(this.stringsResource.analogsAndSubstitutesFor);
    }

    /**
     * @private
     * @method buildMainTab
     * @returns {string}
     */
    _buildMainTab() {
        return (
            <Tab title="" />
        );
    }

    /**
     * @private
     * @method _buildReviewTab
     * @returns {string}
     */
    _buildReviewTab() {
        return (
            <Tab title={this._buildTitleForReviewTab()} />
        );
    }

    /**
     * @private
     * @method _buildAnalogsTab
     * @returns {string}
     */
    _buildAnalogsTab() {
        return (
            <Tab
                title={this._buildTitleForAnalogsTab()}
                className="product-card__tab-analog bg-white"
            >
                <Analog items={this._getAnalogs()} selectItem={this._addToBasket} />
            </Tab>
        );
    }

    /**
     * @method _buildMicroDataSettings
     * @returns {Product}
     * @private
     */
    _buildMicroDataSettings() {
        this._microData.maxCommentsCount = {
            [this.tabNameEnum.getMainAsValue()]: this._maxCommentsCountForMainTab,
            [this.tabNameEnum.getReviewAsValue()]: this._maxCommentsCountForReviewTab
        };

        return this;
    }

    /**
     * @private
     * @method _buildComponentsContainer
     * @returns {Product}
     */
    _buildComponentsContainer() {
        this._componentsContainer
            .set(this.contentTypeEnum.getDefaultAsValue(), this._buildMainTab)
            .set(this.contentTypeEnum.getReviewAsValue(), this._buildReviewTab)
            .set(this.contentTypeEnum.getAnalogsAsValue(), this._buildAnalogsTab);

        return this;
    }

    /**
     * @private
     * @method buildTabs
     * @returns {Array}
     */
    buildTabs() {
        return this._getCurrentTabs().map((item) => {
            item.component = React.createElement(this._componentsContainer.get(item.contentType));

            return item;
        });
    }

    /**
     * todo REFACTORING
     *
     * @private
     * @method getMainTitle
     * @returns {string}
     */
    getMainTitle() {
        let tabName = this._getCurrentTabName(),
            title = this._getProduct().getName();

        if (this.tabNameEnum.isReview(tabName)) {
            title = this._buildTitleForReviewTab();
        }

        if (this.tabNameEnum.isAnalogs(tabName)) {
            title = this._buildTitleForAnalogsTab();
        }

        return title;
    }

    /**
     * @private
     * @method getRating
     * @returns {number}
     */
    getRating() {
        return this._hasComments() ? this._getProduct().getReview().getRating().getValue() : 0;
    }

    /**
     * @private
     * @method _getCommentsCount
     * @returns {number}
     */
    _getCommentsCount() {
        return this._getReviewFromState().getThreads().length && this._getProduct().getReview().getCommentsCount();
    }

    /**
     * @private
     * @method getMaxCommentsCountForMicroData
     * @returns {number}
     */
    getMaxCommentsCountForMicroData() {
        return this._microData.maxCommentsCount[this._getCurrentTabName()] || 0;
    }

    /**
     * @private
     * @method translateCommentsCount
     * @returns {string}
     */
    translateCommentsCount() {
        return this.translator.plural(this._getCommentsCount(), this.stringKeys.review);
    }

    /**
     * @private
     * @method changeTab
     * @returns {Product}
     */
    changeTab(currentTab) {
        this._getPresenter().changeTab(currentTab);

        return this;
    }

    /**
     * @method _saveViewedProduct
     * @return {Product}
     * @private
     */
    _saveViewedProduct() {
        this._getModel().addViewedProductId(this._getProduct().getId());

        return this;
    }

    /**
     * @private
     * @method _setTabs
     * @param tabs {Array}
     * @returns {Product}
     */
    _setTabs(tabs) {
        this.setState({tabs});

        return this;
    }

    /**
     * @private
     * @method openReviewTab
     * @returns {Product}
     */
    openReviewTab() {
        window.scrollTo(0, 0);

        this.changeTab({name: this.tabNameEnum.getReviewAsValue()});

        this._getAnalytics().showReviewsTab();

        return this;
    }

    /**
     * @private
     * @method _addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    _addToBasket(product, success, error) {
        this._getModel().addToBasket(
            product,
            () => {
                this._getAnalytics().addToBasket();

                success();
            },
            () => {
                this._getAnalytics().errorAddingToBasket();

                error();
            }
        );

        return this;
    }

    /**
     * @private
     * @method _toBuyInOneClick
     * @returns {Product}
     */
    _toBuyInOneClick() {
        this.modalDialogService.open({
            title: this.stringsResource.buyInOneClick,
            body: <BuyInOneClick create={this._createOrderByOneClick} />,
            size: this.modalDialogService.getSizes().getSm()
        });

        this._getAnalytics().buyInOneClick();

        return this;
    }

    /**
     * @private
     * @method _createOrderByOneClick
     * @param userData {{name: string, phone: string, email: string}}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    _createOrderByOneClick(userData, success, error) {
        this._getAnalytics()
            .getEsputnik()
            .sendCustomerDataEvent(
                userData.email,
                userData.name,
                userData.phone
            );

        this._getModel().buyInOneClick(
            userData,
            (data) => {
                success(data);

                this._getAnalytics()
                    .getEsputnik()
                    .sendPurchaseOneClickEvent(
                        data.msg,
                        [
                            {
                                productKey: this._getProduct().getCode(),
                                price: String(this._getProduct().getPrice().getCurrent()),
                                quantity: 1
                            }
                        ]
                    );
            },
            error
        );

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
                <MicroDataProduct
                    pageInfo={this._getPageInfo()}
                    product={this._getProduct()}
                    review={this._getReviewFromState()}
                    maxCommentsCount={this.getMaxCommentsCountForMicroData()}
                />

                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <section className="product-card product-card--full" data-productkey={this._getProduct().getCode()}>
                    <header className="product-card__header">
                        <div className="container-fluid">
                            <div className="row row--no-horizontal-sm-margins">
                                <div className="col">
                                    {/*<h1 className="product-card__name">{this._getProduct().getName()}</h1>*/}
                                    <h1
                                        className="product-card__name text-black"
                                        // eslint-disable-next-line react/no-danger
                                        dangerouslySetInnerHTML={{__html: this.getMainTitle()}}
                                    />

                                    {this._getModel().hasGeneric() && (
                                        <div className="product-card__generic text-black">
                                            {this.stringsResource.genericDrug}:&nbsp;

                                            <a href={this._getProduct().getGeneric().getUrl()}>
                                                {this._getProduct().getGeneric().getName()}
                                            </a>

                                            <span
                                                className="icon icon-info"
                                                onClick={() => this._showGenericDescription()}
                                                data-tooltip={this.HTMLResource.generic}
                                            />
                                        </div>
                                    )}

                                    {this._getModel().isVerifiedProduct() && (
                                        <Redactor
                                            className="mb-8"
                                            profile={this._getProduct().getRedactor()}
                                            reviewer={this._getProduct().getReviewer()}
                                            lastUpdateDate={this._getProduct().getLastUpdateDate()}
                                        />
                                    )}

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="product-card__rating d-flex align-items-center">
                                            <Rating className="d-inline-block" rating={this.getRating()} readonly />

                                            {this._hasComments() && (
                                                <a
                                                    onClick={this.openReviewTab}
                                                    className="whitespace-nowrap link-bordered"
                                                >
                                                    {this._getCommentsCount()} {this.translateCommentsCount()}
                                                </a>
                                            )}
                                        </div>

                                        <div className="product-card__code text-right">
                                            <span className="whitespace-nowrap d-none d-sm-inline-block">
                                                {this.stringsResource.productCode}:
                                            </span>

                                            <span className="whitespace-nowrap d-sm-none">
                                                {this.stringsResource.code}:
                                            </span>

                                            <span className="whitespace-nowrap text-black">
                                                &nbsp; {this._getProduct().getCode()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="product-card__body">
                        <div className="container-fluid">
                            <div className="page-section row row--no-horizontal-sm-margins">
                                <div className="col">
                                    <Tabs
                                        items={this.buildTabs()}
                                        className="tabs--sticky-header tabs--rounded-header"
                                        onChange={this.changeTab}
                                        horizontal
                                    />
                                </div>

                                <div className="col-xl-3 d-xl-block d-none">
                                    <BuyBlock
                                        className="product-card__buy-block"
                                        availableBasket={this._isMainSeller()}
                                        product={this._getProduct()}
                                        addToBasket={this._addToBasket}
                                        buyInOneClick={this._toBuyInOneClick}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {this._hasViewedProductsAsRubric() && (
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
            </>
        );
    }
}

export default Product;
