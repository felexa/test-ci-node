import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import DefaultFaq from "components/faq/FAQ";
import MicroDataFaq from "components/faq/microData/MicroData";

class FAQ extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _getFaq
     * @returns {Faq[]}
     */
    _getFaq() {
        return this.props.faq;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <MicroDataFaq
                                faq={this._getFaq()}
                            />

                            <DefaultFaq
                                items={this._getFaq()}
                                title={this.stringsResource.frequentlyAskedQuestions}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

FAQ.propTypes = {
    faq: PropTypes.instanceOf(Array).isRequired
};

export default FAQ;
