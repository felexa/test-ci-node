import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Notice from "components/notice/Notice";

import PropertiesGroup from "./PropertiesGroup";
import Property from "./Property";

class PropertiesGroups extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property
         * @type {GroupProperty[]}
         */
        this.propertiesGroups = props.groupItems;

        /**
         * @property
         * @type {Property[]}
         */
        this.properties = props.items;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property state
         * @type {Object}
         */
        this.state = {
            isCollapsible: false,
            isOpen: false,
            buttonName: this.stringsResource.showMoreProperties
        };

        this._toggleDescription = this._toggleDescription.bind(this);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        // if (this.propertiesGroups.length > 1) {
        //     this.setState({
        //         isCollapsible: true
        //     });
        // }
    }

    /**
     * @private
     * @method _isCollapsed
     * @returns {boolean}
     */
    _isCollapsed() {
        return this.state.isCollapsible && !this.state.isOpen;
    }

    /**
     * @private
     * @method _hasProperties
     * @return {boolean}
     */
    _hasProperties() {
        return Boolean(this.properties.length);
    }

    /**
     * @private
     * @method _hasNotice
     * @returns {boolean}
     */
    _hasNotice() {
        return Boolean(this.props.notice);
    }

    /**
     * @private
     * @method _toggleDescription
     * @returns {PropertiesGroups}
     */
    _toggleDescription() {
        this.setState((prevState) => {
            let isOpen = !prevState.isOpen;

            if (isOpen) {
                this.props.open();
            }

            return {
                buttonName: isOpen ? this.stringsResource.show.less : this.stringsResource.showMoreProperties,
                isOpen
            };
        });

        return this;
    }

    /**
     * @private
     * @method _renderNotice
     * @returns {boolean|string}
     */
    _renderNotice() {
        return this._hasNotice() && (
            <Notice notice={this.props.notice} />
        );
    }

    /**
     * @private
     * @method _renderPropertiesGroups
     * @returns {Array}
     */
    _renderPropertiesGroups() {
        return this.propertiesGroups.map((item) => (
            <PropertiesGroup
                key={item.getId()}
                groupProperty={item}
                selectProperty={this.props.selectProperty}
            />
        ));
    }

    /**
     * @private
     * @method _renderProperties
     * @returns {Array}
     */
    _renderProperties() {
        return this.properties.map((item) => (
            <Property item={item} key={item.getId()} />
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <div
                className={classnames("properties-groups adaptive-content", {
                    "properties-groups--collapsible": this._isCollapsed()
                })}
            >
                <div className="properties-groups__header adaptive-content__header d-flex align-items-center">
                    <h2 className="text-black adaptive-content__title mr-1">
                        <span dangerouslySetInnerHTML={{__html: this.props.title }} />

                        {this._renderNotice()}
                    </h2>
                </div>

                <div className="properties-groups__body">
                    { this._renderPropertiesGroups() }

                    {this._hasProperties() && (
                        <div className="properties-group properties-group--ungrouped rounded-10">
                            <div className="properties-group__body">
                                <table>
                                    <tbody>
                                        { this._renderProperties() }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {this.state.isCollapsible && (
                    <div className="properties-groups__footer adaptive-content__footer">
                        <a onClick={this._toggleDescription} className="text-medium text-decoration-none">
                            {this.state.buttonName}
                        </a>
                    </div>
                )}
            </div>
        );
    }
}

PropertiesGroups.propTypes = {
    groupItems: PropTypes.instanceOf(Array),
    selectProperty: PropTypes.func.isRequired,
    items: PropTypes.instanceOf(Array),
    title: PropTypes.string,
    notice: PropTypes.instanceOf(Object),
    open: PropTypes.func
};

PropertiesGroups.defaultProps = {
    groupItems: [],
    items: [],
    title: "",
    notice: null,
    open() {}
};

export default PropertiesGroups;
