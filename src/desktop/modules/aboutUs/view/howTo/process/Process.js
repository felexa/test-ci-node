import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Process extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
        this.env = Env.getInstance();
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className="how-to-section process">
                <header className="process__header">
                    <h2 className="how-to-section__title process__title">
                        {this.HTMLResource.about.howto.howProcessGoing}
                    </h2>
                </header>

                <div className="process__body">
                    <div className="process__items d-flex justify-content-between">
                        <div className="process__item">
                            <div className="item__preview d-flex align-items-center justify-content-center">
                                <img
                                    src={`${this.env.getMainImageRepository()}/about/howto/process1.svg`}
                                    alt={this.HTMLResource.about.howto.findProduct}
                                />
                            </div>

                            <p className="item__description text-center">
                                {this.HTMLResource.about.howto.findProduct}
                            </p>
                        </div>

                        <div className="process__item-divider" />

                        <div className="process__item">
                            <div className="item__preview d-flex align-items-center justify-content-center">
                                <img
                                    src={`${this.env.getMainImageRepository()}/about/howto/process2.svg`}
                                    alt={this.HTMLResource.about.howto.registerOrder}
                                />
                            </div>

                            <p className="item__description text-center">
                                {this.HTMLResource.about.howto.registerOrder}
                            </p>
                        </div>

                        <div className="process__item-divider" />

                        <div className="process__item">
                            <div className="item__preview d-flex align-items-center justify-content-center">
                                <img
                                    src={`${this.env.getMainImageRepository()}/about/howto/process3.svg`}
                                    alt={this.HTMLResource.about.howto.choosePaymentMethod}
                                />
                            </div>

                            <p className="item__description text-center">
                                {this.HTMLResource.about.howto.choosePaymentMethod}
                            </p>
                        </div>

                        <div className="process__item-divider" />

                        <div className="process__item">
                            <div className="item__preview d-flex align-items-center justify-content-center">
                                <img
                                    src={`${this.env.getMainImageRepository()}/about/howto/process4.svg`}
                                    alt={this.HTMLResource.about.howto.awaitingParcel}
                                />
                            </div>

                            <p className="item__description text-center">
                                {this.HTMLResource.about.howto.awaitingParcel}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Process;
