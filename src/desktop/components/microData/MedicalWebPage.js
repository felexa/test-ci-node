import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Strings from "app/core/utilites/strings";

import StructuredData from "components/microData/StructuredData";

class MedicalWebPage extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property linksResource
         * @type {Resource}
         */
        this.linksResource = Resource.links;

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();
    }

    /**
     * @method
     * @return {boolean}
     * @private
     */
    _hasImage() {
        return Boolean(this.props.image);
    }

    /**
     * @method _getImageUrl
     * @return {string}
     * @private
     */
    _getImageUrl() {
        return this.props.image.getOriginal();
    }

    /**
     * @private
     * @method _hasAuthor
     * @returns {boolean}
     */
    _hasAuthor() {
        return Boolean(this.props.author && this.props.author.getId());
    }

    /**
     * @private
     * @method _hasCensor
     * @returns {boolean}
     */
    _hasCensor() {
        return Boolean(this.props.censor && this.props.censor.getId());
    }

    /**
     * @method _getSchema
     * @return {Object}
     * @private
     */
    _getSchema() {
        let result = {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: this.props.name,
            description: this.props.description,
            datePublished: this.props.datePublished,
            dateModified: this.props.dateModified,
            publisher: {
                "@type": "Organization",
                name: "apteka24.ua",
                logo: this.linksResource.logoSimple,
                url: this.linksResource.homePage,
                email: "client@apteka24.ua"
            }
        };

        if (this.props.mainEntityOfPage) {
            Object.assign(result, {
                mainEntityOfPage: this.props.mainEntityOfPage
            });
        }

        if (this._hasImage()) {
            Object.assign(result, {
                image: {
                    "@type": "ImageObject",
                    url: this._getImageUrl()
                    // width: "",
                    // height: ""
                }
            });
        }

        if (this._hasAuthor()) {
            Object.assign(result, {
                author: {
                    "@type": "Person",
                    name: this.props.author.getShortName(),
                    url: this.props.author.getUrl(),
                    image: this.props.author.getAvatar().getOriginal()
                }
            });
        }

        if (this._hasCensor()) {
            Object.assign(result, {
                lastReviewed: this.props.lastReviewed,
                reviewedBy: {
                    "@type": "Person",
                    name: this.props.censor.getShortName(),
                    url: this.props.censor.getUrl(),
                    image: this.props.censor.getAvatar().getOriginal()
                }
            });
        }

        return result;
    }

    render() {
        return <StructuredData schema={this._getSchema()} />;
    }
}

MedicalWebPage.propTypes = {
    name: PropTypes.string,
    mainEntityOfPage: PropTypes.string,
    description: PropTypes.string,
    datePublished: PropTypes.string,
    dateModified: PropTypes.string,
    lastReviewed: PropTypes.string,
    image: PropTypes.instanceOf(Object),
    author: PropTypes.instanceOf(Object),
    censor: PropTypes.instanceOf(Object)
};

MedicalWebPage.defaultProps = {
    name: "",
    mainEntityOfPage: "",
    description: "",
    datePublished: "",
    dateModified: "",
    lastReviewed: "",
    image: null,
    author: null,
    censor: null
};

export default MedicalWebPage;
