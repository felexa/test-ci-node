/* eslint-disable max-len */
/* eslint-disable react/jsx-no-target-blank */

import React from "react";
import Head from 'next/head';

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import StatusTypeEnum from "app/core/utilites/enum/product/status/type";
import SellerEnum from "app/core/utilites/enum/seller";
import TabNameEnum from "app/core/utilites/enum/tab";
import PropertyValuesEnum from "app/core/utilites/enum/product/property/values";
import PropertyGroupsEnum from "app/core/utilites/enum/product/property/group";
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
import Offer from "components/offer/Offer";
import Region from "components/address/region/Region";
import Redactor from "components/redactor/Redactor";
import Authorization from "components/authorization/Authorization";
import MicroDataFaq from "components/faq/microData/MicroData";
import MicroDataWebPage from "components/microData/WebPage";

import MicroDataProduct from "./microData/MicroData";
import BuyBlockXS from "./buyBlock/size/xs/BuyBlock";
import Tab from "./tabs/Tab";
import Main from "./tabs/main/Main";

import styles from "../styles/main.module.scss";

class Product extends React.Component {
    constructor(props) {
        super(props);

        let self = this;

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
         * @property notices
         * @type {Object}
         */
        //todo add to props types
        // eslint-disable-next-line react/prop-types
        this.notices = props.options.initialData.notices;

        /**
         * @property offers
         * @type {Object}
         */
        // eslint-disable-next-line react/prop-types
        this.offers = props.options.initialData.offers;

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
         * @property PropertyValuesEnum
         * @type {Enum}
         */
        this.PropertyValuesEnum = PropertyValuesEnum.getInstance();

        /**
         * @property PropertyGroupsEnum
         * @type {Enum}
         */
        this.PropertyGroupsEnum = PropertyGroupsEnum.getInstance();

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
            currentCity: {
                getName() {
                    return self.stringsResource.select.toLowerCase();
                }
            },
            // eslint-disable-next-line react/prop-types
            profile: this.props.options.initialData.profile,
            popularCities: [],
            deliveries: [],
            rubrics: this._getRubrics(),
            // eslint-disable-next-line react/prop-types
            review: this.props.options.initialData.review,
            viewedProductsAsRubric: [],
            // eslint-disable-next-line react/prop-types
            tabs: this.props.options.initialData.tabs,
            isVisibleBuyBlockXS: false
        };

        this.selectCity = this.selectCity.bind(this);
        this._selectDelivery = this._selectDelivery.bind(this);

        this.changeCity = this.changeCity.bind(this);
        this.changeTab = this.changeTab.bind(this);

        this._setTabs = this._setTabs.bind(this);

        this.openReviewTab = this.openReviewTab.bind(this);

        this._createReview = this._createReview.bind(this);
        this._createAnswerToReview = this._createAnswerToReview.bind(this);

        this.showGuarantee = this.showGuarantee.bind(this);

        this.getDeliveriesByCityId = this.getDeliveriesByCityId.bind(this);
        this.getPopularCities = this.getPopularCities.bind(this);
        this.getCitiesByName = this.getCitiesByName.bind(this);
        this.setPopularCities = this.setPopularCities.bind(this);
        this.setDeliveries = this.setDeliveries.bind(this);
        this.setRubrics = this.setRubrics.bind(this);
        this._getReviewFromState = this._getReviewFromState.bind(this);
        this._getCommentsCount = this._getCommentsCount.bind(this);
        this._getReviewByPage = this._getReviewByPage.bind(this);
        this._getAllAnswers = this._getAllAnswers.bind(this);
        this._getPreview = this._getPreview.bind(this);

        this._addToBasket = this._addToBasket.bind(this);
        this._toBuyInOneClick = this._toBuyInOneClick.bind(this);
        this._createOrderByOneClick = this._createOrderByOneClick.bind(this);
        this._showPropertyDescription = this._showPropertyDescription.bind(this);

        this._buildMainTab = this._buildMainTab.bind(this);
        this._buildReviewTab = this._buildReviewTab.bind(this);
        this._buildAnalogsTab = this._buildAnalogsTab.bind(this);

        this.showAllRecommendations = this.showAllRecommendations.bind(this);
        this.downloadCertificate = this.downloadCertificate.bind(this);
        this.clickOnGalleryThumb = this.clickOnGalleryThumb.bind(this);
        this._renderFootnotes = this._renderFootnotes.bind(this);
        this._getProfile = this._getProfile.bind(this);

        this._voteToReview = this._voteToReview.bind(this);
        this._uploadUnpackingPhoto = this._uploadUnpackingPhoto.bind(this);
        this._getReviewById = this._getReviewById.bind(this);

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

        this
            ._getModel()
            .getPopularCities((items) => {
                this.setPopularCities(items).selectCity(this._getModel().getDefaultCity());
            });

        this._getPresenter()
            .on("login", () => {
                this._getProfile();
                this._getReview();
            });

        this._saveViewedProduct();
        this._getViewedProductsAsRubric();
        this._getProfile();
        this._getReview();

        this._getAnalytics().showItem(this._getProduct().getStatus().getType(), this._getProduct().getCode());

