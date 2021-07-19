import Enum from "app/core/utilites/enum/Enum";

let colors = new Enum({
    fields: [
        {key: "foodstyle", value: "#C3D133"},
        {key: "zdorove-semi", value: "#66BB6A"},
        {key: "krasota", value: "#AC93D9"},
        {key: "lifestyle", value: "#B7B894"},
        {key: "nashi-novosti", value: "#5596D3"},
        {key: "psikhologiy", value: "#77C6D8"},
        {key: "razvlecheniya", value: "#CB849D"}
    ]
});

export default {
    getInstance() {
        return colors;
    }
};
