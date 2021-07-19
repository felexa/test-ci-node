/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Warning from "components/warning/review/Warning";
import Pagination from "components/pagination/Pagination";
import Thread from "components/reviewThread/product/ThreadItem";

class Review extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property maxCommentLength
         * @type {number}
         */
        this.maxCommentLength = Infinity;

        this.state = {
            loading: false,
            threads: props.review.getThreads()
        };

        this._getReview = this._getReview.bind(this);
    }

    /**
     * @private
     * @method _isLoading
     * @returns {Boolean}
     */
    _isLoading() {
        return Boolean(this.state.loading);
    }

    /**
     * @method _renderItems
     * @returns {Array}
     * @private
     */
    _renderItems() {
        return this.state.threads.map((item) => (
            <div key={item.getId()} className="review__item bg-white box-shadow-1 rounded-10">
                <Thread item={item} maxCommentLength={this.maxCommentLength} isShowUnpacking={false} />
            </div>
        ));
    }

    /**
     * @private
     * @method _addThreads
     * @param reviewEntity {Review}
     */
    _addThreads(reviewEntity) {
        this.setState((state) => ({
            threads: state.threads.concat(reviewEntity.getThreads())
        }));

        return this;
    }

    /**
     * @private
     * @method _getReview
     * @param page {Function}
     * @returns {Review}
     */
    _getReview(page) {
        this.setState({loading: true});
        this.props.getReview(page, (reviewEntity) => {
            this._addThreads(reviewEntity);
            this.setState({loading: false});
        });

        return this;
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="catalog__review review">
                <div className="review__items">
                    {this._renderItems()}
                </div>

                <div className="catalog__pagination">
                    <div>
                        <Pagination
                            isLoading={this._isLoading()}
                            hasPages={false}
                            showMore={this._getReview}
                            perPageCount={this.props.perPageCount}
                            totalCount={this.props.totalCount}
                        />
                    </div>
                </div>

                <Warning />
            </div>
        );
    }
}

Review.propTypes = {
    review: PropTypes.instanceOf(Object).isRequired,
    getReview: PropTypes.func,
    perPageCount: PropTypes.number,
    totalCount: PropTypes.number
};

Review.defaultProps = {
    perPageCount: 10,
    totalCount: 0,
    getReview() {}
};

export default Review;
