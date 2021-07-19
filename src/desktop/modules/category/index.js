import React from "react";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import Env from "app/core/environment";

import BannerEntity from "app/core/entities/banner/Banner";
import CategoryEntity from "app/core/entities/category/Category";
import ProductRubricEntity from "app/core/entities/rubric/ProductRubric";
import CommentRubricEntity from "app/core/entities/rubric/CommentRubric";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import RubricService from "app/core/services/rubric";
import BasketService from "app/core/services/basket";
import LanguageEnum from "app/core/utilites/enum/language";

import View from "./view/Category";
import Category from "./businessLogic/Category";
import Repository from "./businessLogic/Repository";

import Presenter from "./businessLogic/Presenter";
// import "./styles/main.module.scss";

let category = new Category({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                allCategory: {
                    domain: Env.getInstance().getBitrixHost(),
                    path: "/api/category.php",
                    params: {},
                    query: {}
                }
            }
        }),
        LanguageEnum: LanguageEnum.getInstance(),
        RubricService: RubricService.getInstance(),
        BasketService: BasketService.getInstance(),
        BannerEntity,
        CommentRubricEntity,
        CategoryEntity,
        PageInfoEntity,
        ProductRubricEntity
    }
});

let presenter = new Presenter({
    dependencies: {
        Model: category
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

        return category.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return category.normalizeInitialProps(...args);
    }
};
