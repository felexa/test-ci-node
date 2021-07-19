import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Warning extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <div className="pregnancy__warning alert-warning">
                <p className="mb-8">
                    <strong className="f-weight-5">{ this.stringsResource.warning }!</strong>
                </p>

                <p className="mb-8">
                    { this.HTMLResource.pregnancy.warning.consult }
                </p>

                <p dangerouslySetInnerHTML={{__html: this.HTMLResource.pregnancy.warning.responsibility}} />
            </div>
        );
    }
}

export default Warning;
