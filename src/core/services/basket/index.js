import Env from "app/core/environment";

import RequestQueue from "app/core/utilites/queue/RequestQueue";
import Observer from "app/core/utilites/observer/Observer";
import HttpClient from "app/core/utilites/httpClient/HttpClient";

import BasketEntity from "app/core/entities/basket/Basket";

import Repository from "./repository/Repository";
import Basket from "./Basket";

let basket = new Basket({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                getBasket: {
                    domain: Env.getInstance().getBasketServiceHost(),
                    path: "/api/basket"
                },
                addItem: {
                    domain: Env.getInstance().getBasketServiceHost(),
                    path: "/api/basket/products"
                },
                changeCount: {
                    domain: Env.getInstance().getBasketServiceHost(),
                    path: "/api/basket/items/:id"
                },
                createOrder: {
                    domain: Env.getInstance().getBitrixHost(),
                    path: "/bitrix/components/apteka24/one.click.buy/script.php"
                }
            }
        }),
        Env: Env.getInstance(),
        RequestQueue,
        Observer,
        BasketEntity
    }
});

export default {
    getInstance() {
        return basket;
    }
};
