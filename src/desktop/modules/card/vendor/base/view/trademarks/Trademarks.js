import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Trademark from "./trademark/Trademark";

class Trademarks extends React.Component {
    constructor(props) {
        super(props);

        this.trademarks = this.props.trademarks;

        this.Resource = Resource;
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            isCollapsed: true,
            buttonName: this.stringsResource.show.more,
            trademarks: []
        };
        this.changeTradeMarks = this.changeTradeMarks.bind(this);
    }

    componentDidMount() {
        let newTradMarks = this.trademarks.map((item) => ({
            isOpen: false,
            item
        }));

        this.setState({trademarks: newTradMarks});
    }

    /**
     * @private
     * @method _isCollapsed
     * @return {boolean}
     */
    _isCollapsed() {
        return this.state.isCollapsed;
    }

    /**
     * @private
     * @method getCurrentButtonName
     * @return {string}
     */
    _getCurrentButtonName() {
        return this.state.buttonName;
    }

    /**
     * @private
     * @method _toggleTradeMarkIsOpen
     * @return {Object}
     */
    _toggleTradeMarkIsOpen(item, isOpen) {
        return _.merge(item, {
            isOpen
        });
    }

    /**
     * @private
     * @method _toggleCollapse
     * @returns {Trademarks}
     */
    _toggleCollapse() {
        this.setState((prevState) => {
            let isCollapsed = prevState.isCollapsed;

            return {
                buttonName: isCollapsed ? this.stringsResource.show.less : this.stringsResource.show.more,
                isCollapsed: !isCollapsed
            };
        });

        return this;
    }

    /**
     * @private
     * @method _toggleTradeMark
     * @return {Trademarks}
     */
    changeTradeMarks(trademarkId) {
        this.setState((state) => {
            let newState = state.trademarks.map((trademark) => {
                if (!trademark.isOpen && trademark.item.getId() === trademarkId) {
                    return this._toggleTradeMarkIsOpen(trademark, true);
                }

                return this._toggleTradeMarkIsOpen(trademark, false);
            });

            newState.isCollapsed = false;
            newState.buttonName = this.stringsResource.show.less;

            return newState;
        });

        return this;
    }

    /**
     * @private
     * @method _renderTrademarks
     * @returns {React.element}
     */
    _renderTrademarks() { // todo temp
        return (
            <div className="trademarks__items row">
                {this.state.trademarks.map((trademark) => (
                    <div className="trademarks__item col col-md-6 col-xl-4" key={trademark.item.getId()}>
                        <Trademark
                            change={(trademarkId) => this.changeTradeMarks(trademarkId)}
                            trademark={trademark.item}
                            isOpen={trademark.isOpen}
                        />
                    </div>
                ))}
            </div>
        );
    }

    /**
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className={classnames("trademarks", {collapsed: this._isCollapsed()})}>
                <header className="trademarks__header">
                    <h2 className="trademarks__title f-weight-5 color-black">
                        Торговые марки
                    </h2>
                </header>

                <div className="trademarks__body">
                    {this._renderTrademarks()}
                </div>

                <div className="trademarks__footer text-center">
                    <button
                        type="button"
                        className="trademarks__toggle reset-btn-styles btn-md text-pink d-inline-flex align-items-center text-uppercase cursor-pointer justify-content-center"
                        onClick={() => this._toggleCollapse()}
                    >
                        {this._getCurrentButtonName()}
                        <i className="icon icon-arrow-up text-large" />
                    </button>
                </div>
            </div>
        );
    }
}

Trademarks.propTypes = {
    trademarks: PropTypes.instanceOf(Array)
};

Trademarks.defaultProps = {
    trademarks: []
};

export default Trademarks;
