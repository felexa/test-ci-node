/* eslint-disable max-len */
import links from "app/core/resource/links";

export default {
    banner: {
        title: `Роздаємо <span>500 000 грн</span> за покупки!`,
        description: `Зроби замовлення на суму від 500 грн та стань учасником розіграшу <b>11 650 купонів</b> номіналом від 30 до 1000 бонусних гривень!`,
        promotionConditions: `Акція діє до 31.05.2021 чи до відправки покупцям останнього купону. <a href="${links.bonusesAirdropConditions}" target="_blank">Офіційні умови акції</a>`
    },
    howWorks: {
        title: `Як це працює?`,
        items: [
            {
                preview: `${links.images.bonusesAirdrop.couponBox}`,
                description: `Кожний покупець, який зробив покупку на підсумкову суму від 500 грн, при отриманні замовлення бере участь у розіграші одного з 11 650 купонів. При цьому у розіграші бере участь кожна ваша покупка — це збільшує шанси виграти свій купон на 1000 грн!`
            },
            {
                preview: `${links.images.bonusesAirdrop.cart}`,
                description: `Застосувати виграні бонуси можна на свої наступні замовлення, оплативши ними до 50% від їх вартості. Дізнайтеся більше про нашу програму лояльності «Морквинки», бонуси та купони на <a href="${links.morkovki}">цій сторінці</a>`
            },
            {
                preview: `${links.images.bonusesAirdrop.couponNominal}`,
                description: `Номінал купону, котрий дістанеться вам, обирається автоматично та випадковим чином. Купон відразу нараховується у вигляді бонусів на ваш бонусний рахунок, а про виграш ви дізнаєтеся з Viber чи SMS-повідомлення від apteka24.ua`
            }
        ]
    },
    couponsDescription: {
        title: `Я, правда, можу виграти?`,
        canWin: `Так! Ви точно отримаєте мінімум 30 бонусних гривень у якості доповнення до кешбеку`,
        quantity: `Ось скільки всього купонів ми розігруємо серед покупців:`,
        promotionConditions: `Офіційні <a href="${links.promotionConditions}" target="_blank">умови акції</a>`
    }
};
