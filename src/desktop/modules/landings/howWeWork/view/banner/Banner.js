import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Dom from "app/core/utilites/dom";

import Achievements from "../achievements/Achievements";

class Banner extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.dom = Dom.getInstance();

        this._scrollToFeatures = this._scrollToFeatures.bind(this);
    }

    /**
     * @private
     * @method _scrollToFeatures
     * @returns {Banner}
     */
    _scrollToFeatures() {
        this.dom.scrollToElementWithOffset(".features", -40, 40);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="banner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <header className="banner__header">
                                <h1 className="banner__title line-height-1-5 color-white">
                                    {this.HTMLResource.deliveryDrugsFromVendors}
                                </h1>
                            </header>

                            <div className="banner__body">
                                <div
                                    className="banner__description line-height-1-5 color-white"
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.drugsEconomy}}
                                />

                                <div className="banner__preview">
                                    <img
                                        src={this.Resource.links.howWorksBanner}
                                        alt="Apteka24"
                                    />
                                </div>

                                <div className="banner__links d-md-flex justify-content-center justify-content-lg-start">
                                    <a
                                        href={this.Resource.links.homePage}
                                        className="btn-default btn-md"
                                    >
                                        {this.stringsResource.findDrugs}
                                    </a>

                                    <button
                                        type="button"
                                        className="btn-default btn-md banner__learn-more"
                                        onClick={this._scrollToFeatures}
                                    >
                                        {this.stringsResource.learnMore}
                                    </button>
                                </div>
                            </div>

                            <div className="banner__footer">
                                <Achievements />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Banner;
