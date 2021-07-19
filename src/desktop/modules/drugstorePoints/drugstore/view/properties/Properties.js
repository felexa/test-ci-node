import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Dom from "app/core/utilites/dom";

class Properties extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property
         * @type {Object}
         */
        this.selectors = {
            location: ".drugstore-card__location"
        };

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        this._scrollToMap = this._scrollToMap.bind(this);
    }

    /**
     * @private
     * @method _hasLocation
     * @returns {boolean}
     */
    _hasLocation() {
        return Boolean(this._getDrugstore().getLocationAsText());
    }

    /**
     * @private
     * @method _hasPhone
     * @returns {boolean}
     */
    _hasPhone() {
        return Boolean(this._getDrugstore().getPhone());
    }

    /**
     * @private
     * @method _getDrugstore
     * @returns {Drugstores[]}
     */
    _getDrugstore() {
        return this.props.drugstore;
    }

    /**
     * @private
     * @method _scrollToMap
     * @returns {Properties}
     */
    _scrollToMap() {
        this.dom.scrollToElementBySelector(this.selectors.location);

        return this;
    }

    render() {
        return (
            <div className="drugstore-card__properties">
                <div className="drugstore-card__property">
                    <p className="drugstore-card__property-title">
                        {this.stringsResource.drugstoreAddress}:
                    </p>
                    <p className="drugstore-card__property-description">
                        {this._getDrugstore().getAddressAsText()}
                    </p>
                </div>
                {this._hasLocation() && (
                    <div className="drugstore-card__property drugstore-card__property--location">
                        <p className="drugstore-card__property-title">
                            {this.stringsResource.howToGetThere}:
                        </p>
                        <p className="drugstore-card__property-description">
                            {this._getDrugstore().getLocationAsText()}
                        </p>
                    </div>
                )}
                <p className="drugstore-card__property drugstore-card__property--scroll-to-map">
                    <span
                        onClick={this._scrollToMap}
                        className="color-link"
                    >
                        {this.stringsResource.seeOnTheMap}
                    </span>
                </p>
                <div className="drugstore-card__property">
                    <p className="drugstore-card__property-title">
                        {this.stringsResource.workTime}:
                    </p>
                    <p className="drugstore-card__property-description">
                        {this._getDrugstore().getWorkTime()}
                    </p>
                </div>
                {this._hasPhone() && (
                    <div className="drugstore-card__property">
                        <p className="drugstore-card__property-title">
                            {this.stringsResource.contacts}:
                        </p>
                        <p className="drugstore-card__property-description">
                            {this._getDrugstore().getPhone()}
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

Properties.propTypes = {
    drugstore: PropTypes.instanceOf(Object).isRequired
};

export default Properties;
