import React from "react";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class PharmacyCourier extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.env = Env.getInstance();
        // eslint-disable-next-line react/prop-types
        // this.freeDeliveryLastDate = props.freeDeliveryLastDate;
    }

    /**
     * @private
     * @method _getAvailableCities
     * @returns {Array}
     */
    _getAvailableCities() {
        return this.HTMLResource.about.delivery.availableCities.split(",");
    }

    /**
     * @private
     * @method _renderAvailableCities
     * @returns {Array}
     */
    _renderAvailableCities() {
        return this._getAvailableCities().map(function (item) {
            return (
                <li className="availability__item" key={item}>
                    {item}
                </li>
            );
        });
    }

    /**
     * @public
     * @method render
     * @returns {String}
     */
    render() {
        return (
            <section className="delivery__section delivery__pharmacy-courier pharmacy-courier" id="pharmacy-courier">
                <header className="section__header pharmacy-courier__header">
                    <div className="section__preview pharmacy-courier__preview">
                        <img
                            src={`${this.env.getMainImageRepository()}/about/delivery/pharmacy-courier/preview.svg`}
                            alt="Preview"
                        />
                    </div>

                    <h3 className="section__title pharmacy-courier__title">
                        {this.HTMLResource.about.delivery.courier} {this.HTMLResource.about.delivery.a24.name}
                    </h3>
                </header>

                <div className="pharmacy-courier__body">
                    <div className="section__subsection pharmacy-courier__availability availability">
                        <p className="availability__title">{this.HTMLResource.about.delivery.availability}</p>

                        <ul className="availability__items">{this._renderAvailableCities()}</ul>
                    </div>

                    <div className="section__subsection pharmacy-courier__prices prices">
                        <p className="section__subtitle prices__title">
                            {/* eslint-disable-next-line max-len */}
                            {this.HTMLResource.about.delivery.deliveryServicePrice} {this.HTMLResource.about.delivery.a24.name}
                        </p>

                        <div className="section__description prices__description">
                            <ul className="section__description section__list prices__items">
                                <li className="prices__item">
                                    {this.HTMLResource.about.delivery.a24.priceForSomeCities}
                                </li>
                            </ul>

                            <strong>
                                {this.HTMLResource.about.delivery.free}
                            </strong>
                        </div>
                    </div>

                    <div className="section__subsection pharmacy-courier__how-works how-works">
                        <p className="section__subtitle prices__title">
                            {this.HTMLResource.about.delivery.a24.howWorks}
                        </p>

                        <div className="how-works__description">
                            <p className="section__description">
                                {this.HTMLResource.about.delivery.a24.description}
                            </p>

                            <p
                                className="section__description"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.about.delivery.a24.workingTime}}
                            />
                        </div>

                        <div className="how-works__schedule">
                            <p className="schedule__title">
                                {this.HTMLResource.about.delivery.a24.schedule}
                            </p>

                            <ul
                                className="schedule__items section__list"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.about.delivery.a24.scheduleList}}
                            />

                            <p className="section__description">
                                {this.HTMLResource.about.delivery.a24.ifChangedConditions}
                            </p>
                        </div>

                        <div className="how-works__warning alert-warning">
                            {this.HTMLResource.about.delivery.a24.warning}
                        </div>
                    </div>

                    <div className="pharmacy-courier__payment-types payment-types">
                        <p className="section__subtitle payment-types__title">
                            {this.HTMLResource.about.delivery.a24.paymentsMethods}
                        </p>

                        <div className="payment-types__description">
                            <ul className="schedule__items section__list">
                                <li className="schedule__item">
                                    {this.HTMLResource.about.delivery.a24.paymentsMethodsList.courier}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default PharmacyCourier;
