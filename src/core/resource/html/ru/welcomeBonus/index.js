/* eslint-disable max-len */
import links from "app/core/resource/links";

export default {
    getDiscountOnYourFirstPurchase: `Получите <span class="f-weight-9 color-pink">50 грн бонусов</span><br /> на первую покупку!`,
    otp: `Введите код из SMS`,
    email: {
        title: `Ох, мамочки! Вы уже<br /> делали у нас покупку`,
        description: `Тогда дадим <b>5% скидки</b> на любой <br /> <span class="d-flex align-items-center 
        justify-content-center">заказ в обмен на Ваш email! <img src=${links.images.emojis.smilingImp} 
        class="ml-8" alt="emodji" /></span>`
    },
    bonusForPhone: {
        title: `<span class="d-flex align-items-center justify-content-center">Вы нам нравитесь 
        <img src=${links.images.emojis.smileWithHearts} class="ml-8" alt="emodji" /></span>
        Уже начислили Вам бонусы`,
        description: `Пора сделать свой первый заказ<br /> 
        <a href="${links.morkovki}" target="_blank" class="text-decoration-none">Подробнее о бонусах</a>`
    },
    bonusForEmail: {
        title: `<span class="d-flex align-items-center justify-content-center">Вы - лучше всех <img src=${links.images.emojis.smileWithHearts} alt="emodji" class="ml-8" /></span>`,
        description: `На вашу почту уже пришло письмо с промокодом`
    },
    sorryBonus: {
        title: `Ох, батюшки! Вы уже<br />делали у нас покупку`,
        description: `Мы даем бонусы только новеньким`,
        howGetMoreBonuses: `Как заработать еще бонусов узнайте на <span class="d-flex align-items-center justify-content-center">
        <a href="${links.morkovki}" target="_blank" class="text-decoration-none">этой странице </a> <img src=${links.images.emojis.smile} class="ml-8" alt="emodji" /></span>`
    }
};
