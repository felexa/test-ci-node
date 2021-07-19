/* eslint-disable max-len */
import links from "app/core/resource/links";

export default {
    getDiscountOnYourFirstPurchase: `Отримайте <span class="f-weight-9 color-pink">50 грн бонусів</span><br /> на перше замовлення!`,
    otp: `Введіть код з SMS`,
    email: {
        title: `Ох, матінко! Ви вже<br /> купували у нас`,
        description: `Тоді дамо <b>5% знижки</b> на будь-яке <br /> <span class="d-flex align-items-center 
        justify-content-center">замовлення в обмін на Ваш email <img src=${links.images.emojis.smilingImp} 
        class="ml-8" alt="emodji" /></span>`
    },
    bonusForPhone: {
        title: `<span class="d-flex align-items-center justify-content-center">Ви нам подобаєтесь 
        <img src=${links.images.emojis.smileWithHearts} class="ml-8" alt="emodji" /></span>
        Нарахували Вам бонуси`,
        description: `Час зробити своє перше замовлення<br /> 
        <a href="${links.morkovki}" target="_blank" class="text-decoration-none">Детальніше про бонуси</a>`
    },
    bonusForEmail: {
        title: `<span class="d-flex align-items-center justify-content-center">Ви – краще за всіх <img src=${links.images.emojis.smileWithHearts} alt="emodji" class="ml-8" /></span>`,
        description: `На вашу пошту вже надійшов лист з промокодом`
    },
    sorryBonus: {
        title: `От халепа! Ви вже<br />купували у нас`,
        description: `Ми даємо бонуси тільки новим покупцям`,
        howGetMoreBonuses: `Як заробити ще бонусів Ви дізнаєтесь на <span class="d-flex align-items-center justify-content-center">
        <a href="${links.morkovki}" target="_blank" class="text-decoration-none">цій сторінці </a> <img src=${links.images.emojis.smile} class="ml-8" alt="emodji" /></span>`
    }
};
