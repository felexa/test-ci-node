import Enum from "app/core/utilites/enum/Enum";

let contentType = new Enum({
    fields: [
        {key: "default", value: "default"},
        {key: "video", value: "video"},
        {key: "prices", value: "prices"},
        {key: "instruction", value: "instruction"},
        {key: "description", value: "description"},
        {key: "notation", value: "notation"},
        {key: "analogs", value: "analogs"},
        {key: "pregnancy", value: "pregnancy"},
        {key: "review", value: "review"}
    ]
});

export default {
    getInstance() {
        return contentType;
    }
};
