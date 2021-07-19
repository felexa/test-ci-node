import React from "react";
import PropTypes from "prop-types";

import Strings from "app/core/utilites/strings";

import StructuredData from "components/microData/StructuredData";

class MicroData extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property maxDescriptionLength
         * @type {number}
         */
        this.maxDescriptionLength = 90;

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();
    }

    /**
     * @private
     * @method _getShortDescription
     * @returns {string}
     */
    _getShortDescription(item) {
        return this.strings.clip(item.getDescription(), this.maxDescriptionLength);
    }

    /**
     * @method _getArticleSchema
     * @returns {Array}
     */
    _getArticleSchema() {
        return this.props.articles.map((item) => ({
            "@type": "BlogPosting",
            headline: item.getTitle(),
            datePublished: item.getPublishDate(),
            dateModified: item.getPublishDate(),
            image: item.getPreview().getSmall(),
            sharedContent: item.getPreview().getSmall(),
            articleBody: this._getShortDescription(item),
            articleSection: item.getCategory().getName(),
            author: {
                "@type": "Person",
                name: item.getAuthor().getFullName()
            },
            publisher: {
                "@type": "Organization",
                name: "Медмаркет Аптека24",
                logo: {
                    "@type": "ImageObject",
                    url: "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/temp-images/Logo_A24+Pink.svg"
                },
                url: "https://www.apteka24.ua/",
                email: "client@apteka24.ua"
            },
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.apteka24.ua/"
            }
        }));
    }

    /**
     * @method _getSchema
     * @returns {Object}
     */
    _getSchema() {
        return {
            "@context": "http://schema.org/",
            "@type": "Blog",
            blogPost: this._getArticleSchema()
        };
    }

    render() {
        return <StructuredData schema={this._getSchema()} />;
    }
}

MicroData.propTypes = {
    articles: PropTypes.instanceOf(Array).isRequired
};

export default MicroData;
