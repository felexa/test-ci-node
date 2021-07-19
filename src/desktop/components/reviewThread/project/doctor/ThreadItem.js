import React from "react";
import PropTypes from "prop-types";

import Strings from "app/core/utilites/strings";

import Image from "components/image/Image";

class ThreadItem extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property maxCommentLength
         * @type {number}
         */
        this.maxCommentLength = Infinity;

        this.strings = Strings.getInstance();
    }

    /**
     * @private
     * @method _getItem
     * @returns {Object}
     */
    _getItem() {
        return this.props.item;
    }

    /**
     * @method
     * @param profile
     * @returns {string}
     * @private
     */
    _getLastWorkDescription(profile) {
        let lastWork = profile.getLastWorkExperience();

        return (lastWork && lastWork.getDescription()) || "";
    }

    /**
     * @private
     * @method _getComment
     * @returns {string}
     */
    _getComment() {
        return this.strings.clip(this._getItem().getComment(), this.maxCommentLength);
    }

    render() {
        return (
            <div className="thread-review thread-review--project-review d-flex flex-column h-100">
                <div className="thread-review__header d-flex align-items-center align-items-sm-start flex-column flex-sm-row">
                    <a href={this._getItem().getAuthor().getUrl()} target="_blank" className="home-page-review__avatar rounded-100">
                        <Image
                            data-src={this._getItem().getAuthor().getAvatar().getMedium()}
                            className="lazyload"
                            alt=""
                            width={this._getItem().getAuthor().getAvatar().getSizes()
                                .getOriginal()
                                .getWidth()}
                            height={this._getItem().getAuthor().getAvatar().getSizes()
                                .getOriginal()
                                .getHeight()}
                        />
                    </a>

                    <div>
                        <a
                            className="thread-review__author text-decoration-none d-inline-block mb-12"
                            href={this._getItem().getAuthor().getUrl()}
                            target="_blank"
                        >
                            {this._getItem().getAuthor().getFullName()}
                        </a>

                        <div className="mb-6 thread-review__specialty">
                            {this._getItem().getAuthor().getMainQualification().getSpecialty()}
                        </div>

                        <div className="thread-review__rank">
                            {this._getItem().getAuthor().getMainQualification().getRank()}
                        </div>

                        <div>
                            {this._getLastWorkDescription(this._getItem().getAuthor())}
                        </div>
                    </div>
                </div>

                <div className="thread-review__body">
                    <div className="thread-review__comment">{this._getComment()}</div>
                </div>
            </div>
        );
    }
}

ThreadItem.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired
};

export default ThreadItem;
