import React from "react";

import Env from "app/core/environment";

import Resource from "app/core/resource";
import Advertising from "./advertising/main";

class MarketingPolicy extends React.Component {
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
            <div className="marketing-policy">
                <header
                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.marketingPolicy.headerContent}}
                    className="marketing-policy__header"
                />

                <div className="marketing-policy__body">
                    <Advertising />

                    <div
                        dangerouslySetInnerHTML={{__html: this.HTMLResource.about.marketingPolicy.warning}}
                        className="marketing-policy__warning alert-danger"
                    />
                </div>
            </div>
        );
    }
}

export default MarketingPolicy;
