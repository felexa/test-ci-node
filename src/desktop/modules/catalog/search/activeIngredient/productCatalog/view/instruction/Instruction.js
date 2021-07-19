/* eslint-disable max-len, react/no-danger */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Instruction extends React.Component {
    constructor(props) {
        super(props);

        this.defaultInstruction = "Для данного товара инструкция еще не добавлена";

        this.state = {
            loading: false,
            instruction: props.instruction || this.defaultInstruction
        };

        this._changeItem = this._changeItem.bind(this);
    }

    /**
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {Instruction}
     * @private
     */
    _toggleLoader(state) {
        this.setState({
            loading: state
        });

        return this;
    }

    /**
     * @method _getFirstProduct
     * @returns {Classifier}
     * @private
     */
    _getFirstProduct() {
        let indexOfFirstItem = 0;

        return this.props.products[indexOfFirstItem];
    }

    /**
     * @method _getInstructionById
     * @param id {string}
     * @returns {Instruction}
     * @private
     */
    _getInstructionById(id) {
        this._toggleLoader(true);

        this.props.getInstructionById(id, (instruction) => {
            this._toggleLoader(false).setState({
                instruction: instruction || this.defaultInstruction
            });
        });

        return this;
    }

    /**
     * @method _changeItem
     * @param e {Object}
     * @returns {Instruction}
     * @private
     */
    _changeItem(e) {
        e.persist();

        this._getInstructionById(e.target.value);

        return this;
    }

    /**
     * @method _renderItems
     * @returns {Array}
     * @private
     */
    _renderSelectItems() {
        return this.props.products.map(function (item) {
            return (
                <option key={item.getId()} value={item.getAlias()}>
                    {item.getName()}
                </option>
            );
        });
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="catalog__instruction instruction">
                <div
                    className={classNames("instruction__body custom-scroll", {
                        loading: this.state.loading
                    })}
                >
                    <select className="form-control" onChange={this._changeItem}>
                        {this._renderSelectItems()}
                    </select>

                    <div
                        className="instruction__description"
                        dangerouslySetInnerHTML={{
                            __html: this.state.instruction
                        }}
                    />
                </div>
            </div>
        );
    }
}

Instruction.propTypes = {
    products: PropTypes.instanceOf(Array),
    getInstructionById: PropTypes.func,
    instruction: PropTypes.string
};

Instruction.defaultProps = {
    products: [],
    getInstructionById() {},
    instruction: ""
};

export default Instruction;
