import Enum from "app/core/utilites/enum/Enum";

let date = new Enum({
    fields: [
        {key: "freeDeliveryLastDate", value: "02.10"}
    ]
});

export default {
    getInstance() {
        return date;
    }
};
