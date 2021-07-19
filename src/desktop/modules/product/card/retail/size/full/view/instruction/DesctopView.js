/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Dom from "app/core/utilites/dom";

class DesctopView extends React.Component {
    constructor(props) {
        super(props);

        this.heightCorrection = 20;

        this.state = {
            instruction: props.html,
            navigation: this._createNavigation()
        };

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        this._scrollToElement = this._scrollToElement.bind(this);
        this._setActiveStateForNavigationItems = this._setActiveStateForNavigationItems.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this._setActiveStateForNavigationItems);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._setActiveStateForNavigationItems);
    }

    /**
     * @private
     * @method _createNavigation
     * @returns {Array}
     */
    _createNavigation() {
        let navigation = [];

        this.props.html.forEach((item) => {
            navigation.push({id: item.getId(), title: item.getName()});
        });

        return navigation;
    }

    /**
     * @private
     * @method _isActive
     * @param item {Object}
     * @returns {boolean}
     */
    _isActive(item) {
        let itemCoordinations = this.dom.getBoundingClientRect(`[name="${item.id}"]`) + this.heightCorrection;

        return itemCoordinations < this.dom.getBottomPageEdge() && itemCoordinations > this.dom.getPageYOffset();
    }

    /**
     * @private
     * @method _hasTitle
     * @returns {boolean}
     */
    _hasTitle() {
        return Boolean(this._getTitle());
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
     * @method _setActiveStateForNavigationItems
     * @returns {DesctopView}
     */
    _setActiveStateForNavigationItems() {
        this.setState((state) => ({
            navigation: state.navigation.map((item) => ({...item, active: this._isActive(item)}))
        }));

        return this;
    }

    /**
     * @private
     * @method _getTitle
     * @return {string}
     */
    _getTitle() {
        return this.props.title;
    }

    /**
     * @private
     * @method _getNotice
     * @returns {Object}
     */
    _getNotice() {
        return this.props.notice;
    }

    /**
     * @private
     * @method _scrollToElement
     * @param e {Object}
     * @returns {DesctopView}
     */
    _scrollToElement(e) {
        this.dom.scrollToElementBySelector(`[name="${e.target.dataset.itemId}"]`);

        return this;
    }

    /**
     * @private
     * @method _renderNavigation
     * @returns {string}
     */
    _renderNavigation() {
        return (
            <ul className="instruction__navigation base-border rounded-16" onClick={this._scrollToElement}>
                {this.state.navigation.map((item, i) => (
                    <li className={classnames("instruction__navigation-item", {active: item.active})} key={i}>
                        <a data-item-id={item.id}>{item.title}</a>
                    </li>
                ))}
            </ul>
        );
    }

    /**
     * @private
     * @method _renderBody
     * @returns {string}
     */
    _renderBody() {
        return (
            this.state.instruction.map((item) => (
                <div key={item.getId()} name={item.getId()}>
                    <div className="instruction__title text-large text-black mt-24 mb-8 f-weight-5">
                        <h3>{item.getName()}</h3>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: item.getText()}} />
                </div>
            ))
        );
    }

    render() {
        return (
            <div className="adaptive-content d-flex mb-8">
                <div>
                    {this._renderNavigation()}
                </div>
                <div className="w-50 flex-grow-1">
                    {this._hasTitle() && (
                    <div className="adaptive-content__header instruction__header">
                        <h2 className="text-black adaptive-content__title">
                            <span dangerouslySetInnerHTML={{__html: this.props.title}} />
                        </h2>
                    </div>
                    )}
                    <div className="instruction__body flex-grow-1">
                        {this._renderBody()}
                    </div>
                </div>
            </div>
        );
    }
}

DesctopView.propTypes = {
    title: PropTypes.string,
    html: PropTypes.instanceOf(Array),
    notice: PropTypes.instanceOf(Object)
};

DesctopView.defaultProps = {
    title: "",
    html: [],
    notice: null
};

export default DesctopView;
