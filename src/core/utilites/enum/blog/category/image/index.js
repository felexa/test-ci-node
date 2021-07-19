import Enum from "app/core/utilites/enum/Enum";

let images = new Enum({
    fields: [
        {key: "foodstyle", value: "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/blog/blog-health.png"},
        {key: "zdorove-semi", value: "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/blog/blog-lifestyle.png"},
        {key: "krasota", value: "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/blog/blog-beauty.png"}
    ]
});

export default {
    getInstance() {
        return images;
    }
};
