/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Dom from "app/core/utilites/dom";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import CategoryColorEnum from "app/core/utilites/enum/blog/category/color";
import Resource from "app/core/resource";

import ProductRubric from "components/rubric/product/Rubric";
import Articles from "desktop/modules/blog/components/articles/Articles";
import Telegram from "desktop/modules/blog/components/telegram/Telegram";
import Redactor from "components/redactor/Redactor";
import ProgressiveImage from "components/image/ProgressiveImage";
import MicroDataMedicalWebPage from "components/microData/MedicalWebPage";
import DevicePhone from "components/deviceDetector/phone/Detector";
import DeviceTablet from "components/deviceDetector/tablet/Detector";
import DeviceDesktop from "components/deviceDetector/desktop/Detector";

import styles from "../styles/main.module.scss";

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.categoryColorEnum = CategoryColorEnum.getInstance();

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
        this.linksResource = Resource.links;

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        this._onNavigationClick = this._onNavigationClick.bind(this);
        this._addToBasket = this._addToBasket.bind(this);
    }

    /**
     * @private
     * @method _hasAuthor
     * @returns {boolean}
     */
    _hasAuthor() {
        return Boolean(this._getArticle().getAuthor().getName());
    }

    /**
     * @private
     * @method _hasRelatedArticles
     * @returns {boolean}
     */
    _hasRelatedArticles() {
        return Boolean(this._getRelatedArticles().length);
    }

    /**
     * @private
     * @method _hasRubric
     * @returns {boolean}
     */
    _hasRubric(articleSection) {
        return Boolean(articleSection.getRubric().getItems().length);
    }

    /**
     * @private
     * @method _hasTitle
     * @returns {boolean}
     */
    _hasTitle(articleSection) {
        return Boolean(articleSection.getTitle());
    }

    /**
     * @private
     * @method _hasNavigation
     * @returns {boolean}
     */
    _hasNavigation() {
        return this._getArticle().getSections().length > 1;
    }

    /**
     * @private
     * @method _addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    _addToBasket(product, success, error) {
        this._getPresenter().addToBasket(product, success, error);

        return this;
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
     * @method _getPageInfo
     * @returns {PageInfo}
     */
    _getPageInfo() {
        return this.props.options.initialData.pageInfo;
    }

    /**
     * @private
     * @method _getArticle
     * @returns {Article}
     */
    _getArticle() {
        return this.props.options.initialData.article;
    }

    /**
     * @private
     * @method _getRelatedArticles
     * @returns {Article[]}
     */
    _getRelatedArticles() {
        return this._getArticle().getRelatedArticles();
    }

    /**
     * @private
     * @method _getArticleSections
     * @returns {ArticleSection[]}
     */
    _getArticleSections() {
        return this._getArticle().getSections();
    }

    /**
     * @private
     * @method _getArticleSortedSections
     * @returns {ArticleSection[]}
     */
    _getArticleSortedSections() {
        let articleSections = this._getArticleSections();

        articleSections.sort(function (a, b) {
            let sectionA = a.getPriority(),
                sectionB = b.getPriority();

            return sectionB - sectionA;
        });

        return articleSections;
    }

    /**
     * @private
     * @method _getStyle
     * @returns {Object}
     */
    _getStyle() {
        return {
            color: `${this.categoryColorEnum.getValueByKey(this._getArticle().getCategory().getAlias())}`
        };
    }

    /**
     * @private
     * @method _scrollToElement
     * @param selector {String}
     * @returns {Article}
     */
    _scrollToElement(selector) {
        this.dom.scrollToElementWithOffset(selector, 200, 70);

        return this;
    }

    /**
     * @private
     * @method _scrollToElement
     * @param e {Object}
     * @returns {Article}
     */
    _onNavigationClick(e) {
        let targetSelector = `[name="${e.target.dataset.itemId}"]`;

        this._scrollToElement(targetSelector);

        return this;
    }

    /**
     * @private
     * @method _renderNavigation
     * @returns {Array}
     */
    _renderNavigation() {
        return (
            <section className="article-full__navigation navigation">
                <div className="navigation__header">
                    <h3 className="navigation__title f-weight-5">
                        {this.stringsResource.content}:
                    </h3>
                </div>

                <div className="navigation__body">
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                    <ul
                        className="navigation__items"
                        onClick={this._onNavigationClick}
                    >
                        {this._getArticleSortedSections().map((section, index) => (
                            this._hasTitle(section) && (
                                <li key={index}>
                                    <a data-item-id={section.getId()}>
                                        { section.getTitle() }
                                    </a>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </section>
        );
    }

    /**
     * @private
     * @method _rendertArticleSections
     * @returns {Array}
     */
    _renderArticleSections() {
        return this._getArticleSortedSections().map((section) => (
            <section className="article-full__section content-section" key={section.getId()}>
                {this._hasTitle(section) && (
                    <div className="content-section__header">
                        <h2
                            name={section.getId()}
                            className="content-section__title"
                        >
                            { section.getTitle() }
                        </h2>
                    </div>
                )}
                <div
                    className="content-section__body"
                    dangerouslySetInnerHTML={{__html: section.getContent()}}
                />

                {this._hasRubric(section) && (
                    <div className="content-section__footer">
                        <ProductRubric
                            items={[section.getRubric()]}
                            minRubricItems={4}
                            addToBasket={this._addToBasket}
                        />
                    </div>
                )}
            </section>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="article-full">
                <MicroDataMedicalWebPage
                    name={this._getArticle().getTitle()}
                    description={this._getPageInfo().getMeta().getDescription()}
                    mainEntityOfPage={this._getArticle().getPathToArticle()}
                    image={this._getArticle().getPreview()}
                    datePublished={this._getArticle().getPublishDate()}
                    dateModified={this._getArticle().getUpdatedAt()}
                    lastReviewed={this._getArticle().getUpdatedAt()}
                    author={this._getArticle().getAuthor()}
                    censor={this._getArticle().getCensor()}
                />

                <style jsx>
                    {styles}
                </style>

                <div className="container-fluid">
                    <div className="row row--no-horizontal-sm-margins justify-content-center">
                        <div
                            className={classnames(
                                {"col-xl-9": this._hasNavigation()},
                                {"col-xl-12": !this._hasNavigation()}
                            )}
                        >
                            <div className="article-full__body bg-white rounded-16 new-super-box-shadow">
                                <div className="article-full__header">
                                    {/*<div className="article-full__info d-flex align-items-center">
                                        <a
                                            href={this._getArticle().getPathToCategory()}
                                            className="article-full__category-name f-weight-5 text-decoration-none"
                                            style={this._getStyle()}
                                        >
                                            {this._getArticle().getCategory().getName()}
                                        </a>

                                        <div className="article-full__view-count d-flex align-items-center">
                                            <i className="icon icon-eye-open" />
                                            {this._getArticle().getViewCount()}
                                        </div>
                                    </div>*/}

                                    <div className="article-full__title">
                                        <h1>
                                            {this._getArticle().getTitle()}
                                        </h1>
                                    </div>

                                    <div className="article-full__subtitle">
                                        <h2>
                                            {this._getArticle().getSubTitle()}
                                        </h2>
                                    </div>

                                    {this._hasAuthor() && (
                                        <div className="article-full__redactors">
                                            <Redactor
                                                // publishDate={new Date(this._getArticle().getPublishDate())}
                                                lastUpdateDate={new Date(this._getArticle().getUpdatedAt())}
                                                profile={this._getArticle().getAuthor()}
                                                reviewer={this._getArticle().getCensor()}
                                                shortName
                                            />
                                        </div>
                                    )}

                                    <Telegram />

                                    <div className="article-full__preview">
                                        <DevicePhone>
                                            <ProgressiveImage
                                                previewSrc={this._getArticle().getPreview().getPrimitive()}
                                                src={this._getArticle().getPreview().getSmall()}
                                                alt={this._getArticle().getPreview().getAlt()}
                                                width={this._getArticle().getPreview().getSizes().getSmall()
                                                    .getWidth()}
                                                height={this._getArticle().getPreview().getSizes().getSmall()
                                                    .getHeight()}
                                            />
                                        </DevicePhone>

                                        <DeviceTablet>
                                            <ProgressiveImage
                                                previewSrc={this._getArticle().getPreview().getPrimitive()}
                                                src={this._getArticle().getPreview().getLarge()}
                                                alt={this._getArticle().getPreview().getAlt()}
                                                width={this._getArticle().getPreview().getSizes().getLarge()
                                                    .getWidth()}
                                                height={this._getArticle().getPreview().getSizes().getLarge()
                                                    .getHeight()}
                                            />
                                        </DeviceTablet>

                                        <DeviceDesktop>
                                            <ProgressiveImage
                                                previewSrc={this._getArticle().getPreview().getPrimitive()}
                                                src={this._getArticle().getPreview().getLarge()}
                                                alt={this._getArticle().getPreview().getAlt()}
                                                width={this._getArticle().getPreview().getSizes().getLarge()
                                                    .getWidth()}
                                                height={this._getArticle().getPreview().getSizes().getLarge()
                                                    .getHeight()}
                                            />
                                        </DeviceDesktop>
                                    </div>

                                    {this._hasNavigation() && (
                                        <div className="d-xl-none">
                                            {this._renderNavigation()}
                                        </div>
                                    )}
                                </div>

                                <div className="article-full__content mt-24">
                                    <div dangerouslySetInnerHTML={{__html: this._getArticle().getContent()}} />

                                    {this._renderArticleSections()}
                                </div>
                            </div>

                            {this._hasRelatedArticles() && (
                                <div className="article-full__articles bg-white rounded-16 box-shadow-4">
                                    <Articles items={this._getRelatedArticles()} title="Также в этой рубрике" shortArticles />
                                </div>
                            )}

                            {this._hasRelatedArticles() && (
                                <div className="article-full__articles bg-white rounded-16 box-shadow-4 d-xl-none">
                                    <Articles items={this._getRelatedArticles()} title="Похожие статьи" shortArticles />
                                </div>
                            )}
                        </div>

                        {this._hasNavigation() && (
                            <div className="d-none d-xl-block col-xl-3">
                                <aside className="article-full__aside aside">
                                    <div className="aside__body">
                                        <div className="aside__navigation bg-white rounded-16 mb-16 new-super-box-shadow">
                                            {this._renderNavigation()}
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Article.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Article;
