/* eslint-disable max-len */

import links from "app/core/resource/links";

import pregnancy from "./pregnancy";
import whoAllowed from "./whoAllowed";
import footer from "./footer";
import warnings from "./warnings";
import property from "./property";
import promoBanners from "./promoBanners";
import license from "./license";
import loyaltyProgram from "./loyaltyProgram";
import about from "./about";
import advantages from "./advantages";
import feedback from "./feedback";
import manufacturer from "./manufacturer";
import home from "./home";
import review from "./review";
import notes from "./notes";
import insurance from "./insurance";
import bonus from "./bonus";
import catalog from "./catalog";
import bonusesAirdrop from "./bonusesAirdrop";
import installApp from "./installApp";
import employeeDiscount from "./employeeDiscount";
import medicalExperts from "./medicalExperts";
import welcomeBonus from "./welcomeBonus";
import howWeWork from "./howWeWork";

export default {
    rulesReceivingBonusByReviews: `Мы начисляем бонусы за хорошие отзывы, написанные с соблюдением 
    <a href="${links.reviewsPostingPolicy}" target="_blank">наших правил</a>.
    Если Ваш отзыв интересно читать, Вы делитесь личным опытом, если Вы честно рассказываете о побочных эффектах
    или о бесполезности препарата – это хороший отзыв и мы его одобрим. Бонусы за отзывы можно тратить на покупки.
    Узнайте <a href="${links.morkovki}" target="_blank">подробнее об этом</a>.`,

    bonusByReview: "<strong>+30 бонусов</strong> за отзыв",

    deliveryDrugsFromVendors: `Сервис для поиска и заказа товаров аптечного ассортимента  со склада крупнейшего фармдистрибьютора в Украине`,

    drugsEconomy: "Работая напрямую с дистрибьютором, а также благодаря программе лояльности, акциям, скидкам и бонусам мы предоставляем экономию на лекарствах до <strong>50%</strong>!",

    orderingInstruction: `<p>Когда вы решите оформить заказ, просто найдите нужное лекарство на apteka24.ua или 
                        позвоните по бесплатному номеру <a href="tel:0800302244">0800 30 22 44</a>.</p>
                        <p>На горячей линии apteka24.ua работают фармацевты, которые помогут с выбором товара и оформят 
                        заказ прямо по телефону.</p>
                        <p>О движении заказа вы будете проинформированы по SMS или Viber.</p>`,

    warrantyStages: `Каждый наш товар, начиная свой жизненный путь от производителя и заканчивая
                    прибытием в аптеку, где Вы его получаете, проходит несколько важных этапов.
                    Приобретая лекарства и медицинские товары у нас, Вы получаете такие гарантии:`,
    bonusesAmount: "<span>{0}</span> бонусных гривен",
    paymentTypes: "Наличными при получении, оплата картой на сайте, наложенный платеж",
    warranty: {
        certification: "Весь товар сертифицирован",
        fromSeller: "Продавец гарантирует упаковку заказанного товара, которая обеспечивает его целостность и сохранность надлежащего качества и товарного вида"
    },
    temperatureMode: {
        title: "Температурный режим и «холодовая цепь»",
        description: "Условия хранения и транспортировки лекарственных средств соответствуют оптимальному температурному режиму для каждого препарата. Термолабильные препараты хранятся и транспортируются с соблюдением «холодовой цепи» — бесперебойно функционирующей системы температурного режима, обеспечивающей необходимые холодовые условия для хранения и транспортировки термолабильных препаратов на всех этапах пути их следования от предприятия-изготовителя до аптеки"
    },
    generic: "Препарат дженерик — лекарственное средство, содержащее активный фармацевтический ингредиент, идентичный запатентованному первоначальным разработчиком лекарства. После истечения  срока действия патента формула действующего вещества становится общественным достоянием и может воспроизводиться другими компаниями под международным непатентованным наименованием либо под патентованным названием, отличающимся от первоначального. Препарат дженерик отличается от оригинала только составом вспомогательных веществ. Действующие вещества, их дозировка, фармакологическое действие и способ применения ничем не отличаются. В большинстве случаев препарат дженерик является взаимозаменяемым и продается по более низкой цене, чем брендовый синоним.",
    buyInOneClick: {
        instruction: "Менеджер перезвонит Вам, узнает все детали и сам оформит заказ на Ваше имя"
    },
    cookieAgreement: {
        description: `Используя сайт apteka24.ua, вы принимаете условия, согласно которым мы используем файлы «cookie» 
            для анализа данных и создания контента (в том числе рекламного) на основе ваших интересов. Узнайте больше в разделе 
            <a className="text-decoration-none" target="_blank" href="${links.privacyPolicy}">Политика конфиденциальности</a>. 
        `
    },
    seo: {
        productCard: {
            aboutDeliveryLocation: `
                Цена на {0} актуальна при заказе на сайте. На apteka24.ua можно купить 
                {1} с доставкой в такие
                города Украины: Киев, Харьков, Днепр, Одесса, Ровно, Белая Церковь, Винница, Запорожье, Ивано-Франковск,
                Краматорск, Кременчуг, Кривой Рог, Кропивницкий, Львов, Луцк, Мариуполь, Николаев, Полтава, Сумы, Тернополь,
                Херсон, Житомир, Хмельницкий, Черкассы, Черновцы, Чернигов. В другие города заказы могут доставляться через
                службу доставки. Доступна доставка курьером. 
                <a href="${links.delivery}" target="_blank">Подробнее</a> о способах, стоимости и
                ограничениях доставки.
                `
        }
    },
    telegram: {
        title: `Присоединяйтесь к нам в `,
        name: `Telegram`,
        description: 'Здесь мы рассказываем малоизвестные факты о здоровье. Приводим лучшие методики лечения. Публикуем статьи авторитетных врачей. Делимся лайфхаками. Ищите нас в Telegram — @apteka24ua'
    },
    pharmacistConsultation: {
        title: `Бесплатная консультация с фармацевтом`,
        description: `информация о товаре, подбор аналогов, заказ доставки`,
        workingTime: `Онлайн: 08:00 - 21:00, без выходных`
    },
    generalMedicalQuestions: "Общие медицинские вопросы, касающиеся лекарств и заболеваний, на которые отвечает команда квалифицированных специалистов в области здравоохранения",
    aboutSearchDrugsByActiveIngredient: "В нашей аптеке также найдете товары, выбрав из перечня медикаменты по действующему веществу. Данный поиск удобен тем, что даже не зная конкретное название медпрепарата, можно с легкостью подобрать для себя большое количество лекарств, в составе которых отмечено искомое вещество",
    aboutSortingByActiveIngredient: "Так как и с помощью других удобных вариантов поиска на нашем сайте, сортировка по действующему веществу поможет найти сразу несколько товаров, сравнить их цены, проверить наличие или же подобрать аналоги",
    aboutMethodsSearchingDrugs: "На сайте Аптека24 есть и другие способы поиска медикамента: список товаров в алфавитном порядке и поиск по бренду",
    whatIsAnalog: "Полное совпадение состава действующих веществ, их дозировки и формы выпуска",
    notes,
    pregnancy,
    whoAllowed,
    footer,
    warnings,
    promoBanners,
    license,
    loyaltyProgram,
    about,
    feedback,
    manufacturer,
    home,
    review,
    property,
    advantages,
    bonus,
    catalog,
    insurance,
    bonusesAirdrop,
    installApp,
    employeeDiscount,
    medicalExperts,
    welcomeBonus,
    howWeWork
};
