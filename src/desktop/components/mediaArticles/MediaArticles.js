/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Title from "components/title/Title";
import NativeCarousel from "components/nativeCarousel/NativeCarousel";

import Item from "./mediaReview/MediaReview";

class MediaArticles extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.Resource = Resource;
        this.env = Env.getInstance();
    }

    renderItems() {
        return this.props.rubric.getItems().map((item) => <Item key={item.getId()} article={item} />);
    }

    render() {
        let titleConfig = {
            showMore: {
                url: this.Resource.links.massMedia,
                title: this.stringsResource.viewAll,
                shortTitle: this.stringsResource.all
            },
            title: this.props.rubric.getName()
        };

        return (
            <div className="media-articles">
                <Title config={titleConfig} iconId={this.props.rubric.getIconId()} />

                <NativeCarousel>{this.renderItems()}</NativeCarousel>
            </div>
        );
    }
}

MediaArticles.propTypes = {
    rubric: PropTypes.instanceOf(Object).isRequired
};

export default MediaArticles;
