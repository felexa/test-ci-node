import React from "react";

import Env from "app/core/environment";
import FAQEntity from "app/core/entities/faq/FAQ";
import LanguageEnum from "app/core/utilites/enum/language";
import HttpClient from "app/core/utilites/httpClient/HttpClient";

import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import Insurance from "./businessLogic/Insurance";
import Presenter from "./businessLogic/Presenter";
import Repository from "./businessLogic/repository/Repository";
import View from "./view/Insurance";

// import "./styles/main.module.scss";

let insurance = new Insurance({
        dependencies: {
            Repository: new Repository({
                dependencies: {
                    HttpClient
                }
            }),
            LanguageEnum: LanguageEnum.getInstance(),
            FAQEntity,
            PageInfoEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: insurance
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

        return insurance.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
