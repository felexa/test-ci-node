import Enum from "app/core/utilites/enum/Enum";

let pageTypes = new Enum({
    fields: [
        {key: "main", value: "about"},
        {key: "advantages", value: "advantages"},
        {key: "howTo", value: "howto"},
        {key: "social", value: "social"},
        {key: "reviews", value: "reviews"},
        {key: "delivery", value: "delivery"},
        {key: "contacts", value: "contacts"},
        {key: "mission", value: "missiya-kompanii"},
        {key: "partners", value: "partners"},
        {key: "agreement", value: "agreement"},
        {key: "team", value: "team"},
        {key: "medicalExperts", value: "medical-experts"},
        {key: "editorialPolicy", value: "editorial-policy"},
        {key: "marketingPolicy", value: "marketing-policy"},
        {key: "publishingPolicy", value: "politika-publikatsii-otzivov"},
        {key: "massMedia", value: "mass-media"},
        {key: "orderReturn", value: "order-return"},
        {key: "terms", value: "terms"},
        {key: "warranty", value: "warranty"},
        {key: "loyaltyRules", value: "loyalty-rules"},
        {key: "loyaltyBonusRules", value: "loyalty-bonus-rules"},
        {key: "howWeWork", value: "how-we-work"}
    ]
});

export default {
    getInstance() {
        return pageTypes;
    }
};
