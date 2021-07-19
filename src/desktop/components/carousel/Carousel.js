/* eslint-disable react/prop-types */
import React from "react";
import classnames from "classnames";

import {
    Swiper, Pagination, Autoplay, Navigation
} from "swiper/js/swiper.esm";

import LeftDoubleArrow from "desktop/components/carousel/LeftDoubleArrow";
import RightDoubleArrow from "desktop/components/carousel/RightDoubleArrow";

Swiper.use([Pagination, Autoplay, Navigation]);

class Carousel extends React.Component {
    constructor(props) {
        super(props);

        this.ref = {
            component: React.createRef(),
            carousel: React.createRef(),
            pagination: React.createRef(),
            nextBtn: React.createRef(),
            prevBtn: React.createRef()
        };

        this.carousel = null;

        this._createCarousel = this._createCarousel.bind(this);
        this._getCarouselClasses = this._getCarouselClasses.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this._createCarousel();
        }, 50);
    }

    componentDidUpdate() {
        if (this.carousel) {
            this.carousel.update();
        }
    }

    _getCarouselClasses() {
        return classnames("swiper-container", {
            "carousel-with-pagination": !this.props.hidePagination
        });
    }

    _createCarousel() {
        let self = this;

        this.carousel = new Swiper(this.ref.carousel.current, {
            slideClass: this.props.config.slideClass,
            slidesPerView: this.props.config.slidesPerView,
            spaceBetween: 20,
            pagination: {
                el: this.ref.pagination.current,
                type: "bullets",
                clickable: true
            },
            navigation: {
                nextEl: self.ref.nextBtn.current,
                prevEl: self.ref.prevBtn.current
            },
            on: {
                progress(progress) {
                    if (self.props.showBlur) {
                        let classes = self.ref.component.current.classList,
                            leftBlur = "blur-left",
                            rightBlur = "blur-right",
                            needShowBlurLeft = progress > 0,
                            needShowBlurRight = progress < 1,
                            hasBlurLeft = classes.contains(leftBlur),
                            hasBlurRight = classes.contains(rightBlur);

                        if (needShowBlurLeft) {
                            if (!hasBlurLeft) {
                                classes.add(leftBlur);
                            }
                        } else {
                            classes.remove(leftBlur);
                        }

                        if (needShowBlurRight) {
                            if (!hasBlurRight) {
                                classes.add(rightBlur);
                            }
                        } else {
                            classes.remove(rightBlur);
                        }
                    }
                }
            },
            ...this.props.config
        });
    }

    render() {
        return (
            <div className="carousel h-100 w-100" ref={this.ref.component}>
                <div className="carousel__body">
                    {!this.props.hideControls && (
                        <div className="carousel-button-prev" ref={this.ref.prevBtn} onClick={this.props.navigatePrevious}>
                            {
                                (this.props.flatArrow && <LeftDoubleArrow />) || <i className="icon icon-arrow-left" />
                            }
                        </div>
                    )}

                    <div ref={this.ref.carousel} className={this._getCarouselClasses()}>
                        <div className="swiper-wrapper w-100">{this.props.children}</div>

                        <div
                            className={classnames("swiper-pagination", {hidden: this.props.hidePagination})}
                            ref={this.ref.pagination}
                            onClick={this.props.paginate}
                        />
                    </div>

                    {!this.props.hideControls && (
                        <div className="carousel-button-next" ref={this.ref.nextBtn} onClick={this.props.navigateNext}>
                            {
                                (this.props.flatArrow && <RightDoubleArrow />) || <i className="icon icon-arrow-right" />
                            }
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Carousel;
