import React from "react";
import Env from "app/core/environment";

import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import Advantages from "./businessLogic/Advantages";
import Presenter from "./businessLogic/Presenter";
import View from "./view/Advantages";

// import "./styles/main.module.scss";

let advantages = new Advantages({
        dependencies: {
            PageInfoEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: advantages
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

        return advantages.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
