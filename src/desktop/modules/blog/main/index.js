import React from "react";

import Env from "app/core/environment";
import Router from "app/core/utilites/router";
import RouteNamesEnum from "app/core/utilites/enum/route";
import BlogService from "app/core/services/blog";
import CategoryEntity from "app/core/entities/blog/Category";
import ArticleEntity from "app/core/entities/blog/Article";

import Blog from "./businessLogic/Blog";
import Presenter from "./businessLogic/Presenter";
import View from "./view/Blog";

// import "./styles/main.module.scss";

let blog = new Blog({
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
            Model: blog
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

        return blog.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
