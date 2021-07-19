import React from "react";

import Env from "app/core/environment";
// import Router from "app/core/utilites/router";
// import Observer from "app/core/utilites/observer/Observer";

// import ModalDialogService from "app/core/services/modalDialog";
// import DeliveryService from "app/core/services/delivery";
import BasketService from "app/core/services/basket";

import RubricService from "app/core/services/rubric";
import MenuService from "app/core/services/menu";

import HttpClient from "app/core/utilites/httpClient/HttpClient";
import ProductEntity from "app/core/entities/product/Product";

import ProductRubricEntity from "app/core/entities/rubric/ProductRubric";
import CommentRubricEntity from "app/core/entities/rubric/CommentRubric";
import BrandEntity from "app/core/entities/brand/Brand";
import BannerEntity from "app/core/entities/banner/Banner";
import StoryEntity from "app/core/entities/story/Story";
import ShareEntity from "app/core/entities/share/Share";
import ArticleEntity from "app/core/entities/blog/Article";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import BrandRubricEntity from "app/core/entities/rubric/BrandRubric";
import BlogRubricEntity from "app/core/entities/rubric/BlogRubric";
import MassMediaRubricEntity from "app/core/entities/rubric/MassMediaRubric";

import View from "./view/Home";
import Repository from "./businessLogic/Repository";
import Home from "./businessLogic/Home";

// import "./styles/main.module.scss";

let home = new Home({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                getBrands: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    // path: "/api/projections/alias/:id/analogs",
                    query: {
                        // type: "atc"
                    }
                },
                getStory: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    // path: "/api/projections/alias/:id/analogs",
                    query: {
                        // type: "atc"
                    }
                },
                getShare: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    // path: "/api/projections/alias/:id/analogs",
                    query: {
                        // type: "atc"
                    }
                }
            }
        }),
        RubricService: RubricService.getInstance(),
        // Router: Router.getInstance(),
        // ModalDialogService: ModalDialogService.getInstance(),
        // DeliveryService: DeliveryService.getInstance(),
        // Observer,
        BasketService: BasketService.getInstance(),
        MenuService: MenuService.getInstance(),
        BannerEntity,
        BrandEntity,
        ProductRubricEntity,
        CommentRubricEntity,
        StoryEntity,
        ProductEntity,
        ShareEntity,
        ArticleEntity,
        BrandRubricEntity,
        BlogRubricEntity,
        PageInfoEntity,
        MassMediaRubricEntity
    }
});

export default {
    getView(initialData, pageInfo) {
        Env.getInstance().setLanguage(pageInfo.language);

        return <View options={{initialData, model: home}} />;
    },
    getInitialProps(...args) {
        return this.getServerSideProps(...args);
    },
    getStaticProps(...args) {
        return this.getInitialProps(...args);
    },
    getServerSideProps(context, props) {
        Env.getInstance().setLanguage(props.pageInfo.language);

        return home.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return home.normalizeInitialProps(...args);
    }
};
