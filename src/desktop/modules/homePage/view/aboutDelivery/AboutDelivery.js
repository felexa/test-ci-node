import React from "react";

import Env from "app/core/environment";
import Title from "desktop/components/title/Title";

class AboutDelivery extends React.Component {
    constructor(props) {
        super(props);

        this.env = Env.getInstance();

        this.repositoryURL = this.env.getMainImageRepository();

        this.titleConfig = {
            title: `
                Товар доставляется со склада крупнейшего фармдистрибьютора Украины – ООО “БаДМ”.
                <span class="whitespace-nowrap">Это гарантирует:</span>
            `
        };

        this.items = [
            {
                id: 4,
                description: "Прямые поставки от производителей",
                preview: {
                    desktop: {
                        src: {
                            original: `${this.repositoryURL}/delivery/icons/deliveries.svg`,
                            large: ``,
                            medium: ``,
                            small: ``
                        }
                    }
                }
            },
            {
                id: 3,
                description: "Соблюдение всех правил хранения и доставки лекарств",
                preview: {
                    desktop: {
                        src: {
                            original: `${this.repositoryURL}/delivery/icons/rules.svg`,
                            large: ``,
                            medium: ``,
                            small: ``
                        }
                    }
                }
            },
            {
                id: 2,
                description: "В 5 раз больше лекарств, чем в обычной аптеке",
                preview: {
                    desktop: {
                        src: {
                            original: `${this.repositoryURL}/delivery/icons/times.svg`,
                            large: ``,
                            medium: ``,
                            small: ``
                        }
                    }
                }
            },
            {
                id: 1,
                description: "Оптимальные цены для всех покупателей",
                preview: {
                    desktop: {
                        src: {
                            original: `${this.repositoryURL}/delivery/icons/portmone.svg`,
                            large: ``,
                            medium: ``,
                            small: ``
                        }
                    }
                }
            }
        ];
    }

    /**
     * @private
     * @method _getIconId
     * @return {string}
     */
    _getIconId() {
        return "quality";
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.items.map((item) => (
            <div
                className="item"
                key={item.id}
            >
                <div className="item__preview d-flex justify-content-center align-items-center mb-12">
                    <img
                        src={item.preview.desktop.src.original}
                        alt={item.description}
                    />
                </div>

                <p className="item__description f-weight-4 text-black">
                    { item.description }
                </p>
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <section className="home-page__about-delivery about-delivery">
                <header className="about-delivery__header">
                    <span className="icon" />

                    <Title
                        className="about-delivery__title"
                        config={this.titleConfig}
                        noGrid
                        iconId={this._getIconId()}
                    />
                </header>

                <div className="about-delivery__body">
                    <div className="about-delivery__items d-flex flex-column flex-lg-row justify-content-between m-0">
                        { this._renderItems() }
                    </div>
                </div>
            </section>
        );
    }
}

export default AboutDelivery;
