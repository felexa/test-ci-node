import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Payment extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <p className="m-0 text-black">
                {this.HTMLResource.paymentTypes}
            </p>
        );
    }
}

export default Payment;
