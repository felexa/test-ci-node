import React from "react";
import PropTypes from "prop-types";

class Sort extends React.Component {
    constructor(props) {
        super(props);

        this._change = this._change.bind(this);
    }

    /**
     * @private
     * @method _getDefaultValue
     * @return {string}
     */
    _getDefaultValue() {
        let defaultValue;

        this.props.items.forEach((item) => {
            if (item.isSelected()) {
                defaultValue = item.getAlias();
            }
        });

        return defaultValue;
    }

    /**
     * @private
     * @method _change
     * @param e {Object}
     * @return {void}
     */
    _change(e) {
        let apiUrl = "";

        this.props.items.forEach((item) => {
            if (item.getAlias() === e.target.value) {
                apiUrl = item.getApiUrl();
            }
        });

        this.props.change(apiUrl);
    }

    /**
     * @private
     * @method _renderSortItems
     * @return {Array}
     */
    _renderSortItems() {
        return (
            this.props.items.map((item, i) => (
                <option
                    key={i}
                    value={item.getAlias()}
                >
                    {item.getName()}
                </option>
            ))
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="sort">
                <select
                    className="sort__items bg-white"
                    value={this._getDefaultValue()}
                    onChange={this._change}
                >
                    {this._renderSortItems()}
                </select>
                <i className="icon icon-chevron-down" />
            </div>
        );
    }
}

Sort.propTypes = {
    items: PropTypes.instanceOf(Array),
    change: PropTypes.func.isRequired
};

Sort.defaultProps = {
    items: []
};

export default Sort;
