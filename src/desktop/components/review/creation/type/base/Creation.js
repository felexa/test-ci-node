/* eslint-disable max-len,react/no-unused-state */
import React from "react";
import PropTypes from "prop-types";

import _ from "lodash";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import BlobFileReader from "app/core/utilites/blobFileReader/BlobFileReader";
import Validator from "app/core/utilites/validator/Validator";
import Algorithms from "app/core/utilites/validator/Algorithms";

class Creation extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _BlobFileReader
         * @type {BlobFileReader}
         */
        this._BlobFileReader = new BlobFileReader();

        /**
         * @property _unpackingImageType
         * @type {string}
         */
        this._unpackingImageType = "review";

        /**
         * @property _maxCommentLength
         * @type {number}
         */
        this._maxCommentLength = 3000;

        /**
         * @property _maxQuantityOfImages
         * @type {number}
         */
        this._maxQuantityOfImages = 10;

        this.progressCount = {
            start: 0,
            filledRating: 30,
            filledComment: 70,
            allFilled: 100
        };

        /**
         * @property _ref
         * @type {{component: Object}}
         */
        this._ref = {
            component: React.createRef()
        };

        /**
         * @property _stringsResource
         * @type {Object}
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property _linksResource
         * @type {Object}
         */
        this._linksResource = Resource.links;

        /**
         * @property _HTMLResource
         * @type {Object}
         */
        this._HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.state = {
            isLoading: false,
            // eslint-disable-next-line react/no-unused-state
            errorMessages: {
                creation: ""
            },
            review: {
                rating: 0,
                email: props.profile.getEmail(),
                comment: "",
                notify: true,
                images: []
            },
            // eslint-disable-next-line react/no-unused-state
            alertInfo: this._buildDefaultAlertMessage(),
            progress: this.progressCount.start,
            header: `${this._stringsResource.letsStart}?`
        };

        this._Validator = Validator;

        this._Algorithms = Algorithms;

        this._toggleLoader = this._toggleLoader.bind(this);
        this._setDefaultState = this._setDefaultState.bind(this);
        this._changeRating = this._changeRating.bind(this);
        this._changeName = this._changeName.bind(this);
        this._changeEmail = this._changeEmail.bind(this);
        this._changeComment = this._changeComment.bind(this);
        this._changeNotifyOfAnswers = this._changeNotifyOfAnswers.bind(this);
        this._confirm = this._confirm.bind(this);
        this._addPhoto = this._addPhoto.bind(this);
        this._uploadPhoto = this._uploadPhoto.bind(this);
        this._errorHandler = this._errorHandler.bind(this);
        this._deletePhoto = this._deletePhoto.bind(this);
    }

    /**
     * @public
     * @method componentDidUpdate
     * @return void
     */
    componentDidUpdate(prevProps) {
        if (this.props.profile !== prevProps.profile) {
            this._setDefaultDataFromProfile();
        }
    }

    /**
     * @private
     * @method _hasTitle
     * @returns {boolean}
     */
    _hasTitle() {
        return this.props.hasTitle;
    }

    /**
     * @private
     * @method _hasRating
     * @returns {boolean}
     */
    _hasRating() {
        return this.props.hasRating;
    }

    /**
     * @private
     * @method _hasNameFromProfile
     * @return {boolean}
     */
    _hasNameFromProfile() {
        return Boolean(this._getProfile().getName());
    }

    /**
     * @private
     * @method _hasEmailFromProfile
     * @returns {boolean}
     */
    _hasEmailFromProfile() {
        return Boolean(this._getProfile().getEmail());
    }

    /**
     * @private
     * @method _hasBonusAlert
     * @returns {boolean}
     */
    _hasBonusAlert() {
        return this.props.hasBonusAlert;
    }

    /**
     * @private
     * @method _hasUnpackingPhoto
     * @returns {boolean}
     */
    _hasUnpackingPhoto() {
        return Boolean(this.state.review.images.length);
    }

    /**
     * @private
     * @method _hasUnpackingPhotoSection
     * @returns {boolean}
     */
    _hasUnpackingPhotoSection() {
        return this.props.hasUploadingPhoto;
    }

    /**
     * @private
     * @method _isLoading
     * @returns {boolean}
     */
    _isLoading() {
        return this.state.isLoading;
    }

    /**
     * @private
     * @method _isQuantityLimitReached
     * @returns {boolean}
     */
    _isQuantityLimitReached() {
        return this.state.review.images.length < this._maxQuantityOfImages;
    }

    /**
     * @private
     * @method _isValidReview
     * @returns {boolean}
     */
    _isValidReview() {
        let report = new this._Validator(this.state.review, this._getAlgorithms()).validate();

        this._Validator.toggleValidateErrors(report, this._ref.component.current);

        return !report.hasError();
    }

    /**
     * @private
     * @method _isRatingFilled
     * @returns {boolean}
     */
    _isRatingFilled() {
        return Boolean(this.state.review.rating);
    }

    /**
     * @private
     * @method _isCommentFilled
     * @returns {boolean}
     */
    _isCommentFilled() {
        return this._isRatingFilled() && Boolean(this.state.review.comment);
    }

    /**
     * @private
     * @method _isImagesFilled
     * @returns {boolean}
     */
    _isImagesFilled() {
        return this._isCommentFilled() && Boolean(this.state.review.images.length);
    }

    /**
     * @private
     * @method _getAlertInfo
     * @returns {Creation}
     */
    _getAlertInfo() {
        let result = {alertInfo: this.state.alertInfo, header: this.state.header, progress: this.state.progress};

        if (this._isRatingFilled()) {
            result = {
                alertInfo: this._buildFillInCommentMessage(),
                header: this._stringsResource.uii,
                progress: this.progressCount.filledRating
            };
        }

        if (this._isCommentFilled()) {
            result = {
                alertInfo: this._buildUploadingPhotoMessage(),
                header: this._stringsResource.almostDone,
                progress: this.progressCount.filledComment
            };
        }

        if (this._isImagesFilled()) {
            result = {
                alertInfo: this._buildCongratulationsMessage(),
                header: this._stringsResource.done,
                progress: this.progressCount.allFilled
            };
        }

        this.setState({
            ...result
        });

        return this;
    }

    _buildFillInCommentMessage() {
        return (
            <div className="review-creation__comment-message">
                <span className="position-relative mr-10" dangerouslySetInnerHTML={{__html: this._HTMLResource.review.fillInCommentMessage}} />
                <img className="position-absolute ml-10" src={this._linksResource.icons.carrotColored} alt="bonus" width="24" height="24" />
            </div>
        );
    }

    _buildDefaultAlertMessage() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-md-center">
                <span className="mr-6" dangerouslySetInnerHTML={{__html: this._HTMLResource.review.fillInAllFields}} />
                <div className="d-flex align-items-center">
                    <span className="f-weight-5" dangerouslySetInnerHTML={{__html: this._HTMLResource.review.thirtyBonuses}} />
                    <img className="ml-10" src={this._linksResource.icons.carrotColored} alt="bonus" width="24" height="24" />
                </div>
            </div>
        );
    }

    _buildUploadingPhotoMessage() {
        return (
            <div>
                <div className="">
                    <span className="mt-0 mb-0 position-relative pr-2" dangerouslySetInnerHTML={{__html: this._HTMLResource.review.youGetTenBonuses}} />
                    <img className="position-absolute" alt="" src={this._linksResource.images.employeeDiscount.congratulations} width="24" height="24" />
                </div>
                <div className="mb-16">
                    <span className="m-0 position-relative pr-2" dangerouslySetInnerHTML={{__html: this._HTMLResource.review.addPhotoToGetMore}} />
                    <img className="position-absolute" src={this._linksResource.icons.carrotColored} alt="bonus" width="24" height="24" />
                </div>
                <label className="text-left text-md-right text-blue cursor-pointer mt-md-0 mt-8 ml-50 ml-md-0 f-weight-4">
                    {this._stringsResource.uploadPhoto}
                    <input
                        type="file"
                        name="unpacking"
                        accept="image/*"
                        className="d-none"
                        onChange={this._addPhoto}
                    />
                </label>
            </div>
        );
    }

    _buildCongratulationsMessage() {
        return (
            <div>
                <div className="mb-16">
                    <span className="m-0 position-relative pr-2" dangerouslySetInnerHTML={{__html: this._HTMLResource.review.congratulations}} />
                    <img className="position-absolute" alt="" src={this._linksResource.images.employeeDiscount.congratulations} width="24" height="24" />
                    <span className="ml-34 position-relative pr-2" dangerouslySetInnerHTML={{__html: this._HTMLResource.review.youGet30Bonuses}} />
                    <img className="position-absolute" alt="bonus" src={this._linksResource.icons.carrotColored} width="24" height="24" />
                </div>
                <label className="text-left text-md-right text-blue cursor-pointer mt-md-0 mt-8 ml-50 ml-md-0 f-weight-4">
                    {this._stringsResource.uploadPhoto}
                    <input
                        type="file"
                        name="unpacking"
                        accept="image/*"
                        className="d-none"
                        onChange={this._addPhoto}
                    />
                </label>
            </div>
        );
    }

    /**
     * @private
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {Creation}
     */
    _toggleLoader(state) {
        this.setState({isLoading: Boolean(state)});

        return this;
    }

    /**
     * @private
     * @method _setDefaultState
     * @returns {Creation}
     */
    _setDefaultState() {
        this.setState({
            isLoading: false,
            // eslint-disable-next-line react/no-unused-state
            errorMessages: {
                creation: ""
            },
            review: {
                rating: 0,
                email: this._getProfile().getEmail(),
                comment: "",
                notify: true,
                images: []
            },
            alertInfo: this._buildDefaultAlertMessage(),
            progress: this.progressCount.start,
            header: `${this._stringsResource.letsStart}?`
        });

        return this;
    }

    /**
     * @private
     * @method _setDefaultDataFromProfile
     * @returns {Creation}
     */
    _setDefaultDataFromProfile() {
        this.setState((state) => _.merge(
            {},
            state,
            {
                review: {
                    name: this._getProfile().getName() || state.review.name,
                    email: this._getProfile().getEmail() || state.review.email
                }
            }
        ));

        return this;
    }

    /**
     * @private
     * @method _getProfile
     * @returns {Profile}
     */
    _getProfile() {
        return this.props.profile;
    }

    /**
     * @private
     * @method _getTitle
     * @returns {string}
     */
    _getTitle() {
        return this.props.title || this._stringsResource.review.create;
    }

    /**
     * @property _getConfirmButtonName
     * @returns {string}
     * @private
     */
    _getConfirmButtonName() {
        return this.props.confirmButtonName || this._stringsResource.review.create;
    }

    /**
     * @private
     * @method _getAlgorithms
     * @returns {Object}
     */
    _getAlgorithms() {
        let self = this,
            algorithms = new this._Algorithms().getAlgorithms([
                {
                    type: "email",
                    name: "email",
                    selector: ".error-email-field"
                },
                {
                    type: "text",
                    name: "comment",
                    selector: ".error-comment-field"
                }
            ]);

        return _.merge({}, algorithms, {
            rating: {
                isValid(value) {
                    // eslint-disable-next-line no-underscore-dangle
                    return self._hasRating() ? Boolean(value) : true;
                },
                error: {
                    fieldName: "Рейтинг",
                    message: this._stringsResource.validation.enterYourRating,
                    selector: ".error-rating-field"
                }
            }
        });
    }

    /**
     * @private
     * @method _getReview
     * @returns {Object}
     */
    _getReview() {
        let images = this.state.review.images.map((item) => item.src),
            review = _.merge({}, this.state.review);

        review.images = images;

        return review;
    }

    /**
     * @private
     * @method _addPhoto
     * @returns {Creation}
     */
    _addPhoto(e) {
        this._setErrorStatus(false);
        this._BlobFileReader.readAsData(e.target.files[0], this._uploadPhoto);

        return this;
    }

    /**
     * @private
     * @method _uploadPhoto
     * @param image {string}
     * @returns {Creation}
     */
    _uploadPhoto(image) {
        if (this._isQuantityLimitReached()) {
            this.props.upload(
                image,
                this._unpackingImageType,
                (response) => {
                    this._setPhoto(response);
                },
                this._errorHandler
            );
        } else {
            this._errorHandler();
        }

        return this;
    }

    /**
     * @private
     * @method _setPhoto
     * @param image {string}
     * @returns {Creation}
     */
    _setPhoto(image) {
        if (this._isQuantityLimitReached()) {
            this.setState((state) => ({
                review: {
                    ...state.review,
                    images: [...state.review.images, {id: Date.now(), src: image.src}]
                }
            }), this._getAlertInfo);
        } else {
            this._errorHandler();
        }

        return this;
    }

    /**
     * @private
     * @method _errorHandler
     * @returns {Creation}
     */
    _errorHandler() {
        this._setErrorStatus(true);

        return this;
    }

    _deletePhoto(e) {
        let filteredImages = this.state.review.images.filter((item) => String(item.id) !== e.target.dataset.id);

        this.setState((state) => ({
            review: {
                ...state.review,
                images: filteredImages
            }
        }), this._getAlertInfo);
    }

    /**
     * @private
     * @method _setErrorStatus
     * @param state {boolean}
     * @returns {Creation}
     */
    _setErrorStatus(state) {
        // eslint-disable-next-line react/no-unused-state
        this.setState({errorUnpacking: state});

        return this;
    }

    /**
     * @private
     * @method _changeRating
     * @param rating {number}
     * @returns {Creation}
     */
    _changeRating(rating) {
        this.setState((state) => _.merge({}, state, {review: {rating}}),
            this._getAlertInfo);

        return this;
    }

    /**
     * @private
     * @method _changeName
     * @param e {Object}
     * @returns {Creation}
     */
    _changeName(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {review: {name: e.target.value}}));

        return this;
    }

    /**
     * @private
     * @method _changeEmail
     * @param e {Object}
     * @returns {Creation}
     */
    _changeEmail(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {review: {email: e.target.value}}));

        return this;
    }

    /**
     * @private
     * @method _changeComment
     * @param e {Object}
     * @returns {Creation}
     */
    _changeComment(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {review: {comment: e.target.value}}),
            this._getAlertInfo);

        return this;
    }

    /**
     * @private
     * @method _changeNotifyOfAnswers
     * @param e {Object}
     * @returns {Creation}
     */
    _changeNotifyOfAnswers(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {review: {notify: e.target.checked}}));

        return this;
    }

    /**
     * @private
     * @method _confirm
     * @returns {Creation}
     */
    _confirm() {
        if (this._isValidReview()) {
            this._toggleLoader(true);

            this.props.confirm(
                this._getReview(),
                this._setDefaultState,
                (exception) => {
                    this.setState((state) => _.merge({}, state, {errorMessages: {creation: exception.getMessage()}}));

                    this._toggleLoader(false);
                }
            );
        }

        return this;
    }

    _renderUnpackingPhoto() {
        return this.state.review.images.map((image) => (
            <div key={image.id} className="unpacking__photo d-flex flex-column align-items-center mr-12 mt-8">
                <img data-src={image.src} alt="unpacking" width="60" height="60" className="rounded-10 base-border lazyload" />
                <button data-id={image.id} type="button" className="btn-link mt-10" onClick={this._deletePhoto}>
                    <i className="icon icon-trash" />
                </button>
            </div>
        ));
    }
}

Creation.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    className: PropTypes.string,
    confirmButtonName: PropTypes.string,
    confirm: PropTypes.func,
    upload: PropTypes.func,
    title: PropTypes.string,
    hasTitle: PropTypes.bool,
    hasRating: PropTypes.bool,
    hasBonusAlert: PropTypes.bool,
    hasUploadingPhoto: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    closeModal: PropTypes.func
};

Creation.defaultProps = {
    className: "",
    title: "",
    confirmButtonName: "",
    confirm: () => {},
    upload: () => {},
    hasTitle: false,
    hasRating: false,
    hasBonusAlert: false,
    hasUploadingPhoto: false,
    closeModal: () => {}
};

export default Creation;
