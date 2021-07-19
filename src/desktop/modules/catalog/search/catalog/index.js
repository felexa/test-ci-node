import React from "react";

import Env from "app/core/environment";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import RubricService from "app/core/services/rubric";
import BasketService from "app/core/services/basket";
import Router from "app/core/utilites/router";
import LanguageEnum from "app/core/utilites/enum/language";

import FaqService from "app/core/services/faq";
import ProductRubricEntity from "app/core/entities/rubric/ProductRubric";
import FilterEntity from "app/core/entities/filter/Filter";
import BannerEntity from "app/core/entities/banner/Banner";
import ProfileEntity from "app/core/entities/profile/Profile";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import Catalog from "./businessLogic/Catalog";
import Presenter from "./businessLogic/Presenter";
import Repository from "./businessLogic/Repository";
import EntityTransformer from "./businessLogic/EntityTransformer";
import View from "./view/Catalog";

// import "./styles/main.module.scss";

let catalog = new Catalog({
        dependencies: {
            RubricService: RubricService.getInstance(),
            BasketService: BasketService.getInstance(),
            ProductRubricEntity,
            FilterEntity,
            BannerEntity,
            ProfileEntity,
            PageInfoEntity,
            LanguageEnum: LanguageEnum.getInstance(),
            EntityTransformer,
            FaqService: FaqService.getInstance(),
            Repository: new Repository({
                dependencies: {
                    HttpClient,
                    EntityTransformer
                },
                urls: {
                    getCatalogByParamsAndQuery: {
                        domain: Env.getInstance().getSearchServiceHost(),
                        path: "/pub/v1/catalogs/:filters"
                    }
                }
            })
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: catalog,
            Router: Router.getInstance(),
            Env: Env.getInstance(),
            LanguageEnum: LanguageEnum.getInstance()
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
