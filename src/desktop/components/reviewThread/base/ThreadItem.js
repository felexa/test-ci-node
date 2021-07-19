import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Strings from "app/core/utilites/strings";
import VoteEnum from "app/core/utilites/enum/vote";
import ModalDialogService from "app/core/services/modalDialog";
import CustomDate from "app/core/utilites/date";

import Rating from "components/rating/Rating";
import Avatar from "components/avatar/Avatar";
import Carousel from "components/carousel/Carousel";
// eslint-disable-next-line import/no-cycle
import Gallery from "components/galleryForReview/Gallery";

import Author from "./Author";
import Answer from "./answer/Answer";
import ActionBar from "./ActionBar";

class ThreadItem extends React.Component {
    constructor(props) {
        super(props);

        this.carouselConfig = {
            slidesPerView: "auto",
            slideClass: "thread-review__photo",
            loop: false,
            spaceBetween: 10
        };

        /**
         * @property _local
         * @type {string}
         */
        this._local = Env.getInstance().getLanguage();

        /**
         * @property _date
         * @type {Object}
         */
        this._date = CustomDate.getInstance();

        this.modalDialogService = ModalDialogService.getInstance();
        /**
         * @property Resource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            item: this.props.item,
            displayedAllAnswersButton: true,
            disabledVoteControls: false,
            hideAnswers: this.props.hideAnswers,
            date: "",
            buttonName: this.stringsResource.readMore,
            isCollapsible: true
        };

        /**
         * @private
         * @property _strings
         * @type {Strings}
         */
        this._strings = Strings.getInstance();

        /**
         * @private
         * @property _voteEnum
         * @type {Enum}
         */
        this._voteEnum = VoteEnum.getInstance();

        this._setThread = this._setThread.bind(this);
        this._toAnswer = this._toAnswer.bind(this);
        this._toggleAnswers = this._toggleAnswers.bind(this);
        this._getAllAnswers = this._getAllAnswers.bind(this);
        this._like = this._like.bind(this);
        this._dislike = this._dislike.bind(this);
        this._openGallery = this._openGallery.bind(this);
        this._toggleDescription = this._toggleDescription.bind(this);
    }

