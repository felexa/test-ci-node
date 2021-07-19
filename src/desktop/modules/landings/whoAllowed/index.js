import React from "react";

import Env from "app/core/environment";

import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import WhoAllowed from "./businessLogic/WhoAllowed";
import Presenter from "./businessLogic/Presenter";
import View from "./view/WhoAllowed";

// import "./styles/main.module.scss";

let whoAllowed = new WhoAllowed({
        dependencies: {
            PageInfoEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: whoAllowed
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

        return whoAllowed.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
