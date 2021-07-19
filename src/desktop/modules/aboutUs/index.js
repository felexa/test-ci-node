import React from "react";

import Env from "app/core/environment";

import MedicalExpertEntity from "app/core/entities/profile/medicalExpert/MedicalExpert";
import EmployeeEntity from "app/core/entities/profile/employee/Employee";
import ProfileEntity from "app/core/entities/profile/Profile";
import BrandEntity from "app/core/entities/brand/Brand";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";
import Router from "app/core/utilites/router";

import DateEnum from "app/core/utilites/enum/date";

import Repository from "./businessLogic/Repository";
import Presenter from "./businessLogic/Presenter";
import AboutUs from "./businessLogic/About";
import View from "./view/AboutPage";

// import "./styles/main.module.scss";

let aboutUs = new AboutUs({
        dependencies: {
            Repository: new Repository({
                dependencies: {}
            }),
            Router: Router.getInstance(),
            DateEnum: DateEnum.getInstance(),
            EmployeeEntity,
            ProfileEntity,
            PageInfoEntity,
            BrandEntity,
            MedicalExpertEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: aboutUs
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
    getServerSideProps(context, props) {
        Env.getInstance().setLanguage(props.pageInfo.language);

        return aboutUs.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
