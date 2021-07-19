import Enum from "app/core/utilites/enum/Enum";

let date = new Enum({
    fields: [
        {key: "komuMozhno", value: "komu-mozhno"}
    ]
});

export default {
    getInstance() {
        return date;
    }
};
