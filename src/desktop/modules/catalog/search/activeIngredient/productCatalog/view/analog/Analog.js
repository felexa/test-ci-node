/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import ProductGroup from "components/productGroup/ProductGroup";

class Analogs extends React.Component {
    /**
     * @method _renderItems
     * @returns {Array}
     * @private
     */
    _renderItems() {
        return this.props.items.map((item, i) => <ProductGroup item={item} key={i} />);
    }

    render() {
        return (
            <div className="catalog__product-group-items d-flex flex-wrap product-group--analogs">
                {this._renderItems()}
            </div>
        );
    }
}

Analogs.propTypes = {
    items: PropTypes.instanceOf(Array)
};

Analogs.defaultProps = {
    items: []
};

export default Analogs;
