import React from "react";

import Env from "app/core/environment";

import RubricService from "app/core/services/rubric";
import CommentRubricEntity from "app/core/entities/rubric/CommentRubric";
import FAQEntity from "app/core/entities/faq/FAQ";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import HowWeWork from "./businessLogic/HowWeWork";
import Presenter from "./businessLogic/Presenter";
import Repository from "./businessLogic/Repository";

import View from "./view/HowWeWork";
// import "./styles/main.module.scss";

let howWeWork = new HowWeWork({
        dependencies: {
            Repository: new Repository(),
            RubricService: RubricService.getInstance(),
            CommentRubricEntity,
            PageInfoEntity,
            FAQEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: howWeWork
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

        return howWeWork.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
