import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Process from "./process/Process";
import Find from "./find/main";
import Buy from "./buy/main";
import Payment from "./payment/Payment";

class HowTo extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className="how-to">
                <header className="how-to__header">
                    <p>
                        {this.HTMLResource.about.howto.headText}
                    </p>
                </header>

                <div className="how-to__body">
                    <Process />
                    <Find />
                    <Buy />
                    <Payment />
                </div>
            </section>
        );
    }
}

export default HowTo;
