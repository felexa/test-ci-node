import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Payment extends React.Component {
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
            <section className="how-to-section payment">
                <header className="payment__header">
                    <h2 className="how-to-section__title">
                        {this.HTMLResource.about.howto.pay}
                    </h2>
                </header>

                <div className="payment__body">
                    <div className="d-sm-flex">
                        <div
                            className="payment__description"
                            dangerouslySetInnerHTML={{__html: this.HTMLResource.about.howto.payDescription}}
                        />

                        <div className="payment__preview">
                            <img
                                src="https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/about/howto/payment-preview.png"
                                alt="How to buy"
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Payment;
