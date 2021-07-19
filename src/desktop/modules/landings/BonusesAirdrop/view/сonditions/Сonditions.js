/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Conditions extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="bonuses-airdrop__banner conditions">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <header className="conditions__header">
                                <h1
                                    className="conditions__title color-black"
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.bonusesAirdrop.banner.title}}
                                />
                            </header>

                            <div className="conditions__body">
                                <p
                                    className="conditions__description color-black line-height-1-5"
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.bonusesAirdrop.banner.description}}
                                />

                                <p
                                    className="conditions__validity color-black d-none d-lg-block"
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.bonusesAirdrop.banner.promotionConditions}}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 color-black">
                            <div className="conditions__preview">
                                <img
                                    src={this.Resource.links.images.bonusesAirdrop.banner}
                                    alt="img"
                                    width="520"
                                    height="547"
                                />
                            </div>

                            <p
                                className="conditions__promotion-conditions color-black text-center d-lg-none"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.bonusesAirdrop.banner.promotionConditions}}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Conditions;
