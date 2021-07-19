/* eslint-disable max-len,react/jsx-no-target-blank */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Strings from "app/core/utilites/strings";

import Box from "app/core/components/Box";
import Alert from "components/alert/Alert";
import MiniReview from "components/review/type/mini/Review";
import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import DeviceMobile from "components/deviceDetector/mobile/Detector";
import Warning from "components/warning/product/Warning";
import Sticker from "components/sticker/Sticker";
import Gallery from "components/gallery/Gallery";
import FAQ from "components/faq/FAQ";

import BuyBlock from "desktop/modules/product/card/retail/size/full/view/buyBlock/size/full/BuyBlock";
import Delivery from "desktop/modules/product/card/retail/size/full/view/delivery/Delivery";
import Certificates from "desktop/modules/product/card/retail/size/full/view/certificates/Certificates";
import Service from "desktop/modules/product/card/retail/size/full/view/service/Service";
import Vendor from "desktop/modules/product/card/retail/size/full/view/vendor/Vendor";
import Description from "desktop/modules/product/card/retail/size/full/view/description/Description";
import PropertiesGroups from "desktop/modules/product/card/retail/size/full/view/properties/PropertiesGroups";
import MainProperties from "desktop/modules/product/card/retail/size/full/view/properties/MainProperties";
import Instruction from "desktop/modules/product/card/retail/size/full/view/instruction/Instruction";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property titles
         * @type {Object}
         */
        this.titles = {
            properties: this.stringsResource.propertiesOfDrug,
            instruction: this.stringsResource.instructionForUse,
            description: this.stringsResource.description,
            video: this.stringsResource.videoReview
        };

        /**
         * @property stickerType
         * @type {string}
         */
        this.stickerType = "original";

        this.notices = this.props.notices;

        this.Resource = Resource;

        this.strings = Strings.getInstance();

        this.showAllProperties = this.showAllProperties.bind(this);
        this.showFullInstruction = this.showFullInstruction.bind(this);
    }

    /**
     * @private
     * @method _isDisplayedFaq
     * @returns {boolean}
     */
    _isDisplayedFaq() {
        return Boolean(this._getFaq().length);
    }

    /**
     * @private
     * @method _getProduct
     * @returns {Object}
     */
    _getProduct() {
        return this.props.product;
    }

    /**
     * @private
     * @method _getFaq
     * @returns {Product}
     */
    _getFaq() {
        return this.props.faq;
    }

    /**
     * @method _getPropertiesNotice
     * @returns {Object}
     * @private
     */
    _getPropertiesNotice() {
        return this.props.isVerifiedProduct ? this.notices.properties : null;
    }

    /**
     * @private
     * @method _getAboutDeliveryForSeo
     * @returns {string}
     */
    _getAboutDeliveryForSeo() {
        return this.strings.writeLine(this.HTMLResource.seo.productCard.aboutDeliveryLocation,
            this._getProduct().getName(),
            this._getProduct().getName());
    }

    /**
     * @method _getInstructionNotice
     * @returns {Object}
     * @private
     */
    _getInstructionNotice() {
        return this.props.isVerifiedProduct ? this.notices.instruction : null;
    }

    /**
     * @method _getDescriptionNotice
     * @returns {Object}
     * @private
     */
    _getDescriptionNotice() {
        return this.props.isVerifiedProduct ? this.notices.description : null;
    }

    /**
     * @private
     * @method _getReview
     * @returns {Review}
     */
    _getReview() {
        return this.props.review;
    }

    /**
     * @private
     * @method _hasBrand
     * @returns {boolean}
     */
    _hasBrand() {
        return Boolean(this._getProduct().getBrand().getId());
    }

    /**
     * @method _hasMainProperties
     * @return {boolean}
     * @private
     */
    _hasMainProperties() {
        return Boolean(this._getProduct().getMainProperties().getItems().length);
    }

    /**
     * @method _hasDelivery
     * @return {Boolean}
     * @private
     */
    _hasDelivery() {
        return this.props.hasDelivery;
    }

    /**
     * @method _hasServices
     * @return {Boolean}
     * @private
     */
    _hasServices() {
        return this.props.hasServices;
    }

    /**
     * @private
     * @method _hasProperties
     * @return {boolean}
     */
    _hasProperties() {
        return Boolean(this._getProduct().getProperties().length);
    }

    /**
     * @private
     * @method _hasGroupProperties
     * @return {boolean}
     */
    _hasGroupProperties() {
        return Boolean(this._getProduct().getPropertyGroups().length);
    }

    /**
     * @private
     * @method _hasInstruction
     * @return {boolean}
     */
    _hasInstruction() {
        return Boolean(this._getProduct().getInstructionAsHTML());
    }

    /**
     * @private
     * @method _hasNewInstruction
     * @return {boolean}
     */
    _hasNewInstruction() {
        return this._getProduct().getNewInstruction().isActive();
    }

    /**
     * @private
     * @method _hasDescription
     * @return {boolean}
     */
    _hasDescription() {
        return Boolean(this._getProduct().getDescriptionAsHTML());
    }

    /**
     * @method _hasAnyMainElementOfDescription
     * @return {boolean}
     * @private
     */
    _hasAnyMainElementOfDescription() {
        return this._hasProperties() || this._hasInstruction() || this._hasDescription() || this._hasGroupProperties();
    }

    /**
     * @private
     * @method buildTitle
     * @param title {string}
     * @returns {string}
     */
    buildTitle(title) {
        return `${title} <span class="text-lowercase product-name">${this._getProduct().getName()}</span>`;
    }

    /**
     * @private
     * @method buildPropertiesTitle
     * @returns {string}
     */
    buildPropertiesTitle() {
        return this.buildTitle(this.titles.properties);
    }

    /**
     * @private
     * @method buildInstructionTitle
     * @returns {string}
     */
    buildInstructionTitle() {
        return `<span class="product-name">${this._getProduct().getName()}</span> - ${this.titles.instruction}`;
    }

    /**
     * @private
     * @method buildDescriptionTitle
     * @returns {string}
     */
    buildDescriptionTitle() {
        return this.buildTitle(this.titles.description);
    }

    /**
     * @private
     * @method showAllProperties
     * @returns {Main}
     */
    showAllProperties() {
        this.props.analytics.showAllProperties();

        return this;
    }

    /**
     * @private
     * @method showFullInstruction
     * @returns {Main}
     */
    showFullInstruction() {
        this.props.analytics.showFullInstruction();

        return this;
    }

    /**
     * @private
     * @method _renderMainProperties
     * @return {React.ReactElement}
     */
    _renderMainProperties() {
        return (
            <MainProperties
                title={this._getProduct().getMainProperties().getName()}
                className="mt-24"
                notice={this.props.notices.mainProperties}
                groupProperty={this._getProduct().getMainProperties()}
                selectProperty={this.props.selectProperty}
            />
        );
    }

    /**
     * @private
     * @method _renderPropertiesGroups
     * @return {React.ReactElement}
     */
    _renderPropertiesGroups() {
        return (
            <PropertiesGroups
                notice={this._getPropertiesNotice()}
                title={this.buildPropertiesTitle()}
                open={this.showAllProperties}
                items={this._getProduct().getProperties()}
                groupItems={this._getProduct().getPropertyGroups()}
                selectProperty={this.props.selectProperty}
            />
        );
    }

    /**
     * @private
     * @method _renderReviewsAndSeo
     * @return {React.ReactElement}
     */
    _renderReviewsAndSeo() {
        return (
            <div className="row row--no-horizontal-sm-margins">
                <div className="col">

                    <Box
                        className="bg-white page-section new-super-box-shadow"
                        rounded={16}
                    >
                        <MiniReview
                            isAuthorized={this.props.isAuthorized}
                            profile={this.props.profile}
                            review={this._getReview()}
                            totalCommentsCount={this.props.getCommentsCount()}
                            hideAnswers
                            getAllAnswers={this.props.getAllAnswers}
                            create={this.props.createReview}
                            createAnswer={this.props.createAnswerToReview}
                            toAllReviews={this.props.openReviewTab}
                            toCreateReview={this.props.openReviewTab}
                            toVote={this.props.voteToReview}
                            upload={this.props.upload}
                            productName={this._getProduct().getName()}
                        />
                    </Box>

                    <Box
                        className="bg-white page-section new-super-box-shadow"
                        rounded={16}
                    >
                        <p
                            className="adaptive-content m-0 text-black line-height-1-5"
                            dangerouslySetInnerHTML={{__html: this._getAboutDeliveryForSeo()}}
                        />
                    </Box>
                </div>
            </div>
        );
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="bg-gray">
                <div className="product-card__about bg-white new-super">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="product-card__gallery">
                                <Sticker items={this._getProduct().getStickers()} type={this.stickerType} tooltip />
                                <Gallery product={this._getProduct()} addToBasket={this.props.addToBasket} thumbnailPosition="left" />

                                <Alert
                                    content={this.HTMLResource.warnings.productAppearance}
                                    className="mb-24"
                                />

                                <DeviceDesktop>
                                    {this._hasMainProperties() && this._renderMainProperties()}
                                </DeviceDesktop>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            {this._hasBrand() && <Vendor brand={this.props.product.getBrand()} />}

                            <BuyBlock
                                product={this._getProduct()}
                                availableBasket={this.props.availableBasket}
                                addToBasket={this.props.addToBasket}
                                buyInOneClick={this.props.buyInOneClick}
                            />

                            <DeviceMobile>{this._hasMainProperties() && this._renderMainProperties()}</DeviceMobile>

                            {this._hasDelivery() && (
                                <>
                                    {/*<div className="alert-info mt-24">
                                        <p className="f-weight-5 mt-0">
                                            Доставка заказов на сумму от 500 грн
                                            осуществляется бесплатно!
                                        </p>
                                        Способы доставки могут отличаться в зависимости от населенного пункта и
                                        действующих в нём курьерских служб. Выберите город для расчета стоимости
                                        доставки.
                                    </div>*/}

                                    <Delivery
                                        className="mt-24"
                                        items={this.props.deliveries}
                                        currentCity={this.props.currentCity}
                                        changeCity={this.props.changeCity}
                                        selectDelivery={this.props.selectDelivery}
                                    />
                                </>
                            )}

                            {this._hasServices() && (
                                <Service
                                    className="mt-24"
                                    product={this._getProduct()}
                                    showGuarantee={this.props.showGuarantee}
                                />
                            )}

                            <Certificates
                                items={this._getProduct().getFiles()}
                                notice={this.props.notices.certificate}
                                downloadCertificate={this.props.downloadCertificate}
                            />
                        </div>
                    </div>
                </div>

                <div className="container-fluid pl-md-0 pr-md-0">
                    <div className="row row--no-horizontal-sm-margins mt-16">
                        {this._hasAnyMainElementOfDescription() && (
                        <div className="col-lg-8">
                            {(this._hasGroupProperties() || this._hasProperties()) && (
                            <Box
                                className="bg-white page-section d-flex flex-column justify-content-between new-super-box-shadow position-sticky top-0"
                                rounded={16}
                            >
                                { this._renderPropertiesGroups() }
                            </Box>
                            )}
                        </div>
                        )}
                        <DeviceDesktop>
                            <div className={classNames("col", {"col-lg-4 ": this._hasAnyMainElementOfDescription()})}>
                                <Box
                                    className="bg-white page-section position-sticky top-16 new-super-box-shadow"
                                    rounded={16}
                                >
                                    <MiniReview
                                        isAuthorized={this.props.isAuthorized}
                                        profile={this.props.profile}
                                        review={this._getReview()}
                                        totalCommentsCount={this.props.getCommentsCount()}
                                        hideAnswers
                                        create={this.props.createReview}
                                        getAllAnswers={this.props.getAllAnswers}
                                        createAnswer={this.props.createAnswerToReview}
                                        toAllReviews={this.props.openReviewTab}
                                        toCreateReview={this.props.openReviewTab}
                                        toVote={this.props.voteToReview}
                                        upload={this.props.upload}
                                        productName={this._getProduct().getName()}
                                    />
                                </Box>
                            </div>
                        </DeviceDesktop>
                    </div>

                    <div className="row row--no-horizontal-sm-margins mt-16">
                        <div className="col">
                            {this._hasNewInstruction() && (
                                <Instruction
                                    title={this.buildInstructionTitle()}
                                    instruction={this._getProduct().getNewInstruction().getSections()}
                                    notice={this._getInstructionNotice()}
                                />
                            )}

                            {this._hasInstruction() && !this._hasNewInstruction() && (
                            <Box
                                className="bg-white page-section d-flex flex-column justify-content-between new-super-box-shadow"
                                rounded={16}
                            >
                                <Description
                                    buttonShowMoreName={this.stringsResource.showMoreInstruction}
                                    title={this.buildInstructionTitle()}
                                    html={this._getProduct().getInstructionAsHTML()}
                                    open={this.showFullInstruction}
                                    notice={this._getInstructionNotice()}
                                />

                                <Warning />
                            </Box>
                            )}

                            {this._hasDescription() && (
                            <Box
                                className="bg-white page-section d-flex flex-column justify-content-between new-super-box-shadow"
                                rounded={16}
                            >
                                <Description
                                    buttonShowMoreName={this.stringsResource.showMoreDescription}
                                    title={this.buildDescriptionTitle()}
                                    html={this._getProduct().getDescriptionAsHTML()}
                                    notice={this._getDescriptionNotice()}
                                />
                            </Box>
                            )}

                            {this._isDisplayedFaq() && (
                                <FAQ
                                    className="mt-40 faq--product"
                                    items={this._getFaq()}
                                    title={this.stringsResource.frequentlyAskedQuestions}
                                    iconOpen="icon-chevron-down"
                                    iconClose="icon-chevron-up"
                                />
                            )}

                            <DeviceDesktop>
                                <Box
                                    className="bg-white page-section new-super-box-shadow"
                                    rounded={16}
                                >
                                    <p
                                        className="adaptive-content m-0 text-black line-height-1-5"
                                        dangerouslySetInnerHTML={{__html: this._getAboutDeliveryForSeo()}}
                                    />
                                </Box>
                            </DeviceDesktop>
                        </div>
                    </div>

                    <DeviceMobile>
                        {this._renderReviewsAndSeo()}
                    </DeviceMobile>
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    faq: PropTypes.instanceOf(Array).isRequired,
    profile: PropTypes.instanceOf(Object).isRequired,
    currentCity: PropTypes.instanceOf(Object).isRequired,
    product: PropTypes.instanceOf(Object).isRequired,
    changeCity: PropTypes.func.isRequired,
    selectDelivery: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    getAllAnswers: PropTypes.func.isRequired,
    buyInOneClick: PropTypes.func.isRequired,
    downloadCertificate: PropTypes.func.isRequired,
    voteToReview: PropTypes.func.isRequired,
    review: PropTypes.instanceOf(Object).isRequired,
    analytics: PropTypes.instanceOf(Object).isRequired,
    createAnswerToReview: PropTypes.func.isRequired,
    openReviewTab: PropTypes.func.isRequired,
    getCommentsCount: PropTypes.func.isRequired,
    createReview: PropTypes.func.isRequired,
    isVerifiedProduct: PropTypes.bool,
    hasDelivery: PropTypes.bool,
    hasServices: PropTypes.bool,
    availableBasket: PropTypes.bool,
    notices: PropTypes.instanceOf(Object),
    deliveries: PropTypes.instanceOf(Array),
    selectProperty: PropTypes.func,
    showGuarantee: PropTypes.func,
    upload: PropTypes.func.isRequired
};

Main.defaultProps = {
    // freeDeliveryLastDate: "",
    selectProperty: () => {},
    hasDelivery: true,
    hasServices: true,
    availableBasket: false,
    notices: {},
    deliveries: [],
    // clickOnGalleryThumb() {},
    showGuarantee() {},
    isVerifiedProduct: false
};

export default Main;
