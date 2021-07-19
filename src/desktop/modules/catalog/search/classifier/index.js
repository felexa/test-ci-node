import React from "react";

import Env from "app/core/environment";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import Router from "app/core/utilites/router";
import RouteNamesEnum from "app/core/utilites/enum/route";

import ClassifierEntity from "app/core/entities/catalog/search/classifier/Classifier";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import RubricService from "app/core/services/rubric";

import ProductRubricEntity from "app/core/entities/rubric/ProductRubric";
import BasketService from "app/core/services/basket";

import View from "./view/Classifier";
import Repository from "./businessLogic/Repository";
import Classifier from "./businessLogic/Classifier";

// import "./styles/main.module.scss";

let classifier = new Classifier({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                getClassifier: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/active-ingredients-index"
                },
                getIngredients: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/active-ingredients-index",
                    query: {
                        index: ""
                    }
                },
                getIngredient: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/active-ingredients-index/:classifierName"
                }
            }
        }),
        Router: Router.getInstance(),
        BasketService: BasketService.getInstance(),
        RouteNamesEnum: RouteNamesEnum.getInstance(),
        RubricService: RubricService.getInstance(),
        ProductRubricEntity,
        PageInfoEntity,
        ClassifierEntity
    }
});

export default {
    getView(initialData, pageInfo) {
        Env.getInstance().setLanguage(pageInfo.language);

        return <View options={{initialData, model: classifier}} />;
    },
    getInitialProps(...args) {
        return this.getServerSideProps(...args);
    },
    getStaticProps(...args) {
        return this.getInitialProps(...args);
    },
    getServerSideProps(context, props) {
        Env.getInstance().setLanguage(props.pageInfo.language);

        return classifier.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return classifier.normalizeInitialProps(...args);
    }
};
