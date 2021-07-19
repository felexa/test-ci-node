/* eslint-disable */
import React from "react";

import Env from "app/core/environment";

import Resource from "app/core/resource";

import Image from "app/core/entities/image/Image";

import ModalDialogService from "app/core/services/modalDialog"; // todo refact

import Carousel from "components/carousel/Carousel";

class Warranty extends React.Component {
    constructor(props) {
        super(props);

        this.carouselConfig = {
            slidesPerView: "auto",
            slideClass: "swiper-slide",
            loop: false,
            spaceBetween: 10,
            centeredSlides: false,
            autoplay: {
                delay: 4000
            },
            speed: 1250
        };

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.ModalDialogService = ModalDialogService.getInstance();

        this._showCertificate = this._showCertificate.bind(this);
    }

    /**
     * @private
     * @method _getCertificates
     * @returns {Array}
     */
    _getCertificates() {
        return [
            {
                "alt": "Сертифікат № 01/2016/GDP",
                "title": "Сертифікат № 01/2016/GDP",
                "src": {
                    "small": "",
                    "medium": "",
                    "large": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/sert1.png",
                    "original": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/preview/cert1.png"
                }
            },
            {
                "alt": "Сертифікат № 04/2018/GDP",
                "title": "Сертифікат № 04/2018/GDP",
                "src": {
                    "small": "",
                    "medium": "",
                    "large": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/sert2.png",
                    "original": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/preview/cert2.png"
                }
            },
            {
                "alt": "Сертифікат № 05/2018/GDP",
                "title": "Сертифікат № 05/2018/GDP",
                "src": {
                    "small": "",
                    "medium": "",
                    "large": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/sert3.png",
                    "original": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/preview/cert3.png"
                }
            },
            {
                "alt": "Сертифікат № 08/2018/GDP",
                "title": "Сертифікат № 08/2018/GDP",
                "src": {
                    "small": "",
                    "medium": "",
                    "large": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/sert4.png",
                    "original": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/preview/cert4.png"
                }
            },
            {
                "alt": "Сертифікат № 03/2018/GDP",
                "title": "Сертифікат № 03/2018/GDP",
                "src": {
                    "small": "",
                    "medium": "",
                    "large": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/sert5.png",
                    "original": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/preview/cert5.png"
                }
            },
            {
                "alt": "Сертифікат № 07/2018/GDP",
                "title": "Сертифікат № 07/2018/GDP",
                "src": {
                    "small": "",
                    "medium": "",
                    "large": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/sert6.png",
                    "original": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/preview/cert6.png"
                }
            },
            {
                "alt": "Сертифікат № 12/2019/GDP",
                "title": "Сертифікат № 12/2019/GDP",
                "src": {
                    "small": "",
                    "medium": "",
                    "large": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/sert7.png",
                    "original": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/preview/cert7.png"
                }
            },
            {
                "alt": "Сертифікат № 04/2019/GDP",
                "title": "Сертифікат № 04/2019/GDP",
                "src": {
                    "small": "",
                    "medium": "",
                    "large": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/sert8.png",
                    "original": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/preview/cert8.png"
                }
            },
            {
                "alt": "Сертифікат № 05/2019/GDP",
                "title": "Сертифікат № 05/2019/GDP",
                "src": {
                    "small": "",
                    "medium": "",
                    "large": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/sert9.png",
                    "original": "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/warranty/preview/cert9.png"
                }
            }
        ].map(image => new Image(image));
    }

    /**
     * @private
     * @method _showCertificate
     * @param certificate {Image}
     * @returns {void}
     */
    _showCertificate(certificate) {
        this.ModalDialogService.open({
            className: "certificate",
            body: <img src={certificate.getLarge()} alt={certificate.getAlt()} />,
            size: this.ModalDialogService.getSizes().getLg()
        });
    }

    /**
     * @private
     * @method _renderCertificates
     * @returns {Array}
     */
    _renderCertificates() {
        return this._getCertificates().map((image, i) => (
            <div
                className="swiper-slide"
                key={i}
            >
                <a href={image.getLarge()} target="_blank">
                    <img
                        data-src={image.getOriginal()}
                        className="lazyload"
                        alt={image.getAlt()}
                    />
                </a>
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="warranty">
                <div
                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.warranty.content}}
                    className="warranty__content"
                />

                <div className="warranty__certificates certificates">
                    <p className="certificates__title">
                        {this.HTMLResource.about.warranty.qualityAssurance}
                    </p>

                    <Carousel
                        config={this.carouselConfig}
                        showBlur
                        // items={this._getCertificates()}
                        // preview={this._getCertificates()[0]}
                        // clickOnThumb={this.props.clickOnGalleryThumb}
                    >
                        { this._renderCertificates() }
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default Warranty;
