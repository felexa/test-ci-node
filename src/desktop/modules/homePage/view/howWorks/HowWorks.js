/* eslint-disable max-len */
import React from "react";

import Title from "desktop/components/title/Title";

class HowWorks extends React.Component {
    constructor(props) {
        super(props);

        this.titleConfig = {
            title: "Как работает сервис?"
        };

        this.items = [
            {
                id: 1,
                title: "1. Найти товар",
                description: "Найдите и добавьте в корзину все нужные Вам лекарства и мед.товары"
            },
            {
                id: 2,
                title: "2. Оформить заказ",
                description: "Оформите заказ, выбрав из списка удобную аптеку или службу доставки"
            },
            {
                id: 3,
                title: "3. Следить за движением",
                description: "Получайте оповещения о движении Вашего заказа к точке выдачи"
            },
            {
                id: 4,
                title: "4. Получить заказ",
                description: "В удобное для Вас время зайдите за заказом. Получите бонусы за отзывы"
            }
        ];
    }

    /**
     * @private
     * @method _getIconId
     * @return {string}
     */
    _getIconId() {
        return "gear";
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.items.map((item) => (
            <div className="item" key={item.id}>
                <p className="item__title f-weight-5 mb-8 mt-0 text-black">
                    { item.title }
                </p>

                <p className="item__description mt-0 mb-0 f-weight-4 text-gray">
                    { item.description }
                </p>
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @return {React.Element}
     */
    render() {
        return (
            <section className="home-page__how-works how-works">
                <header className="how-works__header">
                    <Title config={this.titleConfig} noGrid iconId={this._getIconId()} />
                </header>

                <div className="how-works__body">
                    <div className="how-works__items d-flex flex-column flex-lg-row justify-content-between rounded-16 new-super-box-shadow line-height-1-4 m-0">
                        { this._renderItems() }
                    </div>
                </div>
            </section>
        );
    }
}

export default HowWorks;
