/* eslint-disable max-len */
import links from "app/core/resource/links";

export default {
    title: "Аптека, у якій комфортно",
    image: `${links.images.advantages.headerUa}`,
    description: {
        creatingPharmacy: `Ми крок за кроком створюємо аптеку, яку хотіли б відвідувати самі: просту, зручну і доступну`,
        listedAdvantages: `Нижче ми перерахували переваги, які допоможуть вам зробити правильний вибір`
    },
    sections: [
        {
            title: "Приємні ціни",
            image: `${links.images.advantages.prices}`,
            text: "Ціни на безліч ліків і товари для здоров'я в нашій інтернет-аптеці нижчі, ніж в звичайних аптеках. Ми отримуємо товари безпосередньо від виробників, а потім доставляємо вам замовлення з власних складів. Без посередників і перекупників."
        },
        {
            title: "Акції та знижки",
            image: `${links.images.advantages.discount}`,
            text: "З apteka24.ua можна гарненько економити! Виробники ліків і медичних товарів регулярно запускають з нами акції — так товари можна замовляти з додатковою знижкою. Такі товари ви знайдете в розділі «Акції»."
        },
        {
            title: "Величезний асортимент",
            image: `${links.images.advantages.assortment}`,
            text: "У нас неймовірно велика кількість товарів — 20 000 найменувань! Ліки, вітаміни, медичні прилади... У нас є все — для мам і малюків; для краси і спорту; для тих, хто збирає аптечку у відпустку або автолюбителів. Будь-які медичні засоби, навіть ексклюзивні, — неодмінно знайдуться!"
        },
        {
            title: "Аптека поруч з вашою домівкою",
            image: `${links.images.advantages.nearHome}`,
            text: "У нас є власна мережа аптек і ми дружимо з понад 1000 аптечних точок по всій Україні, щоб доставляти замовлення ближче до вас. У нас завжди можна вибрати доставку в аптеку поряд з домівкою або роботою, а потім легко забрати замовлення у відповідний час!"
        },
        {
            title: "Зручна та швидка доставка",
            image: `${links.images.advantages.delivery}`,
            text: "Ми доставляємо замовлення через «Нову пошту», Укрпошту, Justin та Meest Express, щоб надати дивовижний сервіс всім нашим клієнтам. Мінімальний термін доставки — всього один день. Ви можете робити замовлення для себе або своїх батьків, оплачувати їх картою або готівкою, замовляти доставку додому або в відділення, в міста-мільйонники або у маленькі села.",
            link: "Детальніше про способи і обмеження доставки.",
            href: `${links.delivery}`
        },
        {
            title: "Простий пошук ліків",
            image: `${links.images.advantages.compare}`,
            text: "Пошук на apteka24.ua — простий і зручний. У кожного товару є опис, інструкція і докладна інформація про склад і дозування. У нас є блог з порадами і сторінки, присвячені лікуванню окремих захворювань. Безпосередньо на сайті можна замовити відео-консультацію з лікарем і навіть записатися на прийом."
        },
        {
            title: "Конфіденційно",
            image: `${links.images.advantages.confidentially}`,
            text: "При отриманні замовлення в аптеці або через службу доставки вам не доведеться навіть вимовляти назви обраних товарів — ми просто видаємо вам замовлення і ніколи не порушуємо ваше право на збереження в таємниці його вмісту або ваших захворювань."
        },
        {
            title: "Ліцензовані товари",
            image: `${links.images.advantages.quality}`,
            text: `Ми працюємо безпосередньо з найбільшим постачальником фарм-продукції в Україні — компанією <a href=${links.badm}>БаДМ</a>. <a href=${links.warranty}>Ми гарантуємо якість всіх товарів</a> і дотримуємося всіх правил зберігання і транспортування лікарських препаратів. Наші товари мають сертифікати та інструкції. Замовляючи у нас, ви можете дійсно бути впевнені в якості отриманого товару.`
        }
    ]
};
