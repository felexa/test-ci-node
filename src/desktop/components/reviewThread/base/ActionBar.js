/* eslint-disable max-len */

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Translator from "app/core/utilites/strings/translator";
import Strings from "app/core/utilites/strings";

class ActionBar extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = Translator.getInstance();

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        this._toLike = this._toLike.bind(this);
        this._toDislike = this._toDislike.bind(this);
    }

    /**
     * @method _hasVoteButtonsDescription
     * @return {boolean}
     * @private
     */
    _hasVoteButtonsDescription() {
        return Boolean(this.props.voteButtonsDescription);
    }

    /**
     * @private
     * @method _isLiked
     * @returns {boolean}
     */
    _isLiked() {
        return this.getItem().isLiked();
    }

    /**
     * @private
     * @method _isDisliked
     * @returns {boolean}
     */
    _isDisliked() {
        return this.getItem().isDisliked();
    }

    /**
     * @method _isDisabled
     * @return {Boolean}
     * @private
     */
    _isDisabled() {
        return this.props.disabled;
    }

    /**
     * @private
     * @method _hasCreateAnswer
     * @returns {boolean}
     */
    _hasCreateAnswer() {
        return this.props.createAnswer;
    }

    /**
     * @method _hasAnswers
     * @return {Boolean}
     * @private
     */
    _hasAnswers() {
        return this.props.answers;
    }

    /**
     * @method _hasAllAnswers
     * @return {Boolean}
     * @private
     */
    _hasAllAnswers() {
        return this.props.allAnswers;
    }

    /**
     * @method _hasLike
     * @return {Boolean}
     * @private
     */
    _hasLike() {
        return this.props.like;
    }

    /**
     * @private
     * @method _toggleAnswers
     * @returns {ActionBar}
     */
    _toggleAnswers() {
        this.props.toggleAnswers(this.getItem().copy());

        return this;
    }

    /**
     * @private
     * @method _getTitleOfPluralAnswers
     * @param count {number}
     * @returns {string}
     */
    _getTitleOfPluralAnswers(count) {
        return this.translator.plural(count, Translator.stringKeys.answers);
    }

    /**
     * @public
     * @method getItem
     * @returns {Object}
     */
    getItem() {
        return this.props.thread;
    }

    /**
     * @private
     * @method _getItemsCount
     * @returns {number}
     */
    _getItemsCount() {
        return this.getItem().getItems().length;
    }

    /**
     * @private
     * @method _getTotalItemsCount
     * @returns {number}
     */
    _getTotalItemsCount() {
        return this.getItem().getTotalItemsCount();
    }

    /**
     * @private
     * @method _getRemainingItemsCount
     * @returns {number}
     */
    _getRemainingItemsCount() {
        return this._getTotalItemsCount() - this._getItemsCount();
    }

    /**
     * @private
     * @method _getLikesCount
     * @returns {number}
     */
    _getLikesCount() {
        return this.getItem().getLikesCount();
    }

    /**
     * @private
     * @method _getDislikesCount
     * @returns {number}
     */
    _getDislikesCount() {
        return this.getItem().getDislikesCount();
    }

    /**
     * @private
     * @method _getAllAnswers
     * @returns {ActionBar}
     */
    _getAllAnswers() {
        this.props.getAllAnswers(this.getItem());

        return this;
    }

    /**
     * @private
     * @method _toAnswer
     * @returns {ActionBar}
     */
    _toAnswer() {
        this.props.toAnswer(this.getItem().copy());

        return this;
    }

    /**
     * @private
     * @method _toLike
     * @returns {ActionBar}
     */
    _toLike() {
        this.props.toLike(this.getItem().copy());

        return this;
    }

    /**
     * @private
     * @method _toDislike
     * @returns {ActionBar}
     */
    _toDislike() {
        this.props.toDislike(this.getItem().copy());

        return this;
    }

    /**
     * @public
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="action-bar">
                {this._hasCreateAnswer() && (
                    <button
                        className="btn-link action-bar__to-answer d-flex align-items-center"
                        type="button"
                        onClick={() => this._toAnswer()}
                    >
                        <span className="icon icon-arrow-vector-right" />
                        {this.stringsResource.toAnswer}
                    </button>
                )}

                {this._hasAllAnswers() && (
                    <button
                        className="btn-link btn-md action-bar__to-all-answers d-flex align-items-center"
                        type="button"
                        onClick={() => this._getAllAnswers()}
                    >
                        <i className="icon icon-arrow-back mr-10" />
                        { this.stringsResource.show.more }&nbsp;
                        { this._getRemainingItemsCount() } { this._getTitleOfPluralAnswers(this._getRemainingItemsCount()) }
                    </button>
                )}

                {this._hasAnswers() && (
                    <button
                        className="btn-link action-bar__toggle-answers d-flex align-items-center"
                        type="button"
                        onClick={() => this._toggleAnswers()}
                    >
                        <span className="icon icon-chat-lines" />
                        { this._getTotalItemsCount() }
                    </button>
                )}

                {this._hasLike() && (
                    <div className="action-bar__vote-buttons">
                        {this._hasVoteButtonsDescription() && (
                            <span className="vote-buttons__description">
                                {this.props.voteButtonsDescription}
                            </span>
                        )}

                        <button
                            type="button"
                            disabled={this._isDisabled()}
                            onClick={this._toLike}
                            className={classnames({
                                active: this._isLiked()
                            })}
                            title={this.props.likeButtonDescription}
                        >
                            <i className="icon icon-like" />

                            <span className="count">
                                { this._getLikesCount() }
                            </span>
                        </button>

                        <button
                            type="button"
                            disabled={this._isDisabled()}
                            onClick={this._toDislike}
                            className={classnames({
                                active: this._isDisliked()
                            })}
                            title={this.props.dislikeButtonDescription}
                        >
                            <span className="icon icon-dislike" />

                            <span className="count">
                                { this._getDislikesCount() }
                            </span>
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

ActionBar.propTypes = {
    thread: PropTypes.instanceOf(Object).isRequired,
    voteButtonsDescription: PropTypes.string,
    likeButtonDescription: PropTypes.string,
    dislikeButtonDescription: PropTypes.string,
    disabled: PropTypes.bool,
    createAnswer: PropTypes.bool,
    answers: PropTypes.bool,
    allAnswers: PropTypes.bool,
    like: PropTypes.bool,
    toAnswer: PropTypes.func,
    toggleAnswers: PropTypes.func,
    getAllAnswers: PropTypes.func,
    toLike: PropTypes.func,
    toDislike: PropTypes.func
};

ActionBar.defaultProps = {
    voteButtonsDescription: "",
    likeButtonDescription: "",
    dislikeButtonDescription: "",
    disabled: false,
    createAnswer: false,
    answers: false,
    allAnswers: false,
    like: false,
    toAnswer: () => {},
    toggleAnswers: () => {},
    getAllAnswers: () => {},
    toLike: () => {},
    toDislike: () => {}
};

export default ActionBar;
