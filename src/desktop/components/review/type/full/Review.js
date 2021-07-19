/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Dom from "app/core/utilites/dom";
import Resource from "app/core/resource";

import Warning from "components/warning/review/Warning";
import BaseReview from "components/review/type/base/Review";
import Pagination from "components/pagination/Pagination";
import Rating from "components/review/rating/Rating";
import EmptyPage from "components/review/emptyPage/EmptyPage";

import Link from "components/link/Link";
import Carousel from "components/carousel/Carousel";
import ThreadItem from "components/reviewThread/base/ThreadItem";
import BonusAlert from "components/review/bonusAlert/BonusAlert";

class Review extends BaseReview {
    constructor(props) {
        super(props);

        this.carouselConfig = {
            slidesPerView: "auto",
            slideClass: "swiper-slide",
            loop: false,
            centeredSlides: false
        };

        /**
         * @property perPageCount
         * @type {number}
         */
        this.perPageCount = 30;

        /**
         * @property maxCommentLength
         * @type {number}
         */
        this.maxCommentLength = 70;

        /**
         * @property
         * @type {Object}
         */
        this.selectors = {
            reviewCreation: ".review-creation"
        };

        this.dom = Dom.getInstance();

        /**
         * @property _linksResource
         * @type {Resource}
         */
        this._linksResource = Resource.links;

        this._getReviewByPage = this._getReviewByPage.bind(this);
    }

    /**
     * @method _isReviewAsCard
     * @returns {boolean}
     * @private
     */
    _isReviewAsCard() {
        return this.props.isReviewAsCard;
    }

    /**
     * @method _hasHeader
     * @return {boolean}
     * @private
     */
    _hasHeader() {
        return !this._isReviewAsCard() && this.hasComments();
    }

    /**
     * @method _hasBestWorthReview
     * @return {boolean}
     * @private
     */
    _hasBestWorthReview() {
        return Boolean(this._getTopNegativeReview().getId()) && Boolean(this._getTopPositiveReview().getId());
    }

    /**
     * @private
     * @method getThreads
     * @returns {Array}
     */
    _getRatings() {
        return this.getReview().getRatings();
    }

    /**
     * @private
     * @method _getTopPositiveReview
     * @returns {Array}
     */
    _getTopPositiveReview() {
        return this.getReview().getTopPositiveReview();
    }

    /**
     * @private
     * @method _getTopNegativeReview
     * @returns {Array}
     */
    _getTopNegativeReview() {
        return this.getReview().getTopNegativeReview();
    }

    /**
     * @private
     * @method _getReviewByPage
     * @param callback {function}
     * @returns {Review}
     */
    _getReviewByPage(callback) {
        this.setState({loading: true});

        this.props.getReviewByPage(callback, (review) => {
            this.addThreads(review.getThreads());
            this.setState({loading: false});
        });

        return this;
    }

    /**
     * @method _getTargetPath
     * @return {string}
     * @private
     */
    _getTargetPath() {
        return this.props.targetPath;
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="review review--full bg-white">
                {this._isReviewAsCard() && (
                    <div className="mb-24">
                        <Link route={this._getTargetPath()}>
                            <a href={this._getTargetPath()} className="link-bordered d-inline-flex align-items-center">
                                <i className="icon icon-chevron-left text-medium" /> {this.stringsResource.review.allReviews}
                            </a>
                        </Link>
                    </div>
                )}
                {this._hasHeader() && (
                    <div className="review__header d-flex justify-content-between flex-column flex-md-row">
                        <Rating items={this._getRatings()} />
                        <div>
                            <BonusAlert />
                            <button
                                type="button"
                                className="btn-default btn-md btn-block text-uppercase review__to-create"
                                onClick={this.toCreateReview}
                            >
                                { this._getCreatingButtonName() }
                            </button>
                        </div>
                    </div>
                )}

                <div className="review__body">

                    {this._hasBestWorthReview() && (
                        <div className="negative-positive-review">
                            <div className="positive-review">
                                <p>{this.stringsResource.topPositiveReview}</p>
                                <ThreadItem
                                    key={this._getTopPositiveReview().getId()}
                                    hideAnswers={this.props.hideAnswers}
                                    item={this._getTopPositiveReview()}
                                    toAnswer={(...args) => this.toAnswer(...args)}
                                    getAllAnswers={(...args) => this.getAllAnswers(...args)}
                                    toVote={this.props.toVote}
                                    productName={this.props.productName}
                                    maxCommentLength={this.maxCommentLength}
                                    showCollapsedBtn
                                />
                            </div>
                            <div className="negative-review">
                                <p>{this.stringsResource.topNegativeReview}</p>
                                <ThreadItem
                                    key={this._getTopNegativeReview().getId()}
                                    hideAnswers={this.props.hideAnswers}
                                    item={this._getTopNegativeReview()}
                                    toAnswer={(...args) => this.toAnswer(...args)}
                                    getAllAnswers={(...args) => this.getAllAnswers(...args)}
                                    toVote={this.props.toVote}
                                    productName={this.props.productName}
                                    maxCommentLength={this.maxCommentLength}
                                    showCollapsedBtn
                                />
                            </div>
                        </div>
                    )}

                    {this._hasUnpackingGallery() && (
                    <div className="unpacking-gallery">
                        <p>{this.stringsResource.usersPhoto}</p>
                        <Carousel
                            config={this.carouselConfig}
                            hidePagination
                            hideControls
                        >
                            { this._renderItems() }
                        </Carousel>
                        <button
                            onClick={this._showGalleryImmersiveView}
                            className="btn-link btn-md f-weight-4"
                            type="button"
                        >
                            {this.stringsResource.seeAllPhotos}
                        </button>
                    </div>
                    )}

                    {this.hasComments() && this.renderThreads()}

                    {!this._isReviewAsCard() && (
                        <Pagination
                            isLoading={this._isLoading()}
                            hasPages={false}
                            showMore={this._getReviewByPage}
                            perPageCount={this.perPageCount}
                            totalCount={this.getTotalCommentsCount()}
                        />
                    )}
                    {this.hasComments() && (
                        <div className="mt-24">
                            <EmptyPage
                                profile={this.props.profile}
                                toCreateReview={this.toCreateReview}
                                isAuthorized={this.props.isAuthorized}
                                withComments
                            />
                        </div>
                    )}
                    {this.hasComments() && <Warning />}

                    {!this.hasComments() && (
                        <EmptyPage
                            profile={this.props.profile}
                            toCreateReview={this.toCreateReview}
                            isAuthorized={this.props.isAuthorized}
                        />
                    )}
                </div>
            </div>
        );
    }
}

Review.propTypes = {
    targetPath: PropTypes.string.isRequired,
    getReviewByPage: PropTypes.func.isRequired,
    isReviewAsCard: PropTypes.bool
};

Review.defaultProps = {
    isReviewAsCard: false
};

export default Review;
