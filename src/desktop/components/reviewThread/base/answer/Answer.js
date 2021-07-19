import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import _ from "lodash";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import CustomDate from "app/core/utilites/date";

import Avatar from "components/avatar/Avatar";

import Author from "../Author";

import ActionBar from "../ActionBar";

class Answer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this._getThread().getItems(),
            disabledVoteControls: false,
            loading: false
        };

        /**
         * @property _local
         * @type {Object}
         */
        this._local = Env.getInstance().getLanguage();

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(this._local);

        /**
         * @property _date
         * @type {Object}
         */
        this._date = CustomDate.getInstance();

        this._getAllAnswers = this._getAllAnswers.bind(this);
        this._like = this._like.bind(this);
        this._dislike = this._dislike.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.thread, this.props.thread)) {
            this._setItems(this._getThread().getItems());
        }
    }

    /**
     * @private
     * @method _hasMoreAnswers
     * @return {boolean}
     */
    _hasMoreAnswers() {
        return this._getThread().getTotalItemsCount() > this._getItemsCount();
    }

    /**
     * @private
     * @method _isLoading
     * @return {boolean}
     */
    _isLoading() {
        return this.state.loading;
    }

    /**
     * @method _isDisabledVoteControls
     * @return {boolean}
     * @private
     */
    _isDisabledVoteControls() {
        return this.state.disabledVoteControls;
    }

    /**
     * @private
     * @method _setDate
     * @returns {string}
     */
    _setDate(date) {
        return this._date.formatPerDayMonthYear(this._local, date);
    }

    /**
     * @private
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {Answer}
     */
    _toggleLoader(state) {
        this.setState(() => ({loading: Boolean(state)}));

        return this;
    }

    /**
     * @private
     * @method _toggleDisableVoteControls
     * @param state {boolean}
     * @returns {ThreadItem}
     */
    _toggleDisableVoteControls(state) {
        this.setState({
            disabledVoteControls: state
        });

        return this;
    }

    /**
     * @private
     * @method _getThread
     * @returns {Object}
     */
    _getThread() {
        return this.props.thread;
    }

    /**
     * @method _getThreadIndexById
     * @param id {string|number}
     * @private
     */
    _getThreadIndexById(id) {
        return this._getItems().findIndex((item) => item.getId() === id);
    }

    /**
     * @method _getItems
     * @return {Thread[]}
     * @private
     */
    _getItems() {
        return this.state.items;
    }

    /**
     * @method _setItems
     * @param items {Thread[]}
     * @return {Answer}
     * @private
     */
    _setItems(items) {
        this.setState(() => ({items}));

        return this;
    }

    /**
     * @method _updateThread
     * @param thread {Thread}
     * @return {Answer}
     * @private
     */
    _updateThread(thread) {
        let items = this._getItems().slice();

        items[this._getThreadIndexById(thread.getId())] = thread;

        return this._setItems(items);
    }

    /**
     * @private
     * @method _getItemsCount
     * @returns {number}
     */
    _getItemsCount() {
        return this._getItems().length;
    }

    /**
     * @private
     * @method _getAllAnswers
     * @returns {Answer}
     */
    _getAllAnswers(thread) {
        this._toggleLoader(true);

        this.props.getAllAnswers(thread.copy(), (items) => {
            // eslint-disable-next-line no-underscore-dangle
            this
                ._setItems(items)
                ._toggleLoader(false);
        }, () => {
            this._toggleLoader(false);
        });

        return this;
    }

    /**
     * @method _like
     * @param thread {Thread}
     * @return {Answer}
     * @private
     */
    _like(thread) {
        this._toggleDisableVoteControls(true);

        this.props.toLike(thread.copy(), (newThread) => {
            // eslint-disable-next-line no-underscore-dangle
            this._updateThread(newThread)._toggleDisableVoteControls(false);
        }, () => {
            this._toggleDisableVoteControls(false);
        });

        return this;
    }

    /**
     * @method _dislike
     * @param thread {Thread}
     * @return {Answer}
     * @private
     */
    _dislike(thread) {
        this._toggleDisableVoteControls(true);

        this.props.toDislike(thread.copy(), (newThread) => {
            // eslint-disable-next-line no-underscore-dangle
            this._updateThread(newThread)._toggleDisableVoteControls(false);
        }, () => {
            this._toggleDisableVoteControls(false);
        });

        return this;
    }

    /**
     * @method _renderItem
     * @param item {Thread}
     * @return {React.element}
     * @private
     */
    _renderItem(item) {
        return (
            <div className="answer__item d-flex" key={item.getId()}>
                <div className="item__header">
                    <Avatar profile={item.getAuthor()} size={40} />
                </div>

                <div className="item__body">

                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between flex-wrap">
                        <Author thread={item} />
                        <div className="item__date">{this._setDate(item.getDate())}</div>
                    </div>

                    <div className="item__comment">
                        {item.getComment()}
                    </div>

                    <ActionBar
                        thread={item}
                        disabled={this._isDisabledVoteControls()}
                        voteButtonsDescription={this.stringsResource.review.comment.commentUseful}
                        likeButtonDescription={this.stringsResource.review.comment.useful}
                        dislikeButtonDescription={this.stringsResource.review.comment.useless}
                        like
                        toLike={this._like}
                        toDislike={this._dislike}
                    />
                </div>
            </div>
        );
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this._getItems().map((item) => this._renderItem(item));
    }

    /**
     * @public
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className={classnames("thread-review__answer answer", {loading: this._isLoading()})}>

                <div className="answer__body">
                    <div className="answer__items">
                        {this._renderItems()}
                    </div>
                </div>

                {this._hasMoreAnswers() && (
                    <div className="answer__footer">
                        <ActionBar
                            thread={this._getThread()}
                            allAnswers
                            getAllAnswers={this._getAllAnswers}
                        />
                    </div>
                )}
            </div>
        );
    }
}

Answer.propTypes = {
    thread: PropTypes.instanceOf(Object).isRequired,
    getAllAnswers: PropTypes.func,
    toLike: PropTypes.func,
    toDislike: PropTypes.func
};

Answer.defaultProps = {
    getAllAnswers: () => {},
    toLike() {},
    toDislike() {}
};

export default Answer;
