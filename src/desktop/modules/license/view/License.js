/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import MicroDataWebPage from "components/microData/WebPage";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import styles from "../styles/main.module.scss";

class License extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.Resource = Resource;
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
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className="license-page">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <div className="container-fluid">
                    <div className="row row--no-horizontal-sm-margins">
                        <div className="col">
                            <header className="license-page__header">
                                <h1>{this.stringsResource.legitimnost}</h1>
                            </header>
                        </div>
                    </div>
                    <div className="row row--no-horizontal-sm-margins">
                        <div className="col">
                            <div className="rounded-16 bg-white new-super-box-shadow p-24">
                                <div className="license-page__body">
                                    <p>{this.HTMLResource.license.issuedBy}</p>
                                    <p>{this.HTMLResource.license.companyRequisites}</p>
                                    <p>{this.HTMLResource.license.nationalStateRegistry}</p>
                                    <p>{this.HTMLResource.license.legalAddress}</p>
                                    <p>{this.HTMLResource.license.actualAddress}</p>

                                    <p>
                                        <a
                                            href={this.Resource.links.tradeLicense}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {this.stringsResource.moreDetails}
                                        </a>
                                    </p>

                                    <img
                                        src={this.Resource.links.licensePreview}
                                        alt="Ліцензія №193025 Державна служба України з лікарських засобів"
                                    />

                                    <p>
                                        <a
                                            download
                                            href={this.Resource.links.licenseDownload}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {this.stringsResource.download}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default License;
