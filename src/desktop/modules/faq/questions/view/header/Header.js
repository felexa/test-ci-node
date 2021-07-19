import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Header extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <header className="faq__header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-7">
                            <h1 className="faq__title f-weight-5 mb-16">
                                {this.stringsResource.doctorsAnswersYourQuestions}
                            </h1>

                            <p className="faq__subtitle f-weight-4">
                                {this.HTMLResource.generalMedicalQuestions}
                            </p>

                            {/*<Search />*/}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
