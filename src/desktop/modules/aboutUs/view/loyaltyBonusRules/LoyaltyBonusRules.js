/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class LoyaltyBonusRules extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.redactionDate = "09.06.2021";
    }

    render() {
        return (
            <div className="loyalty-bonus-rules rules">
                <div className="mb-16">{this.stringsResource.redactionFrom} {this.redactionDate}</div>

                <ol className="rules__list">
                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyBonusRules.bonusesAccrual.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyBonusRules.bonusesAccrual.list}} />
                    </li>

                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyBonusRules.bonusesWriteOff.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyBonusRules.bonusesWriteOff.list}} />
                    </li>

                    <li>
                        <span className="rules__title">{this.HTMLResource.about.loyaltyBonusRules.limitations.title}</span>
                        <ol dangerouslySetInnerHTML={{__html: this.HTMLResource.about.loyaltyBonusRules.limitations.list}} />
                    </li>
                </ol>
            </div>
        );
    }
}

export default LoyaltyBonusRules;
