/* eslint-disable react/prop-types */
import React from "react";

import Redactor from "components/redactor/Redactor";

import Description from "./description/Description";
import Facts from "./facts/Facts";
import ReadMore from "./readMore/ReadMore";

class Main extends React.Component {
    /**
     * @public
     * @method render
     * @return {React.Element}
     */
    render() {
        return (
            <div className="about">
                <div className="about__body">
                    <Redactor
                        className="mb-16"
                        lastUpdateDate={new Date(this.props.lastUpdateDateAsMilliseconds)}
                        profile={this.props.redactor}
                        reviewer={this.props.reviewer}
                    />

                    <Description />

                    <Facts />

                    <ReadMore />
                </div>
            </div>
        );
    }
}

export default Main;
