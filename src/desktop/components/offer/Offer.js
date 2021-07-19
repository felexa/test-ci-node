/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Item from "./Item";

class Offer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offers: [],
            isCollapsed: true
        };

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

        this._showAllOffers = this._showAllOffers.bind(this);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this._setDefaultState();
    }

    /**
     * @private
     * @method _isCollapsed
     * @returns {boolean}
     */
    _isCollapsed() {
        return this.state.isCollapsed;
    }

    /**
     * @private
     * @method _setDefaultState
     * @returns {Offer}
     */
    _setDefaultState() {
        let result = {};

        result.isCollapsed = this.props.offers.length > this.props.minItemsCount;
        result.offers = result.isCollapsed ? this.props.offers.slice(0, this.props.minItemsCount) : this.props.offers;

        this.setState(function () {
            return result;
        });

        return this;
    }

    /**
     * @private
     * @method _showAllOffers
     * @returns {Offer}
     */
    _showAllOffers() {
        this.setState(() => ({isCollapsed: false, offers: this.props.offers}));

        return this;
    }

    /**
     * @private
     * @method _renderItems
     * @param items {Offers[]}
     * @returns {Array}
     */
    _renderItems() {
        return this.state.offers.map((item) => (<Item key={item.getId()} item={item} addToBasket={this.props.addToBasket} />));
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className={classNames("offer", {collapsed: this._isCollapsed()})}>
                <div className="offer__header text-black">
                    <span>
                        {this.stringsResource.analogsFromOtherVendors}
                    </span>
                    &nbsp;
                    <span className="text-gray text-large">
                        ({this.HTMLResource.whatIsAnalog})
                    </span>
                </div>

                <div className="offer__body bg-white new-super-box-shadow">
                    <table className="offer__items w-100">
                        <tbody>
                            {this._renderItems()}
                        </tbody>
                    </table>
                    <footer className="text-center">
                        <button
                            type="button"
                            className="reset-btn-styles btn-md text-pink d-inline-flex align-items-center text-uppercase cursor-pointer"
                            onClick={this._showAllOffers}
                        >
                            {this.stringsResource.seeAllAnalogs}
                        </button>
                    </footer>
                </div>
            </section>
        );
    }
}

Offer.propTypes = {
    offers: PropTypes.instanceOf(Array),
    addToBasket: PropTypes.func.isRequired,
    minItemsCount: PropTypes.number
};

Offer.defaultProps = {
    offers: [],
    minItemsCount: 4
};

export default Offer;
