/* eslint-disable react/prop-types */
import React from "react";

import Image from "components/image/Image";

class MediaReview extends React.Component {
    render() {
        return (
            <div className="media-review rounded-16 new-super-box-shadow bg-white">
                <div className="media-review__header text-center rounded-16 mb-16">
                    <a href={this.props.article.getUrl()} className=" d-block text-center">
                        <Image
                            data-src={this.props.article.getPreview().getSmall()}
                            alt="payspace magazine"
                            className="lazyload mb-16"
                            width={this.props.article.getPreview().getSizes().getSmall().getWidth()}
                            height={this.props.article.getPreview().getSizes().getSmall().getHeight()}
                        />

                        <span className="text d-block text-medium">{this.props.article.getResourceName()}</span>
                    </a>
                </div>

                <div className="media-review__body">
                    <div className="f-weight-5 media-review__title text-medium">
                        {this.props.article.getTitle()}
                    </div>

                    <div className="d-none d-lg-block">
                        {this.props.article.getDescription()}
                    </div>
                </div>
            </div>
        );
    }
}

export default MediaReview;
