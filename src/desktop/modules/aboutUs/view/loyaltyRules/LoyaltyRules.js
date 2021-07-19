/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class LoyaltyRules extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.redactionDate = "07.05.2021";
    }

    render() {
        return (
            <div className="loyalty-rules rules">
                <div className="mb-16">{this.stringsResource.redactionFrom} {this.redactionDate}</div>

                <p className="rules__description">{this.HTMLResource.about.loyaltyRules.description}</p>

                <ol className="rules__list">
                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyRules.terms.title}</span>
                        <ul dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyRules.terms.list}} />
                    </li>

                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyRules.generalProvisions.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyRules.generalProvisions.list}} />
                    </li>

                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyRules.conditions.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyRules.conditions.list}} />
                    </li>

                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyRules.organizerResponsibilities.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyRules.organizerResponsibilities.list}} />
                    </li>

                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyRules.registration.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyRules.registration.list}} />
                    </li>

                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyRules.bonusesAccrual.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyRules.bonusesAccrual.list}} />
                    </li>

                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyRules.bonusesUsage.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyRules.bonusesUsage.list}} />
                    </li>

                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyRules.violationConsequences.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyRules.violationConsequences.list}} />
                    </li>

                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyRules.otherConditions.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyRules.otherConditions.list}} />
                    </li>
                </ol>
            </div>
        );
    }
}

export default LoyaltyRules;
