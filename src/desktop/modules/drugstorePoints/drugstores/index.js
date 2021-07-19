import React from "react";

import Env from "app/core/environment";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import Router from "app/core/utilites/router";
import DrugstoreEntity from "app/core/entities/drugstore/Drugstore";
import MarkerEntity from "app/core/entities/map/marker/drugstoreMarker/DrugstoreMarker";
import CityEntity from "app/core/entities/city/City";
import Drugstores from "./businessLogic/Drugstores";
import Presenter from "./businessLogic/Presenter";
import Repository from "./businessLogic/Repository";
import View from "./view/Drugstores";

// import "./styles/main.module.scss";

let drugstores = new Drugstores({
        dependencies: {
            DrugstoreEntity,
            MarkerEntity,
            CityEntity,
            Repository: new Repository({
                dependencies: {
                    HttpClient
                },
                urls: {
                    getDrugstoresByCityAlias: {
                        domain: Env.getInstance().getCheckoutServiceHost(),
                        path: "/pub/v4/pharmacies/cities/:cityAlias",
                        params: {
                            cityAlias: ""
                        },
                        query: {
                            searchQuery: ""
                        }
                    },
                    getCityList: {
                        domain: Env.getInstance().getCheckoutServiceHost(),
                        path: "/pub/v4/pharmacies/cities/"
                    },
                    getAllDrugstores: {
                        domain: Env.getInstance().getCheckoutServiceHost(),
                        path: "/pub/v4/pharmacies/"
                    }
                }
            })
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: drugstores,
            Router: Router.getInstance()
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

        return drugstores.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
