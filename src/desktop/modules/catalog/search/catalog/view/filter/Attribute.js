import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";

import AttributeValue from "./attributeValue/AttributeValue";

class Attribute extends React.Component {
    constructor(props) {
        super(props);
        this.Resource = Resource;

        this.minItemsCount = 6;

        this.state = {
            isOpen: false,
            buttonName: this._getButtonName(false)
        };

        this._toggleCollapse = this._toggleCollapse.bind(this);
    }

    /**
     * @private
     * @method _isShowButton
     * @returns {boolean}
     */
    _isShowButton() {
        return this.props.items.length > this.minItemsCount;
    }

    /**
     * @private
     * @method _getButtonName
     * @param isOpen {boolean}
     * @returns {string}
     */
    _getButtonName(isOpen) {
        return isOpen ? this.Resource.strings.show.less : this.Resource.strings.show.all;
    }

    /**
     * @private
     * @method _toggleItemsList
     * @returns {Array}
     */
    _toggleItemsList() {
        let result = this.props.items;

        if (!this.state.isOpen) {
            result = this.props.items.slice(0, this.minItemsCount);
        }

        return result;
    }

    /**
     * @private
     * @method _toggleCollapse
     * @returns {Attribute}
     */
    _toggleCollapse() {
        this.setState((prevState) => {
            let isOpen = !prevState.isOpen;

            return {
                buttonName: this._getButtonName(isOpen),
                isOpen
            };
        });

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div>
                {this._toggleItemsList().map((item, i) => (
                    <AttributeValue
                        item={item}
                        key={i}
                        change={this.props.change}
                    />
                ))}

                {this._isShowButton() && (
                <button type="button" className="btn-link btn-sm panel__toggle" onClick={this._toggleCollapse}>
                    {this.state.buttonName}
                </button>
                )}
            </div>
        );
    }
}

Attribute.propTypes = {
    items: PropTypes.instanceOf(Object).isRequired,
    change: PropTypes.func.isRequired
};

export default Attribute;
