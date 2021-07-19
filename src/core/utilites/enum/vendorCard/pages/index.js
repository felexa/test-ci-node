import Enum from "app/core/utilites/enum/Enum";

let pageTypes = new Enum({
    fields: [
        {key: "main", value: ""},
        {key: "farkos", value: "farkos"},
        {key: "jj", value: "jj"}
    ]
});

export default {
    getInstance() {
        return pageTypes;
    }
};
