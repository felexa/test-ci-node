import React from "react";

import Clients from "./clients/Clients";
import Correspondence from "./correspondence/Correspondence";
import OtherContacts from "./otherContacts/OtherContacts";

class Contacts extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="contacts clearfix">
                <div className="contacts__body">
                    <Clients />

                    <Correspondence />

                    <OtherContacts />
                </div>
            </div>
        );
    }
}

export default Contacts;
