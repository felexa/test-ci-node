import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Image from "components/image/Image";
import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import DeviceMobile from "components/deviceDetector/mobile/Detector";

import DeviceDetector from "app/core/utilites/deviceDetector";

class PromoBanner extends React.Component {
    constructor(props) {
        super(props);

        this.deviceDetector = DeviceDetector.getInstance();

        this.timeToLoadBannerAsMilliseconds = 2000;

        this.timeToChangeBannerAsMilliseconds = 3000;

        this.topBannerSliderInterval = null;

        this.state = {
            banners: [],
            activeSlide: 0
        };

        this._redirectToPromo = this._redirectToPromo.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this._setBanners();

            this.topBannerSliderInterval = setInterval(() => {
                if (this.state.activeSlide === (this.state.banners.length - 1)) {
                    this._setActiveSlide(0);
                } else {
                    this._setActiveSlide(this.state.activeSlide + 1);
                }
            }, this.timeToChangeBannerAsMilliseconds);
        }, this.timeToLoadBannerAsMilliseconds);
    }

    componentWillUnmount() {
        if (this.topBannerSliderInterval) {
            clearInterval(this.topBannerSliderInterval);
        }
    }

    _isActiveSlide(slideIndex) {
        return slideIndex === this.state.activeSlide;
    }

    _getFirstSlide() {
        return this.props.banners[0];
    }

    _setActiveSlide(slideIndex) {
        this.setState({
            activeSlide: slideIndex
        });

        return this;
    }

    _setBanners() {
        this.setState({
            banners: this.props.banners
        });

        return this;
    }

    _redirectToPromo() {
        window.location.href = this._getFirstSlide().url;
    }

    _renderItems() {
        if (this.state.banners.length) {
            return this.state.banners.map((item, index) => (
                <div
                    key={index}
                    className={classnames(
                        {desktop: this.deviceDetector.isDesktop()},
                        {mobile: this.deviceDetector.isMobile()},
                        {active: this._isActiveSlide(index)}
                    )}
                >
                    <DeviceMobile>
                        <Image
                            data-src={item.mobile.original}
                            title={item.title}
                            className="promo-banner__preview--mobile lazyload"
                            alt={item.title}
                            width={320}
                            height={34}
                        />
                    </DeviceMobile>

                    <DeviceDesktop>
                        <Image
                            data-src={item.desktop.original}
                            title={item.title}
                            className="promo-banner__preview--desktop lazyload"
                            alt={item.title}
                            width={1346}
                            height={40}
                        />
                    </DeviceDesktop>
                </div>
            ));
        }

        return <></>;
    }

    render() {
        return (
            <div
                onClick={this._redirectToPromo}
                className="promo-banner d-flex justify-content-center"
                style={{ background: this._getFirstSlide().background }}
            >
                { this._renderItems() }
            </div>
        );
    }
}

PromoBanner.propTypes = {
    banners: PropTypes.instanceOf(Array).isRequired
};

export default PromoBanner;
