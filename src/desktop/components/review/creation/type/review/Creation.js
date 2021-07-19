/* eslint-disable max-len */
import React from "react";
import classNames from "classnames";

import Rating from "components/rating/Rating";
import BaseCreation from "components/review/creation/type/base/Creation";
import Avatar from "components/avatar/Avatar";
import _ from "lodash";

class Creation extends BaseCreation {
    constructor(props) {
        super(props);

        /**
         * @property ref
         * @type {Object}
         */
        this.ref = {
            panel: React.createRef()
        };

        this.state = {
            ...this.state,
            review: {
                rating: 0,
                email: props.profile.getEmail(),
                comment: "",
                notify: true,
                images: [],
                anonymous: false
            },
            isOpen: false
        };

        this._toggleAnonymous = this._toggleAnonymous.bind(this);
        this._togglePanel = this._togglePanel.bind(this);
    }

    componentDidMount() {
        if (!this._hasName()) {
            this.setState((state) => ({review: {...state.review, anonymous: true}}));
        }
    }

    /**
     * @private
     * @method _hasName
     * @returns {boolean}
     */
    _hasName() {
        return Boolean(this.props.profile.getName());
    }

    /**
     * @private
     * @method _getClassForAlert
     * @returns {Creation}
     */
    _getClassForAlert() {
        let classes = {
            0: "review-creation__alert--start",
            30: "review-creation__alert--middle",
            70: "review-creation__alert--end"
        };

        return classes[this.state.progress];
    }

    /**
     * @private
     * @method _toggleAnonymous
     * @returns {Creation}
     */
    _toggleAnonymous(flag) {
        this.setState((state) => _.merge(
            {},
            state,
            {
                review: {
                    anonymous: flag
                }
            }
        ), this._togglePanel);
    }

    /**
     * @private
     * @method _togglePanel
     * @returns {Creation}
     */
    _togglePanel() {
        this.setState((state) => _.merge(
            {},
            state,
            {
                isOpen: !state.isOpen
            }
        ));
    }

    /**
     * @private
     * @method _buildItemWithName
     * @returns {Creation}
     */
    _buildItemWithName() {
        return (
            <div className="d-flex align-items-center">
                <Avatar profile={this.props.profile} size={36} />
                <span className="ml-10">{this.props.profile.getName()}</span>
            </div>
        );
    }

