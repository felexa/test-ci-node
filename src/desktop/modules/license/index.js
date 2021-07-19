import React from "react";
import Env from "app/core/environment";

import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import License from "./businessLogic/License";
import View from "./view/License";

// import "./styles/main.module.scss";

let license = new License({
    dependencies: {
        PageInfoEntity
    }
});

export default {
    getView(initialData, pageInfo) {
        Env.getInstance().setLanguage(pageInfo.language);

        return <View options={{initialData, model: license}} />;
    },
    getInitialProps(...args) {
        return this.getServerSideProps(...args);
    },
    getStaticProps(...args) {
        return this.getInitialProps(...args);
    },
    getServerSideProps(context, props) {
        Env.getInstance().setLanguage(props.pageInfo.language);

        return license.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return license.normalizeInitialProps(...args);
    }
};
