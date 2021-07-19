import Enum from "app/core/utilites/enum/Enum";

let iconName = new Enum({
    fields: [
        {key: "brands", value: "tag"},
        {key: "reviewFromDoctors", value: "stethoscope"},
        {key: "lastArticles", value: "comment-edit"},
        {key: "massMedia", value: "speaker"},
        {key: "reviews", value: "comment"},
        {key: "viewedProducts", value: "eye-open"},
        {key: "shareProducts", value: "widget"},
        {key: "popularProducts", value: "bordered-star"}
    ]
});

export default {
    getInstance() {
        return iconName;
    }
};
