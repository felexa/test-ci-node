import React from "react";
import PropTypes from "prop-types";

import Banner from "./Banner";
import History from "./history/History";

class Bonus extends React.Component {
    /**
     * @private
     * @method _hasHistory
     * @returns {boolean}
     */
    _hasHistory() {
        return Boolean(this._getBonus().getTransactions().length);
    }

    /**
     * @private
     * @method _getBonus
     * @returns {Bonus}
     */
    _getBonus() {
        return this.props.bonus;
    }

    render() {
        return (
            <div className="bonus">
                <div className="bonus__header">
                    <Banner amount={this._getBonus().getTotalAvailableCount()} refreshBonus={this.props.refreshBonus} />
                </div>

                {this._hasHistory() && (
                <div className="bonus__body">
                    <History items={this._getBonus().getTransactions()} />
                </div>
                )}
            </div>
        );
    }
}

Bonus.propTypes = {
    bonus: PropTypes.instanceOf(Object).isRequired,
    refreshBonus: PropTypes.func
};

Bonus.defaultProps = {
    refreshBonus: () => {}
};

export default Bonus;
