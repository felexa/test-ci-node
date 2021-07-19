import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Advantages extends React.Component {
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
    }

    /**
     * @private
     * @method _getItems
     * @returns {Array}
     */
    _getItems() {
        return this.props.items;
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this._getItems().map((item) => (
            <div className="advantages__item text-center" key={item.id}>
                <div className="item__preview d-flex justify-content-center align-items-center mb-24">
                    <img src={item.icon} alt="preview" />
                </div>

                <p className="item__title f-weight-5">
                    { item.title }
                </p>

                <p className="item__description line-height-1-5" dangerouslySetInnerHTML={{__html: item.description}} />
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="insurance__advantages advantages section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.advantages.title}}
                                className="section__title advantages__title"
                            />

                            <div className="advantages__items d-md-flex justify-content-md-between">
                                { this._renderItems() }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Advantages.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired
};

export default Advantages;
