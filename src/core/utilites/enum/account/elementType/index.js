import Enum from "app/core/utilites/enum/Enum";

let elementType = new Enum({
    fields: [
        {key: "select", value: "select"},
        {key: "text", value: "text"},
        {key: "notRequiredText", value: "notRequiredText"},
        {key: "date", value: "date"},
        {key: "textarea", value: "textarea"}
    ]
});

export default {
    getInstance() {
        return elementType;
    }
};
