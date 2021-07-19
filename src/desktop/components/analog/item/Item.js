import React from "react";
import PropTypes from "prop-types";

import Price from "components/price/Price";
import BuyButton from "components/buttons/buy/Buy";
import Image from "components/image/Image";

class Item extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property
         * @type {number}
         */
        this.maxPropertiesCount = 3;
    }

    /**
     * @private
     * @method getProperties
     * @returns {Property[]}
     */
    getProperties() {
        return this.props.item.getProperties().slice(0, this.maxPropertiesCount);
    }

    /**
     * @method renderProperties
     * @returns {Array}
     */
    renderProperties() {
        return this.getProperties().map(function (item) {
            return (
                <p key={item.getId()}>
                    {item.getName()}: <span className="color-gray-1">{item.getValue()}</span>
                </p>
            );
        });
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        let {item} = this.props;

        return (
            <tr className="analogs__item item">
                <td className="item__col text-center">
                    <div className="item__preview">
                        <a href={item.getUrl()} className="d-flex align-items-center justify-content-center">
                            <Image
                                className="lazyload"
                                data-src={item.getPreview().getMedium()}
                                alt={item.getPreview().getAlt()}
                                width={item.getPreview().getSizes().getMedium().getWidth()}
                                height={item.getPreview().getSizes().getMedium().getHeight()}
                            />
                        </a>
                    </div>
                </td>

                <td className="item__col">
                    <div className="item__name mb-12">
                        <a className="text-decoration-none" href={item.getUrl()}>{item.getName()}</a>
                    </div>

                    <div className="item__properties">
                        {this.renderProperties()}
                    </div>

                    <div className="d-flex align-items-center d-md-none mt-16 justify-content-between">
                        <Price value={item.getPrice().getCurrent()} />

                        <BuyButton
                            className="item__to-buy--mobile d-inline-flex align-items-center justify-content-center"
                            product={item}
                            hasIcon
                            hasName={false}
                            addToBasket={this.props.selectItem}
                        />
                    </div>
                </td>

                <td className="item__col d-none d-md-table-cell">
                    <Price value={item.getPrice().getCurrent()} />
                </td>

                <td className="item__col d-none d-md-table-cell">
                    <BuyButton
                        className="btn-block text-uppercase"
                        product={item}
                        hasIcon
                        addToBasket={this.props.selectItem}
                    />
                </td>
            </tr>
        );
    }
}

Item.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    selectItem: PropTypes.func.isRequired
};

export default Item;
