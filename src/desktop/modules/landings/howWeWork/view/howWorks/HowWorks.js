/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class HowWorks extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

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

        this.freeShipping = "FREE SHIPPING";

        this.price = {
            reviews: "от 10 грн",
            cashback: "5 грн",
            likes: "по 1 грн",
            freeShipping: "55 грн"
        };
    }

    render() {
        return (
            <section className="how-works section color-white">
                <div className="container-fluid">
                    <header className="how-works__header">
                        <h2 className="how-works__title section__title color-white f-weight-5">
                            {this.HTMLResource.howWeWork.howWorks.title}
                        </h2>
                    </header>

                    <div className="how-works__body">
                        <div className="how-works__description d-lg-flex justify-content-between">
                            <div className="description__text" dangerouslySetInnerHTML={{__html: this.HTMLResource.howWeWork.howWorks.description}} />

                            <div className="description__preview">
                                <div className="bonus">
                                    <img
                                        src="https://i.apteka24.ua/stickers/morkovki.svg?new"
                                        alt="preview"
                                        width="70"
                                        height="70"
                                    />
                                </div>

                                <div className="bonus">
                                    <img
                                        src={this.Resource.links.icons.bonuses}
                                        alt="preview"
                                        width="70"
                                        height="70"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="how-works__example d-lg-flex justify-content-between">
                            <div className="example__text">
                                <div dangerouslySetInnerHTML={{__html: this.HTMLResource.howWeWork.howWorks.example}} />

                                <div className="example__discount-calc d-lg-flex align-items-center text-center">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <img
                                            src={this.Resource.links.images.employeeDiscount.box}
                                            alt="preview"
                                            width="40"
                                            height="40"
                                        />
                                        <span className="discount-calc__value">300 - </span>

                                        <img
                                            src={this.Resource.links.images.employeeDiscount.present}
                                            alt="preview"
                                            width="40"
                                            height="40"
                                        />
                                        <span className="discount-calc__value">105 = </span>

                                        <img
                                            src={this.Resource.links.images.employeeDiscount.congratulations}
                                            alt="preview"
                                            width="40"
                                            height="40"
                                        />
                                        <span className="discount-calc__value">195грн</span>
                                    </div>

                                    <div className="economy">
                                        <span className="economy__text">{this.stringsResource.saving}</span>
                                        <span className="economy__value">35%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="example__preview d-flex justify-content-center">
                                <div className="preview__left-col">
                                    <div className="bonus">
                                        <div>
                                            + <br />
                                            {this.stringsResource.reviews} <br />
                                            <b>{this.price.reviews}</b>
                                        </div>
                                    </div>

                                    <div className="bonus">
                                        <div>
                                            + <br />
                                            {this.stringsResource.cashback} <br />
                                            <b>{this.price.cashback}</b>
                                        </div>
                                    </div>
                                </div>

                                <div className="preview__right-col">
                                    <div className="bonus">
                                        <div>
                                            + <br />
                                            {this.stringsResource.likes} <br />
                                            <b>{this.price.likes}</b>
                                        </div>
                                    </div>

                                    <div className="bonus">
                                        <div>
                                            + <br />
                                            {this.freeShipping} <br />
                                            <b>{this.price.freeShipping}</b>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default HowWorks;
