import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Item from "./Item";

class History extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            isOpen: false,
            buttonName: this.stringsResource.showMoreHistory
        };

        this._toggleItems = this._toggleItems.bind(this);
    }

    /**
     * @method _hasOverMinItemsCountOfHistory
     * @return {boolean}
     * @private
     */
    _hasOverMinItemsCountOfHistory() {
        return Boolean(this._getItems().length > this.props.minItemsCount);
    }

    /**
     * @private
     * @method _getItems
     * @returns {History}
     */
    _getItems() {
        return this.props.items;
    }

    /**
     * @method _getCurrentItems
     * @return {Transaction[]}
     * @private
     */
    _getCurrentItems() {
        let result = this._getItems();

        if (!this.state.isOpen) {
            result = result.slice(0, this.props.minItemsCount);
        }

        return result;
    }

    /**
     * @private
     * @method _toggleDescription
     * @returns {History}
     */
    _toggleItems() {
        this.setState((prevState) => {
            let isOpen = !prevState.isOpen;

            return {
                buttonName: isOpen ? this.stringsResource.show.less : this.stringsResource.showMoreHistory,
                isOpen
            };
        });

        return this;
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this._getCurrentItems().map((item) => (
            <Item bonus={item} item={item} key={item.getId()} />
        ));
    }

    render() {
        return (
            <div className="bonus__history">
                <div className="history__header">
                    <p className="history__title m-0 color-black f-weight-5">
                        {this.stringsResource.historyBonusTransactions}
                    </p>
                </div>

                <div className="history__body">
                    <div className="statement__table border base-border rounded-10">
                        <div className="d-flex justify-content-between text-small">
                            <p className="color-gray">
                                {this.stringsResource.description}
                            </p>

                            <p className="color-gray">
                                {this.stringsResource.bonuses}
                            </p>
                        </div>

                        <div className="statement__table-body">
                            {this._renderItems()}
                        </div>

                        {this._hasOverMinItemsCountOfHistory() && (
                            <div className="statement__table-footer text-center">
                                <a onClick={this._toggleItems} className="statement__table-control cursor-pointer">
                                    {this.state.buttonName}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

History.propTypes = {
    items: PropTypes.instanceOf(Object),
    minItemsCount: PropTypes.number
};

History.defaultProps = {
    items: [],
    minItemsCount: 5
};

export default History;
