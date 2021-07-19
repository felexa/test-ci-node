import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import categoryColorEnum from "app/core/utilites/enum/blog/category/color";
import Resource from "app/core/resource";
import Strings from "app/core/utilites/strings";

import ProgressiveImage from "components/image/ProgressiveImage";

class Article extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        /**
         * @property categoryColorEnum
         * @type {Enum}
         */
        this.categoryColorEnum = categoryColorEnum.getInstance();

        /**
         * @property Resource
         * @type {Resource}
         */
        this.Resource = Resource;

        /**
         * @property item
         * @type {Object}
         */
        this.item = this.props.item;

        /**
         * @property maxDescriptionLength
         * @type {number}
         */
        this.maxDescriptionLength = 90;
    }

    /**
     * @private
     * @method _getDescription
     * @returns {string}
     */
    _getDescription() {
        return this.strings.clip(this.item.getDescription(), this.maxDescriptionLength);
    }

    /**
     * @private
     * @method _getPathToArticle
     * @returns {string}
     */
    _getPathToArticle() {
        return this.props.buildUrlForArticle(this.item.getCategory().getAlias(), this.item.getAlias());
    }

    /**
     * @private
     * @method _getPathToCategory
     * @returns {string}
     */
    _getPathToCategory() {
        return this.props.buildUrlForCategory(this.item.getCategory().getAlias());
    }

    /**
     * @private
     * @method _getColor
     * @returns {string}
     */
    _getColor() {
        return this.item.getCategory().getColor();
    }

    /**
     * @private
     * @method _getStyle
     * @returns {Object}
     */
    _getStyle() {
        return {
            color: `${this.categoryColorEnum.getValueByKey(this.item.getCategory().getAlias())}`
        };
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className={classnames("article", `article--${this.props.size}`)}>
                <div className="article__header">
                    <div className="article__preview">
                        <a href={this._getPathToArticle()}>
                            <ProgressiveImage
                                className="d-block w-100 rounded-16"
                                previewSrc={this.item.getPreview().getPrimitive()}
                                src={this.item.getPreview().getMedium()}
                                alt={this.item.getPreview().getAlt()}
                                width={this.item.getPreview().getSizes().getMedium().getWidth()}
                                height={this.item.getPreview().getSizes().getMedium().getHeight()}
                            />
                        </a>
                    </div>
                </div>

                <div className="article__body">
                    {this.props.short || (
                        <div className="article__info d-flex justify-content-between align-items-center mb-8">
                            <a
                                href={this._getPathToCategory()}
                                className="article__category-name f-weight-5 text-uppercase"
                                style={this._getStyle()}
                            >
                                { this.item.getCategory().getName() }
                            </a>

                            {/*<div className="article__view-count d-flex align-items-center">
                                <i className="icon icon-eye-open" />
                                { this.item.getViewCount() }
                            </div>*/}
                        </div>
                    )}

                    <a href={this._getPathToArticle()} className="article__title f-weight-5">
                        { this.item.getTitle() }
                    </a>

                    {this.props.short || (
                        <div className="article__description">
                            { this._getDescription() }
                        </div>
                    )}
                </div>

                {this.props.short || (
                    <div className="article__footer">
                        <div className="article__to-full-article">
                            <a
                                href={this._getPathToArticle()}
                                className="btn-default btn-sm text-uppercase"
                            >
                                { this.Resource.strings.readMore }
                            </a>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Article.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    buildUrlForCategory: PropTypes.func.isRequired,
    buildUrlForArticle: PropTypes.func.isRequired,
    size: PropTypes.string,
    short: PropTypes.bool
};

Article.defaultProps = {
    size: "md",
    short: false
};

export default Article;
