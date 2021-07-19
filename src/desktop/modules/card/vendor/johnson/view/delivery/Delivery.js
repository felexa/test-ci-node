import React from "react";

import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class Delivery extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.repositoryURL = Env.getInstance().getMainImageRepository();
    }

    /**
     * @private
     * @method _renderTrademarks
     * @returns {React.element}
     */
    _renderTrademarks() {
        return (
            <div className="trademarks d-flex flex-wrap justify-content-between align-items-center">
                {this.props.trademarks.map((item) => (
                    <div key={item.getId()} className="trademarks__item">
                        <img src={item.getLogo().getSmall()} alt={item.getLogo().getAlt()} />
                    </div>
                ))}
            </div>
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <>
                <div className="delivery">
                    <div className="d-md-flex">
                        <div className="delivery__section flex-grow-1 color-white">
                            <header className="delivery__header mb-8">
                                <div className="delivery__title text-uppercase">
                                    {this.stringsResource.freeDelivery}
                                </div>
                            </header>

                            <div className="delivery__body">
                                <div className="delivery__description mb-32 f-weight-4">
                                    {this.HTMLResource.manufacturer.johnson.delivery.buyingAnyProduct}
                                    <span className="f-weight-5"> {this.HTMLResource.manufacturer.johnson.delivery.title}</span>
                                </div>

                                <div className="delivery__validity">
                                    {this.HTMLResource.manufacturer.johnson.delivery.discountTerm}
                                </div>
                            </div>
                        </div>

                        <div className="delivery__preview">
                            <img
                                src={`${this.repositoryURL}/manufacturer/johnson/delivery.jpg`}
                                alt="logo"
                            />
                        </div>
                    </div>

                    <div className="delivery__trademarks">
                        {this._renderTrademarks()}
                    </div>
                </div>
            </>
        );
    }
}

Delivery.propTypes = {
    trademarks: PropTypes.instanceOf(Array)
};

Delivery.defaultProps = {
    trademarks: []
};

export default Delivery;
