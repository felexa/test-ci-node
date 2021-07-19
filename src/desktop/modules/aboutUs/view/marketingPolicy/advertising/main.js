import React from "react";

import Env from "app/core/environment";

import Resource from "app/core/resource";
import Description from "./description";
import Items from "./items/main";

class Advertising extends React.Component {
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
            <div className="marketing-policy__advertising advertising">
                <h2 className="advertising__title">
                    {this.HTMLResource.about.marketingPolicy.advertising.title}
                </h2>

                <Description />

                <Items />
            </div>
        );
    }
}

export default Advertising;
