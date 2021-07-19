import React from "react";
import Resource from "app/core/resource";

import StructuredData from "components/microData/StructuredData";

class WebSite extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;
    }

    /**
     * @method getSchema
     * @returns {Object}
     */
    getSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: this.Resource.links.homePage,
            potentialAction: {
                "@type": "SearchAction",
                target: `${this.Resource.links.homePage}search/?query={search_term_string}`,
                "query-input": "required name=search_term_string"
            }
        };
    }

    render() {
        return <StructuredData schema={this.getSchema()} />;
    }
}

export default WebSite;