    componentDidMount() {
        this._setDate();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.item, this.props.item)) {
            this._setThread(this.props.item);
        }
    }

    /**
     * @private
     * @method _hasItems
     * @return {boolean}
     */
    _hasItems() {
        return Boolean(this._getItemsCount());
    }

    /**
     * @private
     * @method _hasUnpackingPhoto
     * @return {boolean}
     */
    _hasUnpackingPhoto() {
        return Boolean(this.getItem().getImages().length) && this.props.isShowUnpacking;
    }

    /**
     * @private
     * @method _isVisibleItems
     * @return {boolean}
     */
    _isVisibleItems() {
        return !this.state.hideAnswers && this._hasItems();
    }

    /**
     * @private
     * @method _isDisplayedAllAnswersButton
     * @returns {boolean}
     */
    _isDisplayedAllAnswersButton() {
        return Boolean(this._getItemsCount() && this.props.hideAnswers && this.state.displayedAllAnswersButton);
    }

    /**
     * @method _isDisabledVoteControls
     * @return {boolean}
     * @private
     */
    _isDisabledVoteControls() {
        return this.state.disabledVoteControls;
    }

    /**
     * @private
     * @method _isVisibleBtn
     * @returns {boolean}
     */
    _isVisibleBtn() {
        return this.props.maxCommentLength < this.getItem().getComment().length && this.props.showCollapsedBtn;
    }

    /**
     * @private
     * @method _toggleDisableVoteControls
     * @param state {boolean}
     * @returns {ThreadItem}
     */
    _toggleDisableVoteControls(state) {
        this.setState({
            disabledVoteControls: state
        });

        return this;
    }

    /**
     * @private
     * @method _toggleAnswers
     * @returns {ThreadItem}
     */
    _toggleAnswers() {
        this.setState((prevState) => ({
            hideAnswers: !prevState.hideAnswers,
            displayedAllAnswersButton: false
        }));

        return this;
    }

    /**
     * @private
     * @method _toggleDescription
     * @returns {Thread}
     */
    _toggleDescription() {
        let isCollapsible = !this.state.isCollapsible;

        this.setState(() => ({
            buttonName: isCollapsible ? this.stringsResource.readMore : this.stringsResource.hideText,
            isCollapsible
        }));

        return this;
    }

    /**
     * @public
     * @method getItem
     * @returns {Thread}
     */
    getItem() {
        return this.state.item;
    }

    /**
     * @private
     * @method _getItemsCount
     * @returns {number}
     */
    _getItemsCount() {
        return this.getItem().getItems().length;
    }

    /**
     * @private
     * @method _getComment
     * @returns {string}
     */
    _getComment() {
        let result = this.getItem().getComment();

        if (this.state.isCollapsible) {
            result = this._strings.clip(this.getItem().getComment(), this.props.maxCommentLength);
        }

        return result;
    }

    /**
     * @private
     * @method _getAllAnswers
     * @param thread {Thread}
     * @param success {Function}
     * @param error {Function}
     * @returns {ThreadItem}
     */
    _getAllAnswers(thread, success, error) {
        this.props.getAllAnswers(thread, success, error);

        return this;
    }

    /**
     * @private
     * @method _getGalleryTitle
     * @return {string}
     */
    _getGalleryTitle() {
        // eslint-disable-next-line max-len
        return `${this.stringsResource.usersPhotos} (${this.getItem().getImages().length}${this.stringsResource.pcs.toLowerCase()}.) - ${this.props.productName}`;
    }

    /**
     * @private
     * @method renderActionBar
     * @param id {string}
     * @return {number}
     */
    _getActiveSlideIndex(id) {
        let activeSlide = 0;

        this.getItem().getImages().forEach((item, i) => {
            if (item.getId() === id) {
                activeSlide = i;
            }
        });

        return activeSlide;
    }

    /**
     * @private
     * @method _setLikesCount
     * @param thread {Thread}
     * @returns {ThreadItem}
     */
    _setThread(thread) {
        this.setState({
            item: thread
        });

        return this;
    }

    /**
     * @private
     * @method _setDate
     * @returns {ThreadItem}
     */
    _setDate() {
        this.setState({date: this._date.formatPerDayMonthYear(this._local, this.getItem().getDate())});

        return this;
    }

    /**
     * @private
     * @method _dislike
     * @param thread {Thread}
     * @param success {Function}
     * @param [error] {Function}
     * @returns {ThreadItem}
     */
    _dislike(thread, success, error) {
        if (!thread.isDisliked()) {
            this._toVote(thread, this._voteEnum.getDislikeAsValue(), (newThread) => {
                success(newThread);
            }, error);
        } else {
            this._unlike(thread, success, error);
        }

        return this;
    }

    /**
     * @private
     * @method _like
     * @param thread {Thread}
     * @param success {Function}
     * @param [error] {Function}
     * @returns {ThreadItem}
     */
    _like(thread, success, error) {
        if (!thread.isLiked()) {
            this._toVote(thread, this._voteEnum.getLikeAsValue(), (newThread) => {
                success(newThread);
            }, error);
        } else {
            this._unlike(thread, success, error);
        }

        return this;
    }

    /**
     * @private
     * @method _toAnswer
     * @param item {Thread}
     * @returns {ThreadItem}
     */
    _toAnswer(item) {
        this.props.toAnswer(item.copy());

        return this;
    }

    /**
     * @method _vote
     * @param thread {Thread}
     * @param voteType {string}
     * @param success {Function}
     * @param [error] {Function}
     * @return {ThreadItem}
     * @private
     */
    _toVote(thread, voteType, success, error = () => {}) {
        this._toggleDisableVoteControls(true);

        this.props.toVote(thread.copy(), voteType, (newThread) => {
            success(newThread);
            this._toggleDisableVoteControls(false);
        }, () => {
            error();
            this._toggleDisableVoteControls(false);
        });

        return this;
    }

    /**
     * @private
     * @method renderActionBar
     * @param e {Object}
     * @return {ThreadItem}
     */
    _openGallery(e) {
        let activeSlide = this._getActiveSlideIndex(e.target.dataset.id);

        this._showGallery(activeSlide);

        return this;
    }

    /**
     * @private
     * @method _showGallery
     * @return {ThreadItem}
     */
    _showGallery(activeSlide) {
        this.modalDialogService.open({
            className: "thread-review__gallery",
            body: <Gallery
                activeSlide={activeSlide}
                toVote={this.props.toVote}
                item={this.getItem()}
                toAnswer={this._toAnswer}
                toggleAnswers={this._toggleAnswers}
            />,
            size: this.modalDialogService.getSizes().getLg(),
            type: this.modalDialogService.getTypes().getInfo(),
            title: this._getGalleryTitle()
        });

        return this;
    }

    /**
     * @private
     * @method _unlike
     * @param thread {Thread}
     * @param success {Function}
     * @param [error] {Function}
     * @returns {ThreadItem}
     */
    _unlike(thread, success, error) {
        this._toVote(thread, this._voteEnum.getRevertAsValue(), (newThread) => {
            success(newThread);
        }, error);

        return this;
    }

    /**
     * @protected
     * @method renderProduct
     * @returns {string}
     */
    renderProduct() {
        return "";
    }

    /**
     * @protected
     * @method renderActionBar
     * @return {React.element}
     */
    renderActionBar() {
        return (
            <ActionBar
                thread={this.getItem()}
                voteButtonsDescription={this.stringsResource.review.reviewUseful}
                likeButtonDescription={this.stringsResource.review.useful}
                dislikeButtonDescription={this.stringsResource.review.useless}
                disabled={this._isDisabledVoteControls()}
                createAnswer
                like
                answers={this._isDisplayedAllAnswersButton()}
                toAnswer={this._toAnswer}
                toggleAnswers={this._toggleAnswers}
                toLike={(thread) => this._like(thread, this._setThread)}
                toDislike={(thread) => this._dislike(thread, this._setThread)}
            />
        );
    }

    /**
     * @private
     * @method _renderPhoto
     * @return {React.element}
     */
    _renderPhoto() {
        return this.getItem().getImages().map((item, i) => (
            <div key={i} className="thread-review__photo">
                {/*eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions*/}
                <img
                    className="lazyload"
                    data-src={item.getSmall()}
                    alt={item.getAlt()}
                    data-id={item.getId()}
                    key={item.getId()}
                    onClick={this._openGallery}
                    width="80"
                    height="80"
                />
            </div>
        ));
    }

    /**
     * @public
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="thread-review thread-review--base d-flex flex-column h-100">
                <div className="thread-review__content">
                    <div className="thread-review__header">
                        {this.renderProduct()}

                        <div className="d-flex align-items-center">
                            <Avatar profile={this.getItem().getAuthor()} size={40} />

                            <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center flex-wrap w-100">
                                <Author thread={this.getItem()} />

                                <div className="thread-review__date">{this.state.date}</div>
                            </div>
                        </div>
                    </div>

                    <div className="thread-review__body">
                        <div className="d-flex align-items-center">
                            <Rating readonly rating={this.getItem().getRating().getValue()} />
                        </div>

                        <div className="thread-review__comment">
                            <span>{this._getComment()}</span>
                            {this._isVisibleBtn() && (
                                <button onClick={this._toggleDescription} type="button" className="btn-link mt-6">
                                    {this.state.buttonName}
                                </button>
                            )}
                        </div>

                        {this._hasUnpackingPhoto() && (
                            <div className="thread-review__photos">
                                <Carousel
                                    config={this.carouselConfig}
                                    hidePagination
                                    hideControls
                                >
                                    {this._renderPhoto()}
                                </Carousel>
                            </div>
                        )}

                        {this.renderActionBar()}
                    </div>
                </div>

                {this._isVisibleItems() && (
                    <Answer
                        thread={this.getItem()}
                        getAllAnswers={this._getAllAnswers}
                        toLike={this._like}
                        toDislike={this._dislike}
                    />
                )}
            </div>
        );
    }
}

ThreadItem.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    hideAnswers: PropTypes.bool,
    toAnswer: PropTypes.func,
    getAllAnswers: PropTypes.func,
    toVote: PropTypes.func,
    productName: PropTypes.string,
    isShowUnpacking: PropTypes.bool,
    maxCommentLength: PropTypes.number,
    showCollapsedBtn: PropTypes.bool
};

ThreadItem.defaultProps = {
    hideAnswers: false,
    toAnswer() {},
    getAllAnswers() {},
    toVote() {},
    productName: "",
    isShowUnpacking: true,
    maxCommentLength: Infinity,
    showCollapsedBtn: false
};

export default ThreadItem;
