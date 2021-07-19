import React from 'react';

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Clients extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property Resource
         * @type {Resource}
         */
        this.Resource = Resource;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="contacts__clients clients rounded-10 mb-16 d-flex justify-content-between">
                <div className="clients__info">
                    <h5 className="clients__title">
                        { this.HTMLResource.about.contacts.clients.toClients }
                    </h5>

                    <div className="clients__info">
                        <div className="clients__hotline">
                            <span className="icon icon-earphone" />

                            <p className="clients__subtitle">
                                { this.stringsResource.hotline }:
                            </p>

                            <a href="tel:0800302244" className="hotline__phone">
                                0800 30 22 44
                            </a>

                            <p className="hotline__description">
                                ({ this.HTMLResource.about.contacts.clients.description })
                            </p>
                        </div>

                        <div className="clients__worktime">
                            <span className="icon icon-clock" />

                            <p className="clients__subtitle">
                                { this.stringsResource.workTime }:
                            </p>

                            <p className="work-time__time">
                                { this.HTMLResource.about.contacts.clients.workTime }
                            </p>
                        </div>

                        <div className="clients__support">
                            <span className="icon icon-envelope" />

                            <p className="clients__subtitle">
                                { this.stringsResource.supportService }:
                            </p>

                            <a href={`mailto:${this.Resource.links.emails.clients}`}>
                                { this.Resource.links.emails.clients }
                            </a>
                        </div>

                        <div className="clients__addresses">
                            <span className="icon icon-map-marker" />

                            <a href={this.Resource.links.pharmacy} target="_blank">
                                { this.HTMLResource.about.contacts.clients.pharmacyAddresses }
                            </a>
                        </div>
                    </div>
                </div>

                <div className="clients__map d-xl-none d-md-block d-none">
                    <iframe
                        title={this.HTMLResource.about.contacts.correspondence.position}
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5297.386469975186!2d35.037859!3d48.404834!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdbee34447e1399cc!2sapteka24.ua!5e0!3m2!1sru!2sua!4v1611248062399!5m2!1sru!2sua"
                        frameBorder="0"
                        aria-hidden="false"
                    />
                </div>
            </section>
        );
    }
}

export default Clients;
