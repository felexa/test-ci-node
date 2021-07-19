import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Description extends React.Component {
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
            <div
                dangerouslySetInnerHTML={{__html: this.HTMLResource.about.publishingPolicy.description}}
                className="publishing-policy__description"
            />
        );
    }
}

export default Description;
