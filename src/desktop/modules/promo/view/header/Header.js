/* eslint-disable max-len */
import React from "react";
import Env from "app/core/environment";

import Timer from "desktop/components/timer/Timer";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.env = Env.getInstance();
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <header className="promo__header">
                <div className="container-fluid">
                    <div className="row row--no-horizontal-sm-margins">
                        <div className="col">
                            <h1>
                                Препараты для осенней аптечки -10%
                            </h1>

                            <div className="promo__preview mb-16">
                                <img
                                    src={`${this.env.getBitrixApiHost()}/i.apteka24.ua/morkovka/frame_1665.png`}
                                    alt="-10% на препараты от простуды"
                                />
                            </div>

                            <div className="promo__timer d-flex flex-column align-items-center">
                                <p>До конца акции осталось:</p>

                                <Timer expireDate={new Date(2020, 9, 6, 23, 59, 59)} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
