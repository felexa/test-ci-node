import React from "react";
import PropTypes from "prop-types";

import MicroDataWebPage from "components/microData/WebPage";

import Section from "./section/section";
import Header from "./header/header";
import Advantages from "./advantages/advantages";

class Nicorette extends React.Component {
    constructor(props) {
        super(props);

        this.drugs = props.options.initialData.drugs;
        this.usage = props.options.initialData.usage;
        this.alert = props.options.initialData.alert;
    }

    /**
     * @private
     * @method _getPageInfo
     * @returns {PageInfo}
     */
    _getPageInfo() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.pageInfo;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="nicorette">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <Header />

                <div className="nicorette__body">
                    <Advantages />

                    <Section rubric={this.drugs} className="drugs" />

                    <Section rubric={this.usage} className="usage" />

                    <div
                        className="nicorette__alert line-height-1-5"
                        dangerouslySetInnerHTML={{__html: this.alert.content}}
                    />

                </div>
            </div>
        );
    }
}

Nicorette.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Nicorette;
