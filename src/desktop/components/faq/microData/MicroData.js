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

        this.strings = Strings.getInstance();
    }

    /**
     * @private
     * @method _hasUrl
     * @param item {FAQ}
     * @returns {boolean}
     */
    _hasUrl(item) {
        return Boolean(item.getAlias());
    }

    /**
     * @private
     * @method _buildShortAnswer
     * @param item {FAQ}
     * @returns {string}
     */
    _buildShortAnswer(item) {
        if (this._hasUrl(item)) {
            // eslint-disable-next-line max-len
            return `${item.getShortAnswer()}&nbsp;
                <a href="${this.Resource.links.medicalAnswers}${item.getAlias()}" target="_blank">
                    ${this.stringsResource.readAll}
                </a>`;
        }

        return `${item.getShortAnswer()}`;
    }

    /**
     * @method getFAQSchema
     * @returns {Array}
     */
    getFAQSchema() {
        return this.props.faq.map((item) => ({
            "@type": "Question",
            name: item.getQuestion(),
            acceptedAnswer: {
                "@type": "Answer",
                text: this._buildShortAnswer(item)
            }
        }));
    }

    /**
     * @method getSchema
     * @returns {Object}
     */
    getSchema() {
        let schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: this.getFAQSchema()
        };

        return schema;
    }

    render() {
        return <StructuredData schema={this.getSchema()} />;
    }
}

MicroData.propTypes = {
    faq: PropTypes.instanceOf(Array)
};

MicroData.defaultProps = {
    faq: []
};

export default MicroData;
