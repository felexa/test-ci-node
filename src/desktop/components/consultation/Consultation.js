import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Consultation extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <div className="consultation d-md-flex justify-content-between align-items-center rounded-16 color-white p-16">
                <div className="d-md-flex align-items-center">
                    <div className="consultation__header d-flex align-items-center">
                        <img
                            className="consultation__pharmacist-photo lazyload"
                            src={this.Resource.links.images.pharmacistPreview}
                            alt="pharmacist"
                            width={60}
                            height={60}
                        />

                        <div className="consultation__title">
                            {this.HTMLResource.pharmacistConsultation.title}

                            <div className="consultation__description">
                                {this.HTMLResource.pharmacistConsultation.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="consultation__body">
                    <div className="consultation__social social d-flex">
                        <a
                            className="social__link social__link--telegram"
                            href={this.Resource.links.telegramPharmacistConsultation}
                            target="_blank"
                        >
                            <img
                                className="social__preview lazyload"
                                src={this.Resource.links.images.telegram.previewRounded}
                                alt="Telegram"
                                width={38}
                                height={38}
                            />

                            <span className="social__name">
                                Telegram
                            </span>
                        </a>

                        <a
                            className="social__link social__link--viber"
                            href={this.Resource.links.viberPharmacistConsultation}
                            target="_blank"
                        >
                            <img
                                className="social__preview lazyload"
                                src={this.Resource.links.images.viber.previewRounded}
                                alt="Viber"
                                width={38}
                                height={38}
                            />

                            <span className="social__name">
                                Viber
                            </span>
                        </a>
                    </div>

                    <div className="consultation__working-time">
                        {this.HTMLResource.pharmacistConsultation.workingTime}
                    </div>
                </div>
            </div>
        );
    }
}

export default Consultation;
