import Enum from "app/core/utilites/enum/Enum";

let values = new Enum({
    fields: [
        {key: "allowed", value: "разрешено"},
        {key: "prohibited", value: "запрещено"},
        {key: "noData", value: "Нет данных"},
        {key: "alcoholNoData", value: "нет данных"},
        {key: "children", value: "Детям"},
        {key: "withPrescription", value: "Только с рецептом"},
        {key: "withoutPrescription", value: "Без рецепта"},
        {key: "minimal", value: "минимальное"},
        {key: "moderate", value: "умеренное"},
        {key: "critical", value: "критичное"},
        {key: "carefully", value: "с осторожностью"},
        {key: "from5to25", value: "от 5°C до 25°C"},
        {key: "from8to15", value: "от 8 до 15 °С"},
        {key: "from2to8", value: "от 2 до 8 °С"},
        {key: "fromMinus5toMinus18", value: "от -5 до -18 °С"},
        {key: "below18", value: "ниже -18 °С"}
    ]
});

export default {
    getInstance() {
        return values;
    }
};
