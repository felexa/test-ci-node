import Enum from "app/core/utilites/enum/Enum";

let paymentType = new Enum({
    fields: [
        {key: "cash", value: 1}, //Наличными
        {key: "cashOnDelivery", value: 2}, //Наложенный платеж
        {key: "creditCardOnSite", value: 3} //Оплата картой на сайте
        // {key: "creditCardOnStore", value: 6},//Оплата картой в магазине
        // {key: "googlePay", value: 18}
        // {key: "onlineCredit", value: 3}, //Кредит/Рассрочка онлайн
    ]
});

export default {
    getInstance() {
        return paymentType;
    }
};
