import _ from "lodash";

import Entity from "app/core/entities/Entity";
import Rating from "app/core/entities/review/Rating";
import Product from "app/core/entities/product/Product";
// import Profile from "app/core/entities/profile/Profile";
import Employee from "app/core/entities/profile/employee/Employee";
import Status from "app/core/entities/status/Status";
import Image from "app/core/entities/image/Image";

class Thread extends Entity {
    /**
     * @public
     * @method isLiked
     * @returns {boolean}
     */
    isLiked() {
        return this.entity.userAction === "like";
    }

    /**
     * @public
     * @method isDisliked
     * @returns {boolean}
     */
    isDisliked() {
        return this.entity.userAction === "dislike";
    }

    /**
     * @public
     * @method isBought
     * @returns {boolean}
     */
    isBought() {
        return Boolean(this.entity.bought);
    }

    /**
     * @public getType
     * @method {}
     * @return {*|string}
     */
    getType() {
        return this.entity.type || Thread.getReviewType();
    }

    /**
     * @public
     * @method setType
     * @param type {string}
     * @return {Thread}
     */
    setType(type) {
        this.entity.type = type;

        return this;
    }

    /**
     * @public
     * @method getAuthor
     * @returns {Employee}
     */
    getAuthor() {
        return new Employee(this.entity.author);
    }

    /**
     * @public
     * @method getRating
     * @returns {Rating}
     */
    getRating() {
        return new Rating({
            value: this.entity.rating
        });
    }

    /**
     * @public
     * @method getDate
     * @returns {string}
     */
    getDate() {
        return this.entity.date || "";
    }

    /**
     * @public
     * @method getComment
     * @returns {string}
     */
    getComment() {
        return this.entity.text || "";
    }

    /**
     * @public
     * @method getItems
     * @returns {Thread[]};
     */
    getItems() {
        return ((this.entity.comments) || []).map((item) => new Thread(item).setType(Thread.getCommentType()));
    }

    /**
     * @method setItems
     * @param items {Array}
     * @return {Thread}
     */
    setItems(items) {
        if (Array.isArray(items)) {
            this.entity.comments = _.merge([], items);
        }

        return this;
    }

    /**
     * @method getTotalItemsCount
     * @return {number}
     */
    getTotalItemsCount() {
        return Number(this.entity.commentTotal) || 0;
    }

    /**
     * @method getUrl
     * @return {string}
     */
    getUrl() {
        //TODO temp fixture
        // return "/tsitramon-darnitsa-n6/review/085c02ff-e7b9-11ea-ac6e-0242ac1d0004/";
        return "";
    }

    /**
     * @public
     * @method getTarget
     * @returns {Product}
     */
    getTarget() {
        return new Product(this.entity.target);
    }

    /**
     * @public
     * @method getLikes
     * @returns {number}
     */
    getLikesCount() {
        return Number(this.entity.likesCount) || 0;
    }

    /**
     * @public
     * @method getDislikes
     * @returns {number}
     */
    getDislikesCount() {
        return Number(this.entity.dislikesCount) || 0;
    }

    /**
     * @public
     * @method getStatus
     * @returns {string}
     */
    getStatus() {
        return new Status(this.entity);
    }

    /**
     * @public
     * @method getBonus
     * @returns {number}
     */
    getBonus() {
        return Number(this.entity.bonus) || 0;
    }

    /**
     * @public
     * @method getImages
     * @returns {[]Image}
     */
    getImages() {
        return ((this.entity.images) || []).map((item) => new Image(item));
    }

    /**
     * @public
     * @method getPrevThreadId
     * @returns {string}
     */
    getPrevThreadId() {
        return this.entity.previousRecordId || "";
    }

    /**
     * @public
     * @method getNextThreadId
     * @returns {string}
     */
    getNextThreadId() {
        return this.entity.nextRecordId || "";
    }
}

/**
 * @public
 * @method getComment
 * @return {string}
 */
Thread.getCommentType = () => ("comments");

/**
 * @public
 * @method getReviewType
 * @return {string}
 */
Thread.getReviewType = () => ("reviews");

export default Thread;
