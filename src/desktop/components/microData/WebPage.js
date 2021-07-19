import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Strings from "app/core/utilites/strings";

import StructuredData from "components/microData/StructuredData";

class WebPage extends React.Component {
    constructor(props) {
        super(props);

        this.linksResource = Resource.links;

        this.strings = Strings.getInstance();
    }

    /**
     * @private
     * @method _getPageInfo
     * @returns {Object}
     */
    _getPageInfo() {
        return this.props.pageInfo;
    }

    /**
     * @private
     * @method _getLastReviewed
     * @returns {string}
     */
    _getLastReviewed() {
        return this.strings.getCurrentDateAsText();
    }

    /**
     * @private
     * @method _getSchema
     * @returns {Object}
     */
    _getSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: this._getPageInfo().getMeta().getTitle(),
            description: this._getPageInfo().getMeta().getDescription(),
            reviewedBy: {
                "@type": "Organization",
                logo: this.linksResource.logoSimple,
                url: this.linksResource.homePage,
                email: "client@apteka24.ua"
            },
            lastReviewed: this._getLastReviewed()
        };
    }

    render() {
        return <StructuredData schema={this._getSchema()} />;
    }
}

WebPage.propTypes = {
    pageInfo: PropTypes.instanceOf(Object).isRequired
};

export default WebPage;
