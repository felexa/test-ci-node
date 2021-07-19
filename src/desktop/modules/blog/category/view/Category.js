import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import {withTranslation} from "config/i18n";

import Dom from "app/core/utilites/dom";

import Articles from "desktop/modules/blog/components/articles/Articles";
import Pagination from "components/pagination/Pagination";

import styles from "../styles/main.module.scss";

// import MicroData from "./microData/MicroData";

class Category extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property selectors
         * @type {Object}
         */
        this.selectors = {
            category: ".category"
        };

        /**
         * @property perPageCount
         * @type {number}
         */
        this.perPageCount = 30;

        this.state = {
            loading: false
        };

        this._changePage = this._changePage.bind(this);
        this._buildUrlForNextPage = this._buildUrlForNextPage.bind(this);
        this._buildUrlForCategory = this._buildUrlForCategory.bind(this);
        this._buildUrlForArticle = this._buildUrlForArticle.bind(this);
    }

    /**
     * @private
     * @method _getPresenter
     * @returns {Presenter}
     */
    _getPresenter() {
        return this.props.options.presenter;
    }

    /**
     * @private
     * @method _getTotalCount
     * @returns {Number}
     */
    _getTotalCount() {
        return this.props.options.initialData.totalCount;
    }

    /**
     * @private
     * @method _getArticles
     * @returns {Article[]}
     */
    _getArticles() {
        return this.props.options.initialData.articles;
    }

    /**
     * @private
     * @method _getCategory
     * @returns {Category}
     */
    _getCategory() {
        return this.props.options.initialData.category;
    }

    /**
     * @private
     * @method _getCurrentPage
     * @returns {Number}
     */
    _getCurrentPage() {
        return this.props.options.initialData.currentPage;
    }

    /**
     * @public
     * @method buildUrlForNextPage
     * @param currentPage {number}
     * @returns {string}
     */
    _buildUrlForNextPage(currentPage) {
        return this._getPresenter().buildUrlForNextPage(currentPage);
    }

    /**
     * @private
     * @method _buildUrlForCategory
     * @param categoryName {string}
     * @returns {string}
     */
    _buildUrlForCategory(categoryName) {
        return this._getPresenter().buildUrlForCategory(categoryName);
    }

    /**
     * @private
     * @method _buildUrlForArticle
     * @param categoryName {string}
     * @param articleAlias {string}
     * @returns {string}
     */
    _buildUrlForArticle(categoryName, articleAlias) {
        return this._getPresenter().buildUrlForArticle(categoryName, articleAlias);
    }

    /**
     * @private
     * @method _toggleLoading
     * @param state {Object}
     * @returns {Category}
     */
    _toggleLoading(state) {
        this.setState({
            loading: state
        });

        return this;
    }

    /**
     * @public
     * @method changePage
     * @param page {number}
     * @returns {Category}
     */
    _changePage(page) {
        this._toggleLoading(true);
        this.dom.scrollToElementBySelector(this.selectors.category);

        this._getPresenter().changePage(page, () => {
            this._toggleLoading(false);
        });

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="category">
                {/*<MicroData articles={this._getArticles()} />*/}

                <style jsx>
                    {styles}
                </style>

                <header className="category__header">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <h1 className="f-weight-5">
                                    {this._getCategory().getName()}
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="category__body">
                    <div className="container-fluid overflow-hidden">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <div className={classnames(
                                    "category__content rounded-16 bg-white new-super-box-shadow overflow-hidden",
                                    {loading: this.state.loading}
                                )}
                                >
                                    <Articles
                                        items={this._getArticles()}
                                        buildUrlForArticle={this._buildUrlForArticle}
                                        buildUrlForCategory={this._buildUrlForCategory}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="category__pagination">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <Pagination
                                    totalCount={this._getTotalCount()}
                                    perPageCount={this.perPageCount}
                                    activePage={this._getCurrentPage()}
                                    change={this._changePage}
                                    buildUrl={this._buildUrlForNextPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Category.propTypes = {
    // i18n: PropTypes.instanceOf(Object).isRequired,
    options: PropTypes.instanceOf(Object).isRequired
};

export default withTranslation()(Category);
