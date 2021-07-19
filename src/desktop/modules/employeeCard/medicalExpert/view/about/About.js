import React from "react";
import PropTypes from "prop-types";

import Carousel from "desktop/components/carousel/Carousel";
import Resource from "app/core/resource";
import Env from "app/core/environment";

class About extends React.Component {
    constructor(props) {
        super(props);

        this.carouselConfig = {
            slidesPerView: "auto",
            slideClass: "swiper-slide",
            loop: false,
            spaceBetween: 10
        };

        /**
         * @property _stringsResource
         * @type {Object}
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _hasCertificates
     * @returns {boolean}
     */
    _hasCertificates() {
        return Boolean(this.props.certificates.length);
    }

    /**
     * @private
     * @method _hasArticles
     * @returns {boolean}
     */
    _hasArticles() {
        return Boolean(this.props.articles.length);
    }

    /**
     * @private
     * @method _renderCertificates
     * @returns {Array}
     */
    _renderCertificates() {
        return this.props.certificates.map((image, i) => (
            <div
                className="swiper-slide"
                key={i}
            >
                <a href={image.getLarge()} target="_blank">
                    <img
                        data-src={image.getMedium()}
                        className="medical-expert-card__certificate-preview lazyload"
                        alt={this.props.altForCertificates}
                        width={image.getSizes().getMedium().getWidth()}
                        height={image.getSizes().getMedium().getHeight()}
                    />
                </a>
            </div>
        ));
    }

    /**
     * @private
     * @method _renderArticles
     * @returns {Array}
     */
    _renderArticles() {
        return this.props.articles.map((item) => (
            <section key={item.getId()} className="medical-expert-card__article">
                {/*<div className="medical-expert-card__article-header">*/}
                {/*    <h2 className="color-black f-weight-5 mb-0">{item.getTitle()}</h2>*/}
                {/*</div>*/}
                <div className="medical-expert-card__article-body">
                    <p className="mb-0 mt-8">
                        <a
                            target="_blank"
                            href={item.getUrl()}
                            className="text-decoration-none"
                        >
                            {item.getTitle()}{/*{this._stringsResource.readArticle}*/}
                        </a>
                    </p>
                </div>
            </section>
        ));
    }

    render() {
        return (
            <div className="medical-expert-card__about">
                <div
                    className="medical-expert-card__description"
                    dangerouslySetInnerHTML={{__html: this.props.description}}
                />

                {this._hasCertificates() && (
                    <div>
                        <h2>{this._stringsResource.certificates}:</h2>
                        <Carousel
                            config={this.carouselConfig}
                            hidePagination
                            hideControls={false}
                            showBlur
                        >
                            {this._renderCertificates()}
                        </Carousel>
                    </div>
                )}

                {this._hasArticles() && (
                    <div className="medical-expert-card__articles">
                        <h2>{this._stringsResource.articles}:</h2>
                        {this._renderArticles()}
                    </div>
                )}
            </div>
        );
    }
}

About.propTypes = {
    description: PropTypes.string,
    certificates: PropTypes.instanceOf(Array),
    altForCertificates: PropTypes.string,
    articles: PropTypes.instanceOf(Array)
};

About.defaultProps = {
    description: "",
    certificates: [],
    altForCertificates: "",
    articles: []
};

export default About;
