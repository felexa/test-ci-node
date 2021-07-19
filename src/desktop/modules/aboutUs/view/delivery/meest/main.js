/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Meest extends React.Component {
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
            <section className="delivery__section delivery__meest meest" id="meest">
                <header className="section__header meest__header">
                    <div className="section__preview meest__preview">
                        <img
                            src={`${this.env.getMainImageRepository()}/about/delivery/meest/preview.svg`}
                            alt="Preview"
                        />
                    </div>

                    <h3 className="section__title meest__title">
                        {this.HTMLResource.about.delivery.meestPost.name} {this.HTMLResource.about.delivery.courierAndDepartments}
                    </h3>
                </header>

                <div className="meest__body">
                    <div className="section__description prices__description">
                        <p>
                            {this.HTMLResource.about.delivery.deliveryPrice}
                        </p>

                        <ul className="section__description section__list prices__items">
                            <li className="prices__item">
                                {this.HTMLResource.about.delivery.toDepartment} {this.HTMLResource.about.delivery.meestPost.name} - {this.HTMLResource.about.delivery.meestPost.toDepartmentPrice}
                            </li>

                            <li className="prices__item">
                                {this.HTMLResource.about.delivery.byCourier} {this.HTMLResource.about.delivery.meestPost.name} - {this.HTMLResource.about.delivery.meestPost.byCourierPrice}
                            </li>
                        </ul>

                        <strong>
                            {this.HTMLResource.about.delivery.free}
                        </strong>
                    </div>

                    <div className="section__subsection meest__delivery-conditions delivery-conditions">
                        <p className="section__subtitle delivery-conditions__title">
                            {this.HTMLResource.about.delivery.conditions} {this.HTMLResource.about.delivery.meestPost.name}
                        </p>

                        <div
                            className="delivery-conditions__description"
                            dangerouslySetInnerHTML={{__html: this.HTMLResource.about.delivery.meestPost.conditionsDescription}}
                        />
                    </div>

                    <div className="meest__payment-types payment-types">
                        <p className="section__subtitle payment-types__title">
                            {this.HTMLResource.about.delivery.paymentsMethods}
                        </p>

                        <div className="payment-types__description">
                            <ul className="schedule__items section__list">
                                <li className="schedule__item">
                                    {this.HTMLResource.about.delivery.meestPost.paymentsMethodsList.card}
                                </li>

                                <li className="schedule__item">
                                    {this.HTMLResource.about.delivery.meestPost.paymentsMethodsList.cash}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Meest;
