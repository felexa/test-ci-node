import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import LanguageEnum from "app/core/utilites/enum/language";
import TabNameEnum from "app/core/utilites/enum/tab";
import ContentTypeEnum from "app/core/utilites/enum/contentType";
import RouteNamesEnum from "app/core/utilites/enum/route";
import AnalogTypeEnum from "app/core/utilites/enum/analogType";
import MnnAliasEnum from "app/core/utilites/enum/product/mnnAlias";

import Router from "app/core/utilites/router";
import Observer from "app/core/utilites/observer/Observer";
import HttpClient from "app/core/utilites/httpClient/HttpClient";

import BasketService from "app/core/services/basket";
import DeliveryService from "app/core/services/delivery";
import ReviewService from "app/core/services/review";
import MediaService from "app/core/services/media";
import RubricService from "app/core/services/rubric";
import FaqService from "app/core/services/faq";
import ViewedProductsService from "app/core/services/viewedProducts/index";
import AuthorizationService from "app/core/services/authorization";

import ProductEntity from "app/core/entities/product/Product";
import ProductRubricEntity from "app/core/entities/rubric/ProductRubric";
import NoteEntity from "app/core/entities/note/Note";
import ReviewEntity from "app/core/entities/review/Review";
import ThreadEntity from "app/core/entities/thread/Thread";
import OfferEntity from "app/core/entities/offer/Offer";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";
import ImageEntity from "app/core/entities/image/review/ImageForReview";

import View from "./view/Product";
import Repository from "./businessLogic/Repository";
import Presenter from "./businessLogic/Presenter";
import Product from "./businessLogic/Product";
import Analytics from "./businessLogic/analytics/Analytics";

// import "./styles/main.module.scss";

//import "./styles/main.module.scss";
// import style from "outfile.css";
//import "./styles/critical.css";

let product = new Product({
        dependencies: {
            Repository: new Repository({
                dependencies: {
                    HttpClient
                },
                urls: {
                    getProduct: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections/alias/:id"
                    },
                    getAnalogs: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections/alias/:id/analogs",
                        query: {
                            type: "all"
                        }
                    },
                    getFullAnalogs: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections/alias/:id/analogs",
                        query: {
                            type: "full"
                        }
                    },
                    getAnalogsByForms: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections/alias/:id/analogs",
                        query: {
                            type: "other-forms"
                        }
                    },
                    getAnalogsByIngredients: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections/alias/:id/analogs",
                        query: {
                            type: "active-ingredient"
                        }
                    },
                    getAnalogsByATC: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections/alias/:id/analogs",
                        query: {
                            type: "atc"
                        }
                    },
                    getOffers: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections/alias/:id/analogs",
                        query: {
                            type: "full"
                        }
                    }
                }
            }),
            BasketService: BasketService.getInstance(),
            DeliveryService: DeliveryService.getInstance(),
            ReviewService: ReviewService.getInstance(),
            MediaService: MediaService.getInstance(),
            RubricService: RubricService.getInstance(),
            FaqService: FaqService.getInstance(),
            ViewedProductsService: ViewedProductsService.getInstance(),
            AuthorizationService: AuthorizationService.getInstance(),
            AnalogTypeEnum: AnalogTypeEnum.getInstance(),
            MnnAliasEnum: MnnAliasEnum.getInstance(),
            Resource,
            Observer,
            ReviewEntity,
            ThreadEntity,
            ProductRubricEntity,
            ProductEntity,
            OfferEntity,
            PageInfoEntity,
            NoteEntity,
            ImageEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: product,
            Observer,
            Resource,
            Analytics: new Analytics(),
            AuthorizationService: AuthorizationService.getInstance(),
            Router: Router.getInstance(),
            LanguageEnum: LanguageEnum.getInstance(),
            TabNameEnum: TabNameEnum.getInstance(),
            ContentTypeEnum: ContentTypeEnum.getInstance(),
            RouteNamesEnum: RouteNamesEnum.getInstance()
        }
    });

export default {
    getView(initialData, pageInfo) {
        Env.getInstance().setLanguage(pageInfo.language);

        return <View options={{initialData, model: product, presenter}} />;
    },
    getInitialProps(...args) {
        return this.getServerSideProps(...args);
    },
    getStaticProps(...args) {
        return this.getInitialProps(...args);
    },
    getServerSideProps(context, props) {
        Env.getInstance().setLanguage(props.pageInfo.language);

        return product.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
