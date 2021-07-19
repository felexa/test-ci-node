/* eslint-disable max-len */
import React from "react";
import Resource from "app/core/resource";
import Env from "app/core/environment";

class SelfDelivery extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.env = Env.getInstance();
    }

    /**
     * @public
     * @method render
     * @returns {String}
     */
    render() {
        return (
            <section className="delivery__section delivery__self-delivery self-delivery" id="self-delivery">
                <header className="section__header self-delivery__header">
                    <div className="section__preview self-delivery__preview">
                        <img
                            src={`${this.env.getMainImageRepository()}/about/delivery/pick-up/preview.svg`}
                            alt="Preview"
                        />
                    </div>

                    <h3 className="section__title self-delivery__title">
                        {this.HTMLResource.about.delivery.selfDelivery.title}
                    </h3>
                </header>

                <div className="self-delivery__body">
                    <div className="section__subsection self-delivery__how-works">
                        <p className="section__subtitle how-works__title">
                            {this.HTMLResource.about.delivery.selfDelivery.howWork}
                        </p>

                        <div
                            dangerouslySetInnerHTML={{__html: this.HTMLResource.about.delivery.selfDelivery.description}}
                            className="how-works__description"
                        />
                    </div>

                    <div className="self-delivery__payment-types payment-types">
                        <p className="section__subtitle payment-types__title">
                            {this.HTMLResource.about.delivery.selfDelivery.paymentsMethods}
                        </p>

                        <div className="payment-types__description">
                            <ul className="schedule__items section__list">
                                <li className="schedule__item">
                                    {this.HTMLResource.about.delivery.selfDelivery.paymentsMethodsList.cardOrCash}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SelfDelivery;
