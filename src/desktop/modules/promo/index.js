import React from "react";

import RubricEntity from "app/core/entities/rubric/ProductRubric";
import BasketService from "app/core/services/basket";
import RubricService from "app/core/services/rubric";

import View from "./view/Promo";
import Promo from "./businessLogic/Promo";

// import "./styles/main.module.scss";

let promo = new Promo({
    dependencies: {
        BasketService: BasketService.getInstance(),
        RubricService: RubricService.getInstance(),
        RubricEntity
    }
});

export default {
    getView(initialData) {
        return <View options={{initialData, model: promo}} />;
    },
    getInitialProps(...args) {
        return this.getServerSideProps(...args);
    },
    getStaticProps(...args) {
        return this.getInitialProps(...args);
    },
    getServerSideProps(...args) {
        return promo.getInitialProps(...args);
    },
    normalizeInitialProps(...args) {
        return promo.normalizeInitialProps(...args);
    }
};
