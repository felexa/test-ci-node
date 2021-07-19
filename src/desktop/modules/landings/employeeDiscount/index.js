import React from "react";
import Env from "app/core/environment";

import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";
import EmployeeEntity from "app/core/entities/profile/employee/Employee";

import HttpClient from "app/core/utilites/httpClient/HttpClient";

import EmployeeDiscount from "./businessLogic/EmployeeDiscount";
import Repository from "./businessLogic/Repository";
import Presenter from "./businessLogic/Presenter";
import View from "./view/EmployeeDiscount";

// import "./styles/main.module.scss";

let employeeDiscount = new EmployeeDiscount({
        dependencies: {
            Repository: new Repository({
                dependencies: {
                    HttpClient
                },
                urls: {
                    confirmInvite: {
                        domain: Env.getInstance().getAuthorizationServiceHost(),
                        path: "/api/apply-for-employee-bonus",
                        params: {},
                        query: {}
                    },
                    getRegistrationStatistics: {
                        domain: Env.getInstance().getAuthorizationServiceHost(),
                        path: "/api/employee-bonus-stats",
                        params: {},
                        query: {}
                    }
                }
            }),
            PageInfoEntity,
            EmployeeEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: employeeDiscount
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

        return employeeDiscount.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
