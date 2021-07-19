/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Env from "app/core/environment";

import Members from "app/desktop/components/members/Members";

class MedicalExperts extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {String}
     */
    render() {
        return (
            <div className="medical-experts color-black">
                <div className="medical-experts__body">
                    <div
                        className="medical-experts__description line-height-1-5"
                        dangerouslySetInnerHTML={{__html: this.HTMLResource.medicalExperts.description}}
                    />

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

MedicalExperts.propTypes = {
    doctors: PropTypes.arrayOf(PropTypes.object),
    pharmacists: PropTypes.arrayOf(PropTypes.object)
};

MedicalExperts.defaultProps = {
    doctors: [],
    pharmacists: []
};

export default MedicalExperts;
