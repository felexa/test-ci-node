import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Confidential extends React.Component {
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
            <section className="publishing-policy-section publishing-policy__confidential confidential">
                <header className="publishing-policy-section__header">
                    <h3 className="publishing-policy-section__title">
                        {this.HTMLResource.about.publishingPolicy.confidential.title}
                    </h3>
                </header>

                <div
                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.publishingPolicy.confidential.content}}
                    className="publishing-policy-section__body"
                />
            </section>
        );
    }
}

export default Confidential;
