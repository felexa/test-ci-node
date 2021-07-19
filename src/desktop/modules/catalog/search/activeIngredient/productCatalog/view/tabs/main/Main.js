/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Product from "desktop/components/product/card/retail/size/xs/Product";

class Main extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    /**
     * @method _renderItems
     * @returns {Array}
     * @private
     */
    _renderItems() {
        return this.props.products.map((item) => <Product key={item.getId()} item={item} />);
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="catalog__items">
                {this._renderItems()}
            </div>
        );
    }
}

Main.propTypes = {
    products: PropTypes.instanceOf(Array)
};

Main.defaultProps = {
    products: []
};

export default Main;
