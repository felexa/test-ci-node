/* eslint-disable react/prop-types */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import MenuService from "app/core/services/menu";
import LinkItem from "desktop/modules/homePage/view/hotNav/linkItem/LinkItem";

import NativeCarousel from "desktop/components/nativeCarousel/NativeCarousel";

// import HowWorks from "desktop/modules/homePage/view/howWorks/HowWorks";
// import AboutDelivery from "desktop/modules/homePage/view/aboutDelivery/AboutDelivery";

class HotNav extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.Resource = Resource;
        this.env = Env.getInstance();

        this.menuService = MenuService.getInstance();
        this.openCatalog = this.openCatalog.bind(this);
    }

    openCatalog() {
        this.menuService.toggle(true, "click", "catalog");
    }

    renderCatalogCategories(items) {
        return items.map((item) => (
            <div className="mobile-hot-menu__item" key={item.url}>
                <a href={item.url} className="d-flex flex-column align-items-center text-center">
                    <img
                        data-src={item.icon}
                        width="35"
                        height="35"
                        alt=""
                        className="lazyload mb-8"
                    />
                    {item.name}
                </a>
            </div>
        ));
    }

    render() {
        return (
            <div className="hot-nav">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="open-catalog">
                                <button
                                    onClick={this.openCatalog}
                                    type="button"
                                    className="d-flex d-lg-none align-items-center justify-content-center btn-default btn-lg btn-block mb-32"
                                >
                                    <i className="icon icon-widget" />
                                    <span>
                                        {this.stringsResource.productCatalog}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <NativeCarousel className="mobile-hot-menu d-lg-none mb-10">
                        <div className="mobile-hot-menu__items d-flex bg-white new-super-box-shadow">
                            { this.renderCatalogCategories(this.props.menu) }
                        </div>
                    </NativeCarousel>

                    {/*<HowWorks />*/}

                    {/*<AboutDelivery />*/}

                    <div className="row">
                        <div className="col">
                            <ul className="hot-links d-flex flex-column flex-lg-row">
                                <li className="hot-link__item bg-white new-super-box-shadow">
                                    <LinkItem
                                        title={this.stringsResource.promotions}
                                        url={this.Resource.links.promo}
                                        iconName="icon-shares"
                                    />
                                </li>

                                <li className="hot-link__item bg-white new-super-box-shadow">
                                    <LinkItem
                                        title={this.stringsResource.searchByActiveIngredient}
                                        url={this.Resource.links.ingredients}
                                        iconName="icon-substance"
                                    />
                                </li>

                                <li className="hot-link__item bg-white new-super-box-shadow">
                                    <LinkItem
                                        title={this.stringsResource.insuranceCovid}
                                        url={this.Resource.links.insurance}
                                        iconName="icon-microbe"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HotNav;
