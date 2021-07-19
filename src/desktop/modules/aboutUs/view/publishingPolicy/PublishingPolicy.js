import React from "react";

import Description from "./description/Description";
import Moderation from "./moderation/Moderation";
import CommentsRules from "./commentsRules/CommentsRules";
import Confidential from "./confidential/Confidential";
import SpeakRules from "./speakRules/SpeakRules";

class PublishingPolicy extends React.Component {
    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="publishing-policy">
                <div className="publishing-policy__body">
                    <Description />

                    <Moderation />

                    <CommentsRules />

                    <Confidential />

                    <SpeakRules />
                </div>
            </div>
        );
    }
}

export default PublishingPolicy;
