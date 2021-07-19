import CityEntity from "app/core/entities/city/City";
import DeliveryEntity from "app/core/entities/delivery/Delivery";
import HttpClient from "app/core/utilites/httpClient/HttpClient";

import Env from "app/core/environment";
import Repository from "./repository/Repository";
import Delivery from "./Delivery";

let delivery = new Delivery({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                getPopularCities: {
                    domain: Env.getInstance().getCheckoutServiceHost(),
                    path: "/pub/v2/deliveries/cities/popular"
                },
                getCitiesByName: {
                    domain: Env.getInstance().getCheckoutServiceHost(),
                    path: "/pub/v2/deliveries/cities"
                },
                getDeliveriesByProduct: {
                    domain: Env.getInstance().getCheckoutServiceHost(),
                    path: "/pub/v2/delivery-data/products/:alias",
                    query: {
                        cityId: ""
                    }
                }
            }
        }),
        Env: Env.getInstance(),
        CityEntity,
        DeliveryEntity
    }
});

export default {
    getInstance() {
        return delivery;
    }
};
