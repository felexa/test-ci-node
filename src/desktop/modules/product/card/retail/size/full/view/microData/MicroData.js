import React from "react";
import PropTypes from "prop-types";
import StructuredData from "components/microData/StructuredData";
import Strings from "app/core/utilites/strings";

class MicroData extends React.Component {
    constructor(props) {
        super(props);

        this.strings = Strings.getInstance();
    }

    /**
     * @private
     * @method hasReview
     * @returns {boolean}
     */
    hasReview() {
        return Boolean(this.props.review.getThreads().length);
    }

    /**
     * @method getDescription
     * @returns {string}
     */
    getDescription() {
        return this.props.pageInfo.getMeta().getDescription();
    }

    /**
     * @method getSchema
     * @returns {Object}
     */
    getReviewSchema() {
        let {review, maxCommentsCount} = this.props;

        return review
            .getThreads()
            .slice(0, maxCommentsCount)
            .map((item) => ({
                "@type": "Review",
                datePublished: item.getDate().split(".").reverse().join("-"),
                reviewBody: item.getComment(),
                reviewRating: this.getReviewRatingSchema(item.getRating().getValue()),
                author: {
                    "@type": "Person",
                    name: item.getAuthor().getName()
                },
                commentCount: item.getTotalItemsCount(),
                comment: item.getItems().map((comment) => ({
                    "@type": "Comment",
                    datePublished: comment.getDate().split(".").reverse().join("-"),
                    description: comment.getComment(),
                    author: {
                        "@type": "Person",
                        name: comment.getAuthor().getName()
                    }
                })),
                image: item.getImages().map((image) => ({
                    "@type": "ImageObject",
                    contentUrl: image.getOriginal(),
                    description: this.props.product.getName(),
                    thumbnail: {
                        "@type": "ImageObject",
                        url: image.getSmall()
                    }
                }))
            }));
    }

    /**
     * @method getReviewRatingSchema
     * @param ratingValue {number}
     * @returns {Object}
     */
    getReviewRatingSchema(ratingValue) {
        let rating = this.props.product.getReview().getRating();

        return {
            "@type": "Rating",
            ratingValue,
            bestRating: rating.getMax(),
            worstRating: rating.getMin()
        };
    }

    /**
     * @method getBrandSchema
     * @returns {Object}
     */
    getBrandSchema() {
        return {
            "@type": "Thing",
            name: this.props.product.getBrand().getName()
        };
    }

    /**
     * @method getAggregateRatingSchema
     * @returns {Object}
     */
    getAggregateRatingSchema() {
        let review = this.props.product.getReview(),
            rating = review.getRating();

        return {
            "@type": "AggregateRating",
            ratingValue: rating.getValue(),
            ratingCount: review.getCommentsCount(),
            reviewCount: review.getCommentsCount(),
            bestRating: rating.getMax(),
            worstRating: rating.getMin()
        };
    }

    /**
     * @private
     * @method getPriceValidUntil
     * @returns {string}
     */
    getPriceValidUntil() {
        return this.strings.getCurrentDateAsText();
    }

    /**
     * @method getOffersSchema
     * @returns {Object}
     */
    getOffersSchema() {
        let {product} = this.props;

        return {
            "@type": "Offer",
            url: product.getUrl(),
            priceCurrency: "UAH",
            price: product.getPrice().getCurrent(),
            priceValidUntil: this.getPriceValidUntil(),
            itemCondition: "https://schema.org/NewCondition",
            availability: "http://schema.org/InStock", // TODO https://schema.org/OutOfStock если не в наличии
            seller: {
                "@type": "Organization",
                name: product.getSeller().getName()
            }
        };
    }

    /**
     * @method getSchema
     * @returns {Object}
     */
    getSchema() {
        let {product, isVisibleReview} = this.props,
            schema = {
                "@context": "http://schema.org/",
                "@type": "Product",
                name: product.getName(),
                image: product
                    .getImages()
                    .map((image) => image.getOriginal())
                    .concat([product.getPreview().getOriginal()]),
                description: this.getDescription(),
                sku: product.getCode(),
                brand: this.getBrandSchema(),
                offers: this.getOffersSchema()
            };

        if (this.hasReview()) {
            if (isVisibleReview) {
                schema.review = this.getReviewSchema();
            }

            schema.aggregateRating = this.getAggregateRatingSchema();
        }

        return schema;
    }

    render() {
        return <StructuredData schema={this.getSchema()} />;
    }
}

MicroData.propTypes = {
    pageInfo: PropTypes.instanceOf(Object).isRequired,
    product: PropTypes.instanceOf(Object).isRequired,
    review: PropTypes.instanceOf(Object).isRequired,
    maxCommentsCount: PropTypes.number.isRequired,
    isVisibleReview: PropTypes.bool
};

MicroData.defaultProps = {
    isVisibleReview: false
};

export default MicroData;
