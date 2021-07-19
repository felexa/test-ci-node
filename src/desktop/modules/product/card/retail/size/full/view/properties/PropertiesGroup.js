import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import PropertyGroupsEnum from "app/core/utilites/enum/product/property/group";

import Property from "./Property";

class PropertiesGroup extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property PropertyGroupsEnum
         * @type {Enum}
         */
        this.PropertyGroupsEnum = PropertyGroupsEnum.getInstance();
    }

    /**
     * @private
     * @method _hasDescription
     * @returns {Boolean}
     */
    _hasDescription() {
        return this.PropertyGroupsEnum.isWhoCan(this.props.groupProperty.getAlias());
    }

    /**
     * @private
     * @method _renderGroupProperties
     * @returns {Array}
     */
    _renderProperties() {
        return this.props.groupProperty.getItems().map((item) => (
            <Property
                key={item.getId()}
                item={item}
                selectProperty={this.props.selectProperty}
                hasDescription={this._hasDescription()}
            />
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className={classNames("properties-group rounded-10", this.props.className)}>
                <div className="properties-group__header">
                    <h3 className="properties-group__title">{this.props.groupProperty.getName()}</h3>
                </div>

                <div className="properties-group__body">
                    <table>
                        <tbody>
                            { this._renderProperties() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

PropertiesGroup.propTypes = {
    className: PropTypes.string,
    selectProperty: PropTypes.func,
    groupProperty: PropTypes.instanceOf(Object)
};

PropertiesGroup.defaultProps = {
    selectProperty: () => {},
    className: "",
    groupProperty: {}
};

export default PropertiesGroup;
