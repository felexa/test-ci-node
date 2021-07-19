/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ThreadItem from "components/reviewThread/base/ThreadItem";
import Image from "components/image/Image";
import Alert from "components/alert/Alert";

import Sticker from "./sticker/Sticker";

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.productId = props.item.getId();

        this.state = {
            isOpen: false,
            chevronIcon: "down"
        };

        this._toggleCollaps = this._toggleCollaps.bind(this);
    }

    /**
     * @private
     * @method _isBonus
     * @returns {boolean}
     */
    _isBonus() {
        return Boolean(this._getItem().getBonus());
    }

    /**
     * @private
     * @method _getAlertContent
     * @returns {string}
     */
    _getAlertContent() {
        return `Вам начислено <strong>${this._getItem().getBonus()} бонусов</strong>.`;
    }

    /**
     * @private
     * @method _getItem
     * @returns {Thread}
     */
    _getItem() {
        return this.props.item;
    }

    /**
     * @private
     * @method _toggleCollaps
     */
    _toggleCollaps() {
        this.setState((state) => ({
            chevronIcon: state.isOpen ? "down" : "up",
            isOpen: !state.isOpen
        }));
    }

    render() {
        return (
            <div className="review__item base-border rounded-10 mb-20">
                <div className="thread-review__product">
                    <a
                        className="d-flex align-items-center text-decoration-none"
                        href={this._getItem().getTarget().getUrl()}
                        title={this._getItem().getTarget().getName()}
                    >
                        <div className="product__preview d-flex align-items-center justify-content-center">
                            <Image
                                className="lazyload"
                                data-src={this._getItem().getTarget().getPreview().getSrc()}
                                alt={this._getItem().getTarget().getName()}
                            />
                        </div>

                        <div>
                            <div className="d-flex align-items-center">
                                <span className="review__item-date text-gray mr-16">{this._getItem().getDate()}</span>
                                <Sticker status={this._getItem().getStatus()} />
                            </div>
                            <p className="mb-0">{this._getItem().getTarget().getName()}</p>
                        </div>
                    </a>

                    <div className="d-flex align-items-center flex-shrink-0">
                        {this._isBonus() && <Alert type="info" content={this._getAlertContent()} />}
                        <button onClick={this._toggleCollaps} type="button" className="btn-link">
                            <i className={classNames(`icon icon-chevron-${this.state.chevronIcon}`)} />
                        </button>
                    </div>
                </div>

                {this.state.isOpen && (
                    <ThreadItem
                        key={this._getItem().getId()}
                        item={this._getItem()}
                        toAnswer={(...args) => this.props.toAnswer(this.productId, ...args)}
                        isShowUnpacking={false}
                    />
                )}
            </div>
        );
    }
}

Item.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    toAnswer: PropTypes.func
};

Item.defaultProps = {
    toAnswer: () => {}
};

export default Item;
