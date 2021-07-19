import Enum from "app/core/utilites/enum/Enum";

let productTypeEnum = new Enum({
    fields: [
        {key: "available", value: "available"},
        {key: "unavailable", value: "unavailable"}
    ]
});

export default {
    getInstance() {
        return productTypeEnum;
    }
};
