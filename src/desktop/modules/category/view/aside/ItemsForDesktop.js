/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class ItemsForDesktop extends React.Component {
    constructor() {
        super();

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            isOpen: false,
            buttonName: this.stringsResource.show.all
        };

        this._toggleCategory = this._toggleCategory.bind(this);
    }

    /**
     * @private
     * @method _showButton
     * @returns {boolean}
     */
    _showButton() {
        return Boolean(this.props.item.getChildren().length > 5);
    }

    /**
     * @private
     * @method _toggleCategory
     * @returns {void}
     */
    _toggleCategory() {
        this.setState((state) => {
            let isOpen = !state.isOpen;

            return {
                isOpen,
                buttonName: isOpen ? this.stringsResource.show.less : this.stringsResource.show.all
            };
        });
    }

    /**
     * @private
     * @method _getIconChevron
     * @returns {string}
     */
    _getIconChevron() {
        return this.state.isOpen ? "icon-chevron-up" : "icon-chevron-down";
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <>
                <div className={classnames(`aside__items d-flex flex-column align-items-start`, {"aside__items--open": this.state.isOpen})}>
                    {this.props.item.getChildren().map((itemChildren, indexChild) => (
                        <a
                            href={itemChildren.getUrl()}
                            key={indexChild}
                            className="aside__item text-decoration-none"
                        >
                            {itemChildren.getName()}
                        </a>
                    ))}
                </div>

                {this._showButton() && (
                    <button
                        onClick={this._toggleCategory}
                        type="button"
                        className="aside__show-more d-flex align-items-center f-weight-5"
                    >
                        {this.state.buttonName}
                        <i className={classnames("icon ml-8", this._getIconChevron())} />
                    </button>
                )}
            </>
        );
    }
}

ItemsForDesktop.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired
};

export default ItemsForDesktop;
