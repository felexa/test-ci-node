/* eslint-disable max-len */
import React from "react";
import classNames from "classnames";

import Rating from "components/rating/Rating";
import BonusAlert from "components/review/bonusAlert/BonusAlert";
import BaseCreation from "components/review/creation/type/base/Creation";

class Creation extends BaseCreation {
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
                    {this._hasBonusAlert() && (
                        <BonusAlert />
                    )}

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

                    <div className="review-creation__field d-flex align-items-center">
                        <div className="outlined-text-form w-80">
                            <input
                                type="text"
                                className="form-control"
                                required
                                disabled
                                value={this.props.profile.getName()}
                            />

                            <label>
                                {this._stringsResource.yourName}
                            </label>
                        </div>
                        <a
                            href={this._linksResource.account}
                            className="d-block text-decoration-none ml-16"
                        >
                            {this._stringsResource.changeName}
                        </a>
                    </div>

                    <div className="review-creation__field">
                        <div className="outlined-text-form">
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={this.state.review.email}
                                onChange={this._changeEmail}
                            />

                            <label>
                                {this._stringsResource.yourEmail}
                            </label>
                        </div>

                        <div className="error-message error-email-field" />
                    </div>

                    <div className="review-creation__field">
                        <div className="outlined-text-form overflow-hidden">
                            <textarea
                                maxLength={this._maxCommentLength}
                                className="form-control custom-scroll"
                                value={this.state.review.comment}
                                placeholder={this._stringsResource.yourComment}
                                onChange={this._changeComment}
                            />

                        </div>

                        <div className="error-message error-comment-field" />
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
                </div>

                <footer className="text-center">
                    <button
                        type="button"
                        className="btn-default btn-md text-uppercase"
                        onClick={this._confirm}
                    >
                        {this._getConfirmButtonName()}
                    </button>

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
