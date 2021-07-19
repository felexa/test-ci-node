import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Vendor extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _hasLogo
     * @returns {boolean}
     */
    _hasLogo() {
        return Boolean(this.props.brand.getLogo().getSrc());
    }

    /**
     * @private
     * @method _hasName
     * @returns {boolean}
     */
    _hasName() {
        return Boolean(this.props.brand.getName());
    }

    /**
     * @method render
     * @returns {String}
     */
    render() {
        return (
            <div className="product-card__vendor vendor mb-24">
                <div className="vendor__body d-flex align-items-center rounded-10">
                    { this._hasLogo() &&
                    (
                        <div className="vendor__logo d-flex align-items-center justify-content-center flex-shrink-0">
                            <img
                                src={this.props.brand.getLogo().getSrc()}
                                alt={this.props.brand.getLogo().getAlt()}
                                width="70"
                                height="70"
                            />
                        </div>
                    ) }

                    { this._hasName() &&
                    (
                        <div className="vendor__name">
                            <span>{this.stringsResource.vendor}: </span>

                            <strong>{this.props.brand.getName()}</strong>
                        </div>

                    ) }
                </div>
            </div>
        );
    }
}

Vendor.propTypes = {
    brand: PropTypes.instanceOf(Object).isRequired
};

export default Vendor;
