import Enum from "app/core/utilites/enum/Enum";

let voteType = new Enum({
    fields: [
        {key: "like", value: "like"},
        {key: "revert", value: "unlike"},
        {key: "dislike", value: "dislike"}
    ]
});

export default {
    getInstance() {
        return voteType;
    }
};
