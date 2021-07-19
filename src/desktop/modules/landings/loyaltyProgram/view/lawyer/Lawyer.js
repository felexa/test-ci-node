import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Lawyer extends React.Component {
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
            <section className="lawyer section">
                <div className="container-fluid">
                    <header className="lawyer__header">
                        <h2 className="section__title lawyer__title">
                            {this.HTMLResource.loyaltyProgram.lawyer.title}
                        </h2>
                    </header>

                    <div
                        className="lawyer__body color-black"
                        dangerouslySetInnerHTML={{__html: this.HTMLResource.loyaltyProgram.lawyer.description}}
                    />
                </div>
            </section>
        );
    }
}

export default Lawyer;
