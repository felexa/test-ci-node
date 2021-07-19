import React from "react";
import Env from "app/core/environment";

import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import Nicorette from "./businessLogic/Nicorette";
import Presenter from "./businessLogic/Presenter";
import View from "./view/Nicorette";

import "./styles/main.scss";

let nicorette = new Nicorette({
        dependencies: {
            PageInfoEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: nicorette
        }
    });

export default {
    getView(initialData, /*pageInfo*/) {
        // Env.getInstance().setLanguage(pageInfo.language);

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

        return nicorette.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
