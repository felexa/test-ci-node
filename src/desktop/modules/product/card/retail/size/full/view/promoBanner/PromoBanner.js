/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class PromoBanner extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.productName = this._getProductName();
    }

    /**
     * @private
     * @method _isDisplayedPrice
     * @returns {boolean}
     */
    _getProductName() {
        let productName;

        switch (this.props.code) {
            case "1600002": productName = "vaksigrip";
                break;
            case "1949025": productName = "prevenar";
                break;
            case "5489016": productName = "prevenar";
                break;
            default: productName = "";
        }

        return productName;
    }

    render() {
        return (
            <div
                className="promo"
                dangerouslySetInnerHTML={{__html: this.HTMLResource.promoBanners[this.productName]}}
            />
        );
    }
}

PromoBanner.propTypes = {
    code: PropTypes.string
};

PromoBanner.defaultProps = {
    code: ""
};

export default PromoBanner;
