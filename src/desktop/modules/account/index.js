import React from "react";
import Router from "app/core/utilites/router";
// import dynamic from 'next/dynamic';
import Env from "app/core/environment";

import AccountSectionEnum from "app/core/utilites/enum/account/section";

import HttpClient from "app/core/utilites/httpClient/HttpClient";

import AuthorizationService from "app/core/services/authorization";
import ModalDialogService from "app/core/services/modalDialog";
import BasketService from "app/core/services/basket";
import ReviewService from "app/core/services/review";
import WishListService from "app/core/services/wishList";

import ThreadEntity from "app/core/entities/thread/Thread";
import CommentRubricEntity from "app/core/entities/rubric/CommentRubric";
import OrderEntity from "app/core/entities/order/Order";
import WishListEntity from "app/core/entities/wishList/WishList";

import Repository from "./businessLogic/Repository";
import Account from "./businessLogic/Account";
import Presenter from "./businessLogic/Presenter";

// import "./styles/main.module.scss";

// let ViewWithNoSSR = dynamic(
//     () => import('./view/Account'),
//     { ssr: false }
// );

import ViewWithNoSSR from "./view/Account";

let account = new Account({
        dependencies: {
            Repository: new Repository({
                dependencies: {
                    HttpClient
                },
                urls: {
                    updateProfile: {
                        domain: Env.getInstance().getAuthorizationServiceHost(),
                        path: "/api/profile",
                        params: {},
                        query: {}
                    }
                }
            }),
            AuthorizationService: AuthorizationService.getInstance(),
            ReviewService: ReviewService.getInstance(),
            WishListService: WishListService.getInstance(),
            ThreadEntity,
            CommentRubricEntity,
            OrderEntity,
            WishListEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: account,
            ModalDialogService: ModalDialogService.getInstance(),
            BasketService: BasketService.getInstance(),
            Router: Router.getInstance(),
            AccountSectionEnum: AccountSectionEnum.getInstance()
        }
    });

export default {
    getView(initialData, pageInfo) {
        Env.getInstance().setLanguage(pageInfo.language);

        return (<ViewWithNoSSR options={{initialData, presenter}} />);
    },
    getInitialProps(...args) {
        return this.getServerSideProps(...args);
    },
    getStaticProps(...args) {
        return this.getInitialProps(...args);
    },
    getServerSideProps(context, props) {
        Env.getInstance().setLanguage(props.pageInfo.language);

        return account.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
