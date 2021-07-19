import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Correspondence extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Resource}
         */
        this.Resource = Resource;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="contacts__correspondence correspondence">
                <h5 className="correspondence__title">
                    { this.HTMLResource.about.contacts.correspondence.address }
                </h5>

                <div className="correspondence__address">
                    <span className="icon icon-map-marker" />

                    { this.HTMLResource.about.contacts.correspondence.position }
                </div>

                <div className="correspondence__work-time">
                    <span className="icon icon-clock" />

                    { this.HTMLResource.about.contacts.correspondence.time }
                </div>

                <div className="correspondence__email">
                    <a href={`mailto:${this.Resource.links.emails.partners}`}>
                        <span className="icon icon-envelope" />

                        { this.Resource.links.emails.partners }
                    </a>
                </div>

                {/*<div className="correspondence__phone">*/}
                {/*    <a href="tel:+380567470254">*/}
                {/*        +380567470254*/}
                {/*    </a>*/}
                {/*</div>*/}

                <div className="correspondence__map d-xl-block d-md-none d-block">
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

export default Correspondence;
