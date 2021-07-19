/* eslint-disable max-len */
import Resource from "app/core/resource";

export default [
    {
        position: 1,
        title: "Производитель",
        description: "Производитель отправляет оригинальные товары к нам",
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${Resource.links.icons.logisticsVendor}`
            }
        }
    },
    {
        position: 2,
        title: "Склад",
        description: "Товары прибывают на склад крупнейшего дистрибьютора «БаДМ»",
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${Resource.links.icons.logisticsStore}`
            }
        }
    },
    {
        position: 3,
        title: "Доставка",
        description: "Мы доставляем Ваш заказ в ближайшую к Вам аптеку или курьером",
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${Resource.links.icons.logisticsDelivery}`
            }
        }
    },
    {
        position: 4,
        title: "Получение",
        description: "Вы получаете покупку со всеми гарантиями",
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${Resource.links.icons.logisticsReceiving}`
            }
        }
    }
];
