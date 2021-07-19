import React from "react";

import Env from "app/core/environment";

import CompanyEntity from "app/core/entities/company/Company";
import CategoryEntity from "app/core/entities/category/Category";
import TrademarkEntity from "app/core/entities/trademark/Trademark";
import ProductRubricEntity from "app/core/entities/rubric/ProductRubric";
import BannerEntity from "app/core/entities/banner/Banner";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import RubricService from "app/core/services/rubric";
import BasketService from "app/core/services/basket";

import VendorCard from "./businessLogic/VendorCard";
import Presenter from "./businessLogic/Presenter";
import Repository from "./businessLogic/Repository";
import View from "./view/View";

// import "./styles/main.module.scss";

let vendorCard = new VendorCard({
    dependencies: {
        Repository: new Repository(),
        RubricService: RubricService.getInstance(),
        BasketService: BasketService.getInstance(),
        CompanyEntity,
        CategoryEntity,
        TrademarkEntity,
        ProductRubricEntity,
        PageInfoEntity,
        BannerEntity
    }
});

let presenter = new Presenter({
    dependencies: {
        Model: vendorCard
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

        return vendorCard.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
