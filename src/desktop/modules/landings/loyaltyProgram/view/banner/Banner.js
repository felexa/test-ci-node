import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Banner extends React.Component {
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
            <section className="banner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7">
                            <header className="banner__header">
                                <h1 className="banner__title color-white line-height-1-5">
                                    {this.HTMLResource.loyaltyProgram.banner.title}
                                </h1>
                            </header>

                            <div className="banner__body">
                                <p className="color-white">
                                    {this.HTMLResource.loyaltyProgram.banner.description}
                                </p>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="banner__image d-flex align-items-center">
                                <img
                                    className="d-none d-md-block"
                                    src={this.Resource.links.images.loyaltyProgram.banner}
                                    alt="img"
                                    width="600"
                                    height="490"
                                />

                                <img
                                    className="d-md-none"
                                    src={this.Resource.links.images.loyaltyProgram.bannerMobile}
                                    alt="img"
                                    width="320"
                                    height="220"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Banner;
