/* eslint-disable max-len */
import React from 'react';

import Resource from "app/core/resource";
import Env from "app/core/environment";

class Buy extends React.Component {
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
            <section className="how-to-section buy">
                <div className="buy__body">
                    <div className="buy__choose choose d-flex">
                        <div className="choose__description">
                            <h2 className="how-to-section__title buy__title">
                                {this.HTMLResource.about.howto.buy}
                            </h2>

                            <p>
                                {this.HTMLResource.about.howto.buyInstruction}
                            </p>
                        </div>

                        <div className="choose__preview box-shadow-6 rounded-10">
                            <img src="https://s3-eu-west-1.amazonaws.com/i-qa.apteka24.ua/buy-1.png" alt="preview" />
                        </div>
                    </div>

                    <div className="buy__buttons buttons">
                        <h3 className="buttons__title f-weight-5">
                            {this.HTMLResource.about.howto.buttonsFeatures}
                        </h3>

                        <div className="buttons__items">
                            <div className="buttons__item">
                                <div className="item__preview">
                                    <img src="https://s3-eu-west-1.amazonaws.com/i-qa.apteka24.ua/buy/buy-btn-1.png" alt="preview" />
                                </div>

                                <p
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.howto.oneClickBuyButton}}
                                />
                            </div>

                            <div className="buttons__item">
                                <div className="item__preview">
                                    <img src="https://s3-eu-west-1.amazonaws.com/i-qa.apteka24.ua/buy/buy-btn-2.png" alt="preview" />
                                </div>

                                <p
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.howto.buyButton}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="buy__modals modals">
                        <p
                            dangerouslySetInnerHTML={{__html: this.HTMLResource.about.howto.modals}}
                        />

                        <p>
                            {this.HTMLResource.about.howto.itLookLike}
                        </p>

                        <div className="modals__instructions d-flex">
                            <div className="modals__items">
                                <div className="modals__item rounded-10 box-shadow-6">
                                    <img src="https://s3-eu-west-1.amazonaws.com/i-qa.apteka24.ua/buy/buy-instruction-1.png" alt="preview" />
                                </div>

                                <div className="modals__item rounded-10 box-shadow-6">
                                    <img src="https://s3-eu-west-1.amazonaws.com/i-qa.apteka24.ua/buy/buy-instruction-2.png" alt="preview" />
                                </div>
                            </div>

                            <p
                                className="buy__certificate buy__certificate--mobile"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.about.howto.addCertificate}}
                            />

                            <div className="modals__items">
                                <div className="modals__item rounded-10 box-shadow-6">
                                    <img src="https://s3-eu-west-1.amazonaws.com/i-qa.apteka24.ua/buy/buy-instruction-3.png" alt="preview" />
                                </div>

                                <div className="modals__item rounded-10 box-shadow-6">
                                    <img src="https://s3-eu-west-1.amazonaws.com/i-qa.apteka24.ua/buy/buy-instruction-4.png" alt="preview" />
                                </div>
                            </div>
                        </div>

                        <p
                            className="buy__certificate buy__certificate--desktop"
                            dangerouslySetInnerHTML={{__html: this.HTMLResource.about.howto.addCertificate}}
                        />
                    </div>
                </div>

                <footer className="buy__footer">
                    <p
                        className="buy__certificate buy__certificate--desktop"
                        dangerouslySetInnerHTML={{__html: this.HTMLResource.about.howto.pushOrderButton}}
                    />
                </footer>
            </section>
        );
    }
}

export default Buy;
