import React from "react";

import Env from "app/core/environment";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import MedicalExpertEntity from "app/core/entities/profile/medicalExpert/MedicalExpert";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";
import ArticleEntity from "app/core/entities/blog/Article";
import MedicalExpert from "./businessLogic/MedicalExpert";
import Presenter from "./businessLogic/Presenter";
import Repository from "./businessLogic/Repository";
import View from "./view/MedicalExpert";

// import "./styles/main.module.scss";

let medicalExpert = new MedicalExpert({
        dependencies: {
            MedicalExpertEntity,
            PageInfoEntity,
            ArticleEntity,
            Repository: new Repository({
                dependencies: {
                    HttpClient
                }
            })
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: medicalExpert
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

        return medicalExpert.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
