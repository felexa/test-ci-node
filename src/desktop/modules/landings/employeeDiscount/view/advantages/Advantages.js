/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Advantages extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <section className="advantages section">
                <div className="container-fluid">
                    <header className="advantages__header">
                        <h2 className="advantages__title section__title">
                            {this.stringsResource.wantMoreBenefits}!
                        </h2>
                    </header>

                    <div className="advantages__body">
                        <div className="advantages__description">
                            <p>{this.HTMLResource.employeeDiscount.wantMoreBenefits.terms}</p>
                            <p>{this.HTMLResource.employeeDiscount.wantMoreBenefits.tasks}</p>
                        </div>
                    </div>
                </div>
                <img src="https://i.apteka24.ua/landings/employee-discount/advantages2.png" alt="" />
            </section>
        );
    }
}

export default Advantages;
