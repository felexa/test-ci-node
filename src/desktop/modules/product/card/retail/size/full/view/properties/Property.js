import React from "react";
import PropTypes from "prop-types";

class Table extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property item
         * @type {Property}
         */
        this.item = props.item;
    }

    /**
     * @private
     * @method _hasDescription
     * @returns {Boolean}
     */
    _hasDescription() {
        return this.props.hasDescription;
    }

    /**
     * @private
     * @method _selectProperty
     * @param property {Object}
     * @returns {MainProperties}
     */
    _selectProperty(property) {
        this.props.selectProperty(property);

        return this;
    }

    /**
     * @private
     * @method _renderValue
     * @param item {Property}
     * @returns {string}
     */
    _renderValue(item) {
        if (item.getUrl()) {
            return (
                <a href={item.getUrl()} target="_blank">
                    { item.getValue() }
                </a>
            );
        }

        return item.getValue();
    }

    /**
     * @method _renderValues
     * @param items {Property}
     * @returns {React.element}
     * @private
     */
    _renderValues(items) {
        if (items.hasValues()) {
            return items.getValues().map((value, idx, array) => {
                if (value.getUrl()) {
                    return (
                        <React.Fragment key={value.getValue()}>
                            <a href={value.getUrl()} target="_blank">{value.getValue()}</a>
                            {array.length - 1 !== idx && ", "}
                        </React.Fragment>
                    );
                }

                return (
                    <span key={value.getValue()}>{value.getValue()}{array.length - 1 !== idx && ", "}</span>
                );
            });
        }

        return this._renderValue(items);
    }

    /**
     * @public
     * @method render
     * @return {React.ReactElement}
     */
    render() {
        return (
            <tr className="item">
                <td className="item__title">{this.item.getName()}</td>
                <td className="item__description">
                    <div className="position-relative">
                        { this._renderValues(this.item) }

                        {this._hasDescription() && (
                            <span
                                className="icon icon-info cursor-pointer"
                                onClick={() => this._selectProperty(this.item)}
                            />
                        )}
                    </div>
                </td>
            </tr>
        );
    }
}

Table.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    hasDescription: PropTypes.bool,
    selectProperty: PropTypes.func
};

Table.defaultProps = {
    hasDescription: false,
    selectProperty: () => {}
};

export default Table;
