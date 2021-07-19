import Env from "app/core/environment";

import HttpClient from "app/core/utilites/httpClient/HttpClient";
import RequestQueue from "app/core/utilites/queue/RequestQueue";
import Observer from "app/core/utilites/observer/Observer";

import WishListEntity from "app/core/entities/wishList/WishList";

import Repository from "./repository/Repository";
import WishList from "./WishList";

let wishList = new WishList({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                getLists: {
                    domain: Env.getInstance().getAuthorizationServiceHost(),
                    path: "/api/wishlist"
                },
                addItem: {
                    domain: Env.getInstance().getAuthorizationServiceHost(),
                    path: "/api/wishlist/products"
                },
                deleteItem: {
                    domain: Env.getInstance().getAuthorizationServiceHost(),
                    path: "/api/wishlists/:id/products/remove"
                }
            }
        }),
        RequestQueue,
        Observer,
        WishListEntity
    }
});

export default {
    getInstance() {
        return wishList;
    }
};
