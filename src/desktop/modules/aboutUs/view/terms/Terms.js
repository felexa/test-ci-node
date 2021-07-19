import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Terms extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <div
                dangerouslySetInnerHTML={{__html: this.HTMLResource.about.privacyPolicy.content}}
                className="terms"
            />
        );
    }
}

export default Terms;
