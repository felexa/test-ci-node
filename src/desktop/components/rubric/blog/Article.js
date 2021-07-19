import React from 'react';
import PropTypes from "prop-types";

import ProgressiveImage from "components/image/ProgressiveImage";

class Article extends React.Component {
    /**
     * @private
     * @method _hasAuthor
     * @returns {boolean}
     */
    _hasCensor() {
        return Boolean(this._getArticle().getCensor().getId());
    }

    /**
     * @private
     * @methods _getArticle
     * @returns Article {Object}
     */
    _getArticle() {
        return this.props.article;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <>
                <div className="article__item d-flex flex-column text-decoration-none" key={this._getArticle().getId()}>
                    <a href={this._getArticle().getPathToArticle()} className="item__preview d-flex justify-content-center align-items-center mb-16">
                        <ProgressiveImage
                            src={this._getArticle().getPreview().getSmall()}
                            previewSrc={this._getArticle().getPreview().getPrimitive()}
                            alt={this._getArticle().getPreview().getAlt()}
                            width={this._getArticle().getPreview().getSizes().getSmall()
                                .getWidth()}
                            height={this._getArticle().getPreview().getSizes().getSmall()
                                .getHeight()}
                        />
                    </a>

                    <a href={this._getArticle().getPathToArticle()} className="flex-grow-1">
                        <div className="item__rubric mb-8">
                            <span>{this._getArticle().getCategory().getName()}</span>
                        </div>

                        <div className="item__title text-black hover-color-pink f-weight-5 mb-12">
                            {this._getArticle().getTitle()}
                        </div>
                    </a>

                    {this._hasCensor() && (
                        <a href={this._getArticle().getCensor().getUrl()} className="color-gray-1 d-flex align-items-center">
                            <img
                                data-src={this._getArticle().getCensor().getAvatar().getSmall()}
                                className="lazyload censor-preview mr-12"
                                alt={this._getArticle().getCensor().getFullName()}
                                width="34"
                                height="34"
                            />

                            <span className="mr-16">
                                {this._getArticle().getCensor().getShortName()}
                            </span>
                            {/*<span className="d-flex align-items-center">*/}
                            {/*    <i className="icon icon-eye-open text-size-md mr-8" />*/}
                            {/*    {item.getViewCount()}*/}
                            {/*</span>*/}
                        </a>
                    )}
                </div>
            </>
        );
    }
}

Article.propTypes = {
    article: PropTypes.instanceOf(Object).isRequired
};

export default Article;
