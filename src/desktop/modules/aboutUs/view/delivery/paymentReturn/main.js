/* eslint-disable max-len */
import React from "react";
import Resource from "app/core/resource";
import Env from "app/core/environment";

class PaymentReturn extends React.Component {
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
            <section
                className="delivery__section delivery__payment-return payment-return"
                id="payment-return"
            >
                <header className="section__header payment-return__header">
                    <div className="section__preview payment-return__preview">
                        <img
                            src={`${this.env.getMainImageRepository()}/about/delivery/payment-return/preview.svg`}
                            alt="Preview"
                        />
                    </div>

                    <h3 className="section__title payment-return__title">
                        {this.HTMLResource.about.delivery.paymentReturn.title}
                    </h3>
                </header>

                <div className="payment-return__body">
                    <div
                        dangerouslySetInnerHTML={{__html: this.HTMLResource.about.delivery.paymentReturn.description}}
                        className="payment-return__description"
                    />
                </div>
            </section>
        );
    }
}

export default PaymentReturn;
