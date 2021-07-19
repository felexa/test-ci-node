import React from "react";

import Env from "app/core/environment";

import BonusesAirdrop from "./businessLogic/BonusesAirdrop";
import Presenter from "./businessLogic/Presenter";
import View from "./view/BonusesAirdrop";

// import "./styles/main.module.scss";

let bonusesAirdrop = new BonusesAirdrop(),
    presenter = new Presenter({
        dependencies: {
            Model: bonusesAirdrop
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

        return bonusesAirdrop.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
