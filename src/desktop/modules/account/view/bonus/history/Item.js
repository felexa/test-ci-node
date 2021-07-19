import React from "react";
import PropTypes from "prop-types";

import Price from "desktop/components/price/Price";

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.signs = {
            earned: "+",
            spent: "-"
        };
    }

    /**
     * @private
     * @method _getItem
     * @return {Transaction}
     */
    _getItem() {
        return this.props.item;
    }

    /**
     * @private
     * @method _getSignByType
     * @returns {string}
     */
    _getSignByType(type) {
        return this.signs[type] || "";
    }

    /**
     * @method getExpireDate
     * @return {string}
     */
    getExpireDate() {
        let indexOfDate = 0;

        return this._getItem().getExpireDateAsText().split(" ")[indexOfDate];
    }

    render() {
        return (
            <div className="item" data-status={this._getItem().getType().getValue()}>
                <div className="mr-16">
                    <div className="mb-12">
                        <span className="item__operation-date mr-16">
                            {this._getItem().getOperationDateAsText()}
                        </span>

                        <span className="item__status text-small">
                            {this._getItem().getType().getDescription()}
                        </span>
                    </div>

                    <div className="item__description">
                        {this._getItem().getDescription()} &nbsp;

                        <a href={this._getItem().getTarget().getUrl()} target="_blank">
                            {this._getItem().getTarget().getName()}
                        </a>
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-center">
                    <div className="item__amount">
                        <div className="text-medium f-weight-5 line-height-1">
                            {this._getSignByType(this._getItem().getType().getValue())}
                        </div>

                        <Price
                            value={this._getItem().getAmount()}
                        />
                    </div>

                    {this._getItem().hasExpireDate() && (
                        <span className="item__expire-date">
                            до {this.getExpireDate()}
                        </span>
                    )}
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired
};

export default Item;
