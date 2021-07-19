import React from "react";

import Env from "app/core/environment";
import Router from "app/core/utilites/router";
import RouteNamesEnum from "app/core/utilites/enum/route";
import BlogService from "app/core/services/blog";
import CategoryEntity from "app/core/entities/blog/Category";
import ArticleEntity from "app/core/entities/blog/Article";

import Category from "./businessLogic/Category";
import Presenter from "./businessLogic/Presenter";
import View from "./view/Category";

// import "./styles/main.module.scss";

let category = new Category({
        dependencies: {
            Router: Router.getInstance(),
            RouteNamesEnum: RouteNamesEnum.getInstance(),
            BlogService: BlogService.getInstance(),
            CategoryEntity,
            ArticleEntity
        }
    }),
    presenter = new Presenter({
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
        return presenter.normalizeInitialProps(...args);
    }
};
