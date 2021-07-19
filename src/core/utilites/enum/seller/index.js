import Enum from "app/core/utilites/enum/Enum";

let SellerEnum = new Enum({
    fields: [
        {key: "main", value: "badm"}
    ]
});

export default {
    getInstance() {
        return SellerEnum;
    }
};
