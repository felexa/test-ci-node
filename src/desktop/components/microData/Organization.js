import React from "react";

import Resource from "app/core/resource";

import StructuredData from "components/microData/StructuredData";

class Organization extends React.Component {
    constructor(props) {
        super(props);

        this.linksResource = Resource.links;
    }

    /**
     * @method _getSchema
     * @returns {Object}
     */
    _getSchema() {
        return {
            "@context": "https://www.schema.org",
            "@type": "Organization",
            name: "apteka24.ua",
            url: this.linksResource.homePage,
            logo: this.linksResource.logoSimple,
            foundingDate: "2013",
            // description: "DESCRIPTION FOR ORGANIZATION", // TODO
            address: {
                "@type": "PostalAddress",
                streetAddress: "м. Дніпро, вул. Панікахи, 2 кор.11 оф.412",
                addressLocality: "Дніпро",
                addressRegion: "Дніпропетровська область",
                postalCode: "49005",
                addressCountry: "Украина"
            },
            contactPoint: [
                {
                    "@type": "ContactPoint",
                    telephone: "+38 (056) 795 91 78",
                    email: this.linksResource.emails.supplier,
                    contactType: "Поставщикам"
                },
                {
                    "@type": "ContactPoint",
                    telephone: "+38 (056) 731 94 68",
                    email: this.linksResource.emails.wholesale,
                    contactType: "Оптовая продажа"
                },
                {
                    "@type": "ContactPoint",
                    telephone: "0800 30 22 44",
                    contactType: "Клиентам",
                    email: this.linksResource.emails.clients
                }
            ],
            sameAs: [
                this.linksResource.facebookA24,
                this.linksResource.instagramA24,
                this.linksResource.telegramA24
            ]
        };
    }

    render() {
        return <StructuredData schema={this._getSchema()} />;
    }
}

export default Organization;
