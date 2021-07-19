/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import classnames from "classnames";

class Delivery extends React.Component {
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

        this.delivery = this.HTMLResource.howWeWork.delivery.items;
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.delivery.map((item, index) => (
            <div
                className={classnames("features-item item d-md-flex align-items-center")}
                key={index}
            >

                <div className="item__preview">
                    <img
                        src={item.icon.src.original}
                        alt={item.icon.alt}
                        width="633"
                        height="530"
                    />
                </div>

                <div className="item__body">
                    <div className="item__title f-weight-5 line-height-1-5">
                        {item.title}
                    </div>

                    <div className="item__description line-height-1-5" dangerouslySetInnerHTML={{__html: item.description}} />
                </div>
            </div>
        ));
    }

    render() {
        return (
            <section className="delivery section color-black">
                <div className="container-fluid">
                    <div className="delivery__body">
                        <div className="delivery__example d-lg-flex justify-content-between align-items-center">
                            <div className="example__text">
                                <div className="example__title f-weight-5 line-height-1-5">
                                    {this.HTMLResource.howWeWork.delivery.title}
                                </div>

                                <p>{this.HTMLResource.howWeWork.delivery.offer}</p>

                                <p className="f-weight-5">{this.HTMLResource.howWeWork.delivery.have}</p>

                                <ul>
                                    <li>{this.HTMLResource.howWeWork.delivery.selfPickup}</li>
                                    <li>{this.HTMLResource.howWeWork.delivery.courier}</li>
                                </ul>

                                <p>{this.HTMLResource.howWeWork.delivery.features}</p>
                            </div>

                            <div className="example__preview d-flex justify-content-center">
                                <div className="preview__left-col">
                                    <div className="bonus">
                                        <img
                                            src="https://i.apteka24.ua/landings/how-it-works/icons/delivery.svg"
                                            alt="preview"
                                            width="84"
                                            height="125"
                                        />
                                    </div>

                                    <div className="bonus">
                                        <img
                                            src="https://i.apteka24.ua/landings/how-it-works/icons/delivery-3.svg"
                                            alt="preview"
                                            width="62"
                                            height="62"
                                        />
                                    </div>
                                </div>

                                <div className="preview__right-col">
                                    <div className="bonus">
                                        <img
                                            src="https://i.apteka24.ua/landings/how-it-works/icons/delivery-2.svg"
                                            alt="preview"
                                            width="47"
                                            height="67"
                                        />
                                    </div>

                                    <div className="bonus">
                                        <img
                                            src="https://i.apteka24.ua/landings/how-it-works/icons/delivery-4.svg"
                                            alt="preview"
                                            width="70"
                                            height="70"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="delivery__items">
                            {this._renderItems()}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Delivery;
