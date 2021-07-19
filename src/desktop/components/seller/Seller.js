/* eslint-disable max-len */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Seller extends React.Component {
    constructor(props) {
        super(props);

        this.seller = props.seller;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className={classNames("seller p-16", this.props.className)}>
                <div className="seller__body">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="seller__name">
                            <span>{this.stringsResource.seller}:</span> <strong>{ this.seller.getName() }</strong>
                        </div>

                        <div className="d-flex">
                            <img
                                data-src={this.seller.getLogo().getSmall()}
                                alt={this.seller.getName()}
                                className="seller-logo lazyload"
                                width="130"
                                height="20"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Seller.propTypes = {
    seller: PropTypes.instanceOf(Object).isRequired,
    className: PropTypes.string
};

Seller.defaultProps = {
    className: ""
};

export default Seller;
