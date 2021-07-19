/* eslint-disable max-len */
import links from "app/core/resource/links";

export default {
    features: {
        items: [
            {
                title: `Сертифицированные лекарства от производителей`,
                description: `
                    <p>Все наши товары хранятся на складе крупнейшего фармацевтического дистрибьютора в Украине — компании <a href=${links.badm} target="_blank">«БаДМ»</a>. Препараты на склад поступают напрямую от производителей со всего мира — и от маленьких, никому не известных, и от мировых гигантов.</p>
                    <p>Как аптека мы также следим за сохранностью всех фармакологических свойств препаратов, что подразумевает с нашей стороны соблюдение правил хранения, температурного режима, валидированной доставки. Поэтому, покупая лекарства у нас, вы можете быть уверены, что они поставляются напрямую от производителя, правильно хранились и перевозились, их фармакологические свойства сохранены.</p>
                `,
                icon: {
                    alt: "Сертифицированные лекарства",
                    title: "Сертифицированные лекарства",
                    src: {
                        original: `https://i.apteka24.ua/landings/how-it-works/certified-drugs-1.jpg`
                    }
                }
            },
            {
                title: `Строгое соблюдение всех норм хранения для каждого препарата`,
                description: `<p>Каждый препарат нуждается в особых нормах хранения для сбережения  его фармакологических свойств. Для их соблюдения все препараты прибывают на склад в специальном транспорте, а холодовые препараты – ещё и в термоконтейнерах. Каждый термоконтейнер содержит электронный градусник, фиксирующий температуру при перевозке. Если произошло даже кратковременное повышение температуры до критических значений, то товар сразу же попадает в карантинную зону и возвращается производителю.</p>`,
                icon: {
                    alt: "Строгое соблюдение всех норм",
                    title: "Строгое соблюдение всех норм",
                    src: {
                        original: `https://i.apteka24.ua/landings/how-it-works/standarts-compliance-1.jpg`
                    }
                }
            },
            {
                title: `Наибольшее количество товаров`,
                description: `<p>Ассортимент во многих аптеках представлен всего 4-6 тысячами товаров, у нас же он состоит из более чем 12 000 товаров и представлен сертифицированными лекарствами и изделиями медицинского назначения. Такой объем препаратов и изделий нам доступен по той причине, что нашим поставщиком является один из крупнейших дистрибьюторов в Украине — компания <a href=${links.badm} target="_blank">«БаДМ»</a>. Данное сотрудничество открывает для нас доступ к наибольшему ассортименту лекарств, которые мы таким образом можем предложить нашим покупателям, чтобы максимально удовлетворить ваши потребности.</p>`,
                icon: {
                    alt: "Наибольшее количество товаров",
                    title: "Наибольшее количество товаров",
                    src: {
                        original: `https://i.apteka24.ua/landings/how-it-works/most-products.jpg`
                    }
                }
            }
        ]
    },
    delivery: {
        title: `Разнообразные способы доставки для удобства каждого покупателя`,
        offer: `Мы предлагаем множество способов доставки, которые позволят вам получить товар так, как вам это удобно.`,
        have: `У нас есть доставка:`,
        selfPickup: `самовывозом (в ближайшую аптеку либо в отделение служб доставки «Нова пошта» и «Укрпошта»);`,
        courier: `курьером по адресу (это может быть курьер от apteka24.ua либо курьер от службы доставки «Нова пошта» и «Укрпошта»).`,
        features: `Особенность нашей доставки в том, что независимо от того, какой способ вы выбрали, мы обязательно при перевозке соблюдаем температурный режим для лекарств, а наши курьеры оснащены термосумками и термобоксами. Таким образом, мы не разрываем «холодовую цепь» и не нарушаем режим хранения для тех препаратов, которые нуждаются в низких температурах. Это позволяет сохранить и гарантировать их качество.`,
        items: [
            {
                title: `Правильная доставка с гарантией сохранности качества препаратов`,
                description: `
                    <p>Каждый день мы отправляем медицинские товары по всей Украине. Перевозка осуществляется только валидированным транспортом, так как холодовую цепь и надлежащее качество лекарств нарушать недопустимо.</p>
                    <p>Товары прибывают либо в аптеку, из которой вы забираете свой заказ — и вам выдают не любые лекарства с полки, а именно ваши лекарства, которые специально для вас приехали прямо со склада.</p>
                    <p>Либо же вы получаете свой заказ курьером, который холодовые товары также доставляет в термобоксе, сохраняя холодовую цепь непрерывной в течение всего пути следования лекарств от производителя прямо к вам в руки.</p>
                `,
                icon: {
                    alt: "Правильная доставка",
                    title: "Правильная доставка",
                    src: {
                        original: `https://i.apteka24.ua/landings/how-it-works/delivery-1.jpg`
                    }
                }
            },
            {
                title: `Высочайшие медицинские стандарты`,
                description: `
                    <p>Мы — <a href=${links.legitimnost}>лицензированная аптека</a>, на которую распространяются все правила по хранению и качеству лекарств, как и на любую другую аптеку. Наши товары обладают сертификатами качества. Склад, на котором хранятся препараты, обладает сертификатом GDP, а Государственная служба Украины по лекарственным средствам регулярно проверяет его на соответствие нормам, установленным Законом Украины.</p>
                    <p>Все товары проходят обязательную проверку качества при поступлении на склад. Каждый препарат осматривается на предмет нарушений целостности упаковки и отсутствия дефектов. Если обнаруживаются поврежденные товары, в разбитой таре или с упаковкой ненадлежащего вида, они отправляются в карантин, после чего перенаправляются обратно производителю.</p>
                    <p><a href=${links.warranty}>Наши гарантии качества</a>.</p>
                `,
                icon: {
                    alt: "Высочайшие медицинские стандарты",
                    title: "Высочайшие медицинские стандарты",
                    src: {
                        original: `https://i.apteka24.ua/landings/how-it-works/highest-standards.jpg`
                    }
                }
            }
        ]
    },
    howWorks: {
        title: `Здесь вы можете покупать лекарства на 50% дешевле`,
        description: `
            <p>Для того чтобы наши клиенты могли покупать лекарства дешевле, у нас действует выгодная программа лояльности «Морковки», множество акций со скидками от производителей, а также есть возможность накапливать бонусы за активность, которыми можно оплачивать до 50% стоимости товаров.</p>
            <p>Все бонусы можно тратить на оплату товаров со значком «морковки» на apteka24.ua. Таких товаров сейчас больше 3000, и мы каждый день работаем над увеличением их количества, заключая договора с производителями лекарств. Получая деньги от производителей, мы передаем их в виде скидок и бонусов нашим покупателям. Эта простая схема позволяет нам быть одной из самых выгодных аптек в Украине.</p>
        `,
        example: ` 
            <p> Например, вы заказываете лекарства на сумму 300 грн. С учетом бонуса, который вы получили после регистрации (скажем, 50 грн), заказ будет стоить 250 грн. Добавьте сюда бесплатную доставку по акции с производителями лекарств (обычно доставка стоит 55 грн) и 2% кешбэк, который вы получите за заказ – вот вы сэкономили ещё 60 грн. </p>
            <p>Так, сделав покупку всего на 300 грн, вы сэкономили 105 грн или 35% и получили 5 грн кешбэка на будущие покупки. За каждый отзыв о купленных товарах мы платим ещё от 10 грн и по 1 грн за первые 70 лайков к вашим отзывам – это ещё 100-300 грн бонусов. Узнайте о программе лояльности и о том как ещё зарабатывать бонусы на <a href=${links.morkovki}>на этой странице</a>.</p>
        `
    }
};