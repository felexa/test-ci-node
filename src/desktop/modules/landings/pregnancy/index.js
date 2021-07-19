import React from "react";

import Env from "app/core/environment";
// import Observer from "app/core/utilites/observer/Observer";
// import Router from "app/core/utilites/router";
import HttpClient from "app/core/utilites/httpClient/HttpClient";

import Repository from "./businessLogic/repository/Repository";
import Presenter from "./businessLogic/Presenter";
import Pregnancy from "./businessLogic/Pregnancy";
import View from "./view/Pregnancy";

// import "./styles/main.module.scss";

let pregnancy = new Pregnancy({
        dependencies: {
            Repository: new Repository({
                dependencies: {
                    HttpClient
                },
                urls: {
                    getDrugs: {
                        domain: Env.getInstance().getBitrixHost(),
                        path: "/api/pregnancy/list/",
                        query: {
                            // page: 1,
                            // perPage: 100
                        }
                    },
                    getRecommendations: {
                        domain: Env.getInstance().getBitrixHost(),
                        path: "/api/pregnancy/list/",
                        query: {
                            // page: 1,
                            // perPage: 100
                        }
                    }
                }
            })
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: pregnancy
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

        return pregnancy.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
