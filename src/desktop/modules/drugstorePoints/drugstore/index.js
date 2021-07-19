import React from "react";

import Env from "app/core/environment";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import MarkerEntity from "app/core/entities/map/marker/drugstoreMarker/DrugstoreMarker";
import DrugstoreEntity from "app/core/entities/drugstore/Drugstore";
import Drugstore from "./businessLogic/Drugstore";
import Presenter from "./businessLogic/Presenter";
import Repository from "./businessLogic/Repository";
import View from "./view/Drugstore";

// import "./styles/main.module.scss";

let drugstore = new Drugstore({
        dependencies: {
            DrugstoreEntity,
            MarkerEntity,
            Repository: new Repository({
                dependencies: {
                    HttpClient
                },
                urls: {
                    getDrugstoreByName: { //будет удалена после добавления линков
                        domain: Env.getInstance().getCheckoutServiceHost(),
                        path: "/pub/v4/pharmacies/cities/:cityName/:drugstoreName/",
                        params: {
                            cityName: "",
                            drugstoreName: ""
                        }
                    }
                }
            })
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: drugstore
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

        return drugstore.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
