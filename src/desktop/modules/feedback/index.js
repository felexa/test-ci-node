import React from "react";
import Env from "app/core/environment";

import ReviewService from "app/core/services/review";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import Feedback from "desktop/modules/feedback/businessLogic/Feedback";
import Presenter from "desktop/modules/feedback/businessLogic/Presenter";
import View from "desktop/modules/feedback/view/Feedback";

// import "./styles/main.module.scss";

let feedback = new Feedback({
        dependencies: {
            ReviewService: ReviewService.getInstance(),
            PageInfoEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: feedback
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

        return feedback.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
