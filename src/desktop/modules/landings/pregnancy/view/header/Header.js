import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <header className="pregnancy__header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8">
                            <h1 className="pregnancy__title f-weight-5">
                                { this.HTMLResource.pregnancy.title }
                            </h1>

                            <p
                                className="pregnancy__subtitle"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.pregnancy.subtitle }}
                            />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
