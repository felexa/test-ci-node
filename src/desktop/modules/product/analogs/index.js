import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import LanguageEnum from "app/core/utilites/enum/language";
import TabNameEnum from "app/core/utilites/enum/tab";
import ContentTypeEnum from "app/core/utilites/enum/contentType";
import RouteNamesEnum from "app/core/utilites/enum/route";
import AnalogTypeEnum from "app/core/utilites/enum/analogType";

import Router from "app/core/utilites/router";
import HttpClient from "app/core/utilites/httpClient/HttpClient";

import BasketService from "app/core/services/basket";
import RubricService from "app/core/services/rubric";
import ReviewService from "app/core/services/review";
import ViewedProductsService from "app/core/services/viewedProducts/index";

import ProductEntity from "app/core/entities/product/Product";
import ProductRubricEntity from "app/core/entities/rubric/ProductRubric";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import View from "./view/Product";
import Repository from "./businessLogic/Repository";
import Presenter from "./businessLogic/Presenter";
import Product from "./businessLogic/Product";
import Analytics from "./businessLogic/analytics/Analytics";

let product = new Product({
        dependencies: {
            Repository: new Repository({
                dependencies: {
                    HttpClient
                }
            }),
            BasketService: BasketService.getInstance(),
            RubricService: RubricService.getInstance(),
            ReviewService: ReviewService.getInstance(),
            ViewedProductsService: ViewedProductsService.getInstance(),
            AnalogTypeEnum: AnalogTypeEnum.getInstance(),
            Resource,
            ProductRubricEntity,
            ProductEntity,
            PageInfoEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: product,
            Resource,
            Analytics: new Analytics(),
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
