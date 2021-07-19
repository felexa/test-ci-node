import React from "react";

import Env from "app/core/environment";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import RubricService from "app/core/services/rubric";
import BasketService from "app/core/services/basket";
import Router from "app/core/utilites/router";
import LanguageEnum from "app/core/utilites/enum/language";

import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";
import ProductRubricEntity from "app/core/entities/rubric/ProductRubric";
import FilterEntity from "app/core/entities/filter/Filter";
import Search from "./businessLogic/Search";
import Presenter from "./businessLogic/Presenter";
import Repository from "./businessLogic/Repository";
import SearchToCatalogAdapter from "./businessLogic/SearchToCatalogAdapter";
import View from "./view/Search";

// import "./styles/main.module.scss";

let search = new Search({
        dependencies: {
            RubricService: RubricService.getInstance(),
            BasketService: BasketService.getInstance(),
            ProductRubricEntity,
            PageInfoEntity,
            FilterEntity,
            LanguageEnum: LanguageEnum.getInstance(),
            Repository: new Repository({
                dependencies: {
                    HttpClient,
                    SearchToCatalogAdapter
                },
                urls: {
                    getSearchByQueryParams: {
                        domain: Env.getInstance().getSearchServiceHost(),
                        path: "/pub/v1/search"
                    },
                    getItemsFromCatalog: {
                        domain: Env.getInstance().getCatalogServiceHost(),
                        path: "/api/projections"
                    }
                }
            })
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: search,
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

        return search.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
