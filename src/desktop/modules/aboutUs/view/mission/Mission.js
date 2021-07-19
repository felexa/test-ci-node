/* eslint-disable react/prop-types */
import React from "react";

import Env from "app/core/environment";

import Resource from "app/core/resource";

import Redactor from "components/redactor/Redactor";
import Way from './way/Way';
import Target from './target/Target';

class Mission extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <div className="mission">
                <div className="mission__body">
                    <Redactor
                        className="mb-16"
                        lastUpdateDate={new Date("9/11/2020 16:00:00")}
                        profile={this.props.redactor}
                        reviewer={this.props.reviewer}
                    />

                    <div className="mission__alert-info alert-info">
                        {this.HTMLResource.about.mission.alertInfo}
                    </div>

                    <Way />

                    <Target />
                </div>
            </div>
        );
    }
}

export default Mission;
