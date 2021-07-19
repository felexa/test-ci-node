import React from "react";
import Env from "app/core/environment";
import Resource from "app/core/resource";

import Price from "components/price/Price";
import PropTypes from "prop-types";

class SeoPrices extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Resource}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _getTitle
     * @return {string}
     */
    _getTitle() {
        return `${this.stringsResource.pricesFor} ${this.props.catalogData.getTitle()}`;
    }

    /**
     * @private
     * @method _getProducts
     * @return {Array}
     */
    _getProducts() {
        let filteredProduct = this.props.catalogData.getProducts().filter((item) => item.getPrice().getCurrent() !== 0);

        return filteredProduct.slice(0, 5);
    }

    /**
     * @private
     * @method _getTableBody
     * @return {Array}
     */
    _getTableBody() {
        return this._getProducts().map((item, i) => (
            <tr key={i}>
                <td>
                    {item.getName()}
                </td>
                <td>
                    <Price value={item.getPrice().getCurrent()} />
                </td>
            </tr>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="seo-prices mt-40">
                <h2>{this._getTitle()}</h2>
                <div className="seo-prices__body rounded-16 bg-white new-super-box-shadow">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    {this.props.catalogData.getChosenCategory()}
                                </th>
                                <th>
                                    {this.stringsResource.price}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this._getTableBody()}
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

SeoPrices.propTypes = {
    catalogData: PropTypes.instanceOf(Object).isRequired
};

export default SeoPrices;
