import Enum from "app/core/utilites/enum/Enum";

let tabNameEnum = new Enum({
    fields: [
        {key: "main", value: ""},
        {key: "prices", value: "prices"},
        {key: "instruction", value: "instruction"},
        {key: "description", value: "description"},
        {key: "notation", value: "patient-tips"},
        {key: "analogs", value: "analogs"},
        {key: "review", value: "review"},
        {key: "payment", value: "payment"},
        {key: "warranty", value: "warranty"},
        {key: "pregnancy", value: "pregnancy"},
        {key: "returnPolicy", value: "returnPolicy"},
        {key: "about", value: "about"},
        {key: "articles", value: "articles"},
        {key: "followers", value: "followers"}
    ]
});

export default {
    getInstance() {
        return tabNameEnum;
    }
};