        this._toggleStickyBuyButton();
    }

    /**
     * @protected
     * @method componentDidUpdate
     * @param prevProps {Object}
     * @returns {void}
     */
    componentDidUpdate(prevProps) {
        /* eslint-disable react/prop-types */
        this._updateRubricsFromProps(prevProps.options.initialData.rubrics);

        // if (this.props.options.initialData.tabs !== prevProps.options.initialData.tabs) {
        //     this._setTabs(this.props.options.initialData.tabs);
        // }
    }

    /**
     * @protected
     * @method componentWillUnmount
     * @returns {void}
     */
    componentWillUnmount() {
        this._getPresenter().off("login", this._getProfile);
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
     * @method _isAuthorized
     * @returns {boolean}
     */
    _isAuthorized() {
        return this._getPresenter().isAuthorized();
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
     * @private
     * @method _hasMicroDataFaq
     * @returns {boolean}
     */
    _hasMicroDataFaq() {
        return Boolean(this._getFaq().length);
    }

    /**
     * @private
     * @method _hasOffers
     * @return {boolean}
     */
    _hasOffers() {
        return Boolean(this.offers.length);
    }

    /**
     * @private
     * @method _hasRubrics
     * @returns {boolean}
     */
    _hasRubrics() {
        return Boolean(this.state.rubrics.length);
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
     * @method _getPreview
     * @returns {Image}
     */
    _getPreview() {
        return this._getProduct().getPreview();
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
     * @method _getProfileFromState
     * @returns {Profile}
     */
    _getProfileFromState() {
        return this.state.profile;
    }

    /**
     * @method _getAnalogsNotice
     * @returns {Object}
     * @private
     */
    _getAnalogsNotice() {
        return this._getModel().isVerifiedProduct() ? this.notices.analogs : null;
    }

    /**
     * @private
     * @method _getRubrics
     * @returns {Rubric[]}
     */
    _getRubrics() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.rubrics;
    }

    /**
     * @private
     * @method _getProfile
     * @returns {void}
     */
    _getProfile() {
        this._getPresenter().getProfile((profileEntity) => {
            this.setState({
                profile: profileEntity
            });
        });
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
     * @method _getReviewByPage
     * @returns {Product}
     */
    _getReviewByPage(page, success) {
        page((pageNumber) => {
            this
                ._getModel()
                .getReviewByPage(pageNumber, (review) => {
                    success(review);
                }, (error) => {
                    error();
                });
        });

        return this;
    }

    /**
     * @private
     * @method _getReviewById
     * @returns {Product}
     */
    _getReviewById(id, success) {
        this
            ._getPresenter()
            .getReviewById(id, (review) => {
                success(review);
            }, () => {
                console.log("error");
            });

        return this;
    }

    /**
     * @private
     * @method _getFaq
     * @returns {Array}
     */
    _getFaq() {
        return this.props.options.initialData.faq;
    }

    /**
     * @private
     * @method _getAllAnswers
     * @param thread {Thread}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    _getAllAnswers() {
        this.openReviewTab();

        return this;
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
     * @method _getFreeDeliveryLastDate
     * @returns {string}
     */
    _getFreeDeliveryLastDate() {
        return this.dateEnum.getFreeDeliveryLastDateAsValue();
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
     * @method _getPropertyDescriptionAsHtml
     * @param property {Object}
     * @returns {String}
     */
    _getPropertyDescriptionAsHtml(property) {
        // todo return property.getDescription()

        /* WhoCan */
        if (this.PropertyValuesEnum.isAllowed(property.getValue())) return this.HTMLResource.property.whoCan.allowed;
        if (this.PropertyValuesEnum.isProhibited(property.getValue())) return this.HTMLResource.property.whoCan.prohibited;
        if (this.PropertyValuesEnum.isCarefully(property.getValue())) return this.HTMLResource.property.whoCan.carefully;

        /* Prescription */
        if (this.PropertyGroupsEnum.isPrescription(property.getAlias()) && this.PropertyValuesEnum.isWithPrescription(property.getValue())) return this.HTMLResource.property.prescription.withPrescription;
        if (this.PropertyGroupsEnum.isPrescription(property.getAlias()) && this.PropertyValuesEnum.isWithoutPrescription(property.getValue())) return this.HTMLResource.property.prescription.withoutPrescription;

        /* Alcohol */
        if (this.PropertyGroupsEnum.isAlcohol(property.getAlias()) && this.PropertyValuesEnum.isMinimal(property.getValue())) return this.HTMLResource.property.alcohol.minimal;
        if (this.PropertyGroupsEnum.isAlcohol(property.getAlias()) && this.PropertyValuesEnum.isModerate(property.getValue())) return this.HTMLResource.property.alcohol.moderate;
        if (this.PropertyGroupsEnum.isAlcohol(property.getAlias()) && this.PropertyValuesEnum.isCritical(property.getValue())) return this.HTMLResource.property.alcohol.critical;
        if (this.PropertyGroupsEnum.isAlcohol(property.getAlias()) && this.PropertyValuesEnum.isAlcoholNoData(property.getValue())) return this.HTMLResource.property.alcohol.noData;

        /* Temperature */
        if (this.PropertyGroupsEnum.isTemperature(property.getAlias()) && this.PropertyValuesEnum.isFrom5to25(property.getValue())) return this.HTMLResource.property.temperature.from5to25;
        if (this.PropertyGroupsEnum.isTemperature(property.getAlias()) && this.PropertyValuesEnum.isFrom8to15(property.getValue())) return this.HTMLResource.property.temperature.from8to15;
        if (this.PropertyGroupsEnum.isTemperature(property.getAlias()) && this.PropertyValuesEnum.isFrom2to8(property.getValue())) return this.HTMLResource.property.temperature.from2to8;
        if (this.PropertyGroupsEnum.isTemperature(property.getAlias()) && this.PropertyValuesEnum.isFromMinus5toMinus18(property.getValue())) return this.HTMLResource.property.temperature.fromMinus5toMinus18;
        if (this.PropertyGroupsEnum.isTemperature(property.getAlias()) && this.PropertyValuesEnum.isBelow18(property.getValue())) return this.HTMLResource.property.temperature.below18;

        /* Children */
        if (this.PropertyGroupsEnum.isChildren(property.getAlias())) return this.HTMLResource.property.children;

        /* NoData */
        if (this.PropertyValuesEnum.isNoData(property.getAlias())) return this.HTMLResource.property.whoCan.noData;

        return ``;
    }

    /**
     * @private
     * @method _updateRubricsFromProps
     * @param prevRubrics {Array}
     * @returns {Product}
     */
    _updateRubricsFromProps(prevRubrics) {
        if (this._getRubrics() !== prevRubrics) {
            this.setState({
                rubrics: this._getRubrics()
            });
        }

        return this;
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
        let notices = this._getModel().isVerifiedProduct() ? this.notices : {};

        return (
            <Tab title="">
                <Main
                    profile={this._getProfileFromState()}
                    isAuthorized={this._isAuthorized()}
                    freeDeliveryLastDate={this._getFreeDeliveryLastDate()}
                    hasDelivery={this._isMainSeller()}
                    hasServices={this._isMainSeller()}
                    availableBasket={this._isMainSeller()}
                    notices={notices}
                    faq={this._getFaq()}
                    product={this._getProduct()}
                    currentCity={this.state.currentCity}
                    deliveries={this.state.deliveries}
                    changeCity={this.changeCity}
                    selectDelivery={this._selectDelivery}
                    selectProperty={this._showPropertyDescription}
                    addToBasket={this._addToBasket}
                    showGuarantee={this.showGuarantee}
                    buyInOneClick={this._toBuyInOneClick}
                    downloadCertificate={this.downloadCertificate}
                    clickOnGalleryThumb={this.clickOnGalleryThumb}
                    isVerifiedProduct={this._getModel().isVerifiedProduct()}
                    review={this._getReviewFromState()}
                    analytics={this._getAnalytics()}
                    getAllAnswers={this._getAllAnswers}
                    createAnswerToReview={this._createAnswerToReview}
                    openReviewTab={this.openReviewTab}
                    getCommentsCount={this._getCommentsCount}
                    createReview={this._createReview}
                    voteToReview={this._voteToReview}
                    upload={this._uploadUnpackingPhoto}
                    getReviewById={this._getReviewById}
                    reviewImages={this.props.options.initialData.reviewImages}
                />
            </Tab>
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
            />
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
     * @method setRubrics
     * @param rubrics {Rubric[]}
     * @returns {Product}
     */
    setRubrics(rubrics) {
        this.setState(function () {
            return {rubrics};
        });

        return this;
    }

    /**
     * @private
     * @method setPopularCities
     * @param popularCities {City[]}
     * @returns {Product}
     */
    setPopularCities(popularCities) {
        this.setState(function () {
            return {popularCities};
        });

        return this;
    }

    /**
     * @private
     * @method setCurrentCity
     * @param currentCity {City}
     * @returns {Product}
     */
    setCurrentCity(currentCity) {
        this.setState(function () {
            return {currentCity};
        });

        return this;
    }

    /**
     * @private
     * @method setDeliveries
     * @param deliveries {Delivery[]}
     * @returns {Product}
     */
    setDeliveries(deliveries) {
        this.setState(function () {
            return {deliveries};
        });

        return this;
    }

    /**
     * @private
     * @method getPopularCities
     * @param callback {Function}
     * @returns {Product}
     */
    getPopularCities(callback) {
        this._getModel().getPopularCities(callback);

        return this;
    }

    /**
     * @private
     * @method getCitiesByName
     * @param name {string}
     * @param callback {Function}
     * @returns {Product}
     */
    getCitiesByName(name, callback) {
        this._getModel().getCitiesByName(name, callback);

        return this;
    }

    /**
     * @private
     * @method getDeliveriesByCityId
     * @param id {string|number}
     * @param callback {Function}
     * @returns {Product}
     */
    getDeliveriesByCityId(id, callback) {
        this._getModel().getDeliveries(id, this._getProduct().getAlias(), callback);

        return this;
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
     * @method changeCity
     * @returns {Product}
     */
    changeCity() {
        this.modalDialogService.open({
            title: this.stringsResource.chooseYourCity,
            confirm: {
                title: this.stringsResource.apply,
                callback: () => {}
            },
            body: (
                <Region
                    popularCities={this.state.popularCities}
                    selectCity={this.selectCity}
                    getCitiesByName={this.getCitiesByName}
                />
            )
        });

        this._getAnalytics().changeCity();

        return this;
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
     * @private
     * @method selectCity
     * @param city {City}
     * @returns {Product}
     */
    selectCity(city) {
        this
            .setCurrentCity(city)
            .getDeliveriesByCityId(city.getId(), this.setDeliveries);

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
     * @method _showDeliveryDescription
     * @param delivery {Delivery}
     * @returns {Product}
     */
    _showDeliveryDescription(delivery) {
        this.modalDialogService.open({
            title: delivery.getTitle(),
            body: delivery.getDescription(),
            size: this.modalDialogService.getSizes().getSm(),
            type: this.modalDialogService.getTypes().getInfo(),
            html: true
        });

        return this;
    }

    /**
     * @private
     * @method _showPropertyDescription
     * @param property {Object}
     * @returns {Product}
     */
    _showPropertyDescription(property) {
        this.modalDialogService.open({
            title: property.getName(),
            body: this._getPropertyDescriptionAsHtml(property),
            size: this.modalDialogService.getSizes().getSm(),
            type: this.modalDialogService.getTypes().getInfo(),
            html: true
        });

        return this;
    }

    /**
     * @private
     * @method _selectDelivery
     * @param delivery {Region}
     * @returns {Product}
     */
    _selectDelivery(delivery) {
        this._showDeliveryDescription(delivery);

        this._getAnalytics().showDeliveryDetails();

        return this;
    }

    /**
     * @private
     * @method _setTabs
     * @param tabs {Array}
     * @returns {Product}
     */
    _setTabs(tabs) {
        this.setState({tabs, isVisibleBuyBlockXS: false});

        return this;
    }

    /**
     * @private
     * @method _getReview
     * @returns {Product}
     */
    _getReview() {
        this
            ._getPresenter()
            .getReview((review) => {
                this.setState({
                    review
                });
            }, () => {});

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
     * @method _createReview
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    _createReview(review, success, error) {
        this._getModel().createReview(review, success, error);

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
     * @method _createAnswerToReview
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    _createAnswerToReview(review, success, error) {
        this._getModel().createAnswerToReview(review, success, error);

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
     * @method _showAuthorization
     * @return {Product}
     * @private
     */
    _showAuthorization() {
        this.modalDialogService.open({
            size: this.modalDialogService.getSizes().getSm(),
            className: this.componentClassNameEnum.getAuthorizationModalAsValue(),
            body: (<Authorization confirm={() => this.modalDialogService.close()} />)
        });

        return this;
    }

    /**
     * @private
     * @method showAllRecommendations
     * @returns {Product}
     */
    showAllRecommendations() {
        this._getAnalytics().showAllRecomendations();

        return this;
    }

    /**
     * @private
     * @method showGuarantee
     * @param guarantee {Object}
     * @returns {Product}
     */
    showGuarantee(guarantee) {
        this.modalDialogService.open({
            size: this.modalDialogService.getSizes().getSm(),
            type: this.modalDialogService.getTypes().getInfo(),
            title: guarantee.title,
            body: guarantee.description
        });

        return this;
    }

    /**
     * @method _showGenericDescription
     * @return {Product}
     * @private
     */
    _showGenericDescription() {
        this.modalDialogService.open({
            size: this.modalDialogService.getSizes().getSm(),
            type: this.modalDialogService.getTypes().getInfo(),
            title: this.stringsResource.genericDrug,
            body: this.HTMLResource.generic
        });

        return this;
    }

    /**
     * @private
     * @method downloadCertificate
     * @returns {Product}
     */
    downloadCertificate() {
        this._getAnalytics().downloadCertificate();

        return this;
    }

    /**
     * @private
     * @method clickOnGalleryThumb
     * @returns {Product}
     */
    clickOnGalleryThumb() {
        this._getAnalytics().clickOnGalleryThumb();

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
     * @private
     * @method _renderFootnotes
     * @return {React.ReactElement}
     */
    _renderFootnotes() {
        return (
            <ol>
                {Object.values(this.notices).map((notice) => (
                    <li value={notice.getPosition()} id={`fn:${notice.getPosition()}`} key={notice.getPosition()}>
                        <span dangerouslySetInnerHTML={{__html: notice.getTitle()}} />
                        <div dangerouslySetInnerHTML={{__html: notice.getDescription()}} />
                    </li>
                ))}
            </ol>
        );
    }

    /**
     * @private
     * @method _voteToReview
     * @param thread {Thread}
     * @param voteType {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    _voteToReview(thread, voteType, success, error) {
        if (this._isAuthorized()) {
            this._getModel().voteToReview(thread, voteType, success, error);
        } else {
            this._showAuthorization();
            error();
        }

        return this;
    }

    /**
     * @private
     * @method _toggleStickyBuyButton
     * @returns {Product}
     */
    _toggleStickyBuyButton() {
        let headerHeightAsPx = 100,
            buyButtonClassName = ".buy-button, .inform-about-availability-col",
            buyButtonTopOffset = this.dom.getBoundingClientRect(buyButtonClassName) - headerHeightAsPx + this.dom.getScrollY();

        window.addEventListener('scroll', () => {
            let isVisibleBuyBlockXS = this.dom.getPageYOffset() > buyButtonTopOffset;

            if (isVisibleBuyBlockXS !== this.state.isVisibleBuyBlockXS) {
                this.setState({
                    isVisibleBuyBlockXS
                });
            }
        });

        return this;
    }

    /**
     * @private
     * @method _uploadUnpackingPhoto
     * @param image {string}
     * @param type {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    _uploadUnpackingPhoto(image, type, success, error) {
        this._getPresenter().upload(image, type, success, error);

        return this;
    }

    /**
     * @private
     * @method _renderHead
     * @returns {React.element}
     */
    _renderHead() {
        let desktopStyles = "html{box-sizing:border-box;-ms-overflow-style:scrollbar}*,:after,:before{box-sizing:inherit}.container-fluid{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}.row{display:flex;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}.col,.col-12,.col-lg-6,.col-md-6,.col-md-12{position:relative;width:100%;padding-right:15px;padding-left:15px}.col{flex-basis:0;flex-grow:1;max-width:100%}.col-12{flex:0 0 100%;max-width:100%}@media (min-width:768px){.col-md-6{flex:0 0 50%;max-width:50%}.col-md-12{flex:0 0 100%;max-width:100%}}@media (min-width:992px){.col-lg-6{flex:0 0 50%;max-width:50%}}.d-none{display:none!important}.d-inline-block{display:inline-block!important}.d-block{display:block!important}.d-flex{display:flex!important}.d-inline-flex{display:inline-flex!important}@media (min-width:576px){.d-sm-none{display:none!important}.d-sm-inline-block{display:inline-block!important}}@media (min-width:768px){.d-md-none{display:none!important}.d-md-inline-block{display:inline-block!important}.d-md-block{display:block!important}}@media (min-width:992px){.d-lg-none{display:none!important}.d-lg-block{display:block!important}}@media (min-width:1200px){.d-xl-none{display:none!important}.d-xl-inline-block{display:inline-block!important}.d-xl-block{display:block!important}.d-xl-flex{display:flex!important}}.mb-0{margin-bottom:0!important}@media (min-width:768px){.mb-md-0{margin-bottom:0!important}}body{font-family:Roboto,sans-serif;font-size:14px;line-height:1.286;color:rgba(57,69,86,.6);background-color:#fafafb;-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;-ms-font-smoothing:antialiased;-o-font-smoothing:antialiased;font-smoothing:antialiased}a{text-decoration:underline;background-color:transparent}a{color:#2270ee}@font-face{font-family:icomoon;src:url(https://cdn.apteka24.ua/_next/static/chunks/fonts/icomoon.27440093-2744009323c68fa3e20be9f4d46dfbfd.eot);src:url(https://cdn.apteka24.ua/_next/static/chunks/fonts/icomoon.27440093-2744009323c68fa3e20be9f4d46dfbfd.eot) format(\"embedded-opentype\"),url(https://cdn.apteka24.ua/_next/static/chunks/fonts/icomoon.02e9aacf-02e9aacfadf4685a5dbe58d7a9fe8f3e.ttf) format(\"truetype\"),url(https://cdn.apteka24.ua/_next/static/chunks/fonts/icomoon.cbfcf084-cbfcf08405c040f4481d9c0ef9a8bb03.woff) format(\"woff\");font-weight:400;font-style:normal;font-display:block}.icon{font-family:icomoon!important;speak:never;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;position:relative;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-arrow-down:before{content:\"\\E902\"}.icon-cart:before{content:\"\\E909\"}.icon-chevron-down:before{content:\"\\E90F\"}.icon-chevron-right:before{content:\"\\E911\"}.icon-done:before{content:\"\\E91A\"}.icon-earphone:before{content:\"\\E91C\"}.icon-heart:before{content:\"\\E923\"}.icon-home:before{content:\"\\E925\"}.icon-menu-hamburger:before{content:\"\\E929\"}.icon-minus:before{content:\"\\E92C\"}.icon-plus:before{content:\"\\E932\"}.icon-search:before{content:\"\\E93A\"}.icon-widget:before{content:\"\\E948\"}.flex-column{flex-direction:column!important}.flex-grow-1{flex-grow:1!important}.justify-content-end{justify-content:flex-end!important}.justify-content-center{justify-content:center!important}.justify-content-between{justify-content:space-between!important}.align-items-center{align-items:center!important}.align-self-end{align-self:flex-end!important}@media (min-width:768px){.flex-md-row{flex-direction:row!important}}.text-right{text-align:right}.text-center{text-align:center}.text-small{font-size:12px;line-height:1.12}.text-large{font-size:18px;line-height:1.35}.text-lowercase{text-transform:lowercase}.text-uppercase{text-transform:uppercase}.text-pink{color:#f36}.text-black{color:#212121}.rounded-10{-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px}.bg-primary{background:#394556}.reset-btn-styles{margin:0;padding:0;background:none}.reset-btn-styles{border:none;outline:none}h1{margin-top:0;margin-bottom:10px;color:#3a5565}h1{font-size:36px}h1{line-height:1.286;font-weight:300}.btn-default{margin-bottom:0;display:inline-block;font-family:Roboto,sans-serif;font-weight:400;text-align:center;text-decoration:none;vertical-align:middle;white-space:nowrap;touch-action:manipulation;background-image:none;border:1px solid #f36;color:#fff;background-color:#f36}.btn-default .icon{margin-right:2px}.btn-default--outline{margin-bottom:0;display:inline-block;font-family:Roboto,sans-serif;font-weight:400;text-align:center;text-decoration:none;vertical-align:middle;white-space:nowrap;touch-action:manipulation;background-image:none;border:1px solid rgba(0,0,0,.12);color:#f36;background-color:transparent}.btn-md{padding:8px 12px;font-size:16px}.btn-md{-webkit-border-radius:50px;-moz-border-radius:50px;border-radius:50px;line-height:1.35;font-weight:500}.btn-block{width:100%;display:block}.alert-default,.alert-info{padding:16px;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;font-size:14px}.alert-default{border:1px solid #e7e7e7;color:#212121;background-color:#fbfbfb}.alert-info{border:1px solid rgba(112,176,247,.121569);color:#212121;background-color:rgba(141,192,249,.121569)}.tabs{width:100%}.tabs__header{border-bottom:1px solid rgba(136,143,154,.16)}.tabs__header .tabs__items{position:relative;top:1px;margin:0;padding:0;list-style:none}.tabs__header .tabs__items .items__item{position:relative;border-bottom:2px solid transparent;display:inline-block}.tabs__header .tabs__items .items__item.active{border-color:#f36}.tabs__header .tabs__items .items__item.active a{color:#f36!important}.tabs__header .tabs__items .items__item a{margin:0;padding:14px 24px;display:block;text-decoration:none;line-height:1.286;font-size:14px;font-weight:500}.tabs__header .tabs__items .items__item a:link,.tabs__header .tabs__items .items__item a:visited{text-decoration:none;text-align:center;vertical-align:middle;color:rgba(57,69,86,.6)}.tabs__body{margin-top:24px}@font-face{font-family:Roboto;font-style:normal;font-weight:100;src:local(\"Roboto Thin\"),local(\"Roboto-Thin\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/100/cyrillic-ext-100.woff2) format(\"woff2\");unicode-range:U+0460-052f,U+1c80-1c88,U+20b4,U+2de0-2dff,U+a640-a69f,U+fe2e-fe2f;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:100;src:local(\"Roboto Thin\"),local(\"Roboto-Thin\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/100/cyrillic-100.woff2) format(\"woff2\");unicode-range:U+0400-045f,U+0490-0491,U+04b0-04b1,U+2116;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:100;src:local(\"Roboto Thin\"),local(\"Roboto-Thin\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/100/greek-ext-100.woff2) format(\"woff2\");unicode-range:U+1f??;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:100;src:local(\"Roboto Thin\"),local(\"Roboto-Thin\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/100/greek-100.woff2) format(\"woff2\");unicode-range:U+0370-03ff;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:100;src:local(\"Roboto Thin\"),local(\"Roboto-Thin\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/100/latin-ext-100.woff2) format(\"woff2\");unicode-range:U+0100-024f,U+0259,U+1e??,U+2020,U+20a0-20ab,U+20ad-20cf,U+2113,U+2c60-2c7f,U+a720-a7ff;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:100;src:local(\"Roboto Thin\"),local(\"Roboto-Thin\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/100/latin-100.woff2) format(\"woff2\");unicode-range:U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+2000-206f,U+2074,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:300;src:local(\"Roboto Light\"),local(\"Roboto-Light\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/300/cyrillic-ext-300.woff2) format(\"woff2\");unicode-range:U+0460-052f,U+1c80-1c88,U+20b4,U+2de0-2dff,U+a640-a69f,U+fe2e-fe2f;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local(\"Roboto Regular\"),local(\"Roboto-Regular\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/400/cyrillic-ext-400.woff2) format(\"woff2\");unicode-range:U+0460-052f,U+1c80-1c88,U+20b4,U+2de0-2dff,U+a640-a69f,U+fe2e-fe2f;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local(\"Roboto Regular\"),local(\"Roboto-Regular\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/400/cyrillic-400.woff2) format(\"woff2\");unicode-range:U+0400-045f,U+0490-0491,U+04b0-04b1,U+2116;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local(\"Roboto Regular\"),local(\"Roboto-Regular\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/400/greek-ext-400.woff2) format(\"woff2\");unicode-range:U+1f??;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local(\"Roboto Regular\"),local(\"Roboto-Regular\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/400/greek-400.woff2) format(\"woff2\");unicode-range:U+0370-03ff;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local(\"Roboto Regular\"),local(\"Roboto-Regular\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/400/latin-ext-400.woff2) format(\"woff2\");unicode-range:U+0100-024f,U+0259,U+1e??,U+2020,U+20a0-20ab,U+20ad-20cf,U+2113,U+2c60-2c7f,U+a720-a7ff;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local(\"Roboto Regular\"),local(\"Roboto-Regular\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/400/latin-400.woff2) format(\"woff2\");unicode-range:U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+2000-206f,U+2074,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:500;src:local(\"Roboto Medium\"),local(\"Roboto-Medium\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/500/cyrillic-ext-500.woff2) format(\"woff2\");unicode-range:U+0460-052f,U+1c80-1c88,U+20b4,U+2de0-2dff,U+a640-a69f,U+fe2e-fe2f;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:500;src:local(\"Roboto Medium\"),local(\"Roboto-Medium\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/500/cyrillic-500.woff2) format(\"woff2\");unicode-range:U+0400-045f,U+0490-0491,U+04b0-04b1,U+2116;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:500;src:local(\"Roboto Medium\"),local(\"Roboto-Medium\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/500/greek-ext-500.woff2) format(\"woff2\");unicode-range:U+1f??;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:500;src:local(\"Roboto Medium\"),local(\"Roboto-Medium\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/500/greek-500.woff2) format(\"woff2\");unicode-range:U+0370-03ff;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:500;src:local(\"Roboto Medium\"),local(\"Roboto-Medium\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/500/latin-ext-500.woff2) format(\"woff2\");unicode-range:U+0100-024f,U+0259,U+1e??,U+2020,U+20a0-20ab,U+20ad-20cf,U+2113,U+2c60-2c7f,U+a720-a7ff;font-display:swap}@font-face{font-family:Roboto;font-style:normal;font-weight:500;src:local(\"Roboto Medium\"),local(\"Roboto-Medium\"),url(https://d22bn8tviy9ll4.cloudfront.net/fonts/Roboto/500/latin-500.woff2) format(\"woff2\");unicode-range:U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+2000-206f,U+2074,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd;font-display:swap}.row{margin-right:-4px;margin-left:-4px}.row .col,.row [class*=col-]{padding-right:4px;padding-left:4px}[class*=container-]{max-width:1376px}@media screen and (max-width:767px){.row.row--no-horizontal-sm-margins{margin-right:-15px;margin-left:-15px}.row.row--no-horizontal-sm-margins>.col{padding-left:0;padding-right:0}}@media screen and (min-width:768px){.row{margin-right:-8px;margin-left:-8px}.row .col,.row [class*=col-]{padding-right:8px;padding-left:8px}}:root{--swiper-theme-color:#007aff}.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;box-sizing:content-box}.swiper-wrapper{transform:translateZ(0)}.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative}:root{--swiper-navigation-size:44px}.header{margin-bottom:18px}.header .language{margin-right:40px}.header .header-white-color{color:hsla(0,0%,100%,.95)}.header button{padding:0}.header>div{padding:8px 0}.header>div:first-child{position:relative;color:hsla(0,0%,100%,.95)}.header>div:nth-child(2){background-color:#394556;box-shadow:0 4px 20px rgba(57,69,86,.1);color:#212121}.header .header__body{margin-left:-9px;margin-right:-9px}.header .header__body .header__item{padding:0 9px;z-index:3}.header .header__body .header__item--search-z-index{z-index:4}.company-phone{margin-right:20px;font-size:20px;line-height:1;font-weight:700;white-space:nowrap;text-decoration:none}.company-phone .icon{width:21px;height:21px;margin-right:14px;font-size:21px;color:#909aaa}.company-phone a{text-decoration:none}.company-phone p{font-size:12px;line-height:1.12;font-weight:400;margin:4px 0 0}.common-navigation{padding:0;margin:0 -20px;list-style:none;text-transform:uppercase;font-size:13px}.common-navigation li{padding:0 5px}.company-logo{width:17%;max-width:207px}.company-logo img{width:100%}.mobile-header{min-height:40px}.mobile-header .catalog-navigation .toggle-catalog-list .icon-menu-hamburger{height:20px;width:20px;font-size:20px;color:#fff}.mobile-header .toggle-product-cart{position:relative}.mobile-header .toggle-product-cart .icon{font-size:22px;width:22px;height:22px}.catalog-navigation .toggle-catalog-list{padding:0;background-color:transparent;color:#909aaa;font-weight:500;font-size:16px;line-height:20px;z-index:5;border:none;outline:none}.catalog-navigation .toggle-catalog-list .toggle-catalog-list--title{margin-left:14px}.to-wishlist,.toggle-product-cart{padding:0;margin:0;border:none;outline:none;height:40px;width:40px;background-color:transparent;color:#fff}.to-wishlist .icon,.toggle-product-cart .icon{margin:auto;position:relative;font-size:40px;width:40px;height:40px}@media screen and (max-width:991px){.header+*{position:relative}.header{margin-bottom:16px;position:sticky;width:100%;top:0;z-index:5}}@media screen and (min-width:1200px){.header>div:nth-child(2){background-color:#fff;max-height:79px}.header .header__body{margin-left:-12px;margin-right:-12px}.header .header__body .header__item{padding:0 12px}.header>div{padding:12px 0}.common-navigation{font-size:14px}.common-navigation li{padding:0 12px}.catalog-navigation .toggle-catalog-list{padding:10px 18px;border:1px solid rgba(136,143,154,.16);border-radius:50px;color:#394556;background-color:#fff}.catalog-navigation .toggle-catalog-list .icon{font-size:20px;width:20px;height:20px;color:#909aaa}.to-wishlist .icon,.toggle-product-cart .icon{color:#909aaa}}@media screen and (min-width:1200px){.common-navigation li{padding:0 18px}.company-phone{margin-right:45px}}.catalog-menu{position:fixed;width:100%;z-index:6}.catalog-menu,.page-overlay{top:0;bottom:0;right:0;left:0}.page-overlay{position:absolute;height:100%;background-color:#fff;z-index:4}@media screen and (min-width:1200px){.catalog-menu{position:absolute;top:136px;background-color:transparent}.page-overlay{background-color:rgba(0,0,0,.3)}}.search{width:100%;position:relative}.search .to-search{position:absolute;top:0;left:15px;padding:0;margin-left:0;height:100%;border:none;outline:none;background-color:transparent;font-size:25px;color:#909aaa;display:flex;align-items:center}.search .to-search .icon{left:-6px}.search .search__input{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:100%;padding:11px 36px 11px 40px;font-size:16px;font-family:BlinkMacSystemFont,-apple-system,Roboto,sans-serif;line-height:19px;background:#f9f9fb;border-radius:21px;outline:none;color:#212121;border:1px solid rgba(136,143,154,.16)}@media screen and (max-width:1199px){.search{width:90%;margin:auto}.search .search__input{padding-top:10px;padding-bottom:10px}.search .to-search{right:20px}}.language{margin:0;padding:0;list-style:none}.language li{display:inline-block;color:#eee}.language li:not(.active){font-weight:500;color:#fff}.language li+li{margin-left:5px}.account.account--mini{min-width:130px;min-height:36px}.price{display:inline-block;font-size:36px;line-height:1;color:rgba(0,0,0,.87);font-weight:500;white-space:nowrap}.price .price__value{margin-right:.3ch}.price .price__currency{font-size:70%}.rating{white-space:nowrap}.to-basket{height:46px}.to-basket.to-basket--with-price:not(.to-basket--in-basket) .buy-icons{display:none}.to-basket .buy-icons{min-width:16px;min-height:16px}.to-basket .icon{margin-right:8px;position:relative}.to-basket .icon-cart{font-size:16px;height:16px;width:16px}.to-basket .icon--default{position:relative;margin-right:8px}.to-basket .icon--hovered,.to-basket .icon--hovered:after{display:none}.to-basket .price{color:#fff;font-size:16px}.add-to-wishlist{width:40px;height:40px;border-radius:10px}.add-to-wishlist .icon{font-size:23px;width:23px;height:23px;font-weight:400;color:rgba(57,69,86,.6)}.bonus-cashback{color:#212121;font-size:15px;margin-bottom:8px;min-height:20px}.bonus-cashback img{width:20px;height:20px;margin-right:5px}.bonus-cashback .bonus-cashback__amount{border-bottom:1px dashed #ff5c00}@media screen and (min-width:768px){.bonus-cashback{margin-bottom:0}}.product-card.product-card--xs .to-basket .icon{font-size:20px!important;width:20px;height:20px}.product-card.product-card--xs .to-basket .icon{margin:0}.whitespace-nowrap{white-space:nowrap}.text-decoration-none{text-decoration:none}.f-weight-5{font-weight:500}.f-weight-7{font-weight:700}.bg-white{background-color:#fff}.bg-gray{background-color:#f5f7fa}.color-gray{color:rgba(57,69,86,.6)}.color-white{color:#fff}.color-orange{color:#ff5c00}.link-bordered{text-decoration:none;border-bottom:1px dashed #2270ee}.mb-16{margin-bottom:16px}.mb-20{margin-bottom:20px}.mb-24{margin-bottom:24px}.mb-30{margin-bottom:30px}.mt-24{margin-top:24px}.mr-6{margin-right:6px}@media screen and (min-width:768px){.mb-md-0{margin-bottom:0}}@media screen and (min-width:1200px){.mb-xl-10{margin-bottom:10px}}.p-16{padding:16px}@media screen and (max-width:991px){h1{font-size:24px}}.position-relative{position:relative}.position-fixed{position:fixed}.bottom-0{bottom:0}.h-100{height:100%}.w-100{width:100%}.mw-100{max-width:100%}.custom-scroll::-webkit-scrollbar{width:4px;height:4px}.custom-scroll::-webkit-scrollbar-thumb{background:rgba(57,69,86,.6);border-radius:2px}.base-border-top{border-top:1px solid rgba(136,143,154,.16)}.promo-banner{height:34px;min-height:34px;width:auto;position:relative;overflow:hidden}.breadcrumbs .breadcrumbs__items{display:flex;margin:0;padding:0 0 7px;list-style:none;overflow:auto;min-height:18px}.breadcrumbs .item{display:flex;align-items:center}.breadcrumbs .item a,.breadcrumbs .item span{color:#2270ee;text-decoration:none;font-size:13px;line-height:15px;white-space:nowrap}.breadcrumbs .item .current-page{color:#212121}.breadcrumbs .item .icon{color:#909aaa;margin:0 3px;font-size:19px;width:19px;height:19px}.breadcrumbs .item .icon-home{display:none;font-size:15px;width:15px;height:15px;margin:0}.breadcrumbs .item:first-child{padding-left:16px}.breadcrumbs .item:last-child{padding-right:16px}.breadcrumbs .item__home-page{min-width:40px}@media screen and (max-width:767px){.breadcrumbs .breadcrumbs__items{padding:0}.breadcrumbs:not(.breadcrumbs__empty) .item:not(:nth-last-child(2)){display:none}.breadcrumbs:not(.breadcrumbs__empty) .item:nth-last-child(2) .icon{order:1;transform:rotate(180deg)}.breadcrumbs:not(.breadcrumbs__empty) .item:nth-last-child(2) a{order:2}.breadcrumbs:not(.breadcrumbs__empty) .item:first-child{margin-left:-8px}.breadcrumbs:not(.breadcrumbs__empty) .item:first-child .icon{order:1;transform:rotate(180deg)}.breadcrumbs:not(.breadcrumbs__empty) .item:first-child a{order:2}}@media screen and (min-width:768px){.breadcrumbs:not(.breadcrumbs__empty) .item .home-page-link__text{display:none}.breadcrumbs:not(.breadcrumbs__empty) .item .icon-home{display:inline-block}}@media screen and (min-width:768px){.breadcrumbs .item:first-child{padding-left:0}.breadcrumbs .item:last-child{padding-right:0}}.footer .footer-item__title{display:inline-block;font-size:18px;font-weight:500;line-height:1.12;color:hsla(0,0%,100%,.9)}.footer .footer__warning img:first-child{height:120px}@media screen and (max-width:991px){.footer .footer-separate{background:rgba(136,143,154,.16);height:1px;border:0;margin:20px -8px 3px}}@media screen and (min-width:992px){.footer .footer-separate{display:none}}@media screen and (min-width:768px){.footer .footer__warning img:first-child{height:170px}}@media screen and (max-width:991px){.footer .footer-item__title{width:100%;padding:14px 0}.footer .footer-item__title .icon{color:#909aaa;font-size:37px}.footer .footer-item__title .icon-minus{display:none;transform:scale(.8)}}@media screen and (min-width:992px){.footer .footer-item__title{margin-bottom:24px;font-size:18px}}body{padding:0;margin:0;background-color:#f5f7fa;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:BlinkMacSystemFont,-apple-system,Roboto,sans-serif}#__next,.layout{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:stretch}.btn-default,.btn-default--outline,button{font-family:BlinkMacSystemFont,-apple-system,Roboto,sans-serif}button:not([class*=btn]){background-color:transparent}.btn-md{padding:12px 16px;box-sizing:border-box;line-height:1.3}@media screen and (min-width:1200px){.promo-banner+.catalog-menu{top:167px}}._lqEjs{overflow:hidden;position:relative;display:flex;align-items:center;outline:none}.tabs--horizontal .tabs__header{text-transform:uppercase}.tabs--horizontal .tabs__header .tabs__items{padding:0 24px!important;overflow-y:hidden}.tabs--horizontal .tabs__header .tabs__items .items__item{border:none!important}.tabs--horizontal .tabs__header .tabs__items .items__item.active.active:after{content:\"\";position:absolute;bottom:0;width:100%;height:3px;background-color:#f36;border-top-left-radius:3px;border-top-right-radius:3px}.tabs--horizontal .tabs__items{display:flex}.tabs--horizontal .tabs__items>*{white-space:nowrap}.to-basket{height:46px}.to-basket.to-basket--with-price:not(.to-basket--in-basket) .buy-icons{display:none}.to-basket .buy-icons{min-width:16px;min-height:16px}.to-basket .icon{margin-right:8px;position:relative}.to-basket .icon-cart{font-size:16px;height:16px;width:16px}.to-basket .icon--default{position:relative;margin-right:8px}.to-basket .icon--hovered,.to-basket .icon--hovered:after{display:none}.to-basket .price{color:#fff;font-size:16px}.whitespace-nowrap{white-space:nowrap}.text-decoration-none{text-decoration:none}.f-weight-5{font-weight:500}.f-weight-7{font-weight:700}.bg-white{background-color:#fff}.bg-gray{background-color:#f5f7fa}.color-gray{color:rgba(57,69,86,.6)}.color-white{color:#fff}.color-orange{color:#ff5c00}.link-bordered{text-decoration:none;border-bottom:1px dashed #2270ee}.mb-16{margin-bottom:16px}.mb-20{margin-bottom:20px}.mb-24{margin-bottom:24px}.mb-30{margin-bottom:30px}.mt-24{margin-top:24px}.mr-6{margin-right:6px}@media screen and (min-width:768px){.mb-md-0{margin-bottom:0}}@media screen and (min-width:1200px){.mb-xl-10{margin-bottom:10px}}.p-16{padding:16px}@media screen and (max-width:991px){h1{font-size:24px}}.position-relative{position:relative}.position-fixed{position:fixed}.bottom-0{bottom:0}.h-100{height:100%}.w-100{width:100%}.mw-100{max-width:100%}.custom-scroll::-webkit-scrollbar{width:4px;height:4px}.custom-scroll::-webkit-scrollbar-thumb{background:rgba(57,69,86,.6);border-radius:2px}.base-border-top{border-top:1px solid rgba(136,143,154,.16)}.gallery{margin-bottom:16px}.gallery .slider .swiper-container{height:100%}.gallery .tridi{position:relative;height:100%}.gallery .tridi:after{content:\"\";position:absolute;z-index:3;left:0;right:0;bottom:0;width:100%;height:30px;background:linear-gradient(0deg,#fff 0,hsla(0,0%,100%,0))}.gallery .tridi>div{height:100%}.gallery img{height:100%;width:100%;margin:auto;object-fit:contain}.gallery .gallery__modal{height:500px}.gallery .gallery__body{width:calc(100% - 56px);margin-left:auto;order:2}.gallery .gallery__footer{order:1;padding-right:6px;overflow:auto;-ms-overflow-style:none;scrollbar-width:none}.gallery .gallery__footer::-webkit-scrollbar{display:none}.gallery .gallery__view{height:100%}@media screen and (max-width:1199px){.gallery .gallery__modal{height:300px}}@media screen and (max-width:575px){.gallery .gallery__modal{height:235px}}.thread-review.thread-review--base .action-bar .action-bar__vote-buttons .vote-buttons__description{margin-right:12px;color:rgba(57,69,86,.6)}@media screen and (max-width:767px){.thread-review.thread-review--base .action-bar .vote-buttons__description{display:none}}.rating{white-space:nowrap}.review.review--mini .thread-review .action-bar .vote-buttons__description{display:none}.rubric.rubric--product footer{display:none}.rubric.rubric--product footer button{margin-top:24px;border:1px solid #f36;border-radius:100px;font-size:14px;padding:16px 34px}.rubric.rubric--product footer button .icon{margin-left:5px;line-height:1}@media screen and (max-width:768px){.rubric.rubric--product footer button{padding:12px 24px}}.seller{border:1px solid rgba(136,143,154,.16);border-radius:10px;color:#212121}.seller .seller__name strong{font-weight:500}.seller .seller__body>div{height:20px}.seller .seller-logo{max-height:20px;width:auto;height:auto}@media screen and (max-width:575px){.seller .seller__name{margin-bottom:0}.seller .seller__body>div{height:26px}}.status{display:inline-flex;align-items:center;padding:6px 10px 6px 6px;border-radius:20px;color:#00a046;font-size:14px;line-height:1.2}.status .status__icon{width:20px;height:20px;margin-right:8px;font-size:16px;display:flex;justify-content:center;align-items:center;text-align:center;color:#fff}.status .status__title{font-size:12px;line-height:normal;white-space:nowrap}.status[data-status-id=in-stock]{background-color:rgba(0,160,70,.08)}.status[data-status-id=in-stock] .status__icon{background-color:#00a046}@media screen and (max-width:575px){.status{padding:8px 12px 8px 8px}.status .status__title{line-height:21px}}.buy-block.buy-block--xs{z-index:5}.buy-block.buy-block--xs .buy-block__body:not(:empty){padding:6px 12px 17px}.buy-block.buy-block--xs .buy-block__body:not(:empty) button{padding-left:16px;padding-right:16px}.bonus-cashback{color:#212121;font-size:15px;margin-bottom:8px;min-height:20px}.bonus-cashback img{width:20px;height:20px;margin-right:5px}.bonus-cashback .bonus-cashback__amount{border-bottom:1px dashed #ff5c00}@media screen and (min-width:768px){.bonus-cashback{margin-bottom:0}}.buy-block .add-to-wishlist{align-self:flex-end}.buy-block .product-card__prices-current{display:flex;justify-content:space-between;flex-direction:column;order:2}.buy-block .product-card__bonus{font-size:15px;order:1}@media screen and (max-width:991px) and (min-width:768px){.buy-block .to-basket{margin-bottom:24px}.buy-block .product-card__prices-current{flex-direction:row;align-items:center}}@media screen and (min-width:768px){.buy-block .product-card__prices-current{flex-direction:row;align-items:center;order:1}.buy-block .product-card__prices-current .price{margin-right:24px}.buy-block .product-card__bonus{margin-bottom:0;margin-top:10px}}.breadcrumbs{margin-bottom:10px}.product-card.product-card--full .delivery{position:relative;width:100%;color:#212121}.product-card.product-card--full .delivery .delivery__header{padding:16px;border:1px solid rgba(136,143,154,.16);font-size:16px;border-top-left-radius:10px;border-top-right-radius:10px}.product-card.product-card--full .delivery .delivery__body{min-height:140px;border:1px solid rgba(136,143,154,.16);border-top:none;border-bottom-left-radius:10px;border-bottom-right-radius:10px}.product-card.product-card--full .delivery .delivery__thead{display:none}.product-card.product-card--full .delivery .delivery__to-location{margin:0 0 0 5px;color:#2270ee}.product-card.product-card--full .delivery .delivery__to-location .icon{font-size:18px;color:rgba(57,69,86,.6)}.product-card.product-card--full .delivery table{width:100%;border-collapse:collapse}.product-card.product-card--full .delivery table td{padding:18px 0;vertical-align:top}.product-card.product-card--full .delivery table tr{border-bottom:1px solid rgba(136,143,154,.16)}.product-card.product-card--full .delivery table tr:last-child{border-bottom:none}@media screen and (min-width:992px){.product-card.product-card--full .delivery .delivery__body{padding:12px 16px}.product-card.product-card--full .delivery .delivery__thead{display:table-header-group}.product-card.product-card--full .delivery table td{padding:8px 0}.product-card.product-card--full .delivery table tr{border-bottom:none}}.product-card.product-card--full .vendor .vendor__body{border:1px solid rgba(136,143,154,.16);padding:7px 16px;overflow-x:auto}.product-card.product-card--full .vendor .vendor__name{height:17px;color:#212121}.product-card.product-card--full .vendor .vendor__name strong{font-weight:500}.product-card.product-card--full .product-card__about{padding:32px 24px;border-bottom-left-radius:16px;border-bottom-right-radius:16px}.product-card.product-card--full .tabs__body{margin:0;padding-top:0;padding-bottom:0}.product-card.product-card--full .product-card__gallery .sticker{position:absolute;z-index:2}.product-card.product-card--full .product-card__gallery .sticker.sticker--original{right:0}.product-card.product-card--full .product-card__gallery .sticker.sticker--original .sticker__items{display:flex;flex-direction:column;align-items:flex-end}.product-card.product-card--full .product-card__header{padding:18px 16px;background-color:#fff;box-shadow:0 0 3px rgba(45,62,79,.08),0 1px 4px rgba(57,72,86,.12);border-top-left-radius:10px;border-top-right-radius:10px}.product-card.product-card--full .rating{min-width:120px;min-height:26px}.product-card.product-card--full h1.product-card__name{font-size:32px;font-weight:500;margin-bottom:10px}.product-card.product-card--full .product-card__rating .rating{max-width:120px;width:100%;height:26px;margin-right:5px}.product-card.product-card--full .product-card__rating a{margin-top:1px}.product-card.product-card--full .product-card__code{word-break:break-word}.product-card.product-card--full .tabs .tabs__items{display:flex;overflow-y:hidden}.product-card.product-card--full .tabs .tabs__items .items__item{white-space:nowrap}.product-card.product-card--full .tabs .tabs__items::-webkit-scrollbar{width:0;height:0}@media screen and (max-width:767px){.product-card.product-card--full .product-card__about{padding:24px 12px}.tabs.tabs--sticky-header .tabs__header{position:sticky;z-index:3;top:56px}.tabs__header{background-color:#f5f7fa}.tabs__header .tabs__items{padding:0 16px}.product-card.product-card--full .tabs__body{padding-top:0}}@media screen and (min-width:768px){.product-card.product-card--full .tabs.tabs--rounded-header .tabs__header{border-top-left-radius:16px;border-top-right-radius:16px;background-color:#fff}.product-card.product-card--full .product-card__about{padding:32px 24px}.product-card.product-card--full .tabs__body{padding-top:0}.product-card.product-card--full .product-card__gallery{position:sticky;top:20px;z-index:3;margin-right:8px}.product-card.product-card--full .product-card__header{padding:0;background-color:initial;box-shadow:none;margin-bottom:20px}.tabs__body{padding-top:32px;padding-bottom:32px}}@media screen and (max-width:575px){.product-card.product-card--full h1.product-card__name{font-size:24px;font-weight:400}}";

        return (
            <Head>
                <link
                    rel="preload"
                    href={this._getPreview().getLarge()}
                    as="image"
                />

                <style type="text/css">
                    {desktopStyles}
                </style>
            </Head>
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <>
                <MicroDataProduct
                    pageInfo={this._getPageInfo()}
                    product={this._getProduct()}
                    review={this._getReviewFromState()}
                    maxCommentsCount={this.getMaxCommentsCountForMicroData()}
                    isVisibleReview
                />

                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                {this._hasMicroDataFaq() && (
                    <MicroDataFaq
                        faq={this._getFaq()}
                    />
                )}

                <style jsx>
                    {styles}
                </style>

                { this._renderHead() }

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
                            </div>
                        </div>
                    </div>
                </section>

                {this._hasOffers() && (
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <Offer
                                    offers={this.offers}
                                    addToBasket={this._addToBasket}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {this._hasRubrics() && (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <Rubric
                                    items={this.state.rubrics}
                                    notice={this._getAnalogsNotice()}
                                    open={this.showAllRecommendations}
                                    addToBasket={this._addToBasket}
                                />
                            </div>
                        </div>
                    </div>
                )}

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

                {this._getModel().isVerifiedProduct() && (
                    <div className="d-none d-print-block" role="note">
                        {this._renderFootnotes()}
                    </div>
                )}

                <BuyBlockXS
                    className={!this.state.isVisibleBuyBlockXS ? "d-none" : ""}
                    availableBasket={this._isMainSeller()}
                    product={this._getProduct()}
                    addToBasket={this._addToBasket}
                />
            </>
        );
    }
}

export default Product;
