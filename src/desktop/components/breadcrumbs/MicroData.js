import React from "react";
import PropTypes from "prop-types";
import StructuredData from "components/microData/StructuredData";

class MicroData extends React.Component {
    /**
     * @method getItemListElementSchema
     * @returns {Array}
     */
    getItemListElementSchema() {
        return this.props.breadCrumbs.slice(0, -1).map(function (item, index) {
            return {
                "@type": "ListItem",
                position: index + 2,
                item: {
                    "@id": item.url,
                    name: item.name
                }
            };
        });
    }

    /**
     * @method getSchema
     * @returns {Object}
     */
    getSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                        "@id": "https://www.apteka24.ua/",
                        name: "Современная интернет-аптека с доставкой - Аптека24",
                        image: "https://www.apteka24.ua/bitrix/templates/apteka24/images/apteka24logo.png"
                    }
                },
                ...this.getItemListElementSchema()
            ]
        };
    }

    render() {
        return <StructuredData schema={this.getSchema()} />;
    }
}

MicroData.propTypes = {
    breadCrumbs: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired
};

export default MicroData;
