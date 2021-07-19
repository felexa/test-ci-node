import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Tridi from 'react-tridi';
import Swiper from "swiper";

import Env from "app/core/environment";
import Dom from "app/core/utilites/dom";
import Resource from "app/core/resource";
import StatusTypeEnum from "app/core/utilites/enum/product/status/type";
import KeyboardEnum from "app/core/utilites/enum/keyboard";

import BuyButton from "desktop/components/buttons/buy/Buy";
import Price from "desktop/components/price/Price";

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property statusTypeEnum
         * @type {Enum}
         */
        this.statusTypeEnum = StatusTypeEnum.getInstance();

        /**
         * @property keyboardEnum
         * @type {Enum}
         */
        this.keyboardEnum = KeyboardEnum.getInstance();

        /**
         * @slider
         * @type {Swiper}
         */
        this.slider = null;

        /**
         * @property tridiFullScreenMaxDelayAsMilliseconds
         * @type {number}
         */
        this.tridiFullScreenMaxDelayAsMilliseconds = 200;

        /**
         * @property timeBeforeMountSlidesAsMilliseconds
         * @type {number}
         */
        this.timeBeforeMountSlidesAsMilliseconds = 2000;

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
                    this._setActiveSlide(this.slider.activeIndex);
                }
            }
        };

        /**
         * @property selectors
         * @type {Object}
         */
        this.selectors = {
            header: ".layout header.header",
            tridi: ".tridi"
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
            images: [this._getProduct().getPreview()],
            isDisplayedThumbnails: false,
            tridiMouseDownStartTimeAsMilliseconds: new Date().getTime(),
            activeSlide: 0,
            isLoading: false,
            isFullScreen: false,
            isAllRoundView: false
        };

        this._toggleFullScreenView = this._toggleFullScreenView.bind(this);
        this._toggleFullRoundView = this._toggleFullRoundView.bind(this);
        this._closeByOverlay = this._closeByOverlay.bind(this);
        this._closeByEscapeButton = this._closeByEscapeButton.bind(this);
        this._addToBasket = this._addToBasket.bind(this);
        this._toggleDocumentScroll = this._toggleDocumentScroll.bind(this);
        this._setActiveSlide = this._setActiveSlide.bind(this);
        this._setTridiMouseDownStartTime = this._setTridiMouseDownStartTime.bind(this);
    }

    /**
     * @protected
     * @method componentDidMount
     */
    componentDidMount() {
        setTimeout(() => {
            this._initSlider();
        }, 50);

        setTimeout(() => {
            this.setState((prevState) => ({
                isDisplayedThumbnails: true,
                images: prevState.images.concat(this._getProduct().getImages())
            }));
        }, this.timeBeforeMountSlidesAsMilliseconds);

        window.document.addEventListener("keydown", this._closeByEscapeButton);

        window.document.querySelector(this.selectors.tridi).addEventListener("touchstart", () => {
            this._setTridiMouseDownStartTime();
        });

        window.document.querySelector(this.selectors.tridi).addEventListener("touchend", () => {
            let eventTimeAsMilliseconds = new Date().getTime();

            if (this._isTridiFullScreenCanBeToggled(eventTimeAsMilliseconds)) {
                this._toggleFullScreenView(true);
            }
        });

        window.document.querySelector(this.selectors.tridi).addEventListener("mousedown", () => {
            this._setTridiMouseDownStartTime();
        });

        window.document.querySelector(this.selectors.tridi).addEventListener("mouseup", () => {
            let eventTimeAsMilliseconds = new Date().getTime();

            if (this._isTridiFullScreenCanBeToggled(eventTimeAsMilliseconds)) {
                this._toggleFullScreenView(true);
            }
        });
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
     * @protected
     * @method componentWillUnmount
     */
    componentWillUnmount() {
        window.document.body.removeEventListener("keydown", this._closeByEscapeButton);
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
     * @method _isDisplayedBuyBlock
     * @returns {boolean}
     */
    _isDisplayedBuyBlock() {
        return this.state.isFullScreen && this.statusTypeEnum.isAvailable(this._getProduct().getStatus().getType());
    }

    /**
     * @private
     * @method _isActiveThumbnail
     * @param index {number}
     * @returns {boolean}
     */
    _isActiveThumbnail(index) {
        return (this.state.activeSlide === index) && !this.state.isAllRoundView;
    }

    /**
     * @private
     * @method _isTridiFullScreenCanBeToggled
     * @param eventTimeAsMilliseconds {number}
     * @returns {boolean}
     */
    _isTridiFullScreenCanBeToggled(eventTimeAsMilliseconds) {
        // eslint-disable-next-line max-len
        return !this.state.isFullScreen && (eventTimeAsMilliseconds - this.state.tridiMouseDownStartTimeAsMilliseconds) < this.tridiFullScreenMaxDelayAsMilliseconds;
    }

    /**
     * @private
     * @method _hasAllRoundView
     * @returns {boolean}
     */
    _hasAllRoundView() {
        return Boolean(this._getAllRoundViewImages().length);
    }

    /**
     * @private
     * @method _getProduct
     * @returns {Product}
     */
    _getProduct() {
        return this.props.product;
    }

    /**
     * @private
     * @method _getImages
     * @returns {Image[]}
     */
    _getImages() {
        return this.state.images;
    }

    /**
     * @private
     * @method _getAllRoundViewImages
     * @returns {Array}
     */
    _getAllRoundViewImages() {
        return this._getProduct().getAllRoundView().map((image) => image.getLarge());
    }

    /**
     * @private
     * @method _setActiveSlide
     * @param index {number}
     * @returns {Gallery}
     */
    _setActiveSlide(index) {
        this._toggleFullRoundView(false);

        this.setState({
            activeSlide: index
        }, () => {
            this.slider.slideTo(this.state.activeSlide);
        });

        return this;
    }

    _setTridiMouseDownStartTime() {
        this.setState({
            tridiMouseDownStartTimeAsMilliseconds: new Date().getTime()
        });

        return this;
    }

    /**
     * @private
     * @method _buildToAllRoundViewTitle
     * @returns {string}
     */
    _buildToAllRoundViewTitle() {
        return `${this.stringsResource.allRoundView} ${this._getProduct().getName()}`;
    }

    /**
     * @private
     * @method _toggleFullScreenView
     * @param state {boolean}
     * @returns {Gallery}
     */
    _toggleFullScreenView(state) {
        this.setState({
            isFullScreen: state
        });

        window.document.querySelector(this.selectors.header).style.zIndex = state ? 3 : 4;

        this._toggleDocumentScroll(!state);

        return this;
    }

    /**
     * @private
     * @method _toggleFullRoundView
     * @param state {boolean}
     * @returns {Gallery}
     */
    _toggleFullRoundView(state) {
        this.setState({
            isAllRoundView: state
        });

        return this;
    }

    /**
     * @private
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {Gallery}
     */
    _toggleLoader(state) {
        this.setState({
            isLoading: state
        });

        return this;
    }

    /**
     * @private
     * @method _toggleDocumentScroll
     * @param state {boolean}
     * @returns {Gallery}
     */
    _toggleDocumentScroll(state) {
        this.dom.toggleScroll(state);

        return this;
    }

    /**
     * @private
     * @method _closeByOverlay
     * @param event {Object}
     * @returns {Gallery}
     */
    _closeByOverlay(event) {
        event.persist();

        if (event.target === this.ref.gallery.current) {
            this._toggleFullScreenView(false);
        }

        return this;
    }

    /**
     * @private
     * @method _closeByEscapeButton
     * @param event {Object}
     * @returns {Gallery}
     */
    _closeByEscapeButton(event) {
        if (this.keyboardEnum.isEsc(event.code)) {
            this._toggleFullScreenView(false);
        }

        return this;
    }

    /**
     * @private
     * @method _addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Gallery}
     */
    _addToBasket(product, success, error) {
        this._toggleLoader(true);

        this.props.addToBasket(
            product,
            () => {
                this._toggleFullScreenView(false);
                this._toggleLoader(false);

                success();
            },
            () => {
                this._toggleLoader(false);

                error();
            }
        );

        return this;
    }

    /**
     * @private
     * @method _renderThumbnails
     * @returns {Array}
     */
    _renderThumbnails() {
        return this._getImages().map((item, index) => (
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
        return this._getImages().map((item, index) => (
            <div
                className="swiper-slide d-flex"
                key={index}
            >
                <img
                    className="lazyload"
                    src={item.getLarge()}
                    alt={item.getAlt()}
                    width={item.getSizes().getLarge().getWidth()}
                    height={item.getSizes().getLarge().getHeight()}
                />
            </div>
        ));
    }

    /**
     * @private
     * @method _renderFullScreenSlides
     * @returns {Array}
     */
    _renderFullScreenSlides() {
        return this._getImages().map((item, index) => (
            <div
                className="swiper-slide d-flex"
                key={index}
            >
                <img
                    className="lazyload"
                    src={item.getOriginal()}
                    alt={item.getAlt()}
                    width={item.getSizes().getOriginal().getWidth()}
                    height={item.getSizes().getOriginal().getHeight()}
                />
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div
                className={classnames("gallery", {fullscreen: this.state.isFullScreen})}
                ref={this.ref.gallery}
                onClick={this._closeByOverlay}
            >
                <div className={classnames("gallery__modal d-flex", {loading: this.state.isLoading})}>
                    {this.state.isFullScreen && (
                        <i
                            className="icon icon-close"
                            onClick={() => this._toggleFullScreenView(false)}
                        />
                    )}

                    <div className="gallery__body">
                        <div className="gallery__view">
                            <div
                                className={classnames("slider h-100 w-100", {"d-none": this.state.isAllRoundView})}
                                onClick={() => this._toggleFullScreenView(true)}
                            >
                                <div className="swiper-container" ref={this.ref.slider}>
                                    <div className="swiper-wrapper">
                                        {!this.state.isFullScreen && this._renderSlides()}

                                        {this.state.isFullScreen && this._renderFullScreenSlides()}
                                    </div>
                                </div>
                            </div>

                            <Tridi
                                images={this._getAllRoundViewImages()}
                                className={classnames("tridi", {"d-none": !this.state.isAllRoundView})}
                                dragInterval={4}
                                touchDragInterval={4}
                            />
                        </div>
                    </div>

                    <div className="gallery__footer">
                        {this.state.isFullScreen && (
                            <div className="gallery__title d-none d-xl-block">
                                { this._getProduct().getName() }
                            </div>
                        )}

                        {this.state.isDisplayedThumbnails && (
                            <div className="thumbnails">
                                <div className="thumbnails__items">
                                    { this._renderThumbnails() }

                                    {this._hasAllRoundView() && (
                                        <button
                                            title={this._buildToAllRoundViewTitle()}
                                            type="button"
                                            className={
                                                classnames(
                                                    "thumbnails__item to-all-round-view d-flex align-items-center justify-content-center",
                                                    {active: this.state.isAllRoundView}
                                                )
                                            }
                                            onClick={() => this._toggleFullRoundView(true)}
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {this._isDisplayedBuyBlock() && (
                            <div className="gallery__buy-block d-none d-xl-flex align-items-center justify-content-between">
                                <Price
                                    className="buy__price f-weight-5"
                                    value={this._getProduct().getPrice().getCurrent()}
                                />

                                <BuyButton
                                    className="buy__button text-uppercase btn-block"
                                    product={this._getProduct()}
                                    addToBasket={this._addToBasket}
                                    hasIcon
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Gallery.propTypes = {
    product: PropTypes.instanceOf(Object).isRequired,
    addToBasket: PropTypes.func.isRequired
};

export default Gallery;
