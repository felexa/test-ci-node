import React from "react";

import Env from "app/core/environment";
// import Observer from "app/core/utilites/observer/Observer";
// import Router from "app/core/utilites/router";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
// import ProfileEntity from "app/core/entities/profile/Profile";
import FaqEntity from "app/core/entities/faq/FAQ";

import Repository from "./businessLogic/repository/Repository";
import Presenter from "./businessLogic/Presenter";
import Answer from "./businessLogic/Answer";
import View from "./view/Answer";

// import "./styles/main.module.scss";

let answer = new Answer({
        dependencies: {
            Repository: new Repository({
                dependencies: {
                    HttpClient
                },
                urls: {
                    getAnswer: {
                        domain: Env.getInstance().getInfoBlockServiceHost(),
                        path: "/api/faq/:question"
                    }
                }
            }),
            FaqEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: answer
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

        return answer.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
