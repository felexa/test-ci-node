/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import BaseReview from "components/review/type/base/Review";
import EmptyPage from "components/review/emptyPage/EmptyPage";
import BonusAlert from "components/review/bonusAlert/BonusAlert";

class Review extends BaseReview {
    constructor(props) {
        super(props);

        /**
         * @property maxCommentsCount
         * @type {number}
         */
        this.maxCommentsCount = 3;
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className="review review--mini adaptive-content">
                <header className="adaptive-content__header review__header">
                    <h2 className={classNames("text-black adaptive-content__title", {"text-center": !this.hasComments()})}>
                        {!this.hasComments() && (
                            this.stringsResource.review.create
                        )}

                        {this.hasComments() && (
                            <>
                                {this.stringsResource.review.buyersReviews}
                                &nbsp;
                                <span className="color-gray-1">
                                    {this.getTotalCommentsCount()}
                                </span>
                            </>
                        )}
                    </h2>

                    {this.hasComments() && (
                        <div className="review__bonus-alert mt-16">
                            <BonusAlert />
                        </div>
                    )}

                    {this.hasComments() && (
                        <button
                            type="button"
                            className="review__to-create btn-block btn-default btn-md text-uppercase mt-16"
                            onClick={this.toCreateReview}
                        >
                            { this._getCreatingButtonName() }
                        </button>
                    )}
                </header>

                <div className="review__body">
                    {this.hasComments() && this.renderThreads()}

                    {!this.hasComments() && (
                        <EmptyPage
                            profile={this.props.profile}
                            toCreateReview={this.toCreateReview}
                            isAuthorized={this.props.isAuthorized}
                        />
                    )}
                </div>

                {this.hasComments() && (
                    <div className="review__footer d-flex align-items-center">
                        <a
                            className="review__to-all-reviews text-medium text-decoration-none d-flex align-items-center"
                            onClick={this.props.toAllReviews}
                        >
                            { this.stringsResource.review.viewAll }

                            <span className="icon icon-arrow-right" />
                        </a>
                    </div>
                )}
            </section>
        );
    }
}

Review.propTypes = {
    toAllReviews: PropTypes.func.isRequired,
    toCreateReview: PropTypes.func.isRequired
};

export default Review;
