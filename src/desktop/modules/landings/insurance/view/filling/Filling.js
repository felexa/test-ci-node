/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Price from "desktop/components/price/Price";

class Filling extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="section insurance__filling filling">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="filling__header">
                                <div
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.title}}
                                    className="section__title filling__title"
                                />

                                <div
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.description}}
                                    className="filling__description text-center color-black"
                                />
                            </div>

                            <div className="filling__body">
                                <div className="filling__items d-flex justify-content-between flex-wrap flex-lg-nowrap overflow-hidden bg-white">

                                    <div className="filling__item  w-100">
                                        <div className="item__header">
                                            <div className="item__title">
                                                {this.HTMLResource.insurance.filling.medicalConcierge.title}
                                            </div>
                                        </div>

                                        <div className="item__body">
                                            <div className="item__subtitle f-weight-5 color-black">
                                                {this.HTMLResource.insurance.filling.medicalConcierge.subtitle}
                                            </div>

                                            <div className="item__list list">
                                                <div className="list__point">
                                                    <i className="icon icon-done" />
                                                    <span dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.medicalConcierge.prevention}} />
                                                </div>

                                                <div className="list__point">
                                                    <i className="icon icon-done" />
                                                    <span dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.medicalConcierge.psychologicalSupport}} />
                                                </div>

                                                <div className="list__point">
                                                    <i className="icon icon-done" />
                                                    <span dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.medicalConcierge.laboratoryConsultation}} />
                                                </div>

                                                <div className="list__point">
                                                    <i className="icon icon-done" />
                                                    <span dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.medicalConcierge.hospitalConsultation}} />
                                                </div>
                                            </div>

                                            <Price
                                                value={3000}
                                                className="item__price item__price--total"
                                            />
                                        </div>
                                    </div>

                                    <div className="filling__item  w-100">
                                        <div className="item__header">
                                            <div
                                                dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.caseIllness.title}}
                                                className="item__title"
                                            />
                                        </div>

                                        <div className="item__body">
                                            <div className="item__subtitle f-weight-5 color-black">
                                                {this.HTMLResource.insurance.filling.caseIllness.subtitle}
                                            </div>

                                            <div className="item__list list">
                                                <div className="list__point">
                                                    <i className="icon icon-done" />
                                                    <span dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.caseIllness.treatmentWithoutResuscitation}} />
                                                </div>

                                                <Price
                                                    value={7000}
                                                    className="item__price"
                                                />

                                                <div className="item__separator" />

                                                <div className="list__point">
                                                    <i className="icon icon-done" />
                                                    <span dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.caseIllness.treatmentWithResuscitation}} />
                                                </div>

                                                <Price
                                                    value={10000}
                                                    className="item__price"
                                                />

                                                <div className="item__separator" />

                                                <div className="list__point">
                                                    <i className="icon icon-done" />
                                                    <span dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.caseIllness.death}} />
                                                </div>

                                                <Price
                                                    value={10000}
                                                    className="item__price"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="filling__conditions bg-white">
                                    <div className="conditions__item d-flex align-items-center">
                                        <div className="item__name d-flex align-items-center">
                                            <i className="icon-time item__icon" />
                                            <span>
                                                {this.HTMLResource.insurance.filling.conditions.validity.name}
                                            </span>
                                        </div>

                                        <div className="item__value f-weight-5 color-black">
                                            {this.HTMLResource.insurance.filling.conditions.validity.value}
                                        </div>
                                    </div>

                                    <div className="conditions__item d-flex align-items-center">
                                        <div className="item__name d-flex align-items-center">
                                            <i className="icon-price item__icon" />
                                            <span>
                                                {this.HTMLResource.insurance.filling.conditions.price.name}
                                            </span>
                                        </div>

                                        <div className="item__value f-weight-5 color-black">
                                            {this.HTMLResource.insurance.filling.conditions.price.value}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="filling__footer">
                                <p
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.filling.instruction}}
                                    className="filling__instruction text-center color-black"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Filling;
