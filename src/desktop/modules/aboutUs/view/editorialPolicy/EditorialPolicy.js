/* eslint-disable max-len */
import React from "react";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class EditorialPolicy extends React.Component {
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
                className="editorial-policy"
                dangerouslySetInnerHTML={{__html: this.HTMLResource.about.editorialPolicy.content}}
            />
        );
    }
}

export default EditorialPolicy;
