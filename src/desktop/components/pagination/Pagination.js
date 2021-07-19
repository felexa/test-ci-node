import React from "react";
import PropTypes from "prop-types";
import BasePagination from "react-js-pagination";
import classnames from "classnames";

import Spinner from "components/spinner/Spinner";

import Translator from "app/core/utilites/strings/translator";
import Resource from "app/core/resource";
import Env from "app/core/environment";

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.change = this.change.bind(this);
        this.showMore = this.showMore.bind(this);

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = Translator.getInstance();

        /**
         * @property
         * @type {Object}
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            currentPage: 1
        };
    }

    /**
     * @private
     * @method _isLoading
     * @returns {Boolean}
     */
    _isLoading() {
        return Boolean(this.props.isLoading);
    }

    hasPages() {
        return this.props.hasPages;
    }

    getFirstPageIcon() {
        return <span className="icon icon-chevron-left" />;
    }

    getLastPageIcon() {
        return <span className="icon icon-chevron-right" />;
    }

    change(...args) {
        if (this.hasPages()) {
            this.props.change(...args);
        }
    }

    isVisibleShowMoreButton() {
        return this.state.currentPage * this.props.perPageCount < this.props.totalCount;
    }

    isVisiblePagination() {
        return this.props.totalCount > this.props.perPageCount;
    }

    getReviewsLeftCount() {
        return this.props.totalCount - this.state.currentPage * this.props.perPageCount;
    }

    getPluralReviewsLeftCount() {
        if (this.getReviewsLeftCount() > this.props.perPageCount) {
            return this.props.perPageCount;
        }

        return this.getReviewsLeftCount();
    }

    getTitleOfPluralReviews() {
        if (this.getReviewsLeftCount() > this.props.perPageCount) {
            return this.translator.plural(this.props.perPageCount, Translator.stringKeys.review);
        }

        return this.translator.plural(this.getReviewsLeftCount(), Translator.stringKeys.review);
    }

    showMore() {
        let self = this;

        this.props.showMore(function (page) {
            self.setState(function (state) {
                return {
                    currentPage: state.currentPage + 1
                };
            });

            page(self.state.currentPage + 1);
        });
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        if (this.hasPages() && this.isVisiblePagination()) {
            return (
                <div className="d-flex justify-content-center">
                    <BasePagination
                        activePage={this.props.activePage}
                        itemsCountPerPage={this.props.perPageCount}
                        totalItemsCount={this.props.totalCount}
                        pageRangeDisplayed={this.props.range}
                        firstPageText={this.getFirstPageIcon()}
                        lastPageText={this.getLastPageIcon()}
                        hideNavigation
                        hideDisabled
                        onChange={this.change}
                        getPageUrl={this.props.buildUrl}
                    />
                </div>
            );
        }

        return (
            <div className={classnames("d-flex justify-content-center position-relative", {pagination__container: this._isLoading() || this.isVisibleShowMoreButton()})}>
                {this._isLoading() && (
                    <Spinner />
                )}
                <div className={classnames({"d-none": this._isLoading()})}>
                    <div className={classnames({"d-none": !this.isVisibleShowMoreButton()}, "pagination--show-more text-center")}>
                        <button
                            type="button"
                            className="to-show-more reset-btn-styles btn-md text-pink d-inline-flex align-items-center text-uppercase cursor-pointer"
                            onClick={this.showMore}
                        >
                            {this._stringsResource.showMore}&nbsp;
                            {this.getPluralReviewsLeftCount()}&nbsp;
                            {this.getTitleOfPluralReviews()}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Pagination.propTypes = {
    isLoading: PropTypes.bool,
    hasPages: PropTypes.bool,
    activePage: PropTypes.number,
    perPageCount: PropTypes.number,
    totalCount: PropTypes.number,
    range: PropTypes.number,
    change: PropTypes.func,
    showMore: PropTypes.func,
    buildUrl: PropTypes.func
};

Pagination.defaultProps = {
    isLoading: false,
    hasPages: true,
    activePage: 1,
    perPageCount: 30,
    totalCount: 0,
    range: 5,
    change: () => {},
    showMore: () => {},
    buildUrl: () => ""
};

export default Pagination;
