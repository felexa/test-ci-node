import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class AttributeValue extends React.Component {
    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    /**
     * @private
     * @method _isEnableItem
     * @returns {boolean}
     */
    _isEnableItem() {
        return Boolean(this.props.item.getCount());
    }

    /**
     * @private
     * @method _change
     * @returns {void}
     */
    _change(url) {
        this.props.change(url);
    }

    /**
     * @private
     * @method _createSeoLink
     * @returns {string}
     */
    _createSeoLink() {
        //return this.props.item.getUrl() ? `${this.env.getBitrixHost()}${this.props.item.getUrl()}` : "#";
        return this.props.item.getUrl() ? `http://localhost:3000${this.props.item.getUrl()}` : "#";
    }

    /**
    * @private
    * @method _handleClick
    * @param e {Object}
    * @returns {void}
    */
    _handleClick(e) {
        e.preventDefault();

        if (this._isEnableItem()) {
            this._change(this.props.item.getApiUrl());
        }
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        let item = this.props.item;

        return (
            <div className="custom-input__item">
                <label className={classNames("custom-input--checkbox", {"custom-input__item--disabled": !this._isEnableItem()})}>
                    <input
                        name={item.getAlias()}
                        type="checkbox"
                        onChange={() => this._change(item.getApiUrl())}
                        disabled={!this._isEnableItem()}
                        checked={item.isSelected()}
                    />

                    <span className="custom-input__state">
                        <span className="custom-input__animation-bg" />
                    </span>

                    <span className="custom-input__name">
                        {/*ссылки временно отключили*/}
                        {/* eslint-disable-next-line max-len */}
                        {/*<a href={this._createSeoLink()} onClick={(e) => this._handleClick(e)} className={classNames("atrribute-item-name", {"atrribute-item-name--disabled": !this._isEnableItem()})}>{item.getName()}</a>*/}
                        <span className={classNames("atrribute-item-name", {"atrribute-item-name--disabled": !this._isEnableItem()})}>{item.getName()}</span>
                        <span className="atrribute-item-count">({item.getCount()})</span>
                    </span>
                </label>
            </div>
        );
    }
}

AttributeValue.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    change: PropTypes.func.isRequired
};

export default AttributeValue;
