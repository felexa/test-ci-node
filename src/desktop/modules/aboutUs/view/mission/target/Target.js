import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Target extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <section className="target">
                <header className="target__header">
                    <h2>
                        {this.HTMLResource.about.mission.targetTitle}
                    </h2>
                </header>

                <div
                    className="target__body"
                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.mission.targetBody}}
                />
            </section>
        );
    }
}

export default Target;
