import React from "react";
import PropTypes from "prop-types";
import Resource from "app/core/resource";

import StructuredData from "components/microData/StructuredData";

class Person extends React.Component {
    constructor(props) {
        super(props);

        this._linksResource = Resource.links;
    }

    /**
     * @private
     * @method _getURLOfReferenceWebPage
     * @returns {Array}
     */
    _getURLOfReferenceWebPage() {
        let result = [];

        this.props.profile.getSocialNetworks().forEach((item) => result.push(item.getUrl()));

        return result;
    }

    /**
     * @private
     * @method _getUrl
     * @returns {string}
     */
    _getUrl() {
        return `${this._linksResource.homePage}${this.props.profile.getUrl()}`;
    }

    /**
     * @method getSchema
     * @returns {Object}
     */
    getSchema() {
        let { profile } = this.props;

        return {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${this._getUrl()}#schema-author`,
            url: this._getUrl(),
            name: profile.getFullName(),
            jobTitle: profile.getPosition(),
            sameAs: this._getURLOfReferenceWebPage(),
            image: {
                "@type": "ImageObject",
                "@id": `${profile.getAvatar().getOriginal()}#author-image`,
                url: profile.getAvatar().getOriginal(),
                caption: profile.getFullName()
            }
        };
    }

    render() {
        return <StructuredData schema={this.getSchema()} />;
    }
}

Person.propTypes = {
    profile: PropTypes.instanceOf(Object)
};

Person.defaultProps = {
    profile: null
};

export default Person;
