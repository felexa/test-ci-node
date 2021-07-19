import React from "react";

import Env from "app/core/environment";
// import Observer from "app/core/utilites/observer/Observer";
// import Router from "app/core/utilites/router";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import FaqEntity from "app/core/entities/faq/FAQ";

import Repository from "./businessLogic/repository/Repository";
import Presenter from "./businessLogic/Presenter";
import FAQ from "./businessLogic/Questions";
import View from "./view/FAQ";

// import "./styles/main.module.scss";

let faq = new FAQ({
        dependencies: {
            Repository: new Repository({
                dependencies: {
                    HttpClient
                },
                urls: {
                    getFaq: {
                        domain: Env.getInstance().getInfoBlockServiceHost(),
                        path: "/api/faq/",
                        query: {
                            page: 1,
                            itemsPerPage: 500
                        }
                    }
                }
            }),
            FaqEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: faq
            // Observer,
            // Router: Router.getInstance(),
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

        return faq.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
