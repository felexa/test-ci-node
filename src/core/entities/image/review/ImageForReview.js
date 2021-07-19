import Image from "../Image";

class ImageForReview extends Image {
    /**
     * @public
     * @method getReviewId
     * @returns {string}
     */
    getReviewId() {
        return this.entity.reviewId || "";
    }
}

export default ImageForReview;
