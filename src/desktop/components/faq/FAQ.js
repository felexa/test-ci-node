import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Box from "app/core/components/Box";

import Accordion from "components/accordion/Accordion";

class FAQ extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property microdataAttribute
         * @type {Object}
         */
        this.microdataAttribute = {
            itemScope: true,
            itemProp: "mainEntity",
            itemType: "https://schema.org/Question"
        };
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
            return `
                ${item.getShortAnswer()}&nbsp;
                <a href="${this.Resource.links.medicalAnswers}${item.getAlias()}" target="_blank">
                    ${this.stringsResource.readAll}
                </a>
            `;
        }

        return `${item.getShortAnswer()}`;
    }

    /**
     * @private
     * @method _createItems
     * @returns {[{title: string, description: string}]}
     */
    _createItems() {
        return this.props.items.map((item) => ({
            title: item.getQuestion(),
            description: this._buildShortAnswer(item)
        }));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className={classnames("faq", this.props.className)}>
                <div className="faq__header">
                    <h2 className="faq__title color-black f-weight-5">
                        {this.props.title}
                    </h2>
                </div>

                <div className="faq__body">
                    <Box
                        component="div"
                        rounded={16}
                        className="bg-white new-super-box-shadow"
                    >
                        <Accordion
                            items={this._createItems()}
                            asHtml
                            panelProps={{
                                //microDataAttrs: this.microdataAttribute,
                                iconOpen: this.props.iconOpen,
                                iconClose: this.props.iconClose
                            }}
                        />
                    </Box>
                </div>
            </section>
        );
    }
}

FAQ.propTypes = {
    items: PropTypes.instanceOf(Array),
    iconOpen: PropTypes.string,
    iconClose: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string
};

FAQ.defaultProps = {
    items: [],
    iconOpen: "icon-plus",
    iconClose: "icon-minus",
    className: "",
    title: ""
};

export default FAQ;
