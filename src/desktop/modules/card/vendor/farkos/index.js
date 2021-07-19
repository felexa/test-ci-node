import React from "react";

import Env from "app/core/environment";

import ProductRubricEntity from "app/core/entities/rubric/ProductRubric";
import CompanyEntity from "app/core/entities/company/Company";
import BannerEntity from "app/core/entities/banner/Banner";
import NoteEntity from "app/core/entities/note/Note";
import ProductEntity from "app/core/entities/product/Product";
import CategoryEntity from "app/core/entities/category/Category";
import PageInfoEntity from "app/core/entities/pageInfo/PageInfo";

import RubricService from "app/core/services/rubric";

import VendorCard from "./businessLogic/VendorCard";
import Presenter from "./businessLogic/Presenter";
import Repository from "./businessLogic/Repository";
import View from "./view/View";

// import "./styles/main.module.scss";

let vendorCard = new VendorCard({
    dependencies: {
        Repository: new Repository(),
        RubricService: RubricService.getInstance(),
        ProductRubricEntity,
        CompanyEntity,
        BannerEntity,
        NoteEntity,
        ProductEntity,
        PageInfoEntity,
        CategoryEntity
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
