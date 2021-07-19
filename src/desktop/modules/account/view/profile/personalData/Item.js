/* eslint-disable max-len */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import ElementTypeEnum from "app/core/utilites/enum/account/elementType";
import Select from "app/core/components/select/Select";

class Item extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property maxTextLength
         * @type {number}
         */
        this.maxTextLength = 930;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property elementTypeEnum
         * @type {Enum}
         */
        this.elementTypeEnum = ElementTypeEnum.getInstance();

        this.state = {
            text: this.props.dataItem,
            buttonName: this.stringsResource.readMore,
            isCollapsible: true

        };

        this._change = this._change.bind(this);
        this._toggleDescription = this._toggleDescription.bind(this);
    }

    /**
     * @protected
     * @method componentDidUpdate
     * @param nextProps {Object}
     * @param nextState {Object}
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.text !== nextProps.dataItem) {
            this.setState(() => ({
                text: this.props.dataItem
            }));
        }

        return true;
    }

    /**
     * @private
     * @method _isTextArea
     * @returns {boolean}
     */
    _isTextArea() {
        return this.elementTypeEnum.isTextarea(this.props.item.type) && this.props.isEdit;
    }

    /**
     * @private
     * @method _isSelect
     * @returns {boolean}
     */
    _isSelect() {
        return this.elementTypeEnum.isSelect(this.props.item.type) && this.props.isEdit;
    }

    /**
     * @private
     * @method _isOrdinaryInput
     * @returns {boolean}
     */
    _isInput() {
        return this.props.isEdit && !this._isTextArea() && !this._isSelect();
    }

    /**
     * @private
     * @method _isVisibleBtn
     * @returns {boolean}
     */
    _isVisibleBtn() {
        if (this.elementTypeEnum.isTextarea(this.props.item.type)) {
            return this.maxTextLength < this.props.item.text.length && this.elementTypeEnum.isTextarea(this.props.item.type);
        }
    }

    /**
     * @private
     * @method _isMaxLengthLimit
     * @returns {boolean}
     */
    _isMaxLengthLimit() {
        return Boolean(this.props.item.maxLength);
    }

    /**
     * @private
     * @method _change
     * @param event {Object}
     * @returns {Item}
     */
    _change(event) {
        let value = event.nativeEvent.target.value;

        if (this._isMaxLengthLimit()) {
            value = value.substring(0, this.props.item.maxLength);
        }

        this.props.change(this.props.item.id, value);

        return this;
    }

    /**
     * @private
     * @method _toggleDescription
     * @returns {Item}
     */
    _toggleDescription() {
        let isCollapsible = !this.state.isCollapsible;

        this.setState(() => ({
            buttonName: isCollapsible ? this.stringsResource.readMore : this.stringsResource.hideText,
            isCollapsible
        }));

        return this;
    }

    render() {
        return (
            <div className={classNames('personal-data__field mt-16', {"personal-data__field--about": this.elementTypeEnum.isTextarea(this.props.item.type)})}>
                <p className="personal-data__field-label m-0">{this.props.item.label}</p>
                {!this.props.isEdit && (
                    <>
                        <p className={classNames("personal-data__field-description f-weight-4 mt-2 text-black", {"overflow-hidden personal-data__field-description--height": this.state.isCollapsible})}>{this.props.item.text}</p>
                        {this._isVisibleBtn() && (
                            <button onClick={this._toggleDescription} type="button" className="btn-link mt-16">
                                {this.state.buttonName}
                            </button>
                        )}
                    </>
                )}
                {this._isInput() && (
                    <>
                        <div className="mr-2 mt-2">
                            <input className="form-control" type={this.props.item.type} value={this.state.text} onChange={this._change} />
                        </div>
                        <div className={`error-message error-${this.props.item.id}-field`} />
                    </>
                )}
                {this._isTextArea() && (
                    <div className="mr-2 mt-2">
                        <textarea
                            className="form-control personal-data__field--about"
                            value={this.state.text}
                            onChange={this._change}
                        />
                    </div>
                )}
                {this._isSelect() && (
                    <Select
                        activeItem={this.props.dataItem}
                        items={this.props.item.options}
                        change={this._change}
                        className="mr-2 mt-2 personal-data__field-language"
                    />
                )}
            </div>
        );
    }
}

Item.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    isEdit: PropTypes.bool,
    change: PropTypes.func,
    dataItem: PropTypes.string
};

Item.defaultProps = {
    isEdit: false,
    change() {},
    dataItem: ""
};

export default Item;
