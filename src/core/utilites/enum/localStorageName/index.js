import Enum from "app/core/utilites/enum/Enum";

let localStorageNameEnum = new Enum({
    fields: [
        {key: "token", value: "token"},
        {key: "cookieAgreement", value: "gdpr2"},
        {key: "viewedProducts", value: "viewedProducts"},
        {key: "closeInformerInFacetFilterInCatalog", value: "ciffc"},
        {key: "welcomeBonusPopup", value: "welcomeBonus"}
    ]
});

export default {
    getInstance() {
        return localStorageNameEnum;
    }
};
