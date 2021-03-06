/* eslint-disable max-len */
import links from "app/core/resource/links";

export default {
    banner: {
        title: `Раздаём <span>500 000 грн</span> за покупки!`,
        description: `Делай заказ на сумму от 500 грн и стань участником розыгрыша <b>11&#160;650 купонов</b> номиналом от 30 до 1000 бонусных гривен!`,
        promotionConditions: `Акция действует до 31.05.2021 или до отправки покупателям последнего купона. <a href="${links.bonusesAirdropConditions}" target="_blank">Официальные условия акции</a>`
    },
    howWorks: {
        title: `Как это работает?`,
        items: [
            {
                preview: `${links.images.bonusesAirdrop.couponBox}`,
                description: `Каждый покупатель, совершивший покупку на итоговую сумму от 500 грн, при получении заказа участвует в розыгрыше одного из 11 650 купонов. При этом в розыгрыше участвует каждая ваша покупка – это увеличивает шансы выиграть свой купон на 1000 грн!`
            },
            {
                preview: `${links.images.bonusesAirdrop.cart}`,
                description: `Применить выигранные бонусы можно на свои следующие заказы, оплачивая ими до 50% от их стоимости. Узнайте подробнее о нашей программе лояльности «Морковки», бонусах и купонах на <a href="${links.morkovki}">этой странице</a>`
            },
            {
                preview: `${links.images.bonusesAirdrop.couponNominal}`,
                description: `Номинал купона, который достанется вам, выбирается автоматически и случайным образом. Купон сразу начисляется в виде бонусов на ваш бонусный счет, а о выигрыше вы узнаете из Viber или SMS-сообщения от apteka24.ua`
            }
        ]
    },
    couponsDescription: {
        title: `Я, правда, могу выиграть?`,
        canWin: `Да! Вы точно получите минимум 30 бонусных гривен в дополнение к кешбэку`,
        quantity: `Вот сколько всего купонов мы разыгрываем среди покупателей:`
    }
};
