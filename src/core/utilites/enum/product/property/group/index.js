import Enum from "app/core/utilites/enum/Enum";

let group = new Enum({
    fields: [
        {key: "whoCan", value: "warnings"},
        {key: "prescription", value: "prescription"},
        {key: "alcohol", value: "alcohol-warning"},
        {key: "temperature", value: "storage-temperature"},
        {key: "children", value: "children-warning"}
    ]
});

export default {
    getInstance() {
        return group;
    }
};
