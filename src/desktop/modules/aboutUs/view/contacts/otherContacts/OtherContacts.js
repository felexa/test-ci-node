import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class OtherContacts extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @method _getItems
     * @returns {Array}
     * @private
     */
    _getItems() {
        return this.HTMLResource.about.contacts.otherContacts.items || [];
    }

    /**
     * @private
     * @method renderItems
     * @returns {Array}
     */
    renderItems() {
        return this._getItems().map((item) => (
            <li
                className="other-contacts__item mb-16 rounded-10"
                key={item.id}
            >
                <p className="item__title">
                    { item.title }
                </p>

                <a className="item__phone" href={`tel:${item.phone}`}>
                    <span className="icon icon-earphone" />

                    { item.phone }
                </a>

                <a className="item__email" href={`mailto:${item.email}`}>
                    <span className="icon icon-envelope" />

                    { item.email }
                </a>
            </li>
        ));
    }

    /**
     * @private
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="contacts__other-contacts other-contacts">
                <ul className="other-contacts__items d-flex justify-content-between flex-wrap">
                    { this.renderItems() }
                </ul>
            </section>
        );
    }
}

export default OtherContacts;
