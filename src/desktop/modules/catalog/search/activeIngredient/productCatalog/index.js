import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import TabNameEnum from "app/core/utilites/enum/tab";
import ContentTypeEnum from "app/core/utilites/enum/contentType";
import RouteNamesEnum from "app/core/utilites/enum/route";
import LanguageEnum from "app/core/utilites/enum/language";

import Router from "app/core/utilites/router";
import Observer from "app/core/utilites/observer/Observer";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import Numbers from "app/core/utilites/numbers";

import BasketService from "app/core/services/basket";
import FaqService from "app/core/services/faq";
import RubricService from "app/core/services/rubric";

import ProductGroupEntity from "app/core/entities/catalog/productGroup/ProductGroup";
import RangeEntity from "app/core/entities/range/Range";
import ReviewEntity from "app/core/entities/review/Review";
import ProductRubricEntity from "app/core/entities/rubric/ProductRubric";
import ProductEntity from "app/core/entities/product/Product";
import ProfileEntity from "app/core/entities/profile/Profile";
import BlogRubricEntity from "app/core/entities/rubric/BlogRubric";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import View from "./view/Catalog";
import Repository from "./businessLogic/Repository";
import Catalog from "./businessLogic/Catalog";
import Presenter from "./businessLogic/Presenter";

// import "./styles/main.module.scss";

let catalog = new Catalog({
        dependencies: {
            Repository: new Repository({
                dependencies: {
                    HttpClient
                },
                urls: {
                    getInitialData: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections/index/:name",
                        params: {
                            ingredient: "",
                            name: ""
                        },
                        query: {}
                    },
                    getAnalogsByIngredient: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections/index/:ingredient/analogs",
                        params: {
                            ingredient: ""
                        }
                    },
                    getForPregnant: {
                        domain: Env.getInstance().getBitrixHost(),
                        path: "/api/pregnancy/mnn/:ingredient",
                        params: {
                            ingredient: ""
                        }
                    },
                    getInstructionById: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections/:id",
                        query: {}
                    },
                    getReviewByProductGroup: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "api/projections/index/:ingredient/reviews",
                        params: {
                            ingredient: ""
                        },
                        query: {
                            itemsPerPage: 10,
                            page: 1
                        }
                    }
                }
            }),
            BasketService: BasketService.getInstance(),
            RubricService: RubricService.getInstance(),
            FaqService: FaqService.getInstance(),
            TabNameEnum: TabNameEnum.getInstance(),
            LanguageEnum: LanguageEnum.getInstance(),
            RangeEntity,
            ReviewEntity,
            ProductEntity,
            ProductRubricEntity,
            ProfileEntity,
            ProductGroupEntity,
            BlogRubricEntity,
            PageInfoEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: catalog,
            Numbers: Numbers.getInstance(),
            Env: Env.getInstance(),
            TabNameEnum: TabNameEnum.getInstance(),
            ContentTypeEnum: ContentTypeEnum.getInstance(),
            RouteNamesEnum: RouteNamesEnum.getInstance(),
            Router: Router.getInstance(),
            Resource,
            Observer
        }
    });

export default {
    getView(initialData, pageInfo) {
        Env.getInstance().setLanguage(pageInfo.language);

        return <View options={{initialData, presenter}} />;
    },
    getInitialProps(...args) {
        return this.getServerSideProps(...args);
    },
    getStaticProps(...args) {
        return this.getInitialProps(...args);
    },
    getServerSideProps(context, props) {
        Env.getInstance().setLanguage(props.pageInfo.language);

        return catalog.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
