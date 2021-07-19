import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class Drugs extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.state = {
            items: props.items
        };
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.state.items.map((item) => (
            <li className="drugs__item" key={item.id}>
                <a href={`${this.Resource.links.pregnancy}${item.mnnAlais}/`} target="_blank">
                    {item.mnnName}
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
            <div className="pregnancy__drugs drugs">
                <p className="drugs__title pregnancy-section__title">
                    { this.HTMLResource.pregnancy.drugs.title }
                </p>

                <ul className="drugs__items list--default">
                    {this._renderItems()}
                </ul>
            </div>
        );
    }
}

Drugs.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired
};

export default Drugs;
