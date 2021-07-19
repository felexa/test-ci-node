import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Swiper from "swiper";

import Resource from "app/core/resource";
import Env from "app/core/environment";

// eslint-disable-next-line import/no-cycle
import ThreadItem from "components/reviewThread/base/ThreadItem";

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        /**
         * @slider
         * @type {Swiper}
         */
        this.slider = null;

        /**
         * @property sliderSettings
         * @type {Object}
         */
        this.sliderSettings = {
            allowTouchMove: true,
            slidesPerView: 1,
            breakpoints: {
                1024: {
                    allowTouchMove: false
                }
            },
            on: {
                activeIndexChange: () => {
                    if (this.slider) {
                        this._setActiveSlide(this.slider.activeIndex);
                    }
                }
            },
            initialSlide: this.props.activeSlide
        };

        /**
         * @property ref
         * @type {Object}
         */
        this.ref = {
            gallery: React.createRef(),
            slider: React.createRef(),
            thumbnails: React.createRef(),
            nextBtn: React.createRef(),
            prevBtn: React.createRef()
        };

        this.state = {
            activeSlide: this.props.activeSlide,
            item: props.item
        };

        /**
         * @property _stringsResource
         * @type {Object}
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._setActiveSlide = this._setActiveSlide.bind(this);
        this._setPrevSlide = this._setPrevSlide.bind(this);
        this._setNextSlide = this._setNextSlide.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this._initSlider();
        }, 50);
    }

    /**
     * @protected
     * @method componentDidUpdate
     */
    componentDidUpdate() {
        if (this.slider) {
            this.slider.update();
        }
    }

    /**
     * @private
     * @method _isActiveThumbnail
     * @param index {number}
     * @returns {boolean}
     */
    _isActiveThumbnail(index) {
        return (this.state.activeSlide === index);
    }

    /**
     * @private
     * @method _isSwitchedToNext
     * @returns {boolean}
     */
    _isSwitchedToNext() {
        return this._getItem().getImages().length - 1 === this.state.activeSlide &&
            Boolean(this._getItem().getNextThreadId());
    }

    /**
     * @private
     * @method _isSwitchedToPrev
     * @returns {boolean}
     */
    _isSwitchedToPrev() {
        return this.state.activeSlide === 0 && Boolean(this._getItem().getPrevThreadId());
    }

    /**
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {Invite}
     * @private
     */
    _toggleLoader(state) {
        this.setState({loading: Boolean(state)});

        return this;
    }

    /**
     * @private
     * @method _getItem
     * @returns {Object}
     */
    _getItem() {
        return this.state.item;
    }

    /**
     * @private
     * @method _setActiveSlide
     * @param index {number}
     * @returns {Gallery}
     */
    _setActiveSlide(index) {
        this.setState({
            activeSlide: index
        }, () => {
            this.slider.slideTo(this.state.activeSlide);
        });

        return this;
    }

    /**
     * @private
     * @method _setNextSlide
     * @returns {Gallery}
     */
    _setNextSlide() {
        // eslint-disable-next-line max-len
        if (this._isSwitchedToNext()) {
            this._toggleLoader(true);

            this.props.toggleReview(this._getItem().getNextThreadId(),
                (review) => {
                    this.setState({
                        item: review,
                        activeSlide: 0
                    }, () => this.slider.slideTo(0));

                    setTimeout(() => this._toggleLoader(false), 500);
                });
        } else {
            this.slider.slideNext();
        }

        return this;
    }

    /**
     * @private
     * @method _setPrevSlide
     * @returns {Gallery}
     */
    _setPrevSlide() {
        if (this._isSwitchedToPrev()) {
            this._toggleLoader(true);

            this.props.toggleReview(this._getItem().getPrevThreadId(),
                (review) => {
                    this.setState({
                        item: review,
                        activeSlide: review.getImages().length - 1
                    }, () => this.slider.slideTo(this.state.activeSlide));

                    setTimeout(() => this._toggleLoader(false), 500);
                });
        } else {
            this.slider.slidePrev();
        }

        return this;
    }

    /**
     * @private
     * @method _initSlider
     * @returns {Gallery}
     */
    _initSlider() {
        this.slider = new Swiper(this.ref.slider.current, this.sliderSettings);

        return this;
    }

    /**
     * @private
     * @method _renderThumbnails
     * @returns {Array}
     */
    _renderThumbnails() {
        return this._getItem().getImages().map((item, index) => (
            <div
                className={classnames("thumbnails__item", {active: this._isActiveThumbnail(index)})}
                key={index}
                onClick={() => this._setActiveSlide(index)}
            >
                <img
                    src={item.getSmall()}
                    alt={item.getAlt()}
                    width={item.getSizes().getSmall().getWidth()}
                    height={item.getSizes().getSmall().getHeight()}
                />
            </div>
        ));
    }

    /**
     * @private
     * @method _renderSlides
     * @returns {Array}
     */
    _renderSlides() {
        return this._getItem().getImages().map((item, index) => (
            <div
                className="swiper-slide d-flex"
                key={index}
            >
                <div className="image-container">
                    <img
                        src={item.getExtraLarge()}
                        alt={item.getAlt()}
                        width={item.getSizes().getExtraLarge().getWidth()}
                        height={item.getSizes().getExtraLarge().getHeight()}
                    />
                </div>
            </div>
        ));
    }

    render() {
        return (
            <div className="gallery-image">
                {this.props.galleryToggle && (
                    <button type="button" className="gallery-image__to-immersive-view btn-link align-items-center mb-16" onClick={this.props.showGallery}>
                        <i className="icon icon-gallery" />
                        <span>{this._stringsResource.goToGallery}</span>
                    </button>
                )}

                <div className="gallery-image__content">
                    <div className={classnames("gallery-image__body", {loading: this.state.loading})}>
                        <div className="slider h-100 w-100">
                            <div className="swiper-container" ref={this.ref.slider}>
                                <div className="swiper-wrapper">
                                    {this._renderSlides()}
                                </div>
                                <div className="swiper-button-next" onClick={this._setNextSlide} />
                                <div className="swiper-button-prev" onClick={this._setPrevSlide} />
                            </div>
                        </div>
                    </div>

                    <div className="gallery-image__aside">
                        <div className="gallery__review">
                            <ThreadItem
                                item={this._getItem()}
                                toVote={this.props.toVote}
                                isShowUnpacking={false}
                                toAnswer={this.props.toAnswer}
                                toggleAnswers={this.props.toggleAnswers}
                            />
                        </div>

                        <div className="thumbnails">
                            <p className="color-gray mb-8 mt-24">{this._stringsResource.images}</p>
                            <div className="thumbnails__items">
                                { this._renderThumbnails() }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

Gallery.propTypes = {
    toVote: PropTypes.func.isRequired,
    item: PropTypes.instanceOf(Object).isRequired,
    activeSlide: PropTypes.number,
    toAnswer: PropTypes.func,
    toggleAnswers: PropTypes.func,
    toggleReview: PropTypes.func,
    galleryToggle: PropTypes.bool,
    showGallery: PropTypes.func
};

Gallery.defaultProps = {
    activeSlide: 0,
    toAnswer: () => {},
    toggleAnswers: () => {},
    toggleReview: () => {},
    galleryToggle: false,
    showGallery: () => {}
};

export default Gallery;
