import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class ForPregnant extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _isDisplayedRelatedLinks
     * @param item {Object}
     * @returns {boolean}
     */
    _isDisplayedRelatedLinks(item) {
        return Boolean(item.links.length);
    }

    /**
     * @private
     * @method _renderRelatedLinks
     * @param item {Object}
     * @returns {Array}
     */
    _renderRelatedLinks(item) {
        return item.links.map((link) => (
            <li
                className="related-links__item"
                key={link.title}
            >
                <a
                    href={link.url}
                    target="_blank"
                >
                    { link.title }
                </a>
            </li>
        ));
    }

    _renderItems() {
        return this.props.forPregnant.map((item) => (
            <div className="for-pregnant__item" key={item.id}>
                <div
                    className="item__body"
                    dangerouslySetInnerHTML={{
                        __html: item.text
                    }}
                />

                <div className="item__footer">
                    { this._isDisplayedRelatedLinks(item) && (
                        <div className="item__related-links related-links">
                            <p className="related-links__title">
                                { this.stringsResource.links }
                            </p>

                            <ul className="related-links__items">
                                { this._renderRelatedLinks(item) }
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <div className="catalog__for-pregnant for-pregnant">
                <div className="for-pregnant__items">
                    { this._renderItems() }
                </div>
            </div>
        );
    }
}

ForPregnant.propTypes = {
    forPregnant: PropTypes.instanceOf(Array)
};

ForPregnant.defaultProps = {
    forPregnant: []
};

export default ForPregnant;
