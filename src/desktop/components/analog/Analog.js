import React from "react";
import PropTypes from "prop-types";

import Item from "./item/Item";

class Analog extends React.Component {
    /**
     * @private
     * @method renderItems
     * @param items {ProductRubric[]}
     * @returns {Array}
     */
    renderItems(items) {
        return items.map((item) => (
            (<Item key={item.getId()} item={item} selectItem={this.props.selectItem} />)
        ));
    }

    /**
     * @private
     * @method renderAnalogs
     * @returns {Array}
     */
    renderAnalogs() {
        return this.props.items.map((item) => (
            <div key={item.getType()} className="analogs">
                <div className="analogs__header p-md-24 text-black">
                    {item.getName()}
                </div>

                <div className="analogs__body">
                    <table className="analogs__items w-100">
                        <tbody>
                            {this.renderItems(item.getItems())}
                        </tbody>
                    </table>
                </div>
            </div>
        ));
    }

    render() {
        return this.renderAnalogs();
    }
}

Analog.propTypes = {
    items: PropTypes.instanceOf(Array),
    selectItem: PropTypes.func.isRequired
};

Analog.defaultProps = {
    items: []
};

export default Analog;
