import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import AccountSectionEnum from "app/core/utilites/enum/account/section";
import Numbers from "app/core/utilites/numbers";

class Bonus extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property numbers
         * @type {Numbers}
         */
        this.numbers = Numbers.getInstance();

        /**
         * @property resource
         * @type {Resource}
         */
        this.resource = Resource.getInstance(Env.getInstance().getLanguage());

        /**
         * @property accountSectionEnum
         * @type {Enum}
         */
        this.accountSectionEnum = AccountSectionEnum.getInstance();

        /**
         * @property linksResource
         * @type {Object}
         */
        this.linksResource = Resource.links;
    }

    /**
     * @private
     * @method _getBonus
     * @returns {Object}
     */
    _getBonus() {
        return this.props.bonus;
    }

    /**
     * @private
     * @method _getTotalAvailableCount
     * @returns {string}
     */
    _getTotalAvailableCount() {
        return this.numbers.toLocaleString(Math.floor(this._getBonus().getTotalAvailableCount()));
    }

    /**
     * @private
     * @method _getUrlToBonus
     * @returns {string}
     */
    _getUrlToBonus() {
        return this.resource.getAccount().getNavigationByKey(this.accountSectionEnum.getBonusAsValue()).getUrl();
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <a
                href={this._getUrlToBonus()}
                className="account-bonus d-flex align-items-center"
            >
                <div className="account-bonus__icon rounded-100 d-flex align-items-center justify-content-center">
                    <img
                        src={this.linksResource.icons.carrotColored}
                        alt=""
                        width="16"
                        height="16"
                    />
                </div>

                {this._getTotalAvailableCount()}&nbsp;₴
            </a>
        );
    }
}

Bonus.propTypes = {
    bonus: PropTypes.instanceOf(Object).isRequired
};

export default Bonus;
