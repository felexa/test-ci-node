import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Numbers from "app/core/utilites/numbers";

class Banner extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property numbers
         * @type {Numbers}
         */
        this.numbers = Numbers.getInstance();

        this.env = Env.getInstance();

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.Resource = Resource;
    }

    /**
     * @private
     * @method _hasBonuses
     * @returns {boolean}
     */
    _hasBonuses() {
        return Boolean(this._getBonusAmount());
    }

    /**
     * @private
     * @method _getBonusAmount
     * @returns {String}
     */
    _getBonusAmount() {
        return this.numbers.toLocaleString(Math.floor(this.props.amount));
    }

    render() {
        return (
            <>
                {this._hasBonuses() && (
                    <div className="bonus__banner rounded-16">
                        <div className="bonus__banner-essentials">
                            <div className="bonus__banner-label">
                                <img
                                    src={this.Resource.links.images.yellowCarrot}
                                    alt="white-carrot"
                                />

                                <div className="text-white">
                                    <span>
                                        {this.stringsResource.onYourBalance}:
                                    </span>

                                    <div className="bonus__banner-quantity flex-wrap flex-sm-nowrap mt-16 f-weight-5">
                                        <span className="bonus__banner-price">
                                            {this._getBonusAmount()}
                                        </span>

                                        <span>
                                            {this.stringsResource.amountOfBonusWithoutValue.toLowerCase()}
                                            <br />
                                            {this.stringsResource.currency.uah}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bonus__banner-controlers d-flex justify-content-between align-items-center">
                                <button
                                    className="btn-default--outline btn-sm d-flex align-items-center mr-2 bonus__banner-upgrade-bonus"
                                    type="button"
                                    onClick={this.props.refreshBonus}
                                >
                                    <i className="icon icon-refresh" />
                                    <span className="color-white">
                                        {this.stringsResource.updateBonuses.toUpperCase()}
                                    </span>
                                </button>

                                <a className="bonus__banner-instruction" href={this.Resource.links.morkovki}>
                                    {this.stringsResource.howToSpendBonuses}?
                                </a>
                            </div>
                        </div>

                        <div className="bonus__banner-label-img">
                            <img alt="rabbit" src={this.Resource.links.images.fedRabbit} />
                        </div>
                    </div>
                )}

                {!this._hasBonuses() && (
                    <div className="bonus__banner bonus__banner--empty rounded-16 flex-column align-items-center">
                        <img
                            className="bonus__banner--empty__picture mb-20"
                            alt="hungryRabbit"
                            src={this.Resource.links.images.hungryRabbit}
                        />

                        <p className="text-size--h4 f-weight-5 text-white mb-12">
                            {this.stringsResource.youDontHaveAnyBonusesYet} :(
                        </p>

                        <p className="text-white mt-0 mb-24">
                            {this.stringsResource.accumulateBonuses}
                        </p>

                        <a href={this.Resource.links.morkovki}>
                            {this.stringsResource.moreDetailsAboutBonuses}
                        </a>
                    </div>
                )}
            </>
        );
    }
}

Banner.propTypes = {
    amount: PropTypes.number,
    refreshBonus: PropTypes.func
};

Banner.defaultProps = {
    amount: 0,
    refreshBonus: () => {}
};

export default Banner;
