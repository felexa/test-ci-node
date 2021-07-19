import Enum from "app/core/utilites/enum/Enum";

let paymentType = new Enum({
    fields: [
        {key: "courier", value: "1"}, //Курьер по вашему адресу

        {key: "selfDelivery", value: "2"}, //Получение заказа в аптеке (самовывоз)

        {key: "departmentNovaPoshta", value: "4"}, //«Нова Пошта»: до отделения

        {key: "courierFromNovaPoshta", value: "5"}, //«Нова Пошта»: по указанному адресу

        {key: "departmentUkrPoshta", value: "17"}, //«Укрпошта»: до отделения

        {key: "courierFromUrkPoshta", value: "20"}, //«Укрпошта»: по указанному адресу

        {key: "departmentJustIn", value: "23"}, //«Justin»: до отделения

        {key: "departmentMeest", value: "29"}, //«Meest»: доставка в отделение

        {key: "courierFromMeest", value: "32"}, //«Meest»: доставка курьером

        {key: "departmentiPOST", value: "35"}, //iPOST: до отделения

        {key: "courierFromiPOST", value: "38"}, //iPOST: доставка курьером

        {key: "courierFromUklon", value: "41"}, //Uklon: доставка курьером

        // {key: "fastCourier", value: "6"}, //Доставка курьером за 2 часа

        {key: "withoutDelivery", value: "15"} //Без доставки
    ]
});

export default {
    getInstance() {
        return paymentType;
    }
};
