import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";

import Resource from "app/core/resource";
import PageTypesEnum from "app/core/utilites/enum/about/pages";

import MicroDataWebPage from "components/microData/WebPage";

import Aside from "./aside/Aside";
import Main from "./main/Main";
import Delivery from "./delivery/Delivery";
import Contacts from "./contacts/Contacts";
import HowTo from "./howTo/HowTo";
import Mission from "./mission/Mission";
import Agreement from "./agreement/Agreement";
import Team from "./team/Team";
import Partners from "./partners/Partners";
import EditorialPolicy from "./editorialPolicy/EditorialPolicy";
import MarketingPolicy from "./marketingPolicy/MarketingPolicy";
import PublishingPolicy from "./publishingPolicy/PublishingPolicy";
import MassMedia from "./massMedia/MassMedia";
import OrderReturn from "./orderReturn/OrderReturn";
import Terms from "./terms/Terms";
import Warranty from "./warranty/Warranty";
import MedicalExperts from "./medicalExperts/MedicalExperts";
import LoyaltyRules from "./loyaltyRules/LoyaltyRules";
import LoyaltyBonusRules from "./loyaltyBonusRules/LoyaltyBonusRules";

import styles from "../styles/main.module.scss";

class AboutUs extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.stringsResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property pageTypesEnum
         * @type {Enum}
         */
        this.pageTypesEnum = PageTypesEnum.getInstance();

        this.state = {
            pageType: props.options.initialData.pageType
        };

        this._changePage = this._changePage.bind(this);
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
     * @private
     * @method _getViewByPageType
     * @returns {React.ReactElement}
     */
    _getViewByPageType() {
        switch (this.state.pageType) {
            case this.pageTypesEnum.getDeliveryAsValue():
                return <Delivery freeDeliveryLastDate={this.props.options.initialData.freeDeliveryLastDate} />;
            case this.pageTypesEnum.getContactsAsValue():
                return <Contacts />;
            case this.pageTypesEnum.getReviewsAsValue():
                return <></>;
            case this.pageTypesEnum.getSocialAsValue():
                return <></>;
            case this.pageTypesEnum.getHowToAsValue():
                return <HowTo />;
            case this.pageTypesEnum.getPartnersAsValue():
                return <Partners items={this.props.options.initialData.partners} />;
            case this.pageTypesEnum.getMedicalExpertsAsValue():
                return (
                    <MedicalExperts
                        doctors={this.props.options.initialData.specialities.doctors}
                        pharmacists={this.props.options.initialData.specialities.pharmacists}
                    />
                );
            case this.pageTypesEnum.getTeamAsValue():
                return (
                    <Team
                        doctors={this.props.options.initialData.specialities.doctors}
                        pharmacists={this.props.options.initialData.specialities.pharmacists}
                        manager={this.props.options.initialData.specialities.manager}
                        editor={this.props.options.initialData.specialities.editor}
                    />
                );
            case this.pageTypesEnum.getEditorialPolicyAsValue():
                return <EditorialPolicy />;
            case this.pageTypesEnum.getMarketingPolicyAsValue():
                return <MarketingPolicy />;
            case this.pageTypesEnum.getPublishingPolicyAsValue():
                return <PublishingPolicy />;
            case this.pageTypesEnum.getMassMediaAsValue():
                return <MassMedia />;
            case this.pageTypesEnum.getAgreementAsValue():
                return <Agreement />;
            case this.pageTypesEnum.getTermsAsValue():
                return <Terms />;
            case this.pageTypesEnum.getOrderReturnAsValue():
                return <OrderReturn />;
            case this.pageTypesEnum.getWarrantyAsValue():
                return <Warranty />;
            case this.pageTypesEnum.getLoyaltyRulesAsValue():
                return <LoyaltyRules />;
            case this.pageTypesEnum.getLoyaltyBonusRulesAsValue():
                return <LoyaltyBonusRules />;
            case this.pageTypesEnum.getMissionAsValue():
                return (
                    <Mission
                        redactor={this.props.options.initialData.redactor}
                        reviewer={this.props.options.initialData.reviewer}
                    />
                );
            default:
                return (
                    <Main
                        redactor={this.props.options.initialData.redactor}
                        reviewer={this.props.options.initialData.reviewer}
                        lastUpdateDateAsMilliseconds={this.props.options.initialData.lastUpdateDateAsMilliseconds}
                    />
                );
        }
    }

    /**
     * @private
     * @method _getTitle
     * @returns {string}
     */
    _getTitle() {
        switch (this.state.pageType) {
            case this.pageTypesEnum.getDeliveryAsValue(): return this.HTMLResource.about.delivery.title;
            case this.pageTypesEnum.getContactsAsValue(): return this.HTMLResource.about.contacts.title;
            case this.pageTypesEnum.getHowToAsValue(): return this.HTMLResource.about.howto.title;
            case this.pageTypesEnum.getPartnersAsValue(): return this.HTMLResource.about.partners.title;
            case this.pageTypesEnum.getMedicalExpertsAsValue(): return this.HTMLResource.medicalExperts.title;
            case this.pageTypesEnum.getTeamAsValue(): return this.HTMLResource.about.team.title;
            case this.pageTypesEnum.getEditorialPolicyAsValue(): return this.HTMLResource.about.editorialPolicy.title;
            case this.pageTypesEnum.getMarketingPolicyAsValue(): return this.HTMLResource.about.marketingPolicy.title;
            // eslint-disable-next-line max-len
            case this.pageTypesEnum.getPublishingPolicyAsValue(): return this.HTMLResource.about.publishingPolicy.title;
            case this.pageTypesEnum.getMassMediaAsValue(): return this.HTMLResource.about.massMedia.title;
            case this.pageTypesEnum.getAgreementAsValue(): return this.HTMLResource.about.agreement.title;
            case this.pageTypesEnum.getTermsAsValue(): return this.HTMLResource.about.privacyPolicy.title;
            case this.pageTypesEnum.getOrderReturnAsValue(): return this.HTMLResource.about.orderReturn.title;
            case this.pageTypesEnum.getWarrantyAsValue(): return this.HTMLResource.about.warranty.title;
            case this.pageTypesEnum.getMissionAsValue(): return this.HTMLResource.about.mission.title;
            case this.pageTypesEnum.getLoyaltyRulesAsValue(): return this.HTMLResource.about.loyaltyRules.title;
            // eslint-disable-next-line max-len
            case this.pageTypesEnum.getLoyaltyBonusRulesAsValue(): return this.HTMLResource.about.loyaltyBonusRules.title;
            default: return this.HTMLResource.about.main.title;
        }
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
     * @method _getNavigation
     * @returns {Array}
     */
    _getNavigation() {
        return this.props.options.initialData.navigation;
    }

    /**
     * @private
     * @method _changePage
     * @param url {string}
     * @returns {void}
     */
    _changePage(url) {
        this
            ._getPresenter()
            .changeRoute(url);
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="about-us">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <header className="about-us__header">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <h1 className="about-us__title">
                                    { this._getTitle() }
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container-fluid">
                    <div className="row row--no-horizontal-sm-margins">
                        <div className="col-lg-3 order-lg-1 order-2">
                            <Aside
                                selectItem={this._changePage}
                                currentPage={this.state.pageType}
                                items={this._getNavigation()}
                            />
                        </div>

                        <div className="col-lg-9 order-lg-2 order-1">
                            <div className="about-us__body">
                                { this._getViewByPageType() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AboutUs.propTypes = {
    options: PropTypes.instanceOf(Object)
};

AboutUs.defaultProps = {
    options: {}
};

export default AboutUs;
