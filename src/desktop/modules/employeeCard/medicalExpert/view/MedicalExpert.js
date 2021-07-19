/* eslint-disable newline-per-chained-call,max-len */
import React from "react";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import LanguageEnum from "app/core/utilites/enum/language";
import TabEnum from "app/core/utilites/enum/tab";
import Env from "app/core/environment";
import Tabs from "app/core/components/tabs/Tabs";
import Resource from "app/core/resource";
import CustomDate from "app/core/utilites/date";

import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import DeviceMobile from "components/deviceDetector/mobile/Detector";
import Avatar from "components/avatar/Avatar";
import MicroDataWebPage from "components/microData/WebPage";
import MicroDataPerson from "components/microData/Person";

import About from "./about/About";
import Articles from "./articles/Articles";

import styles from "../styles/main.module.scss";

class MedicalExpert extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _componentsContainer
         * @type {Map}
         */
        this._componentsContainer = new Map();

        /**
         * @property _date
         * @type {Date}
         */
        this._date = CustomDate.getInstance();

        /**
         * @property _languageEnum
         * @type {Object}
         */
        this._languageEnum = LanguageEnum.getInstance();

        /**
         * @property _linksResource
         * @type {Object}
         */
        this._linksResource = Resource.links;

        /**
         * @property _local
         * @type {string}
         */
        this._local = Env.getInstance().getLanguage();

        /**
         * @property _stringsResource
         * @type {Object}
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property _tabNameEnum
         * @type {Object}
         */
        this._tabNameEnum = TabEnum.getInstance();

        this.state = {
            activeTabName: TabEnum.getInstance().getAboutAsValue(),
            dataCreation: ""
        };

        this._buildComponentsContainer();

        this._changeTab = this._changeTab.bind(this);
    }

    componentDidMount() {
        //for avoiding ssr warning
        this._setDateOfCreatedProfile();
    }

    /**
     * @private
     * @method _hasArticles
     * @returns {boolean}
     */
    _hasArticles() {
        return Boolean(this._getArticles().length);
    }

    /**
     * @private
     * @method _hasExpertises
     * @returns {boolean}
     */
    _hasExpertises() {
        return Boolean(this._getProfile().getExpertises().length);
    }

    /**
     * @private
     * @method _hasCover
     * @returns {boolean}
     */
    _hasCover() {
        return Boolean(this._getProfile().getProfileCover().getLarge());
    }

    /**
     * @private
     * @method _hasSocialNetworks
     * @returns {boolean}
     */
    _hasSocialNetworks() {
        return Boolean(this._getProfile().getSocialNetworks().length);
    }

    /**
     * @private
     * @method _getProfile
     * @returns {Object}
     */
    _getProfile() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.profile;
    }

    /**
     * @private
     * @method _setDateOfCreatedProfile
     * @returns {MedicalExpert}
     */
    _setDateOfCreatedProfile() {
        this.setState({dataCreation: this._date.formatPerMonthYear(this._local, this._getProfile().getDateOfCreatedProfile())});

        return this;
    }

    /**
     * @private
     * @method _getExpertises
     * @returns {string}
     */
    _getExpertises() {
        return this._getProfile().getExpertises().map((item) => item).join(", ");
    }

    /**
     * @private
     * @method _getTabs
     * @returns {[string]}
     */
    _getTabs() {
        return this._buildTabs().map((tab) => ({
            ...tab,
            active: tab.name === this.state.activeTabName
        }));
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
     * @method _getArticles
     * @returns {[]Articles}
     */
    _getArticles() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.articles;
    }

    /**
     * @private
     * @method _buildAltForCertificates
     * @returns {string}
     */
    _buildAltForCertificates() {
        return `${this._stringsResource.doctorsCertificate} - ${this._getProfile().getFullName()}`;
    }

    /**
     * @private
     * @method _buildComponentsContainer
     * @returns {MedicalExpert}
     */
    _buildComponentsContainer() {
        this._componentsContainer
            .set(this._tabNameEnum.getAboutAsValue(), {
                title: this._stringsResource.detailedInformation,
                component: this._renderAbout()
            })
            .set(this._tabNameEnum.getArticlesAsValue(), {
                title: this._stringsResource.articles,
                component: this._renderArticles()
            });

        return this;
    }

    /**
     * @private
     * @method _buildTab
     * @param tabName {string}
     * @returns {Object}
     */
    _buildTab(tabName) {
        let {title, component} = this._componentsContainer.get(tabName);

        return {
            name: tabName,
            description: title,
            component
        };
    }

    /**
     * @private
     * @method _buildTabs
     * @returns {[Object]}
     */
    _buildTabs() {
        let tabs = [
            this._buildTab(this._tabNameEnum.getAboutAsValue())
        ];

        // if (this._hasArticles()) {
        //     tabs.push(this._buildTab(this._tabNameEnum.getArticlesAsValue()));
        // }

        return tabs;
    }

    /**
     * @private
     * @method _changeTab
     * @param tab {Object}
     * @returns {MedicalExpert}
     */
    _changeTab(tab) {
        this.setState({
            activeTabName: tab.name
        });

        return this;
    }

    /**
     * @private
     * @method _renderArticles
     * @returns {JSX.Element}
     */
    _renderArticles() {
        return <Articles articles={this._getArticles()} />;
    }

    /**
     * @private
     * @method _renderAbout
     * @returns {JSX.Element}
     */
    _renderAbout() {
        return (
            <About
                description={this._getProfile().getAbout()}
                certificates={this._getProfile().getCetificates()}
                altForCertificates={this._buildAltForCertificates()}
                articles={this._getArticles()}
            />
        );
    }

    /**
     * @private
     * @method _renderStickerExpert
     * @returns {JSX.Element}
     */
    _renderStickerExpert() {
        return (
            <div className="medical-expert-card__sticker-expert">
                <img
                    alt="starWithCheck"
                    src={this._linksResource.images.verified}
                    className="medical-expert-card__sticker-icon"
                    width="16"
                    height="16"
                />
                {this._stringsResource.expert}
            </div>
        );
    }

    /**
     * @private
     * @method _renderSocialNetworks
     * @returns {[]JSX.Element}
     */
    _renderSocialNetworks() {
        return this._getProfile().getSocialNetworks().map((item, i) => (
            <p key={i} className="d-flex align-items-center color-black">
                <i className="icon icon-link" />
                <a
                    href={item.getUrl()}
                    target="_blank"
                    className="text-decoration-none"
                >
                    {item.getTitle()}
                </a>
            </p>
        ));
    }

    render() {
        return (
            <>
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <MicroDataPerson
                    profile={this._getProfile()}
                />

                <style jsx>
                    {styles}
                </style>

                <div className="medical-expert-card">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <div className="rounded-16 bg-white new-super-box-shadow">
                                    <div className="medical-expert-card__header">

                                        {!this._hasCover() && (
                                            <div className="medical-expert-card__cover h-100 rounded-16" />
                                        )}

                                        {this._hasCover() && (
                                            <img
                                                src={this._getProfile().getProfileCover().getLarge()}
                                                alt={this._getProfile().getProfileCover().getAlt()}
                                                width={this._getProfile().getProfileCover().getSizes().getLarge().getWidth()}
                                                height={this._getProfile().getProfileCover().getSizes().getLarge().getHeight()}
                                            />
                                        )}

                                        <div className="medical-expert-card__avatar">
                                            <DeviceDesktop>
                                                <Avatar imageSize="medium" profile={this._getProfile()} size={160} />
                                            </DeviceDesktop>
                                            <DeviceMobile>
                                                <Avatar imageSize="medium" profile={this._getProfile()} size={120} />
                                            </DeviceMobile>
                                        </div>
                                    </div>
                                    <div className="medical-expert-card__short-description">
                                        <div className="medical-expert-card__full-name m-0">
                                            <span className="mr-12">{this._getProfile().getFullName()}</span>
                                            {this._hasExpertises() && this._renderStickerExpert()}
                                        </div>
                                        <p className="medical-expert-card__position m-0">{this._getProfile().getPosition()}</p>
                                        <div>
                                            {this._hasSocialNetworks() && this._renderSocialNetworks()}
                                            <p className="d-flex align-items-center color-black">
                                                <i className="icon icon-clock" />
                                                {this._stringsResource.registrationDate} - {this.state.dataCreation}
                                            </p>

                                            {this._hasExpertises() && (
                                                <div className="medical-expert-card__expertises d-flex align-items-baseline color-black mb-0">
                                                    <p className="m-0">
                                                        <i className="icon icon-bordered-star" />
                                                        <span className="flex-shrink-0">{this._stringsResource.expertInTopic}:</span>
                                                        <span className="f-weight-5 ml-8">{this._getExpertises()}</span>
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-16 bg-white new-super-box-shadow mt-16">
                                    <Tabs horizontal items={this._getTabs()} onChange={this._changeTab} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MedicalExpert;
