import React from "react";

import Env from "app/core/environment";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";
import ArticleEntity from "app/core/entities/blog/Article";
import BlogService from "app/core/services/blog";
import BasketService from "app/core/services/basket";

import Article from "./businessLogic/Article";
import Presenter from "./businessLogic/Presenter";
import View from "./view/Article";

// import "./styles/main.module.scss";

let article = new Article({
        dependencies: {
            BlogService: BlogService.getInstance(),
            BasketService: BasketService.getInstance(),
            ArticleEntity,
            PageInfoEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: article
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

        return article.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
