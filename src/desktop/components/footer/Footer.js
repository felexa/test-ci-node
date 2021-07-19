/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            collapsableLists: {
                buyer: false,
                company: false,
                partners: false
            }
        };

        this.env = Env.getInstance();

        this.resource = Resource.getInstance(Env.getInstance().getLanguage());

        this._toggleList = this._toggleList.bind(this);
        this._getClassNamesForCollapsableList = this._getClassNamesForCollapsableList.bind(this);
    }

    /**
     * @private
     * @method toggleList
     * @param listName {string}
     * @returns {Footer}
     */
    _toggleList(listName) {
        this.setState((prevState) => ({
            collapsableLists: {
                ...prevState.collapsableLists,
                [listName]: !prevState.collapsableLists[listName]
            }
        }));

        return this;
    }

    /**
     * @private
     * @method _getClassNamesForCollapsableList
     * @param listName {string}
     * @returns {string}
     */
    _getClassNamesForCollapsableList(listName) {
        return classNames("col-12 col-lg order-1 footer-item footer-item--collapsable", {
            "footer-item--collapsable--open": this.state.collapsableLists[listName]
        });
    }

    /**
     * @private
     * @method _renderBuyersMenu
     * @returns {Array}
     */
    _renderBuyersMenu() {
        return this.resource.getFooter().getNavigation().buyer.map((item, index) => (
            <li key={index}>
                <a
                    href={item.url}
                    target={item.target}
                    dangerouslySetInnerHTML={{__html: item.name }}
                />
            </li>
        ));
    }

    /**
     * @private
     * @method _renderCompanyMenu
     * @returns {Array}
     */
    _renderCompanyMenu() {
        return this.resource.getFooter().getNavigation().company.map((item, index) => (
            <li key={index}>
                <a
                    href={item.url}
                    target={item.target}
                    dangerouslySetInnerHTML={{__html: item.name }}
                />
            </li>
        ));
    }

    /**
     * @private
     * @method _renderPartnersMenu
     * @returns {Array}
     */
    _renderPartnersMenu() {
        return this.resource.getFooter().getNavigation().partners.map((item, index) => (
            <li key={index}>
                <a
                    href={item.url}
                    target={item.target}
                    dangerouslySetInnerHTML={{__html: item.name }}
                />
            </li>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg order-3 order-lg-1 footer-item">
                            <div className="footer-item__title">
                                <div className="d-inline-block mb-10">
                                    { this.stringsResource.hotline }
                                </div>
                                <br />
                                <span
                                    className="color-white-2 work-time f-weight-4"
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.footer.workTime}}
                                />
                            </div>

                            <ul className="contacts">
                                <li>
                                    <a href="tel:0800302244" className="d-inline-flex align-items-center f-weight-5">
                                        <i className="icon icon-earphone" /> 0800 30 22 44
                                    </a>
                                </li>

                                <li>
                                    <a href="mailto:client@apteka24.ua" className="d-inline-flex align-items-center f-weight-4">
                                        <i className="icon icon-envelope" />
                                        client@apteka24.ua
                                    </a>
                                </li>
                            </ul>

                            <div className="footer-item__title footer__title--top-separate mt-18 mt-md-32">
                                <div className="d-inline-block ">
                                    { this.stringsResource.partners }
                                </div>
                            </div>

                            <div className="footer__wrap-partner d-flex flex-wrap-wrap">
                                <a className="footer__link license" href="https://nuph.edu.ua/" target="_blank">
                                    <img
                                        width="50"
                                        height="55"
                                        className="lazyload"
                                        data-src={`${
                                                this.env.getMainImageRepository()
                                            }/temp-images/logo-small.png`}
                                        alt="logo nuph"
                                    />

                                    <p
                                        dangerouslySetInnerHTML={{__html: this.HTMLResource.footer.educationalPartner}}
                                        className="footer__wrap-text"
                                    />
                                </a>

                                <a className="footer__link license" href="https://klinika.dp.ua/" target="_blank">
                                    <img
                                        width="109"
                                        height="55"
                                        className="lazyload"
                                        data-src={`${
                                            this.env.getMainImageRepository()
                                        }/morkovka/clinika.png`}
                                        alt="logo nuph"
                                    />

                                    <p
                                        dangerouslySetInnerHTML={{__html: this.HTMLResource.footer.medicalPartner}}
                                        className="footer__wrap-text"
                                    />
                                </a>
                            </div>

                            <hr className="footer-separate" />
                        </div>

                        <div className={this._getClassNamesForCollapsableList("buyer")}>
                            <div className="footer-item__title" onClick={() => this._toggleList("buyer")}>
                                <span>
                                    { this.stringsResource.toBuyer }
                                </span>
                                <i className="icon icon-plus d-lg-none" />
                                <i className="icon icon-minus d-lg-none" />
                            </div>

                            <div className="footer-item__description">
                                <ul>
                                    { this._renderBuyersMenu() }
                                </ul>
                            </div>
                        </div>

                        <div className={this._getClassNamesForCollapsableList("company")}>
                            <div className="footer-item__title" onClick={() => this._toggleList("company")}>
                                <span>
                                    { this.stringsResource.company }
                                </span>
                                <i className="icon icon-plus d-lg-none" />
                                <i className="icon icon-minus d-lg-none" />
                            </div>

                            <div className="overflow-hidden footer-item__description">
                                <ul>
                                    { this._renderCompanyMenu() }
                                </ul>
                            </div>
                        </div>

                        <div className={this._getClassNamesForCollapsableList("partners")}>
                            <div className="footer-item__title" onClick={() => this._toggleList("partners")}>
                                <span>
                                    { this.stringsResource.toPartners }
                                </span>
                                <i className="icon icon-plus d-lg-none" />
                                <i className="icon icon-minus d-lg-none" />
                            </div>

                            <div className="overflow-hidden footer-item__description">
                                <ul>
                                    { this._renderPartnersMenu() }
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 col-lg d-flex flex-column mt-md-16 mt-0 mt-lg-0 order-4 footer-item">
                            <div className="d-none d-lg-block footer-item__title">
                                { this.stringsResource.socialNetworks }
                            </div>

                            <div className="d-flex flex-column flex-md-row flex-lg-column flex-grow-1 justify-content-between">
                                <ul className="socials order-md-2 order-lg-1">
                                    <li>
                                        <a href="https://www.facebook.com/apteka24.ua/" target="_blank">
                                            <img
                                                data-src="https://www.apteka24.ua/bitrix/templates/apteka24/images/fb.svg"
                                                alt="facebook"
                                                className="lazyload"
                                                width="36"
                                                height="36"
                                            />
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://www.instagram.com/apteka24.ua/" target="_blank">
                                            <img
                                                data-src="https://www.apteka24.ua/bitrix/templates/apteka24/images/insta.svg"
                                                alt="instagram"
                                                className="lazyload"
                                                width="36"
                                                height="36"
                                            />
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://t.me/apteka24ua" target="_blank">
                                            <img
                                                data-src="https://www.apteka24.ua/bitrix/templates/apteka24/images/telegram.svg"
                                                alt="telegram"
                                                className="lazyload"
                                                width="36"
                                                height="36"
                                            />
                                        </a>
                                    </li>
                                </ul>

                                <div className="order-lg-2 license">
                                    <div
                                        className="d-none d-md-block"
                                        dangerouslySetInnerHTML={{__html: this.HTMLResource.footer.licenseGiven }}
                                    />

                                    <div
                                        className="d-none d-md-block"
                                        dangerouslySetInnerHTML={{__html: this.HTMLResource.footer.license }}
                                    />
                                </div>
                            </div>

                            <div className="d-flex payments">
                                <img
                                    data-src="https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/temp-images/visa.svg"
                                    alt="visa"
                                    className="lazyload"
                                    width="58"
                                    height="24"
                                />

                                <img
                                    data-src="https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/temp-images/mastercard.svg"
                                    alt="mastercard"
                                    className="lazyload"
                                    width="75"
                                    height="24"
                                />
                            </div>
                        </div>

                        <div className="footer__warning col-12 text-center order-5">
                            <img
                                data-src={this.Resource.links.images.footer.selfMedicationDesktop}
                                alt={this.HTMLResource.footer.selfMedication}
                                title={this.HTMLResource.footer.selfMedication}
                                className="mw-100 d-none d-md-inline-block lazyload mb-30"
                                width="1145"
                                height="76"
                            />

                            <img
                                data-src={this.Resource.links.images.footer.selfMedicationMobile}
                                alt={this.HTMLResource.footer.selfMedication}
                                title={this.HTMLResource.footer.selfMedication}
                                className="mw-100 d-inline-block d-md-none lazyload mb-20"
                                width="288"
                                height="68"
                            />

                            <div />

                            <img
                                data-src={this.Resource.links.images.footer.consultDesktop}
                                alt={this.HTMLResource.footer.consult}
                                title={this.HTMLResource.footer.consult}
                                className="mw-100 d-none d-md-inline-block lazyload mb-30"
                                width="1376"
                                height="59"
                            />

                            <img
                                data-src={this.Resource.links.images.footer.consultMobile}
                                alt={this.HTMLResource.footer.consult}
                                title={this.HTMLResource.footer.consult}
                                className="mw-100 d-inline-block d-md-none lazyload mb-24"
                                width="246"
                                height="45"
                            />

                            <div
                                className="footer__copyright d-block text-center color-gray-1"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.footer.copyright }}
                            />

                            <ul className="d-md-flex align-items-center justify-content-center">
                                <li>
                                    <a
                                        href={`${this.env.getBitrixHost()}/terms/`}
                                        target="_blank"
                                    >
                                        {this.stringsResource.privacyPolicy}
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href={`${this.env.getBitrixHost()}/agreement/`}
                                        target="_blank"
                                    >
                                        {this.stringsResource.userAgreement.title}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
