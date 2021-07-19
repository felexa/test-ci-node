import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Facts extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <section className="about__facts facts about-section">
                <header className="about-section__header">
                    <h2>{this.HTMLResource.about.main.keyFactsAboutUs}</h2>
                </header>

                <div className="about-section__body">
                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.vision}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.mission}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.worth}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.openness}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.reliability}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.involvement}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.qualityAssurance}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.policiesAndRules}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.editorialPolicy}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.marketingPolicy}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.reviewPolicy}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.privacyPolicy}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.userAgreement}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.returnConditions}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.warranty}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.targetAudience}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.wideAssortment}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.license}} />

                    <div className="about-subsection" dangerouslySetInnerHTML={{__html: this.HTMLResource.about.main.contacts}} />
                </div>
            </section>
        );
    }
}

export default Facts;
