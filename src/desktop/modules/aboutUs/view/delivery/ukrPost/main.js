/* eslint-disable max-len */
import React from 'react';

import Env from "app/core/environment";
import Resource from "app/core/resource";

class UkrPost extends React.Component {
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
            <section className="delivery__section delivery__ukr-post ukr-post" id="ukr-post">
                <header className="section__header ukr-post__header">
                    <div className="section__preview ukr-post__preview">
                        <img
                            src={`${this.env.getMainImageRepository()}/about/delivery/ukr-post/preview.svg`}
                            alt="Preview"
                        />
                    </div>
                    <h3 className="section__title ukr-post__title">
                        {this.HTMLResource.about.delivery.ukrPost.name} {this.HTMLResource.about.delivery.courierAndDepartments}
                    </h3>
                </header>

                <div className="ukr-post__body">
                    <div className="section__description prices__description">
                        <p>
                            {this.HTMLResource.about.delivery.deliveryPrice}
                        </p>

                        <ul className="section__description section__list prices__items">
                            <li className="prices__item">
                                {this.HTMLResource.about.delivery.toDepartment} {this.HTMLResource.about.delivery.ukrPost.name} - {this.HTMLResource.about.delivery.ukrPost.toDepartmentPrice}
                            </li>

                            <li className="prices__item">
                                {this.HTMLResource.about.delivery.byCourier} {this.HTMLResource.about.delivery.ukrPost.name} - {this.HTMLResource.about.delivery.ukrPost.byCourierPrice}
                            </li>
                        </ul>

                        <strong>
                            {this.HTMLResource.about.delivery.free}
                        </strong>
                    </div>

                    <div className="section__subsection ukr-post__delivery-conditions delivery-conditions">
                        <p className="section__subtitle delivery-conditions__title">
                            {this.HTMLResource.about.delivery.conditions} {this.HTMLResource.about.delivery.ukrPost.name}
                        </p>

                        <div className="delivery-conditions__description">
                            <p className="section__description">
                                {this.HTMLResource.about.delivery.ukrPost.conditionsDescription}
                            </p>
                        </div>
                    </div>

                    <div className="ukr-post__payment-types payment-types">
                        <p className="section__subtitle payment-types__title">
                            {this.HTMLResource.about.delivery.paymentsMethods}
                        </p>

                        <div className="payment-types__description">
                            <ul className="schedule__items section__list">
                                <li className="schedule__item">
                                    {this.HTMLResource.about.delivery.ukrPost.paymentsMethodsList.card}
                                </li>

                                <li className="schedule__item">
                                    {this.HTMLResource.about.delivery.ukrPost.paymentsMethodsList.cash}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default UkrPost;
