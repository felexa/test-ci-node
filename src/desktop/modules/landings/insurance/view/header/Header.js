import React from "react";

import Env from "app/core/environment";
import Dom from "app/core/utilites/dom";
import Resource from "app/core/resource";

class Header extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property {dom}
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

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
         * @property selectors
         * @type {Object}
         */
        this.selectors = {
            consultation: ".consultation"
        };

        this._scrollToConsultationForm = this._scrollToConsultationForm.bind(this);
    }

    /**
     * @private
     * @method _scrollToFeatures
     * @returns {Header}
     */
    _scrollToConsultationForm() {
        this.dom.scrollToElementWithOffset(this.selectors.consultation, 0, 60);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <header className="insurance__header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <h1
                                className="header__title color-black"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.title}}
                            />

                            <p
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.subtitle}}
                                className="header__description color-black"
                            />

                            <a
                                className="header__redirect-to-form btn-default btn-md text-uppercase"
                                href="https://docs.google.com/forms/d/e/1FAIpQLSfj_YyWKDzADlIZmSHNLQwEPvPHodo5_SC4E4qnK_hbOKqjBw/viewform"
                                target="_blank"
                                // onClick={this._scrollToConsultationForm}
                            >
                                { this.stringsResource.createApplication }
                            </a>
                        </div>

                        <div className="header__image col-12 col-md-6 color-black">
                            <img
                                src={this.Resource.links.images.insurance.header}
                                alt="img"
                            />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
