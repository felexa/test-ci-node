/* eslint-disable max-len,react/no-unescaped-entities */ // todo
import React from "react";
import PropTypes from "prop-types";

import Article from "desktop/modules/blog/components/article/Article";

class Articles extends React.Component {
    /**
     * @private
     * @method _getTitle
     * @returns {string}
     */
    _getTitle() {
        return this.props.title;
    }

    /**
     * @private
     * @method _getTitle
     * @returns {Article[]}
     */
    _getItems() {
        return this.props.items;
    }

    /**
     * @private
     * @method _hasTitle
     * @returns {Boolean}
     */
    _hasTitle() {
        return Boolean(this._getItems().length);
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems(size, short) {
        return this._getItems().map((item) => (
            <div
                className="articles__item"
                key={item.getId()}
            >
                <Article
                    item={item}
                    size={size}
                    short={short}
                    buildUrlForArticle={this.props.buildUrlForArticle}
                    buildUrlForCategory={this.props.buildUrlForCategory}
                />
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="articles">
                {this._hasTitle() && (
                    <header className="articles__header">
                        <h2 className="f-weight-5">
                            { this._getTitle() }
                        </h2>
                    </header>
                )}

                <div className="articles__body">
                    <div className="articles__items flex-wrap">
                        { this._renderItems(this.props.size, this.props.shortArticles) }
                    </div>
                </div>
            </section>
        );
    }
}

Articles.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired,
    buildUrlForArticle: PropTypes.func.isRequired,
    buildUrlForCategory: PropTypes.func.isRequired,
    title: PropTypes.string,
    size: PropTypes.string,
    shortArticles: PropTypes.bool // todo name
};

Articles.defaultProps = {
    title: "",
    size: "md",
    shortArticles: false
};

export default Articles;
