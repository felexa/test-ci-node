import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Dom from "app/core/utilites/dom";
import Resource from "app/core/resource";

import FAQ from "components/faq/FAQ";
import MicroDataFaq from "components/faq/microData/MicroData";

class Terms extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _getItems
     * @returns {FAQ[]}
     */
    _getItems() {
        return this.props.items;
    }

    /**
     * @private
     * @method _hasFAQ
     * @returns {boolean}
     */
    _hasFAQ() {
        return Boolean(this._getItems().length);
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <>
                {this._hasFAQ() && (
                    <MicroDataFaq faq={this._getItems()} />
                )}

                <section className="section insurance__terms terms">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <p
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.terms.title}}
                                    className="section__title"
                                />

                                <FAQ
                                    items={this._getItems()}
                                    iconOpen="icon-chevron-down"
                                    iconClose="icon-chevron-up"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

Terms.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired
};

export default Terms;
