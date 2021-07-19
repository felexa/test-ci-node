import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Strings from "app/core/utilites/strings";

import StructuredData from "components/microData/StructuredData";

class MicroData extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.linksResource = Resource.links;

        this.strings = Strings.getInstance();
    }

    /**
     * @method getSchema
     * @returns {Object}
     */
    getSchema() {
        let schema = {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: this.props.title,
            dateModified: new Date(this.props.updatedAt).toISOString(),
            publisher: {
                "@type": "Organization",
                name: "apteka24.ua",
                logo: this.linksResource.logoSimple,
                url: this.linksResource.homePage,
                email: "client@apteka24.ua"
            }
        };

        if (this.props.author.getId()) {
            Object.assign(schema, {
                author: {
                    "@type": "Person",
                    name: this.props.author.getFullName(),
                    url: this.props.author.getUrl(),
                    image: this.props.author.getAvatar().getOriginal()
                }
            });
        }

        if (this.props.censor.getId()) {
            Object.assign(schema, {
                reviewedBy: {
                    "@type": "Person",
                    name: this.props.censor.getFullName(),
                    url: this.props.censor.getUrl(),
                    image: this.props.censor.getAvatar().getOriginal()
                }
            });
        }

        return schema;
    }

    render() {
        return <StructuredData schema={this.getSchema()} />;
    }
}

MicroData.propTypes = {
    author: PropTypes.instanceOf(Object),
    censor: PropTypes.instanceOf(Object),
    updatedAt: PropTypes.number,
    // text: PropTypes.string,
    title: PropTypes.string
};

MicroData.defaultProps = {
    author: {},
    censor: {},
    updatedAt: 0,
    // text: "",
    title: ""
};

export default MicroData;
