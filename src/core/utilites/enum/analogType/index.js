import Enum from "app/core/utilites/enum/Enum";

let analogType = new Enum({
    fields: [
        {key: "full", value: "full"},
        {key: "otherForms", value: "other-forms"},
        {key: "atc", value: "atc"}
    ]
});

export default {
    getInstance() {
        return analogType;
    }
};
