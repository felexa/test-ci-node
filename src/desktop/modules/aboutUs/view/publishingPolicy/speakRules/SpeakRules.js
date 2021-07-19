import React from "react";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class SpeakRules extends React.Component {
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
            <section className="publishing-policy-section publishing-policy__speak-rules speak-rules">
                <header className="publishing-policy-section__header">
                    <h3 className="publishing-policy-section__title">
                        {this.HTMLResource.about.publishingPolicy.speakRules.title}
                    </h3>
                </header>

                <div
                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.publishingPolicy.speakRules.content}}
                    className="publishing-policy-section__body"
                />
            </section>
        );
    }
}

export default SpeakRules;
