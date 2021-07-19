import React from "react";
import PropTypes from "prop-types";

import Image from "components/image/Image";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import BaseThreadItem from "components/reviewThread/base/ThreadItem";

class ThreadItem extends BaseThreadItem {
    constructor(props) {
        super(props);

        /**
         * @property maxCommentLength
         * @type {number}
         */
        this.maxCommentLength = this.props.maxCommentLength;

        /**
         * @private
         * @property _stringsResource
         * @type {Object}
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _isCommentClipped
     * @returns {boolean}
     */
    _isCommentClipped() {
        return this.getItem().getComment().length > this.maxCommentLength;
    }

    /**
     * @private
     * @method _getTarget
     * @returns {Object}
     */
    _getTarget() {
        return this.getItem().getTarget();
    }

    /**
     * @method renderProduct
     * @returns {Object}
     */
    renderProduct() {
        return (
            <div className="thread-review__product">
                <a
                    className="d-flex align-items-center text-decoration-none"
                    href={this._getTarget().getUrl()}
                    title={this._getTarget().getName()}
                >
                    <div className="product__preview d-flex align-items-center justify-content-center">
                        <Image
                            className="lazyload"
                            data-src={this._getTarget().getPreview().getSmall()}
                            alt={this._getTarget().getName()}
                            width={this._getTarget().getPreview().getSizes().getSmall()
                                .getWidth()}
                            height={this._getTarget().getPreview().getSizes().getSmall()
                                .getHeight()}
                        />
                    </div>

                    <p>{this._getTarget().getName()}</p>
                </a>
            </div>
        );
    }

    /**
     * @protected
     * @method renderControlsForThread
     * @returns {React.element}
     */
    renderActionBar() {
        return (this._isCommentClipped() && (
            <div className="action-bar">
                <a className="d-block text-decoration-none" href={`${this._getTarget().getUrl()}review/`}>
                    {this._stringsResource.readCompletely}
                </a>
            </div>
        )) || (<></>);
    }
}

ThreadItem.propTypes = {
    maxCommentLength: PropTypes.number
};

ThreadItem.defaultProps = {
    maxCommentLength: 150
};

export default ThreadItem;
