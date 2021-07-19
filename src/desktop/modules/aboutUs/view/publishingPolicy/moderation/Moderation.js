import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Moderation extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className="publishing-policy-section publishing-policy__moderation moderation">
                <header className="publishing-policy-section__header">
                    <h3 className="publishing-policy-section__title">
                        {this.HTMLResource.about.publishingPolicy.moderation.title}
                    </h3>
                </header>

                <div
                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.publishingPolicy.moderation.content}}
                    className="publishing-policy-section__body"
                />
            </section>
        );
    }
}

export default Moderation;
