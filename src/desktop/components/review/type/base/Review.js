/* eslint-disable max-len */
import _ from "lodash";

import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import ModalDialogService from "app/core/services/modalDialog";
import AuthorizationService from "app/core/services/authorization";

import Threads from "components/threads/Threads";
import CreationAnswer from "components/review/creation/type/answer/Creation";
import CreationReview from "components/review/creation/type/review/Creation";
import SuccessReviewCreation from "components/review/creation/Success";

import GalleryImageView from "components/galleryForReview/Gallery";
import GalleryImmersiveView from "components/galleryForReview/GalleryImmersive";

class Review extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property maxCommentsCount
         * @type {number}
         */
        this.maxCommentsCount = Infinity;

        this.state = {
            loading: false,
            threads: props.review.getThreads()
        };

        /**
         * @property
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this._HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property modalDialogService
         * @type {ModalDialog}
         */
        this.modalDialogService = ModalDialogService.getInstance();
        this.authorizationService = AuthorizationService.getInstance();

        this._createReview = this._createReview.bind(this);
        this.toCreateReview = this.toCreateReview.bind(this);
        this._showGalleryImageView = this._showGalleryImageView.bind(this);
        this._showGalleryImmersiveView = this._showGalleryImmersiveView.bind(this);
        this._closeModal = this._closeModal.bind(this);
    }

    componentDidUpdate(prevProps) {
        this._updateThreads(prevProps.review);
    }

    /**
     * @method hasComments
     * @returns {boolean}
     * @protected
     */
    hasComments() {
        return Boolean(this.getTotalCommentsCount());
    }

    /**
     * @method _hasUnpackingGallery
     * @return {boolean}
     * @private
     */
    _hasUnpackingGallery() {
        return Boolean(this.props.reviewImages.length);
    }

    /**
     * @private
     * @method _isLoading
     * @returns {Boolean}
     */
    _isLoading() {
        return Boolean(this.state.loading);
    }

    /**
     * @private
     * @method _getCreationFormTitle
     * @returns {string}
     */
    _getCreationFormTitle() {
        return this.stringsResource.review.create;
    }

    /**
     * @protected
     * @method getReview
     * @returns {Review}
     */
    getReview() {
        return this.props.review;
    }

    /**
     * @method getTotalCommentsCount
     * @returns {number}
     * @protected
     */
    getTotalCommentsCount() {
        return this.props.totalCommentsCount;
    }

    /**
     * @method getThreads
     * @returns {Thread[]}
     * @protected
     */
    getThreads() {
        return this.state.threads.slice(0, this.maxCommentsCount);
    }

    /**
     * @private
     * @method _setThreads
     * @param threads {Array}
     * @return {Review}
     */
    _setThreads(threads) {
        this.setState(function () {
            return {threads};
        });

        return this;
    }

    /**
     * @method getAllAnswers
     * @param threadEntity
     * @param success {Function}
     * @param error {Function}
     * @return {Review}
     * @protected
     */
    getAllAnswers(threadEntity, success, error) {
        this.props.getAllAnswers(threadEntity.copy(), (items) => {
            success(items);
        }, () => {
            error();
        });

        return this;
    }

    /**
     * @private
     * @method _getActiveSlideIndex
     * @param review {Object}
     * @param id {string}
     * @returns {number}
     */
    _getActiveSlideIndex(review, id) {
        let activeSlide = 0;

        review.getImages().forEach((item, i) => {
            if (item.getId() === id) {
                activeSlide = i;
            }
        });

        return activeSlide;
    }

    /**
     * @private
     * @method _getReviewItem
     * @param reviewId {string}
     * @param id {string}
     * @returns {Review}
     */
    _getReviewItem(reviewId, id) {
        this.props.getReviewById(reviewId,
            (review) => this.setState(
                {chosenReview: review, activeSlide: this._getActiveSlideIndex(review, id)},
                this._openGalleryImageView
            ));

        return this;
    }

    /**
     * @private
     * @method _getGalleryTitle
     * @returns {string}
     */
    _getGalleryTitle() {
        // eslint-disable-next-line max-len
        return `${this.stringsResource.usersPhotos} (${this.props.reviewImages.length}${this.stringsResource.pcs.toLowerCase()}.) - ${this.props.productName}`;
    }

    /**
     * @private
     * @method _getCreatingButtonName
     * @returns {string}
     */
    _getCreatingButtonName() {
        return this.props.isAuthorized ? this.stringsResource.review.create : this.stringsResource.review.loginAndCreate;
    }

    /**
     * @method addThreads
     * @param threads
     * @return {Review}
     * @protected
     */
    addThreads(threads) {
        this._setThreads(this.state.threads.concat(threads));

        return this;
    }

    /**
     * @private
     * @method _createReview
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Review}
     */
    _createReview(review, success, error) {
        this.props.create(
            review,
            () => {
                success();

                this._showSuccessMessage(this.stringsResource.review.messages.receivedReview);
            },
            error
        );

        return this;
    }

    /**
     * @private
     * @method _createAnswerToReview
     * @param threadEntity {Thread}
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Review}
     */
    _createAnswerToReview(threadEntity, review, success, error) {
        this.props.createAnswer(
            _.merge({}, review, {threadId: threadEntity.getId()}),
            () => {
                success();

                this._showSuccessMessage(this.stringsResource.review.messages.receivedAnswer);
            },
            error
        );

        return this;
    }

    /**
     * @private
     * @method _openGalleryImageView
     * @returns {Review}
     */
    _openGalleryImageView() {
        this.modalDialogService.open({
            className: "thread-review__gallery",
            body: <GalleryImageView
                activeSlide={this.state.activeSlide}
                toVote={this.props.toVote}
                item={this.state.chosenReview}
                toAnswer={(...args) => this.toAnswer(...args)}
                toggleAnswers={this._toggleAnswers}
                toggleReview={this.props.getReviewById}
                showGallery={this._showGalleryImmersiveView}
                galleryToggle
            />,
            size: this.modalDialogService.getSizes().getLg(),
            type: this.modalDialogService.getTypes().getInfo(),
            title: this._getGalleryTitle()
        });

        return this;
    }

    /**
     * @private
     * @method _closeModal
     * @returns {void}
     */
    _closeModal() {
        this.modalDialogService.close();
    }

    /**
     * @private
     * @method _showSuccessMessage
     * @param message {string}
     */
    _showSuccessMessage(message) {
        this.modalDialogService.open({
            className: "review-created",
            title: "",
            body: <SuccessReviewCreation message={message} />,
            size: this.modalDialogService.getSizes().getSm(),
            type: this.modalDialogService.getTypes().getInfo()
        });
    }

    /**
     * @private
     * @method _showGalleryImmersiveView
     * @returns {Review}
     */
    _showGalleryImmersiveView() {
        this.modalDialogService.open({
            className: "thread-review__gallery",
            body: <GalleryImmersiveView
                items={this.props.reviewImages}
                showReviewGallery={this._showGalleryImageView}
            />,
            size: this.modalDialogService.getSizes().getLg(),
            type: this.modalDialogService.getTypes().getInfo(),
            title: this._getGalleryTitle()
        });

        return this;
    }

    /**
     * @private
     * @method _showGalleryImageView
     * @param e {Object}
     * @returns {Review}
     */
    _showGalleryImageView(e) {
        this._getReviewItem(e.target.dataset.review, e.target.dataset.id);

        return this;
    }

    /**
     * @method toAnswer
     * @param threadEntity
     * @returns {Review}
     * @protected
     */
    toAnswer(threadEntity) {
        if (this.props.isAuthorized) {
            this.modalDialogService.open({
                className: "review-creation",
                title: this.stringsResource.review.sendAnswer,
                body: (
                    <CreationAnswer
                        profile={this.props.profile}
                        confirmButtonName={this.stringsResource.send}
                        confirm={(...args) => this._createAnswerToReview(threadEntity, ...args)}
                    />
                ),
                size: this.modalDialogService.getSizes()
                    .getMd()
            });
        } else {
            this.authorizationService.toLogin();
        }

        return this;
    }

    /**
     * @public
     * @method toCreateReview
     * @returns {Review}
     */
    toCreateReview() {
        if (this.props.isAuthorized) {
            this.modalDialogService.open({
                className: "review-creation",
                title: this.stringsResource.review.write,
                body: this.renderCreationForm(),
                size: this.modalDialogService.getSizes()
                    .getMd(),
                html: false
            });
        } else {
            this.authorizationService.toLogin();
        }

        return this;
    }

    /**
     * @method renderThreads
     * @returns {string}
     * @protected
     */
    renderThreads() {
        return (
            <Threads
                className="review__threads"
                isAuthorized={this.props.isAuthorized}
                items={this.getThreads()}
                hideAnswers={this.props.hideAnswers}
                toAnswer={(...args) => this.toAnswer(...args)}
                getAllAnswers={(...args) => this.getAllAnswers(...args)}
                toVote={this.props.toVote}
                productName={this.props.productName}
            />
        );
    }

    /**
     * @private
     * @method _updateThreads
     * @param prevReview {Review}
     * @return {Review}
     */
    _updateThreads(prevReview) {
        if (prevReview !== this.props.review) {
            this._setThreads(this.props.review.getThreads());
        }

        return this;
    }

    /**
     * @protected
     * @method renderCreationForm
     * @param hasTitle {boolean}
     * @returns {React.Element}
     */
    renderCreationForm(hasTitle = false) {
        return (
            <CreationReview
                confirm={this._createReview}
                upload={this.props.upload}
                title={this._getCreationFormTitle()}
                profile={this.props.profile}
                hasTitle={hasTitle}
                hasRating
                hasBonusAlert
                hasUploadingPhoto
                closeModal={this._closeModal}
            />
        );
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.props.reviewImages.map((item) => (
            <div key={item.getId()} className="swiper-slide">
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <img
                    width="80"
                    height="80"
                    className="lazyload"
                    data-src={item.getSmall()}
                    data-review={item.getReviewId()}
                    data-id={item.getId()}
                    alt={item.getAlt()}
                    onClick={this._showGalleryImageView}
                />
            </div>
        ));
    }
}

Review.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    review: PropTypes.instanceOf(Object).isRequired,
    create: PropTypes.func.isRequired,
    createAnswer: PropTypes.func.isRequired,
    getAllAnswers: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    isAuthorized: PropTypes.bool.isRequired,
    toVote: PropTypes.func.isRequired,
    upload: PropTypes.func.isRequired,
    totalCommentsCount: PropTypes.number,
    // eslint-disable-next-line react/no-unused-prop-types
    hideAnswers: PropTypes.bool,
    productName: PropTypes.string,
    reviewImages: PropTypes.instanceOf(Array),
    getReviewById: PropTypes.func
};

Review.defaultProps = {
    totalCommentsCount: 0,
    hideAnswers: false,
    productName: "",
    reviewImages: [],
    getReviewById: () => {}
};

export default Review;
