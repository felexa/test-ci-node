import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Company extends React.Component {
    constructor(props) {
        super(props);
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.companyName = props.companyName;

        this.banner = this.props.banner;
    }

    /**
     * @private
     * @method _getComapny
     * @returns {Company}
     */
    _getContacts() {
        return this.stringsResource.vendorCard.contacts;
    }

    /**
     * @private
     * @method _getCompanyName
     * @returns {Company}
     */
    _getCompanyName() {
        return this.stringsResource.vendorCard[this.companyName].name;
    }

    /**
     * @private
     * @method _getComapny
     * @returns {Company}
     */
    _getCompany() {
        return this.props.company;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className={classnames("company", this.props.className)}>
                <div className="container-fluid">
                    <div className="d-md-flex row--no-horizontal-margins-before-lg rounded-16 overflow-hidden">
                        <div className="company__section">
                            <header className="company__header">
                                {this._getCompany().getLogo().getSmall() && (
                                    <img
                                        className="company__logo"
                                        src={this._getCompany().getLogo().getSmall()}
                                        alt={this._getCompany().getLogo().getAlt()}
                                    />
                                )}

                                <h1 className="company__title">
                                    {this.companyName && this._getCompanyName()}
                                </h1>
                            </header>

                            <div className="company__body">
                                <div className="company__contacts contacts">
                                    <div className="contacts__items">
                                        <div className="contacts__item item d-sm-flex">
                                            <span className="item__title">{this._getContacts().mainOffice}</span>
                                            <span className="item__value">{this._getCompany().getAddress()}</span>
                                        </div>

                                        <div className="contacts__item item d-sm-flex">
                                            <span className="item__title">{this._getContacts().phone}</span>
                                            <a className="item__value" href={`tel:${this._getCompany().getPhone()}`}>{this._getCompany().getPhone()}</a>
                                        </div>

                                        {this._getCompany().getEmail() && (
                                            <div className="contacts__item item d-sm-flex">
                                                <span className="item__title">{this._getContacts().email}</span>
                                                <a className="item__value" href={`mailto:${this._getCompany().getEmail()}`}>{this._getCompany().getEmail()}</a>
                                            </div>
                                        )}

                                        {this._getCompany().getFax() && (
                                            <div className="contacts__item item d-sm-flex">
                                                <span className="item__title">{this._getContacts().fax}</span>
                                                <a
                                                    href={`tel:${this._getCompany().getFax()}`}
                                                    className="item__value"
                                                >
                                                    {this._getCompany().getFax()}
                                                </a>
                                            </div>
                                        )}

                                        <div className="contacts__item item d-sm-flex">
                                            <span className="item__title">{this._getContacts().site}</span>
                                            <a className="item__value" target="_blank" href={this._getCompany().getUrl()}>{this._getCompany().getSiteUrl()}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="company__banner">
                            <img
                                src={this.banner.getPreview().getDesktop().getLarge()}
                                alt={this.banner.getPreview().getDesktop().getAlt()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Company.propTypes = {
    className: PropTypes.string,
    companyName: PropTypes.string,
    company: PropTypes.instanceOf(Object).isRequired,
    banner: PropTypes.instanceOf(Object).isRequired
};

Company.defaultProps = {
    className: "",
    companyName: ""
};

export default Company;
