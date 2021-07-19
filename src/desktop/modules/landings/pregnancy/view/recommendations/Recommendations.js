import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Recommendations extends React.Component {
    constructor(props) {
        super(props);

        this.items = props.items;

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.items.map((item) => (
            <li className="recommendations__item" key={item.id}>
                <a href={item.url} target="_blank">
                    { item.title }
                </a>
            </li>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <div className="pregnancy__recommendations recommendations">
                <p className="recommendations__title pregnancy-section__title">
                    { this.HTMLResource.pregnancy.recommendations.title }
                </p>

                <ul className="recommendations__items list--default">
                    { this._renderItems() }
                </ul>
            </div>
        );
    }
}

Recommendations.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired
};

export default Recommendations;
