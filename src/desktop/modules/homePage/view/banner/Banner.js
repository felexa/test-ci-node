/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Carousel from "desktop/components/carousel/Carousel";
import ProgressiveImage from "desktop/components/image/ProgressiveImage";
import DeviceMobile from "desktop/components/deviceDetector/mobile/Detector";
import DeviceDesktop from "desktop/components/deviceDetector/desktop/Detector";

class Banner extends React.Component {
    constructor(props) {
        super(props);

        this.carouselConfig = {
            slidesPerView: "auto",
            slideClass: "swiper-slide",
            loop: true,
            spaceBetween: 10,
            centeredSlides: true,
            autoplay: {
                delay: 4000
            },
            speed: 1250,
            updateOnImagesReady: true,
            on: {
                paginationUpdate(swiper) {
                    swiper.loopDestroy();
                    swiper.loopCreate();
                }
            }
        };

        this.firstSlide = this.props.items[0];

        this.items = this.props.items.slice(1);

        this.state = {
            hidePagination: true,
            sliderMounted: false,
            items: []
        };

        this.paginate = this.paginate.bind(this);
    }

    /**
     * @protected
     * @method componentDidMount
     */
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                sliderMounted: true,
                hidePagination: false,
                items: this.items
            });
        }, this.props.timeBeforeMountSlidesAsMilliseconds);
    }

    /**
     * @private
     * @method paginate
     * @param event {Object}
     * @returns {Banner}
     */
    paginate(event) {
        /**
         * more info: https://reactjs.org/docs/events.html
         */
        event.persist();

        if (event.target.classList.contains("swiper-pagination-bullet")) {
            this.props.selectItem(event);
        }

        return this;
    }

    /**
     * @private
     * @method _renderFirstSlide
     * @returns {React.ReactElement}
     */
    _renderFirstSlide() {
        let banner = this.firstSlide;

        return (
            <a
                href={banner.getUrl()}
                className="first-slide swiper-slide rounded-10"
                key={banner.getId()}
                onClick={this.props.click}
            >
                <picture>
                    <DeviceMobile>
                        <ProgressiveImage
                            alt={banner.getTitle()}
                            src={banner.getMobileImage().getOriginal()}
                            previewSrc={banner.getMobileImage().getPrimitive()}
                            width={banner.getMobileImage().getSizes().getOriginal().getWidth()}
                            height={banner.getMobileImage().getSizes().getOriginal().getHeight()}
                        />
                    </DeviceMobile>

                    <DeviceDesktop>
                        <ProgressiveImage
                            alt={banner.getTitle()}
                            src={banner.getDesktopImage().getOriginal()}
                            previewSrc={banner.getDesktopImage().getPrimitive()}
                            width={banner.getDesktopImage().getSizes().getOriginal().getWidth()}
                            height={banner.getDesktopImage().getSizes().getOriginal().getHeight()}
                        />
                    </DeviceDesktop>
                </picture>
            </a>
        );
    }

    _renderSlides() {
        return (
            this.state.items.map((banner) => (
                <a
                    href={banner.getUrl()}
                    className="swiper-slide rounded-10"
                    key={banner.getId()}
                    onClick={this.props.click}
                >
                    <picture>
                        <DeviceMobile>
                            <img
                                data-src={banner.getMobileImage().getOriginal()}
                                className="lazyload"
                                alt={banner.getTitle()}
                                width={banner.getMobileImage().getSizes().getOriginal().getWidth()}
                                height={banner.getMobileImage().getSizes().getOriginal().getHeight()}
                            />
                        </DeviceMobile>

                        <DeviceDesktop>
                            <img
                                data-src={banner.getDesktopImage().getOriginal()}
                                className="lazyload"
                                alt={banner.getTitle()}
                                width={banner.getDesktopImage().getSizes().getOriginal().getWidth()}
                                height={banner.getDesktopImage().getSizes().getOriginal().getHeight()}
                            />
                        </DeviceDesktop>
                    </picture>
                </a>
            ))
        );
    }

    render() {
        return (
            <div className={classnames("banner d-flex w-100 overflow-hidden", {"not-mounted": !this.state.sliderMounted}, this.props.className)}>
                <Carousel
                    config={this.carouselConfig}
                    paginate={this.paginate}
                    navigatePrevious={this.props.selectItem}
                    navigateNext={this.props.selectItem}
                    hidePagination={this.state.hidePagination}
                    flatArrow
                >
                    {this._renderFirstSlide()}

                    {this._renderSlides()}
                </Carousel>
            </div>
        );
    }
}

Banner.propTypes = {
    timeBeforeMountSlidesAsMilliseconds: PropTypes.number
};

Banner.defaultProps = {
    timeBeforeMountSlidesAsMilliseconds: 2000
};

export default Banner;
