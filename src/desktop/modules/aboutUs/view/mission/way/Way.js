import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Way extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <section className="way">
                <header className="way__header">
                    <h2>
                        {this.HTMLResource.about.mission.wayTitle}
                    </h2>
                </header>

                <div
                    className="way__body"
                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.mission.wayBody}}
                />
            </section>
        );
    }
}

export default Way;
