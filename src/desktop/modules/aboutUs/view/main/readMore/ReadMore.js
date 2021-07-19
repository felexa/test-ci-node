import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class ReadMore extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <section
                className="about__read-more read-more about-section"
                dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.readMoreInfo}}
            />
        );
    }
}

export default ReadMore;
