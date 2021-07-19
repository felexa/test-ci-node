/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Members from "app/desktop/components/members/Members";

class Team extends React.Component {
    constructor() {
        super();

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="team">
                <div className="team__body">
                    <div
                        className="team__description"
                        dangerouslySetInnerHTML={{__html: this.HTMLResource.about.team.aboutTeam}}
                    />
                    <Members items={this.props.manager} />

                    <div
                        className="team__description"
                        dangerouslySetInnerHTML={{__html: this.HTMLResource.about.team.editor}}
                    />
                    <Members items={this.props.editor} />

                    <div
                        className="medical-experts__description line-height-1-5"
                        dangerouslySetInnerHTML={{__html: this.HTMLResource.medicalExperts.medicalCensorsOfMedicines}}
                    />
                    <Members items={this.props.pharmacists} />

                    <div
                        className="medical-experts__description line-height-1-5"
                        dangerouslySetInnerHTML={{__html: this.HTMLResource.medicalExperts.medicalHealthInformationCensors}}
                    />
                    <Members items={this.props.doctors} />
                </div>
            </div>
        );
    }
}

Team.propTypes = {
    doctors: PropTypes.arrayOf(PropTypes.object),
    pharmacists: PropTypes.arrayOf(PropTypes.object),
    manager: PropTypes.arrayOf(PropTypes.object),
    editor: PropTypes.arrayOf(PropTypes.object)
};

Team.defaultProps = {
    doctors: [],
    pharmacists: [],
    manager: [],
    editor: []
};

export default Team;
