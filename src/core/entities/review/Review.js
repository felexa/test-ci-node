import _ from "lodash";

import Entity from "app/core/entities/Entity";
import Rating from "app/core/entities/review/Rating";
import Thread from "app/core/entities/thread/Thread";

class Review extends Entity {
    /**
     * @method getRatings
     * @returns {Array}
     */
    getRatings() {
        return (this.entity.ratings || []).map(function (item) {
            return {
                /**
                 * @method getRating
                 * @returns {Rating}
                 */
                getRating() {
                    return new Rating({
                        value: item.rating
                    });
                },
                /**
                 * @method getPercent
                 * @returns {number}
                 */
                getPercent() {
                    return Number(item.percent) || 0;
                },
                /**
                 * @method getCommentsCount
                 * @returns {number}
                 */
                getCommentsCount() {
                    return Number(item.comments) || 0;
                }
            };
        });
    }

    /**
     * @method getThreads
     * @returns {Thread[]}
     */
    getThreads() {
        return (this.entity.reviews || []).map((item) => new Thread(item));
    }

    /**
     * @method getTopPositiveReview
     * @returns {Thread}
     */
    getTopPositiveReview() {
        return new Thread(this.entity.topPositiveReview);
    }

    /**
     * @method getTopNegativeReview
     * @returns {Thread}
     */
    getTopNegativeReview() {
        return new Thread(this.entity.topNegativeReview);
    }

    /**
     * @method setThreads
     * @param items {Array}
     * @returns {Review}
     */
    setThreads(items) {
        if (Array.isArray(items)) {
            this.entity.reviews = _.merge([], items);
        }

        return this;
    }
}

export default Review;
