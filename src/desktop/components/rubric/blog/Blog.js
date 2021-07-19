import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Title from "components/title/Title";
import NativeCarousel from "components/nativeCarousel/NativeCarousel";

import Article from "./Article";

class Blog extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.Resource = Resource;
        this.env = Env.getInstance();
    }

    /**
     * @method renderCategories
     * @returns {Array}
     */
    /*renderCategories() {
        return this.props.entity.getCategories().map((category) => (
            <a href={category.url} className="whitespace-nowrap" key={category.id}>{category.title}</a>
        ));
    }*/

    /**
     * @private
     * @method _renderArticle
     * @returns {Array}
     */
    _renderArticle() {
        return this.props.rubric.getItems().map((item) => <Article key={item.getId()} article={item} />);
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        let titleConfig = {
            showMore: {
                url: `${this.env.getBitrixHost()}/blog/`,
                title: this.stringsResource.viewAll,
                shortTitle: this.stringsResource.all
            },
            title: this.props.rubric.getName()
        };

        return (
            <section className={classNames("article", this.props.className)}>
                <Title config={titleConfig} iconId={this.props.rubric.getIconId()} />

                <NativeCarousel>
                    <div className="bg-white rounded-16 new-super-box-shadow article__body position-relative">
                        {/* eslint-disable-next-line max-len */}
                        {/*<div className="article__categories position-absolute w-100 overflow-x-auto pb-12 custom-scroll d-none d-lg-block">*/}
                        {/*    { this.renderCategories() }*/}
                        {/*</div>*/}

                        <div className="article__items d-flex flex-row">
                            {this._renderArticle()}
                        </div>
                    </div>
                </NativeCarousel>
            </section>
        );
    }
}

Blog.propTypes = {
    rubric: PropTypes.instanceOf(Object).isRequired,
    className: PropTypes.string
};

Blog.defaultProps = {
    className: ""
};

export default Blog;
