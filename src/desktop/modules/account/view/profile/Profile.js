import React from "react";
import PropTypes from "prop-types";

import PersonalData from "./personalData/PersonalData";

class Profile extends React.Component {
    /**
     * @public
     * @method _getProfile
     * @returns {Object}
     */
    _getProfile() {
        return this.props.profile;
    }

    render() {
        return (
            <div className="account-profile">
                <section className="account-profile__body">
                    <PersonalData profile={this._getProfile()} updateProfile={this.props.updateProfile} />
                </section>
            </div>
        );
    }
}

Profile.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    updateProfile: PropTypes.func.isRequired
};

export default Profile;
