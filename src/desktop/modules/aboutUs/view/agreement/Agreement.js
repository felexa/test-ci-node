import React from "react";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class Agreement extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <div
                dangerouslySetInnerHTML={{__html: this.HTMLResource.about.agreement.content}}
                className="agreement"
            />
        );
    }
}

export default Agreement;
