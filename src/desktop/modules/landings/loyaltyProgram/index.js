import React from "react";

import Env from "app/core/environment";
import FAQEntity from "app/core/entities/faq/FAQ";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import Bonus from "./businessLogic/Bonus";
import Presenter from "./businessLogic/Presenter";
import Repository from "./businessLogic/Repository";
import View from "./view/Bonus";

// import "./styles/main.module.scss";

let bonus = new Bonus({
        dependencies: {
            Repository: new Repository(),
            FAQEntity,
            PageInfoEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: bonus
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

        return bonus.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