    /**
     * @private
     * @method _buildItemForAnonymous
     * @returns {Creation}
     */
    _buildItemForAnonymous() {
        return (
            <div className="d-flex align-items-center">
                <div className="review-creation__avatar-anonymous">
                    <img src={this._linksResource.icons.anonymous} width="24" height="24" alt="avatar incognito" />
                </div>
                <span className="ml-10">{this._stringsResource.review.dontShowMyName}</span>
            </div>
        );
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section
                className={classNames("review-creation", {loading: this._isLoading()}, this.props.className)}
                ref={this._ref.component}
            >
                {this._hasTitle() && (
                    <header>
                        <span className="text-size--h4 review-creation__title">
                            { this._getTitle() }
                        </span>
                    </header>
                )}

                <div className="review-creation__body">
                    {this._hasRating() && (
                        <div className="review-creation__rating">
                            <div className="d-block d-sm-flex align-items-center">
                                <span className="review-creation__rating-title text-black">
                                    {this._stringsResource.setRate}
                                </span>

                                <Rating rating={this.state.review.rating} onChange={this._changeRating} fontSize="60" />
                            </div>

                            <div className="error-message error-rating-field" />
                        </div>
                    )}

                    <div className="review-creation__field">
                        <label className="review-creation__field-label mb-6">
                            {this._stringsResource.yourComment}
                        </label>

                        <div className="outlined-text-form overflow-hidden">
                            <textarea
                                maxLength={this._maxCommentLength}
                                className="form-control custom-scroll"
                                value={this.state.review.comment}
                                onChange={this._changeComment}
                            />
                        </div>

                        <div className="error-message error-comment-field" />
                    </div>

                    <div>
                        <p className={classNames("d-flex justify-content-between mb-8", `w-${this.state.progress}`)}>
                            <span>{this.state.header}</span>
                            <span>{this.state.progress}%</span>
                        </p>
                        <div className="item__progress rounded-8 text-center">
                            <div className={classNames("item__progress-value rounded-8", `w-${this.state.progress}`)} />
                        </div>
                    </div>

                    <div className={classNames("review-creation__alert", this._getClassForAlert())}>
                        {this.state.alertInfo}
                    </div>
                    <div className="unpacking">
                        {this._hasUnpackingPhoto() && (
                            <div className="unpacking__body d-flex flex-row flex-wrap align-items-center justify-content-md-start mt-16">
                                {this._renderUnpackingPhoto()}
                            </div>
                        )}
                        {this.state.errorUnpacking && (
                            <div className="alert-danger mt-12">
                                <i className="icon icon-close" onClick={() => this._setErrorStatus(false)} />
                                <span>{this._stringsResource.validation.errorUploadUnpackingPhoto}</span>
                            </div>
                        )}
                    </div>
                </div>

                <footer>
                    <div className="review-creation__name-select">
                        <div className="review-creation__chosen-name d-flex align-items-center" onClick={this._togglePanel}>
                            {!this.state.review.anonymous && this._buildItemWithName()}
                            {this.state.review.anonymous && this._buildItemForAnonymous()}
                            <i className="icon icon-chevron-down" />
                        </div>
                        <div
                            className={classNames("review-creation__panel-with-names rounded-16 box-shadow-9", {"d-none": !this.state.isOpen})}
                        >
                            {this._hasName() && (
                                <div
                                    onClick={() => this._toggleAnonymous(false)}
                                    className="d-flex justify-content-between align-items-center mb-16"
                                >
                                    {this._buildItemWithName()}
                                    {!this.state.review.anonymous && (
                                    <i className="icon icon-done" />
                                    )}
                                </div>
                            )}
                            <div onClick={() => this._toggleAnonymous(true)} className="d-flex justify-content-between align-items-center">
                                {this._buildItemForAnonymous()}
                                {this.state.review.anonymous && (
                                    <i className="icon icon-done" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="review-creation__field">
                        <div>
                            <label className="review-creation__field-label">
                                {this._stringsResource.yourEmail}
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                required
                                value={this.state.review.email}
                                onChange={this._changeEmail}
                            />
                        </div>

                        <div className="error-message error-email-field" />
                    </div>

                    <div className="review-creation__field">
                        <label className="custom-input--checkbox">
                            <input
                                type="checkbox"
                                checked={this.state.review.notify}
                                onChange={this._changeNotifyOfAnswers}
                            />

                            <span className="custom-input__state">
                                <span className="custom-input__animation_bg" />
                            </span>

                            <span className="custom-input__name text-small text-black">
                                {this._stringsResource.notifyOfRepliesByEmail}
                            </span>
                        </label>

                        <div className="error-message error-notify-of-answers-field" />
                    </div>

                    <div className="error-message">
                        {this.state.errorMessages.creation}
                    </div>

                    <div className="d-flex flex-column flex-md-row justify-content-md-between">
                        <button
                            type="button"
                            className="order-md-2 btn-default btn-md text-uppercase"
                            onClick={this._confirm}
                        >
                            {this._getConfirmButtonName()}
                        </button>
                        <button
                            type="button"
                            className="order-md-1 btn-default btn-md btn-default--outline text-uppercase btn-block mr-16"
                            onClick={this.props.closeModal}
                        >
                            {this._stringsResource.cancel}
                        </button>
                    </div>

                    <p
                        className="review-creation__moderation"
                        dangerouslySetInnerHTML={{__html: this._HTMLResource.review.reviewsPostingPolicy}}
                    />
                </footer>
            </section>
        );
    }
}

export default Creation;
