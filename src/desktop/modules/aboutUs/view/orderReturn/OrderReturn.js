import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class OrderReturn extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
    * @public
    * @method render
    * @returns {String}
    */
    render() {
        return (
            <div
                dangerouslySetInnerHTML={{__html: this.HTMLResource.about.orderReturn.content}}
                className="order-return"
            />
        );
    }
}

export default OrderReturn;
