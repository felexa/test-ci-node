/* eslint-disable react/no-danger */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Panel extends React.Component {
    constructor(props) {
        super(props);

        this._selectItem = this._selectItem.bind(this);
    }

    /**
     * @private
     * @method _isActive
     * @returns {boolean}
     */
    _isActive() {
        return Boolean(this.props.active);
    }

    /**
     * @public
     * @method isHtmlBody
     * @returns {boolean}
     */
    isHtmlBody() {
        return this.props.asHtml;
    }

    /**
     * @private
     * @method _buildPanelClasses
     * @returns {string}
     */
    _buildPanelClasses() {
        return classNames("panel", {
            "panel--active": this._isActive()
        });
    }

    /**
     * @private
     * @method _buildIconClasses
     * @returns {string}
     */
    _buildIconClasses() {
        return classNames("icon", {
            [this.props.iconOpen]: !this._isActive(),
            [this.props.iconClose]: this._isActive()
        });
    }

    /**
     * @private
     * @method _buildHtmlDataAttribute
     * @returns {Object}
     */
    _buildHtmlDataAttribute() {
        return {[`data-${this.props.htmlDataAttribute.attribute}`]: this.props.htmlDataAttribute.value};
    }

    /**
     * @private
     * @method _selectItem
     * @returns {Panel}
     */
    _selectItem() {
        this.props.selectItem();

        return this;
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        let { children, title, microDataAttrs } = this.props;

        return (
            <section className={this._buildPanelClasses()} {...microDataAttrs} {...this._buildHtmlDataAttribute()}>
                <header className="panel__header" onClick={this._selectItem}>
                    <div className="panel__title" dangerouslySetInnerHTML={{__html: title}} />
                    <i className={this._buildIconClasses()} />
                </header>

                {this.isHtmlBody() && (
                    <div
                        className="panel__body"
                        dangerouslySetInnerHTML={{
                            __html: children
                        }}
                    />
                )}

                {!this.isHtmlBody() && <div className="panel__body">{children}</div>}
            </section>
        );
    }
}

Panel.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    asHtml: PropTypes.bool,
    active: PropTypes.bool,
    selectItem: PropTypes.func,
    microDataAttrs: PropTypes.instanceOf(Object),
    iconOpen: PropTypes.string,
    iconClose: PropTypes.string,
    htmlDataAttribute: PropTypes.instanceOf(Object)
};

Panel.defaultProps = {
    title: "",
    children: null,
    asHtml: false,
    active: false,
    selectItem: () => {},
    microDataAttrs: {},
    iconOpen: "icon-chevron-down",
    iconClose: "icon-chevron-up",
    htmlDataAttribute: {}
};

export default Panel;
