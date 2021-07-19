import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Item from "./Item";

class Review extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;
    }

    /**
     * @private
     * @method _isEmptyReview
     * @returns {boolean}
     */
    _isEmptyReview() {
        return Boolean(!this.props.threads.length);
    }

    /**
     * @private
     * @method _renderEmptyReviewsPage
     * @returns {string}
     */
    _renderEmptyReviewsPage() {
        return (
            <div className="empty-reviews d-flex flex-column align-items-center mt-40 text-center">
                <img
                    src={this.Resource.links.images.emptyReviews}
                    alt="Отзывоа нет"
                />
                <p className="f-weight-5 text-black m-0">
                    {this.stringsResource.review.youHaveNotLeftAnyProductReviewsYet}
                </p>

                <p className="empty-reviews__text mt-12 mb-24">
                    {this.stringsResource.review.createYourFirstOrderToLeaveAReview}
                </p>

                <a href={this.Resource.links.homePage} className="btn-default btn-sm">
                    {this.stringsResource.toHomePage.toUpperCase()}
                </a>
            </div>
        );
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.props.threads.map((item, i) => (
            <Item item={item} toAnswer={this.props.toAnswer} key={i} />
        ));
    }

    render() {
        return (
            <section className="account__review">
                <div className="review__body">
                    {!this._isEmptyReview() && this._renderItems()}
                    {this._isEmptyReview() && this._renderEmptyReviewsPage()}
                </div>
            </section>
        );
    }
}

Review.propTypes = {
    threads: PropTypes.instanceOf(Object),
    toAnswer: PropTypes.func.isRequired
};

Review.defaultProps = {
    threads: []
};

export default Review;
