/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class ItemsForMobile extends React.Component {
    constructor() {
        super();

        this.state = {
            isOpen: false
        };

        this._toggleCategory = this._toggleCategory.bind(this);
    }

    /**
     * @private
     * @method _getIconType
     * @returns {string}
     */
    _getIconType() {
        let result = "";

        if (this.props.item.hasChildren()) {
            result = this.state.isOpen ? "icon-chevron-up" : "icon-chevron-down";
        }

        return result;
    }

    /**
     * @private
     * @method _toggleCategory
     * @returns {void}
     */
    _toggleCategory() {
        this.setState((state) => ({
            isOpen: !state.isOpen
        }));
    }

    /**
     * @private
     * @method _renderItems
     * @returns {React.element}
     */
    _renderItems() {
        return this.props.item.getChildren().map((item, i) => (
            <a
                href={item.getUrl()}
                key={i}
                className="aside__item text-decoration-none"
            >
                {item.getName()}
            </a>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="aside__group">
                <div className="d-flex justify-content-between align-items-center">
                    <a href={this.props.item.getUrl()} className="aside__category text-decoration-none">{this.props.item.getName()}</a>

                    {Boolean(this.props.item.hasChildren()) && (
                        <button onClick={this._toggleCategory} type="button" className="aside__show-more d-flex align-items-center">
                            <i className={classnames(`icon`, this._getIconType())} />
                        </button>
                    )}
                </div>

                {this.props.item.hasChildren() && (
                    <>
                        <div className={classnames(`aside__items flex-column align-items-start`, { "aside__items--open": this.state.isOpen })}>
                            {this._renderItems()}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

ItemsForMobile.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired
};

export default ItemsForMobile;
