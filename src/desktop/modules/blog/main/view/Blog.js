import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Dom from "app/core/utilites/dom";

import Articles from "desktop/modules/blog/components/articles/Articles";
import Pagination from "components/pagination/Pagination";

import Categories from "./categories/Categories";
// import MicroData from "./microData/MicroData";

import styles from "../styles/main.module.scss";

class Blog extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property perPageCount
         * @type {number}
         */
        this.perPageCount = 30;

        /**
         * @property selectors
         * @type {Object}
         */
        this.selectors = {
            blog: ".blog"
        };

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
     * @method _getCategories
     * @returns {Category[]}
     */
    _getCategories() {
        return this.props.options.initialData.categories;
    }

    /**
     * @private
     * @method _getTotalCount
     * @returns {Category[]}
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
     * @method _getCurrentPage
     * @returns {Number}
     */
    _getCurrentPage() {
        return this.props.options.initialData.currentPage;
    }

    /**
     * @private
     * @method _toggleLoading
     * @param state {Object}
     * @returns {Blog}
     */
    _toggleLoading(state) {
        this.setState({
            loading: state
        });

        return this;
    }

    /**
     * @private
     * @method _buildUrlForNextPage
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
     * @method changePage
     * @param page {number}
     * @returns {Blog}
     */
    _changePage(page) {
        this._toggleLoading(true);
        this.dom.scrollToElementBySelector(this.selectors.blog);

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
            <section className="blog">
                {/*<MicroData articles={this._getArticles()} />*/}

                <style jsx>
                    {styles}
                </style>

                <header className="blog__header">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <h1 className="f-weight-5">
                                    {this.stringsResource.blog}
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="blog__body">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <div className={classnames(
                                    "blog__content rounded-16 bg-white new-super-box-shadow overflow-hidden",
                                    {loading: this.state.loading}
                                )}
                                >
                                    <div className="blog-section">
                                        <Categories
                                            items={this._getCategories()}
                                            buildUrlForCategory={this._buildUrlForCategory}
                                        />
                                    </div>

                                    <div className="blog-section">
                                        <Articles
                                            items={this._getArticles()}
                                            size="md"
                                            title={this.stringsResource.allArticles}
                                            buildUrlForCategory={this._buildUrlForCategory}
                                            buildUrlForArticle={this._buildUrlForArticle}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="blog__pagination">
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
                </div>
            </section>
        );
    }
}

Blog.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Blog;
