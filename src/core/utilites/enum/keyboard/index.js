import Enum from "app/core/utilites/enum/Enum";

let keyboardEnum = new Enum({
    fields: [
        {key: "Enter", value: "Enter"},
        {key: "Esc", value: "Escape"},
        {key: "Tab", value: "Tab"}
    ]
});

export default {
    getInstance() {
        return keyboardEnum;
    }
};
