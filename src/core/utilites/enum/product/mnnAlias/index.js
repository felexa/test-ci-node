import Enum from "app/core/utilites/enum/Enum";

let mnnAliasEnum = new Enum({
    fields: [
        {key: "paracetamol", value: "paracetamol"}
    ]
});

export default {
    getInstance() {
        return mnnAliasEnum;
    }
};
