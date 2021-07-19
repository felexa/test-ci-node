import Enum from "app/core/utilites/enum/Enum";

let productStatusEnum = new Enum({
    fields: [
        {key: "inStock", value: "in-stock"},
        {key: "outOfStock", value: "out-of-stock"},
        {key: "runningOut", value: "running-out"},
        {key: "onDemand", value: "on-demand"}
    ]
});

export default {
    getInstance() {
        return productStatusEnum;
    }
};
