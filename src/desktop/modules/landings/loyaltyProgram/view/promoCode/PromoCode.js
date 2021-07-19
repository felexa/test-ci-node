/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Box from "app/core/components/Box";

class PromoCode extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="promo-code section">
                <div className="container-fluid">
                    <header className="promo-code__header">
                        <h2 className="section__title promo-code__title">
                            {this.HTMLResource.loyaltyProgram.promoCode.title}
                        </h2>
                    </header>

                    <div className="promo-code__body">
                        <Box
                            component="div"
                            rounded={16}
                            className="content-box promo-code__instruction bg-white new-super-box-shadow color-black text-center line-height-1-5"
                        >
                            <div className="content-box__preview d-flex align-items-center justify-content-center">
                                <img
                                    src={this.Resource.links.icons.code}
                                    alt="preview"
                                    width="60"
                                    height="60"
                                />
                            </div>

                            <p>
                                {this.HTMLResource.loyaltyProgram.promoCode.description}
                            </p>

                            <section className="instruction__how-get how-get">
                                <header className="how-get__header">
                                    <h3 className="how-get__title f-weight-5 color-black text-center">
                                        {this.HTMLResource.loyaltyProgram.promoCode.waysToGet.title}
                                    </h3>
                                </header>

                                <div className="how-get__body">
                                    <ul className="how-get__list d-lg-flex justify-content-between ">
                                        <li className="how-get__item">
                                            <div className="how-get__number">1</div>
                                            <div
                                                className="how-get__description"
                                                dangerouslySetInnerHTML={{__html: this.HTMLResource.loyaltyProgram.promoCode.waysToGet.social}}
                                            />
                                        </li>

                                        <li className="how-get__item">
                                            <div className="how-get__number">2</div>

                                            <div
                                                className="how-get__description"
                                                dangerouslySetInnerHTML={{__html: this.HTMLResource.loyaltyProgram.promoCode.waysToGet.partners}}
                                            />
                                        </li>

                                        <li className="how-get__item">
                                            <div className="how-get__number">3</div>
                                            <div
                                                className="how-get__description"
                                                dangerouslySetInnerHTML={{__html: this.HTMLResource.loyaltyProgram.promoCode.waysToGet.promotions}}
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            <div className="instruction__feature text-center">
                                {this.HTMLResource.loyaltyProgram.promoCode.ifCancelOrder}
                            </div>
                        </Box>
                    </div>
                </div>
            </section>
        );
    }
}

export default PromoCode;
