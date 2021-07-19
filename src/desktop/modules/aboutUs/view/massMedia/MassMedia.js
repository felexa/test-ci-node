import React from "react";

import Resource from "app/core/resource/";
import Strings from "app/core/utilites/strings";

class MassMedia extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        /**
         * @property linksResource
         * @type {Object}
         */
        this.linksResource = Resource.links;

        /**
         * @property descriptionLength
         * @type {number}
         */
        this.descriptionLength = 102;

        this.articles = [
            {
                id: 1,
                title: "PaySpace Magazine",
                url: "https://psm7.com/e-commerce/kak-v-apteka24-ua-zapuskali-besplatnuyu-dostavku-lekarstv-na-dom-po-vsej-ukraine.html",
                description: "С началом карантина в apteka24.ua появилась бесплатная доставка лекарств во все населенные пункты Украины через курьерские службы. Благодаря сотрудничеству с Укрпоштой, “Новой поштой” и Justin аптека сделала адресную доставку медицинских товаров новой нормой для страны. Редакция PaySpace Magazine решила узнать, с чего все начиналось и с какими сложностями пришлось столкнуться команде.",
                preview: this.linksResource.images.logo.rayspace
            },
            {
                id: 2,
                title: "PaySpace Magazine",
                url: "https://psm7.com/articles/kak-zakazat-lekarstva-onlajn-luchshie-servisy-dlya-dostavki-medikamentov.html",
                description: "Обычно доставка лекарственных средств строго ограничена или вовсе запрещена. Для украинцев это совершенно новая опция, которая стала доступна из-за пандемии коронавируса и острой необходимости максимальной самоизоляции.",
                preview: this.linksResource.images.logo.rayspace
            },
            {
                id: 3,
                title: "retailers.ua",
                url: "https://retailers.ua/news/partneryi/10327-apteka24ua-sovmestno-s-ukrpochtoy-zapustili-dostavku-lekarstv-na-dom-po-vsey-ukraine",
                description: "Интернет-аптека apteka24 расширяет доставку товаров по всей Украине. До конца карантина ”Укрпочта” будет бесплатно возить заказы с доставкой на дом в маленькие города и сёла.",
                preview: this.linksResource.images.logo.retailers
            },
            {
                id: 4,
                title: "fakty.com.ua",
                url: "https://fakty.com.ua/ua/ukraine/20200417-ukrposhta-bezkoshtovno-dostavlyatyme-liky-pid-chas-karantynu/",
                description: "Укрпошта безкоштовно доставлятиме ліки, замовлені на сайті інтернет-аптеки apteka24. Для того щоб отримати безкоштовну доставку, потрібно зробити замовлення на сайті apteka24.ua і вибрати спосіб доставки – Укрпошта. Оплатити замовлення можна банківською картою під час оформлення або готівкою при отриманні.",
                preview: this.linksResource.images.logo.facts
            },
            {
                id: 5,
                title: "itc.ua",
                url: "https://itc.ua/news/na-vremya-karantina-nova-poshta-budet-besplatno-dostavlyat-lekarstva-iz-apteka24-ua-po-adresu-v-pochtomat-ili-otdelenie/",
                description: "Сервис «Нова пошта» и интернет-аптека apteka24.ua запустили совместный проект по бесплатной доставке лекарств на период карантина, в результате приобретенные медикаменты и оборудование можно будет получить прямо домой с помощью курьеров.",
                preview: this.linksResource.images.logo.itc
            }
        ];
    }

    /**
     * @private
     * @method renderItems
     * @returns {Array}
     */
    renderItems() {
        let self = this;

        return this.articles.map(function (item) {
            return (
                <article
                    className="mass-media__item"
                    key={item.id}
                >
                    <a
                        href={item.url}
                        rel="noreferrer"
                        target="_blank"
                        className="item__preview"
                    >
                        <img src={item.preview} alt="Preview" />
                    </a>

                    <a
                        href={item.url}
                        rel="noreferrer"
                        target="_blank"
                        className="item__title"
                    >
                        { item.title }
                    </a>

                    <p
                        className="item__description"
                        title={item.description}
                    >
                        { self.strings.clip(item.description, self.descriptionLength) }
                        {/*{ item.description }*/}
                    </p>
                </article>
            );
        });
    }

    /**
     * @public
     * @method render
     * @returns {String}
     */
    render() {
        return (
            <div className="mass-media">
                <div className="mass-media__body">
                    <div className="mass-media__items">
                        { this.renderItems() }
                    </div>
                </div>
            </div>
        );
    }
}

export default MassMedia;
