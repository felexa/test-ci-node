import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class CommentsRules extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className="publishing-policy-section publishing-policy__comments-rules comments-rules">
                <header className="publishing-policy-section__header">
                    <h3 className="publishing-policy-section__title">
                        {this.HTMLResource.about.publishingPolicy.commentsRules.title}
                    </h3>
                </header>

                <div
                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.publishingPolicy.commentsRules.content}}
                    className="publishing-policy-section__body"
                />
            </section>
        );
    }
}

export default CommentsRules;
