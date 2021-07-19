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
     * @returns {string}
     */
    render() {
        return (
            <div className="warning warning--product alert-warning">
                <p>
                    <strong>
                        {this.stringsResource.attentionToThisItems}!
                    </strong>
                </p>

                <p>
                    {this.HTMLResource.warnings.informationInTheInstruction}.
                </p>

                <p>
                    {this.HTMLResource.warnings.establishingDiagnosis}!
                </p>

                <p dangerouslySetInnerHTML={{__html: `${this.HTMLResource.warnings.refusingOfResponsibility}.`}} />
            </div>
        );
    }
}

export default Warning;
