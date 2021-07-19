import Enum from "app/core/utilites/enum/Enum";

let productStatusEnum = new Enum({
    fields: [
        {key: "newOrder", value: "D"},
        {key: "inProgress", value: "N"},
        {key: "inTransitToDrugstore", value: "K"},
        {key: "arrivedAtTheDrugstore", value: "M"},
        {key: "completed", value: "O"},
        {key: "canceled", value: "A"}
    ]
});

export default {
    getInstance() {
        return productStatusEnum;
    }
};
