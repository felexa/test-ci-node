import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Description extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <div
                className="about__description"
                dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.description}}
            />
        );
    }
}

export default Description;
