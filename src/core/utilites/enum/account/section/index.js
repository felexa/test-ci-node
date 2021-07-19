import Enum from "app/core/utilites/enum/Enum";

let accountSection = new Enum({
    fields: [
        {key: "personalData", value: "personal-data"},
        {key: "order", value: "orders"},
        {key: "wishList", value: "wishlist"},
        {key: "review", value: "review"},
        {key: "bonus", value: "bonus"}
    ]
});

export default {
    getInstance() {
        return accountSection;
    }
};
