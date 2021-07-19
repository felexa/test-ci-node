import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Achievements extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.data = {
            cities: "29 742",
            drugstores: "1 184",
            drugs: "2 374 483",
            customers: "714 258"
        };
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="achievements rounded-16 new-super-box-shadow color-black">
                <div className="achievements__items d-md-flex align-items-center justify-content-between">
                    <div className="achievements__item">
                        <div className="item__title">
                            {this.stringsResource.cities}
                        </div>

                        <div className="item__value f-weight-6">
                            {this.data.cities}
                        </div>
                    </div>

                    <div className="achievements__item">
                        <div className="item__title">
                            {this.stringsResource.pharmaciesForIssue}
                        </div>

                        <div className="item__value f-weight-6">
                            {this.data.drugstores}
                        </div>
                    </div>

                    <div className="achievements__item">
                        <div className="item__title">
                            {this.stringsResource.drugsDelivered}
                        </div>

                        <div className="item__value f-weight-6">
                            {this.data.drugs}
                        </div>
                    </div>

                    <div className="achievements__item">
                        <div className="item__title">
                            {this.stringsResource.customers}
                        </div>

                        <div className="item__value f-weight-6">
                            {this.data.customers}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Achievements;
