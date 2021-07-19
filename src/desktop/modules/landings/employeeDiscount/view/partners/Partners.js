/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Partners extends React.Component {
    constructor(props) {
        super(props);

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
         * @property linksResource
         * @type {Resource}
         */
        this.linksResource = Resource.links;
    }

    render() {
        return (
            <section className="partners section">
                <div className="container-fluid">
                    <header className="partners__header">
                        <h2 className="partners__title section__title">
                            {this.stringsResource.ourPartners}
                        </h2>
                    </header>

                    <div className="partners__body">
                        <div className="partners__items d-flex justify-content-between flex-wrap">
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.fitofarm}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.acino}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.farmak}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.perrigo}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.reckitt}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.stada}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.nobel}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.jj}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.coloplast}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.darnitsa}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item">
                                <img
                                    className="preview"
                                    src={this.linksResource.images.employeeDiscount.reddys}
                                    alt="preview"
                                    width="171"
                                    height="60"
                                />
                            </div>
                            <div className="item text-center color-black" dangerouslySetInnerHTML={{__html: this.HTMLResource.employeeDiscount.partners.moreThanThousandProducts}} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Partners;
